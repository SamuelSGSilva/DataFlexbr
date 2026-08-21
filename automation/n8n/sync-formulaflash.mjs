#!/usr/bin/env node
import { createHash } from 'node:crypto';

const cfg = {
  token: process.env.GITHUB_TOKEN || '',
  repository: process.env.GITHUB_REPOSITORY || 'SamuelSGSilva/DataFlexbr',
  baseBranch: process.env.GITHUB_BASE_BRANCH || 'main',
  syncBranch: process.env.GITHUB_SYNC_BRANCH || 'automation/formulaflash-sync',
  vehiclesPath: process.env.VEHICLES_PATH || 'data/vehicles.json',
  dryRun: /^(1|true|yes)$/i.test(process.env.DRY_RUN || ''),
};

const sourcePage = 'https://formulaflash.com/compatibility';
const sourceOrigin = new URL(sourcePage).origin;

function fail(message) {
  throw new Error(message);
}

async function fetchText(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) fail(`${response.status} ${response.statusText}: ${url}`);
  return response.text();
}

function parseOfficialBundle(source) {
  const startToken = 'const e=[';
  const endToken = '],a=[';
  const start = source.indexOf(startToken);
  const end = source.lastIndexOf(endToken);
  if (start < 0 || end < 0 || end <= start) fail('Formato da lista oficial não reconhecido.');
  let json = source.slice(start + 'const e='.length, end + 1);
  json = json
    .replace(/([,{])(\w+):/g, '$1"$2":')
    .replace(/!0/g, 'true')
    .replace(/!1/g, 'false');
  const rows = JSON.parse(json);
  if (!Array.isArray(rows) || rows.length < 4000) fail(`Lista oficial suspeita: ${rows?.length ?? 0} registros.`);
  return rows;
}

const clean = (value) => String(value ?? '')
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const key = (row) => [row.brand, row.model, row.year, row.ecuName ?? row.ecu, row.chipName ?? row.chip]
  .map(clean).join('|');

function extrasFromOfficial(row) {
  return [row.immoOff && 'Immo Off', row.powerUpgrade && 'Power Upgrade', row.vin && 'VIN']
    .filter(Boolean).join(', ');
}

function buildVehicles(official, current) {
  if (!Array.isArray(current.vehicles)) fail('vehicles.json não contém uma lista vehicles válida.');
  const currentByKey = new Map();
  for (const row of current.vehicles) if (!currentByKey.has(key(row))) currentByKey.set(key(row), row);

  const used = new Set();
  const officialMissing = [];
  const vehicles = official.map((row) => {
    const normalizedKey = key(row);
    const old = currentByKey.get(normalizedKey);
    if (old) used.add(normalizedKey); else officialMissing.push(row);
    return {
      brand: row.brand,
      model: row.model,
      year: row.year,
      ecu: row.ecuName,
      chip: row.chipName,
      obd: Boolean(row.obd),
      bench: Boolean(row.bench),
      boot: Boolean(row.boot),
      crc: old ? Boolean(old.crc) : Boolean(row.checksum),
      extras: old ? (old.extras ?? '') : extrasFromOfficial(row),
    };
  });

  const custom = current.vehicles.filter((row) => !used.has(key(row))).map((row) => ({ ...row }));
  vehicles.push(...custom);

  const exact = new Set();
  for (const row of vehicles) {
    const exactKey = [row.brand, row.model, row.year, row.ecu, row.chip].join('|');
    if (exact.has(exactKey)) fail(`Chave duplicada após consolidação: ${exactKey}`);
    exact.add(exactKey);
  }

  const counts = new Map();
  for (const row of vehicles) counts.set(row.brand, (counts.get(row.brand) || 0) + 1);
  const brands = [...counts].map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));

  return {
    output: {
      generated_at: new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      }).format(new Date()),
      total: vehicles.length,
      has_extras: vehicles.some((row) => String(row.extras || '').trim()),
      brands,
      vehicles,
    },
    officialMissing,
    customCount: custom.length,
  };
}

function comparable(value) {
  const copy = structuredClone(value);
  delete copy.generated_at;
  return JSON.stringify(copy);
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

async function github(path, options = {}) {
  if (!cfg.token) fail('GITHUB_TOKEN não configurado.');
  const response = await fetch(`https://api.github.com/repos/${cfg.repository}${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${cfg.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'DataFlex-FormulaFlash-Sync',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  if (!response.ok) fail(`GitHub ${response.status}: ${await response.text()}`);
  return response.status === 204 ? null : response.json();
}

async function publish(content, summary) {
  const [owner] = cfg.repository.split('/');
  const baseRef = await github(`/git/ref/heads/${encodeURIComponent(cfg.baseBranch)}`);
  const openPrs = await github(`/pulls?state=open&head=${encodeURIComponent(`${owner}:${cfg.syncBranch}`)}`);
  const openPr = openPrs[0];

  let branchExists = true;
  try {
    await github(`/git/ref/heads/${encodeURIComponent(cfg.syncBranch)}`);
  } catch (error) {
    if (!String(error.message).includes('GitHub 404:')) throw error;
    branchExists = false;
  }

  if (!branchExists) {
    await github('/git/refs', { method: 'POST', body: JSON.stringify({ ref: `refs/heads/${cfg.syncBranch}`, sha: baseRef.object.sha }) });
  } else if (!openPr) {
    await github(`/git/refs/heads/${encodeURIComponent(cfg.syncBranch)}`, {
      method: 'PATCH', body: JSON.stringify({ sha: baseRef.object.sha, force: true }),
    });
  }

  const file = await github(`/contents/${cfg.vehiclesPath}?ref=${encodeURIComponent(cfg.syncBranch)}`);
  const commit = await github(`/contents/${cfg.vehiclesPath}`, {
    method: 'PUT',
    body: JSON.stringify({
      message: `Atualiza aplicações FormulaFlash (${summary.officialCount} oficiais)`,
      content: Buffer.from(content).toString('base64'),
      sha: file.sha,
      branch: cfg.syncBranch,
    }),
  });

  const body = [
    '## Sincronização automática FormulaFlash', '',
    `- Aplicações oficiais: ${summary.officialCount}`,
    `- Aplicações novas encontradas: ${summary.newOfficialCount}`,
    `- Registros próprios DataFlex preservados: ${summary.customCount}`,
    `- Total consolidado: ${summary.total}`,
    `- Marcas: ${summary.brandCount}`,
    '', 'Fonte: https://formulaflash.com/compatibility',
    '', 'Validações: JSON válido, soma de marcas consistente e nenhuma chave exata duplicada.',
  ].join('\n');

  let pr = openPr;
  if (pr) {
    pr = await github(`/pulls/${pr.number}`, { method: 'PATCH', body: JSON.stringify({ body }) });
  } else {
    pr = await github('/pulls', {
      method: 'POST',
      body: JSON.stringify({
        title: `Atualiza aplicações FormulaFlash (${summary.newOfficialCount} novas)`,
        head: cfg.syncBranch,
        base: cfg.baseBranch,
        body,
        draft: true,
      }),
    });
  }
  return { commit: commit.commit.sha, pullRequest: pr.html_url, pullRequestNumber: pr.number };
}

async function main() {
  const html = await fetchText(sourcePage);
  const assetPath = html.match(/\/assets\/data-carlist-[A-Za-z0-9_-]+\.js/)?.[0];
  if (!assetPath) fail('Arquivo cumulativo data-carlist não localizado na página oficial.');
  const official = parseOfficialBundle(await fetchText(`${sourceOrigin}${assetPath}`));
  const rawUrl = `https://raw.githubusercontent.com/${cfg.repository}/${cfg.baseBranch}/${cfg.vehiclesPath}`;
  const current = JSON.parse(await fetchText(rawUrl));
  const { output, officialMissing, customCount } = buildVehicles(official, current);
  const changed = comparable(output) !== comparable(current);
  const content = JSON.stringify(output);
  const summary = {
    status: changed ? (cfg.dryRun ? 'dry-run-change-detected' : 'updated') : 'no-change',
    sourceAsset: assetPath,
    officialCount: official.length,
    previousTotal: current.total,
    newOfficialCount: officialMissing.length,
    customCount,
    total: output.total,
    brandCount: output.brands.length,
    sha256: sha256(content),
  };
  if (changed && !cfg.dryRun) Object.assign(summary, await publish(content, summary));
  console.log(JSON.stringify(summary));
}

main().catch((error) => {
  console.error(JSON.stringify({ status: 'error', message: error.message }));
  process.exitCode = 1;
});

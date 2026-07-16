-- Conteúdo dos treinamentos (gerado a partir do site antigo)
insert into public.modules (slug, title, sort) values
  ('atualizacoes-2026', 'Atualizações 2026', 1),
  ('funcoes-datacenter', 'Funções DataCenter', 2),
  ('leitura-e-gravacao', 'Leitura e Gravação', 3),
  ('informacoes-basicas', 'Informações Básicas', 4),
  ('outras-informacoes', 'Outras Informações', 5)
on conflict (slug) do update set title = excluded.title, sort = excluded.sort;

insert into public.lessons (slug, title, module_slug, youtube_id, sort) values
  ('2026-compromisso-de-atualizacao', '2026 - Compromisso de Atualização', 'atualizacoes-2026', 'oXqJQFEBLyo', 1),
  ('o-que-acontece-quando-a-ecu-nao-comunica-sera-que-esta-queimada', 'O que acontece quando a ECU não comunica, será que esta queimada?', 'atualizacoes-2026', 'J3H8nv4iN8M', 2),
  ('vw-cambio-dq200', 'VW Cambio DQ200', 'leitura-e-gravacao', 'HEqL-4B1kUI', 3),
  ('ac-delco-e37-com-dataflex', 'Ac Delco E37 com DataFlex', 'leitura-e-gravacao', 'IBcAm6EPTbs', 4),
  ('ac-delco-e38-com-dataflex', 'Ac Delco E38 com DataFlex', 'leitura-e-gravacao', 'grbnLv0m9CQ', 5),
  ('ac-delco-e39-immo-off-com-dataflex', 'Ac Delco E39 - Immo Off com DataFlex', 'leitura-e-gravacao', 'elbhdXedpGg', 6),
  ('ac-delco-e83-com-dataflex', 'Ac Delco e83 com DataFlex', 'leitura-e-gravacao', '8BM55ZV7IwQ', 7),
  ('ac-delco-e84-desbloqueando-com-dataflex', 'Ac Delco E84, desbloqueando com DataFlex', 'leitura-e-gravacao', 's-bJ5-m_AIc', 8),
  ('bosch-landrover-med17-com-dataflex', 'Bosch LandRover MED17 com Dataflex', 'leitura-e-gravacao', 'ayGhfRYjjRY', 9),
  ('bosch-mercedes-med17-com-dataflex', 'Bosch Mercedes MED17 com Dataflex', 'leitura-e-gravacao', 'Kuoek53E--A', 10),
  ('bosch-volks-med17-com-dataflex', 'Bosch VOLKS MED17 com Dataflex', 'leitura-e-gravacao', 'pMT529ZWU2I', 11),
  ('bosch-ford-medg17-com-dataflex', 'Bosch Ford MEDG17 com Dataflex', 'leitura-e-gravacao', 'YwpwS-JR-2I', 12),
  ('bosch-bme-mev17-com-dataflex', 'Bosch BMW MEV17 com Dataflex', 'leitura-e-gravacao', 'WnAiNamNbTI', 13),
  ('dataflex-campanha-inicial-03', 'DataFlex - Campanha Inicial 03', 'outras-informacoes', '1Vuc1no-esY', 14),
  ('dataflex-campanha-inicial-01', 'DataFlex - Campanha Inicial 01', 'outras-informacoes', 'wZhh8OtkE3c', 15),
  ('dataflex-campanha-inicial-02', 'DataFlex - Campanha Inicial 02', 'outras-informacoes', 'KoMiW8kvIXE', 16)
on conflict (slug) do update set title = excluded.title, module_slug = excluded.module_slug, youtube_id = excluded.youtube_id, sort = excluded.sort;

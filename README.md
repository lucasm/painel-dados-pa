<div align="center">
  <a href="https://painel-dados-pa.vercel.app/">
    <img width="92" height="64" src="https://upload.wikimedia.org/wikipedia/commons/0/02/Bandeira_do_Par%C3%A1.svg">
  </a>
</div>

<h1 align="center">
Painel de Dados do Pará
</h1>
<p align="center">
Empoderando os cidadãos do Pará com dados públicos<br>
</p>


### Objetivo do projeto

Agregar informações públicas dos 144 municípios do Estado do Pará, de forma fácil e acessível para os cidadãos fiscalizarem a gestão do seu município e do estado.


### Tarefas

- [x] Mapa do estado e municípios do Pará
- [ ] Completar dados dos municípios em `dados-estado-pa.js`
- [ ] Definir fonte de dados dos indicadores (Economia: PIB; Emprego e renda: desemprego; Educação: IDEB; Saúde: casos COVID; Meio ambiente: queimadas na Amazônia Legal; Demográfico: poulação total e mesorregião IBGE, Gestão: IEGM)
- [ ] Inserir gráficos, dimensões e abas (?)

### Estrutura do app

- `app.js`, `dados-estado-pa.js` e `dados-estado-geojson-pa` inicializados em `index.html`
- Mapa: Leaflet e CARTO


### Fonte dos dados públicos

-  [IBGE](https://servicodados.ibge.gov.br/api/docs/), [G1](https://g1.globo.com/pa/para/eleicoes/2020/noticia/2020/11/16/conheca-todos-os-prefeitos-eleitos-no-para-em-2020.ghtml), Wikipédia, Google
- https://divulgacandcontas.tse.jus.br/
- https://cidades.ibge.gov.br/brasil/pa/belem/panorama
- https://www.gov.br/conecta/catalogo/
- https://www.qedu.org.br/estado/114-para/ideb/ideb-por-municipios?dependence=5&grade=1&edition=2019
- Queimadas: http://queimadas.dgi.inpe.br/queimadas/dados-abertos/


### Licensa

MIT
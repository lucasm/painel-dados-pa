<div align="center">
  <a href="https://painel-dados-pa.vercel.app/">
    <img width="92" height="64" src="https://upload.wikimedia.org/wikipedia/commons/0/02/Bandeira_do_Par%C3%A1.svg">
  </a>
</div>

<h1 align="center">
Painel de Dados do Pará
</h1>
<p align="center">
Empoderando os cidadãos paraenses com dados públicos<br>
</p>


### Objetivo do projeto

Agregar dados, informações e indicadores públicos do Estado e dos Municípios do Pará, de forma fácil e acessível para os cidadãos fiscalizarem a gestão do seu município e do estado.


### Tarefas

- [x] Mapa do estado e dos 144 municípios do Pará
- [ ] Compilar dados dos municípios em `dados-estado-pa.js`
- [ ] Definir fonte de dados dos indicadores
- [ ] Inserir gráficos, dimensões e abas (?)

### Estrutura do app

- `app.js`, `dados-estado-pa.js` e `dados-estado-pa-geojson.js` inicializados em `index.html`
- Mapa: Leaflet e CARTO


### Fonte dos dados públicos

-  Infos gerais: Wikipédia, Google, [Catálogo das APIs Governamentais do Brasil](https://www.gov.br/conecta/catalogo/)
- Economia - PIB
- Emprego e renda - desemprego
- Educação - IDEB [Qedu](https://www.qedu.org.br/estado/114-para/ideb/ideb-por-municipios?dependence=5&grade=1&edition=2019)
- Saúde - casos COVID
- Social - IDH, [Rede Social de Cidades](https://www.redesocialdecidades.org.br/dados-abertos/api)
- Meio ambiente - queimadas na Amazônia Legal [INPE](http://queimadas.dgi.inpe.br/queimadas/dados-abertos/)
- Demográfia - população e mesorregião [IBGE](https://servicodados.ibge.gov.br/api/docs/) e [IBGE Cidades](https://cidades.ibge.gov.br/brasil/pa/belem/panorama)
- Gestão - IEGE e IEGM [TCMPA](https://www.tcm.pa.gov.br/portal-do-jurisdicionado/sistema/iegm), prefeitos [G1](https://g1.globo.com/pa/para/eleicoes/2020/noticia/2020/11/16/conheca-todos-os-prefeitos-eleitos-no-para-em-2020.ghtml)
- Eleição - contas do candidato [TSE](https://divulgacandcontas.tse.jus.br/)

### Licensa

MIT
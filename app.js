/*
	DATA
*/

// populacao
var dataPopulacao = [];

fetch("https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/2020/variaveis/9324?localidades=N6[N3[15]]")
.then(function(response){
  response.json().then(function(data){
	dataPopulacao = data;
	});
  })
.catch(function(err){ 
  console.error('Erro ao consultar API População', err);
});

function setPopulacao(idMunicipio) {

	for (i in dataPopulacao[0].resultados[0].series) {

		if (idMunicipio == dataPopulacao[0].resultados[0].series[i].localidade.id) {
			
			var populacao = dataPopulacao[0].resultados[0].series[i].serie[2020];
			document.getElementById("populacao").innerHTML = parseInt(populacao).toLocaleString('pt-BR');
		}
	}


}

// localidade
function getLocalidade(idMunicipio) {
	fetch("https://servicodados.ibge.gov.br/api/v1/localidades/distritos/" + idMunicipio + "05")
	.then(function(response){
	  response.json().then(function(data){
		document.getElementById("mesoregiao").innerHTML = data[0].municipio.microrregiao.mesorregiao.nome;
		});
	  })
	.catch(function(err){ 
	  console.error('Erro ao consultar API Localidade', err);
	});
}

// gestao e orgaos
function setGestorOrgaos(id) {

	// gestor
	for (i in dadosPa) {

		if (id == dadosPa[i].id) {
			document.getElementById("gestor").innerHTML = dadosPa[i].gestor;
			document.getElementById("linkGestor").setAttribute('href', "https://google.com/search?q=" + dadosPa[i].gestor);
			document.getElementById("govTransp").setAttribute('href', dadosPa[i].links[2]);
			document.getElementById("govCompras").setAttribute('href', dadosPa[i].links[3]);
			document.getElementById("govDiario").setAttribute('href', dadosPa[i].links[4]);
			document.getElementById("govContas").setAttribute('href', dadosPa[i].links[5]);
			document.getElementById("govOuvidoria").setAttribute('href', dadosPa[i].links[6]);
		}
	}
	
	// orgaos, se estadual
	if (id == "15") {

		document.getElementById("orgaoExe").innerHTML = "Governo";
		document.getElementById("orgaoLeg").innerHTML = "Assembléia";
		document.getElementById("orgaoCont").innerHTML = "TCE";
		document.getElementById("linkOrgaoExe").setAttribute("href", dadosPa[0].links[0]);
		document.getElementById("linkOrgaoLeg").setAttribute("href", dadosPa[0].links[1]);
		document.getElementById("linkOrgaoCont").setAttribute("href", "https://www.tce.pa.gov.br/");

	} else {
		// municipal
		document.getElementById("orgaoExe").innerHTML = "Prefeitura";
		document.getElementById("orgaoLeg").innerHTML = "Câmara";
		document.getElementById("orgaoCont").innerHTML = "TCM";
		document.getElementById("linkOrgaoCont").setAttribute("href", "https://www.tcm.pa.gov.br/");

		for (i in dadosPa) {

			if (id == dadosPa[i].id) {
				document.getElementById("linkOrgaoExe").setAttribute("href", dadosPa[i].links[0]);
				document.getElementById("linkOrgaoLeg").setAttribute("href", dadosPa[i].links[1]);
			}

		}
	}
	
}

/*
	MAPA
*/

var baseLayer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{attribution: 'Tiles &copy; CartoDB'});
var map = L.map("map",{
		layers: [baseLayer],
		center: [-3.5500000, -52.0000000],
		zoom: 6,
		maxZoom: 18,
		zoomOffset: -1,
		minZoom: 6	
	});


L.CountrySelect = {};

L.CountrySelect = L.Control.extend({
	options: {
		position: 'topright',
		title: 'Selecione',
		exclude: [],
		include: [],
		municipios: dadosGeojsonPa.features,
	},
	onAdd: function(map) {
		this.div = L.DomUtil.create('div','leaflet-select-container');
		this.select = L.DomUtil.create('select','leaflet-select',this.div);
		var content = '';
		
		if (this.options.title.length > 0 ){
			content += '<option selected disabled>'+this.options.title+'</option>';
		}
		
		var municipios = (Array.isArray(this.options.include) && this.options.include.length > 0) ? this.options.include : this.options.municipios;

		var a = [];
		for (var i=0; i<municipios.length; i++) {
			a.push(municipios[i].properties.nome);
		}
		a.sort();
		console.log(typeof a, a);


		var cidade = Object.keys(municipios);
		// cidade.sort();
		// console.log(typeof cidade, cidade);
		
		for (i in cidade){
			if (this.options.exclude.indexOf(cidade[i]) == -1){
				content+='<option value='+cidade[i]+'>'+dadosGeojsonPa.features[i].properties.name+'</option>';
			}
		}

		// municipios[i].properties.nome

		this.select.innerHTML = content;

		this.select.onmousedown = L.DomEvent.stopPropagation;
		
		return this.div;
	},
	on: function(type,handler){
		if (type == 'change'){
			this.onChange = handler;
			L.DomEvent.addListener(this.select,'change',this._onChange,this);			
		} else if (type == 'click'){ // don't need this here probably, but for convenience?
			this.onClick = handler;
			L.DomEvent.addListener(this.select,'click',this.onClick,this);			
		} else {
			console.log('CountrySelect - cannot handle '+type+' events.')
		}
	},
	_onChange: function(e) {
		var selecionado = this.select.options[this.select.selectedIndex].value;
		e.feature = this.options.municipios[selecionado];
		this.onChange(e);
	}
});

L.countrySelect = function(id, options){
	return new L.CountrySelect(id, options);
};

var select = L.countrySelect({exclude:"Abaetetuba"});

select.addTo(map);

// 

select.on('change', function(e){
	if (e.feature === undefined){ //Do nothing on title
		return;
	}
	var country = L.geoJson(e.feature);
	if (this.previousCountry != null){
		map.removeLayer(this.previousCountry);
	}
	this.previousCountry = country;

	map.addLayer(country);
	map.fitBounds(country.getBounds());

	// info#data

	var id = e.feature.properties.id;
	var nome = e.feature.properties.name;
	
	if ( document.getElementById("welcome") ) {
		document.getElementById("welcome").style.display = "none";
		document.getElementById("data").style.display = "block";
	}

	document.getElementById("nome").innerHTML = nome;
	document.getElementById("link").setAttribute("target", "_blank");
	document.getElementById("link").setAttribute('href', "https://pt.wikipedia.org/wiki/" + nome);

	// dados
	getLocalidade(id);
	setPopulacao(id);
	setGestorOrgaos(id);

});


// target _blank

window.onload = function(){
	var anchors = document.getElementById('data').getElementsByTagName('a');
	for (var i=0; i<anchors.length; i++){
	  anchors[i].setAttribute('target', '_blank');
	}
  }
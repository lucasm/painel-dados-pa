/*
	DATA
*/

// população
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

// prefeito


/*
	MAPA
*/

var baseLayer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{attribution: 'Tiles &copy; CartoDB'});
var map = L.map("map",{layers: [baseLayer], center: [-3.5500000, -52.0000000], zoom: 6});


L.CountrySelect = {};

L.CountrySelect = L.Control.extend({
	options: {
		position: 'topright',
		title: 'Selecione um município',
		exclude: [],
		include: [],
		municipios: municipiosPa.features,
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
				content+='<option value='+cidade[i]+'>'+municipiosPa.features[i].properties.name+'</option>';
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

	// put data on #info

	var municipioId = e.feature.properties.id;
	var municipioNome = e.feature.properties.name;
	var municipioGestor = e.feature.properties.gestor;

	document.getElementById("link").setAttribute('href', "https://pt.wikipedia.org/wiki/" + municipioNome);
	document.getElementById("nome").innerHTML = municipioNome;
	document.getElementById("gestor").innerHTML = municipioGestor;
	document.getElementById("linkGestor").setAttribute('href', "https://google.com/search?q=" + municipioGestor);


	// IBGE - localidades

	getLocalidade(municipioId);
	setPopulacao(municipioId);

});
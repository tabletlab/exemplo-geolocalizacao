/**
 * TL
 * Library base para o desenvolvimento de anúncios para tablets
 *
 * @author Tablet Lab
 * @version 1.0
 */
if(!window['TL']) { var TL = {}; }
;(function($) {
	/**
	 * TL.orientacao
	 * Retorna a orientação atual do device
	 *
	 * @author Carlos Soler
	 * @version 1.0
	 *
	 * @return "horizontal" ou "vertical"
	 */
	TL.orientacao = function() {
		var landscapeOrientation = window.innerWidth / window.innerHeight > 1;
		if(landscapeOrientation) {
			return "horizontal";	
		} else {
			return "vertical";
		}
	};


	/**
	 * TL.sysInfo
	 * Retorna as informações sobre o sistema operacional e browser
	 *
	 * @author André Gumieri e Carlos Soler
	 * @version 1.1
	 *
	 * @return OBJ - Objeto com os seguintes parametros:
	 *					STRING userAgent: String do useragent do sistema
	 *					STRING os: ios | android
	 *					BOOL appleDevice: true se for um device da apple, false se não.
	 *					BOOL androidDevice: true se for um device android, false se não.
	 *					BOOL celular: true se for um celular, false se não.
	 *					BOOL tablet: true se for um tablet, false se não.
	 *					*** Para outros retornos, ver código abaixo ***
	 */
	TL.sysInfo = function() {
		var self = this;
		var ua = navigator.userAgent;
		var retorno = {
			userAgend: ua,
			os: null, 
			appleDevice: false, 
			androidDevice: false,
			celular: false,
			tablet: false,

			iPad: false,
			iPhone: false,
			androidPhone: false,
			androidTablet: false,

			osVersion: null,
		};

		if(/ipad/i.test(ua)) {
			retorno.os = "ios";
			retorno.appleDevice = true;
			retorno.tablet = true;
			retorno.iPad = true;
		} else if(/iphone/i.test(ua)) {
			retorno.os = "ios";
			retorno.appleDevice = true;
			retorno.celular = true;
			retorno.iPhone = true;
		} else if(/android/i.test(ua)) {
			retorno.os = "android";
			retorno.androidDevice = true;
			if(/mobile/i.test(ua)) {
				retorno.celular = true;
				retorno.androidPhone = true;
			} else {
				retorno.tablet = true;
				retorno.androidTablet = true;
			}
		}

		// Detecta a versao do browser e do OS
		if(retorno.os=="ios") {
			var reVersaoOs = /([0-9]_[0-9_?]+)/i;
			var versaoOs = reVersaoOs.exec(ua);
			if(versaoOs.length>1) {
				versaoOs = versaoOs[1].replaceAll("_", ".");
				retorno.osVersion = versaoOs;
			}
		} else if(retorno.os=="android") {
			var reVersaoOs = /Android ([0-9.?]+);?/i;
			var versaoOs = reVersaoOs.exec(ua);
			if(versaoOs.length>1) {
				versaoOs = versaoOs[1];
				retorno.osVersion = versaoOs;
			}
		}
		
		return retorno;
	};

	

	/**
	 * String.prototype.replaceAll
	 * Adiciona a funcionalidade de replaceAll nas Strings
	 */
	String.prototype.replaceAll = function(de, para) {
		var str = this;
		var pos = str.indexOf(de);
		while (pos > -1){
			str = str.replace(de, para);
			pos = str.indexOf(de);
		}
		return (str);
	};


	/**
	 * Callbacks -> cbOrientacao
	 * Callback quando a orientação for mudada
	 */
	TL.cbOrientacao = function(callback) {
		var ultimaOrientacao = TL.orientacao();
		window.addEventListener("resize", function() {
			var orientacaoAtual = TL.orientacao();
			if(ultimaOrientacao!=orientacaoAtual) {
				ultimaOrientacao = orientacaoAtual;
				callback.call(undefined, TL.orientacao());
			}
		});
	};


})();
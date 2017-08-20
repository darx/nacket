(function() {

	var nacket = {};

	nacket.init = function() {
		this.enviroment = "https://apidev.syn-finity.com/1.1/";
		this.httpStart();
	}

	nacket.httpStart = function() {
		$.ajaxSetup({ cache: false, crossDomain: true });
	}

	nacket.just = function() {
        var httpRequest =   $.ajax({
                                type: "POST",
                                url: this.environment + "livechat/recieve"
                            });

        httpRequest.done(function(response) {

        });
	}

    nacket.addScript = function(config) {
        /**
         * @name addScript
         * @param {Object} config Contains resource attributes for script/link
         * @description Inserts script/link  
         */

        if (config.type === 'js') {

            var fileref = document.createElement("script");

            fileref.setAttribute('type', 'text/javascript');
            fileref.setAttribute('src', config.url);

        } else if (config.type === 'css') {

            var fileref = document.createElement("link");

            fileref.setAttribute('rel', 'stylesheet');
            fileref.setAttribute('type', 'text/css');
            fileref.setAttribute('href', config.url);

        }

        if (typeof fileref !== 'undefined') {

        	document.getElementsByTagName('head')[0].appendChild(fileref);

        }

    }

	;(function(root, factory) {
		
		if (typeof define === 'function' && define.amd) {
		
			define(factory);
		
		} else if (typeof exports === 'object') {
		
			module.exports = factory();
		
		} else {
		
			root.nacket = factory();
		
		}

	} (this, function() {
		return nacket;
	}));

})();
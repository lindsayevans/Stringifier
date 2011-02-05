/*!
 * Stringifier 0.0.1a - JavaScript string formatting library
 *
 * Copyright (c) 2011 Lindsay Evans <http://linz.id.au/>
 * Licensed under the MIT <http://www.opensource.org/licenses/mit-license.php)> license.
 */

/*jslint eqeqeq: true */
/*global console: false, window: false */

(function(window){

	var Stringifier = function(){
		//return Stringifier.test(q);
	};

	// Metadata
	Stringifier.type = 'library';
	Stringifier.name = 'Stringifier';
	Stringifier.major_version = 0;
	Stringifier.minor_version = 0;
	Stringifier.patch_version = 1;
	Stringifier.special_version = 'a';
	Stringifier.version = '0.0.1a';
	Stringifier.globals = ['Stringifier', 'S'];


	// Public properties
	// Public methods

	Stringifier.format = function(format, data){
		var formatted_string = '';
		return formatted_string;
	};

	// Private properties
	// Private methods


	// Expose in globals
	window.Stringifier = window.S = Stringifier;

})(window || this);


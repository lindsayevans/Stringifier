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
		return Stringifier.format.apply(Stringifier, arguments);
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
		var formatted_string = format, m_chunk, value;

		// Support arbitrary number of arguments for data instead of an array
		if(arguments.length > Stringifier.format.length || !data.pop){
			data = Array.prototype.slice.call(arguments).slice(1);
		}

		// Parse format string
		while((m_chunk = format_parser.exec(format)) !== null){
			// Interpolate data
			value = data[m_chunk[1] - 1] || '';
			formatted_string = formatted_string.replace(m_chunk[0], value);
		}

		return formatted_string;
	};

	// Private properties
	var
		format_parser = /%[^%]*([0-9]+)/gi
	;
	// Private methods


	// Expose in globals
	window.Stringifier = window.S = Stringifier;

})(window || this);


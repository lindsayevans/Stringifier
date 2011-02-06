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
		var formatted_string = format, m_chunk, value, specifier, specifier_function, index = 0;
//console.info('Stringifier.format()')
//console.info('format: ',format)
		// Support arbitrary number of arguments for data instead of an array
		if(arguments.length > Stringifier.format.length || !data.pop){
			data = Array.prototype.slice.call(arguments).slice(1);
		}
//console.info('data: ',data)

		// Parse format string
		while((m_chunk = format_parser.exec(format)) !== null){

			// Grab current value, convert based on specifier
			specifier = m_chunk[2];
			value = data[index++] || '';
			specifier_function = specifier_function_map[specifier];
			value = specifier_function.call(Stringifier, value, specifier);

			if(specifier === '%'){
				index--;
			}

			// Interpolate data
			formatted_string = formatted_string.replace(m_chunk[0], value);
		}

		return formatted_string;
	};


	// Private methods
	var
		_spec_character = function(input){
			return input.toString()[0];
		},
		_spec_integer = function(input, specifier){
			var result = specifier === 'u' ? Math.abs(input) : input;
			return parseInt(result).toString();
		},
		_spec_scientific = function(input, specifier){
			var result = input.toExponential().toString();
			return specifier === 'e' ? result.toLowerCase() : result.toUpperCase();
		},
		_spec_float = function(input, specifier){
			var result = parseFloat(input).toString(),
					e = _spec_scientific(input, specifier === 'g' ? 'e' : 'E')
			;
			return e.length < result.length ? e : result;
		},
		_spec_octal = function(input){
			var result = (input).toString(8);
			return result.length === 3 ? result : '0' + result;
		},
		_spec_string = function(input){
			return input.toString();
		},
		_spec_hexadecimal = function(input, specifier){
			var result = (input).toString(16);
			return specifier === 'x' ? result.toLowerCase() : result.toUpperCase();
		},
		_spec_pointer = function(input){
			return '';
		},
		_spec_nothing = function(){
			return '';
		},
		_spec_percent = function(input, specifier){
			return '%';
		}
	;

	// Private properties
	var
		format_parser = /%([0-9]*)([cdieEfgGosuxXpn%]+)/g,
		specifier_function_map = {
			'c': _spec_character,
			'd': _spec_integer,
			'i': _spec_integer,
			'e': _spec_scientific,
			'E': _spec_scientific,
			'f': _spec_float,
			'g': _spec_float,
			'G': _spec_float,
			'o': _spec_octal,
			's': _spec_string,
			'u': _spec_integer,
			'x': _spec_hexadecimal,
			'X': _spec_hexadecimal,
			'p': _spec_pointer,
			'n': _spec_nothing,
			'%': _spec_percent
		}
	;

	// Expose in globals
	window.Stringifier = window.S = Stringifier;

})(window || this);


/*!
 * Stringifier 0.0.1a - JavaScript string formatting library
 *
 * Copyright (c) 2011 Lindsay Evans <http://linz.id.au/>
 * Licensed under the MIT <http://www.opensource.org/licenses/mit-license.php> license.
 */

/*jslint eqeqeq: true */
/*global console: false, window: false */

(function(window){

	var Stringifier = function(){
		// This is likely to change at some point, so I wouldn't rely on it
		return Stringifier.sprintf.apply(Stringifier, arguments);
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

	// Implementation of the C vsprintf() function
	// Our sprintf() can handle an array, so we just pass it on
	Stringifier.vsprintf = function(format){
		return Stringifier.sprintf.apply(Stringifier, arguments);
	};

	// Implementation of the C sprintf() function
	Stringifier.sprintf = function(format, data){
		var formatted_string = format, m_chunk, value, specifier, flags, width, precision, length, specifier_function, index = 0;

		// Only a format was passed in, just return it
		if(arguments.length === 1){
			return format;
		}

		// Support arbitrary number of arguments for data instead of an array
		if(arguments.length > Stringifier.sprintf.length || !data.pop){
			data = Array.prototype.slice.call(arguments).slice(1);
		}

		// Parse format string
		while((m_chunk = sprintf_format_parser.exec(format)) !== null){

			// Grab current value, convert based on specifier & flags
			specifier = m_chunk[5];
			flags = m_chunk[1];
			width = m_chunk[2];
			precision = m_chunk[3];
			length = m_chunk[4];
			value = data[index++] || '';

			specifier_function = specifier_function_map[specifier];

			value = specifier_function.call(Stringifier, value, specifier);
			value = apply_flags(value, flags, width, precision, length, specifier);

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

		// Utility functions for padding strings
		left_pad = function(value, amount, character){
			var result = '';
			while(amount--){
				result += character;
			}
			return result + value;
		},
		right_pad = function(value, amount, character){
			var result = value;
			while(amount--){
				result += character;
			}
			return result;
		},

		// Apply flags for sprintf
		apply_flags = function(value, flags, width, precision, length, specifier){
			var pad_char = ' ';

			if(flags.indexOf('0') !== -1){
				pad_char = '0';
			}
			if(flags.indexOf('-') !== -1 && width > 0 && value.length < width){
				return right_pad(value, width - value.length, pad_char);
			}else if(width > 0 && value.length < width){
				return left_pad(value, width - value.length, pad_char);
			}

			if(flags.indexOf('+') !== -1){
				return value > 0 ? '+' + value : value;
			}

			if(flags.indexOf(' ') !== -1){
				return value > 0 ? ' ' + value : value;
			}

			if(flags.indexOf('#') !== -1){
				if(specifier === 'o' && parseInt(value, 8) > 0){
					return left_pad(value, 3 - value.length, '0');
				}
				if(specifier === 'x' && parseInt(value, 16) > 0){
					return '0x' + value;
				}
				if(specifier === 'X' && parseInt(value, 16) > 0){
					return '0X' + value;
				}				
			}


			return value;

		},

		// Functions to convert values based on specifiers
		_spec_character = function(input){
			return input.toString().charAt(0);
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
			return result;
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
		// RegExp to parse an sprintf style format string
		// %[flags][width][.precision][length]specifier
		sprintf_format_parser = /%([-+ #0]*)([0-9*]*)(?:\.?([0-9*]*))([hlL]?)([cdieEfgGosuxXpn%]{1})/g,

		// Map sprintf specifiers to functions
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


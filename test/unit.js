$(function() {

	module('sprintf()');

  test('Argument types', function() {
		expect(3);
    equals(S('START %s END', 'one'), 'START one END', 'single data value');
    equals(S('START %s %s %s END', 'one', 'two', 'three'), 'START one two three END', 'arbitrary arguments');
    equals(S('START %s %s %s END', ['one','two','three']), 'START one two three END', 'array of data values');
  });

  test('Specifier types', function() {
		expect(13);
    equals(S('START %c %c %c END', 'one', 'two', 'three'), 'START o t t END', 'character specifier');
    equals(S('START %d %i %d END', 100, 200, -300), 'START 100 200 -300 END', 'decimal & integer specifier');
    equals(S('START %e %E END', 3.9265e+2, 3.9265e+2), 'START 3.9265e+2 3.9265E+2 END', 'scientific notation specifiers');
    equals(S('START %f END', 392.65), 'START 392.65 END', 'floating point specifier');
    equals(S('START %g %G %g %G END', 3.9265e+2, 3.9265e+2, 3.9265e+10, 3.9265e+10), 'START 392.65 392.65 3.9265e+10 3.9265E+10 END', 'shorter of float/scientific specifiers');
    equals(S('START %o %o END', 42, 255), 'START 52 377 END', 'octal specifier');
    equals(S('START %s %s %s END', 'one', 'two', 'three'), 'START one two three END', 'string specifier');
    equals(S('START %u %u %u END', 42, 255, -100), 'START 42 255 100 END', 'unsigned decimal specifier');
    equals(S('START %x %x END', 42, 255), 'START 2a ff END', 'unsigned hexadecimal specifier');
    equals(S('START %X %X END', 42, 255), 'START 2A FF END', 'unsigned hexadecimal specifier (uppercase)');
    equals(S('START %p END', S), 'START  END', 'pointer specifier');
    equals(S('START %n END', 'nothing'), 'START  END', 'nothing specifier');
    equals(S('START %% %s END', 'whatevs'), 'START % whatevs END', 'percent specifier (escape sequence)');
  });

  test('Flags', function() {
		expect(9);
    equals(S('START %5f %5f %5f %5f END', 1, -1, -392.65, 392.65), 'START 1     -1    -392.65 392.65 END', 'left justification');
    equals(S('START %-5f %-5f %-5f %-5f END', 1, -1, -392.65, 392.65), 'START     1    -1 -392.65 392.65 END', 'right justification');
    equals(S('START %05f %05f %05f %05f END', 1, -1, -392.65, 392.65), 'START 10000 -1000 -392.65 392.65 END', 'left zero justification');
    equals(S('START %-05f %-05f %-05f %-05f END', 1, -1, -392.65, 392.65), 'START 00001 000-1 -392.65 392.65 END', 'right zero justification');
    equals(S('START %+f %+f END', -392.65, 392.65), 'START -392.65 +392.65 END', 'preceding plus/minus flag');
    equals(S('START % f % f END', -392.65, 392.65), 'START -392.65  392.65 END', 'preceding space flag');
    equals(S('START %#o %#o END', 42, 255), 'START 052 377 END', 'octal preceding zero flag');
    equals(S('START %#x %#x END', 42, 255), 'START 0x2a 0xff END', 'hexadecimal preceding zero flag');
    equals(S('START %#X %#X END', 42, 255), 'START 0X2A 0XFF END', 'hexadecimal preceding zero flag (uppercase)');
	});

/*
  test('Currency', function() {
		equals(S('START %01.2f %01.2f END', 100.1, 100), 'START 100.10 100.00 END', 'currency');
	});
*/

/*
  test('Basic formatting - numbered arguments', function() {
    equals(S('START %1 %2, %3 END', ['one','two','three']), 'START one two, three END', 'ordered positioning');
    equals(S('START %1 %3, %2 END', ['one','two','three']), 'START one three, two END', 'unordered positioning');
    equals(S('START %1 [%4] END', ['one','two','three']), 'START one [] END', 'empty string for undefined value');
  });
*/


  
module('sprintf() - Dojo tests');

function t_eq(a,b){
	return equals(b,a);
}

test("Flag: (space)",function(t){


			t_eq(" 42", S("% d", 42));
			t_eq("-42", S("% d", -42));
			t_eq("   42", S("% 5d", 42));
			t_eq("  -42", S("% 5d", -42));
			t_eq("             42", S("% 15d", 42));
			t_eq("            -42", S("% 15d", -42));
  });
  test("Flag: +",function(t){


			t_eq("+42", S("%+d", 42));
			t_eq("-42", S("%+d", -42));
			t_eq("  +42", S("%+5d", 42));
			t_eq("  -42", S("%+5d", -42));
			t_eq("            +42", S("%+15d", 42));
			t_eq("            -42", S("%+15d", -42));
  });
  test("Flag: 0",function(t){


			t_eq("42", S("%0d", 42));
			t_eq("-42", S("%0d", -42));
			t_eq("00042", S("%05d", 42));
			t_eq("00-42", S("%05d", -42));
			t_eq("000000000000042", S("%015d", 42));
			t_eq("000000000000-42", S("%015d", -42));
  });
  test("Flag: -",function(t){


			t_eq("42", S("%-d", 42));
			t_eq("-42", S("%-d", -42));
			t_eq("42   ", S("%-5d", 42));
			t_eq("-42  ", S("%-5d", -42));
			t_eq("42             ", S("%-15d", 42));
			t_eq("-42            ", S("%-15d", -42));

			t_eq("42", S("%-0d", 42));
			t_eq("-42", S("%-0d", -42));
			t_eq("42   ", S("%-05d", 42));
			t_eq("-42  ", S("%-05d", -42));
			t_eq("42             ", S("%-015d", 42));
			t_eq("-42            ", S("%-015d", -42));

			t_eq("42", S("%0-d", 42));
			t_eq("-42", S("%0-d", -42));
			t_eq("42   ", S("%0-5d", 42));
			t_eq("-42  ", S("%0-5d", -42));
			t_eq("42             ", S("%0-15d", 42));
			t_eq("-42            ", S("%0-15d", -42));
  });
  test("Precision",function(t){


			t_eq("42", S("%d", 42.8952));
			t_eq("42", S("%.2d", 42.8952)); // Note: the %d format is an int
			t_eq("42", S("%.2i", 42.8952));
			t_eq("42.90", S("%.2f", 42.8952));
			t_eq("42.90", S("%.2F", 42.8952));
			t_eq("42.8952000000", S("%.10f", 42.8952));
			t_eq("42.90", S("%1.2f", 42.8952));
			t_eq(" 42.90", S("%6.2f", 42.8952));
			t_eq("042.90", S("%06.2f", 42.8952));
			t_eq("+42.90", S("%+6.2f", 42.8952));
			t_eq("42.8952000000", S("%5.10f", 42.8952));
  });
  test("Bases",function(t){


			t_eq("\x7f", S("%c", 0x7f));

			var error = false;
			try {
				S("%c", -100);
			}catch(e){
				t_eq("invalid character code passed to %c in sprintf", e.message);
				error = true;
			}
			t.t(error);

			error = false;
			try {
				S("%c", 0x200000);
			}catch(e){
				t_eq("invalid character code passed to %c in sprintf", e.message);
				error = true;
			}
			t.t(error);
  });
  test("Mapping",function(t){


			// %1$s format
			t_eq("%1$", S("%1$"));
			t_eq("%0$s", S("%0$s"));
			t_eq("Hot Pocket", S("%1$s %2$s", "Hot", "Pocket"));
			t_eq("12.0 Hot Pockets", S("%1$.1f %2$s %3$ss", 12, "Hot", "Pocket"));
			t_eq(" 42", S("%1$*.f", "42", 3));

			error = false;
			try {
				S("%2$*s", "Hot Pocket");
			}catch(e){
				t_eq("got 1 printf arguments, insufficient for '%2$*s'", e.message);
				error = true;
			}
			t.t(error);

			// %(map)s format
			t_eq("%(foo", S("%(foo", {}));
			t_eq("Hot Pocket", S("%(temperature)s %(crevace)s", {
				temperature: "Hot",
				crevace: "Pocket"
			}));
			t_eq("12.0 Hot Pockets", S("%(quantity).1f %(temperature)s %(crevace)ss", {
				quantity: 12,
				temperature: "Hot",
				crevace: "Pocket"
			}));

			var error = false;
			try {
				S("%(foo)s", 42);
			}catch(e){
				t_eq("format requires a mapping", e.message);
				error = true;
			}
			t.t(error);

			error = false;
			try {
				S("%(foo)s %(bar)s", "foo", 42);
			}catch(e){
				t_eq("format requires a mapping", e.message);
				error = true;
			}
			t.t(error);

			error = false;
			try {
				S("%(foo)*s", {
					foo: "Hot Pocket"
				});
			}catch(e){
				t_eq("* width not supported in mapped formats", e.message);
				error = true;
			}
			t.t(error);
  });
  test("Positionals",function(t){


			t_eq(" foo", S("%*s", "foo", 4));
			t_eq("      3.14", S("%*.*f", 3.14159265, 10, 2));
			t_eq("0000003.14", S("%0*.*f", 3.14159265, 10, 2));
			t_eq("3.14      ", S("%-*.*f", 3.14159265, 10, 2));

			var error = false;
			try {
				S("%*s", "foo", "bar");
			}catch(e){
				t_eq("the argument for * width at position 2 is not a number in %*s", e.message);
				error = true;
			}
			t.t(error);

			error = false;
			try {
				S("%10.*f", "foo", 42);
			}catch(e){
				t_eq("format argument 'foo' not a float; parseFloat returned NaN", e.message);
				error = true;
			}
			t.t(error);
  });
  test("Miscellaneous",function(t) {


			t_eq("+hello+", S("+%s+", "hello"));
			t_eq("+10+", S("+%d+", 10));
			t_eq("a", S("%c", "a"));
			t_eq('"', S("%c", 34));
			t_eq('$', S("%c", 36));
			t_eq("10", S("%d", 10));

			var error = false;
			try {
				S("%s%s", 42);
			}catch(e){
				t_eq("got 1 printf arguments, insufficient for '%s%s'", e.message);
				error = true;
			}
			t.t(error);

			error = false;
			try {
				S("%c");
			}catch(e){
				t_eq("got 0 printf arguments, insufficient for '%c'", e.message);
				error = true;
			}
			t.t(error);

			t_eq("%10", S("%10", 42));
  });

});


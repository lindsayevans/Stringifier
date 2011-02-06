$(function() {


  test('The basics', function() {
    equals(S.name, 'Stringifier', 'meta name');
    equals(S.version, '0.0.1a', 'meta version');
  });


  test('Argument types', function() {
    equals(S('START %s END', 'one'), 'START one END', 'single data value');
    equals(S('START %s %s %s END', 'one', 'two', 'three'), 'START one two three END', 'arbitrary arguments');
    equals(S('START %s %s %s END', ['one','two','three']), 'START one two three END', 'array of data values');
  });


  test('Specifier types', function() {
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
  test('Basic formatting - numbered arguments', function() {
    equals(S('START %1 %2, %3 END', ['one','two','three']), 'START one two, three END', 'ordered positioning');
    equals(S('START %1 %3, %2 END', ['one','two','three']), 'START one three, two END', 'unordered positioning');
    equals(S('START %1 [%4] END', ['one','two','three']), 'START one [] END', 'empty string for undefined value');
  });
*/
});


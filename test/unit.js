$(function() {


  test('The basics', function() {
    equals(S.name, 'Stringifier', 'meta name');
    equals(S.version, '0.0.1a', 'meta version');
  });


  test('Argument types', function() {
    equals(S('START %1 END', 'one'), 'START one END', 'single data value');
    equals(S('START %1 %2, %3 END', 'one', 'two', 'three'), 'START one two, three END', 'arbitrary arguments');
  });

  test('Basic formatting', function() {
    equals(S('START %1 %2, %3 END', ['one','two','three']), 'START one two, three END', 'ordered positioning');
    equals(S('START %1 %3, %2 END', ['one','two','three']), 'START one three, two END', 'unordered positioning');
    equals(S('START %1 [%4] END', ['one','two','three']), 'START one [] END', 'empty string for undefined value');
    //equals(S('%1 %%1 %2, %3', ['one','two','three']), 'one %1 two, three', 'format escaping');
  });

});


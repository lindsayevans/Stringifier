$(function() {


  test('The basics', function() {
    equals(S.name, 'Stringifier', 'meta name');
    equals(S.version, '0.0.1a', 'meta version');
  });


  test('Basic formatting', function() {
    equals(S.format('START %1 %2, %3 END', ['one','two','three']), 'START one two, three END', 'ordered positioning');
    equals(S.format('START %1 %3, %2 END', ['one','two','three']), 'START one three, two END', 'unordered positioning');
    //equals(S.format('%1 %%1 %2, %3', ['one','two','three']), 'one %1 two, three', 'format escaping');
  });

});


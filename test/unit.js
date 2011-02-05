$(function() {


  test('The basics', function() {
    equals(S.name, 'Stringifier', 'meta name');
    equals(S.version, '0.0.1a', 'meta version');
  });

/*
  test('Basic formatting', function() {
    equals(S.format('%1 %2, %3', ['one','two','three']), 'one two, three', 'arg positioning');
  });
*/
});


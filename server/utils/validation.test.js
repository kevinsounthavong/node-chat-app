var expect = require('expect');

var {isRealString} = require('./validation')

//isRealString
  //should reject non-string values
  // should reject string with only spaces
  // should allow string with non-space characters


describe('isRealString', () => {
  it('should reject non-string values', () => {

    var result = isRealString(100);

    expect(result).toBe(false);
  });

  it('should reject strings with only spaces', () => {
    var result = isRealString('  ');

    expect(result).toBe(false);
  });

  it('should allow strings with non-space characters', () => {
    var result = isRealString('  LOTR');

    expect(result).toBe(true);
  });
});

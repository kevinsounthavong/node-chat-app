var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', ()=>{
  it('should generate the correct message object', () => {
    // store res in variable
    // assert from match
    // assert text match
    // asser createdAt is a number toBeA

    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from: from,
      text: text
    });


  });
});
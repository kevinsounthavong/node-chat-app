var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', ()=>{
  it('should generate the correct location object', () => {
    var from = 'Jen';
    var lat = 39.368519600000006;
    var lon = -74.4408385;
    
    var url = `https://www.google.com/maps?q=${lat},${lon}`;
    var locationMessage = generateLocationMessage(from, lat, lon);

    expect(locationMessage.createdAt).toBeA('number');
    expect(locationMessage).toInclude({
      from: from,
      url: url
    });

  });
});
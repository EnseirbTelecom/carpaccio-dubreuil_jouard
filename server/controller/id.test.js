const Id = require('./id.js')

test('GET /id', () => { 
    const id = new Id()
    const desiredResponse = {id: 'carpaccio-dubreuil_jouard'}
    expect(id.testId()).toStrictEqual(desiredResponse)
  })
const Bill = require('./bill.js')

test('POST /bill', () => {
    const bill = new Bill()
    const desiredResponse = { total: 44.4 }
    
    expect(bill.testResult([15, 11], [1, 2], "FR")).toStrictEqual(desiredResponse)
})
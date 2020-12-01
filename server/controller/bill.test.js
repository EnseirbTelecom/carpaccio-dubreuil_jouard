const Bill = require('./bill.js')

test('POST /bill (bad arguments: not the same length)', () => {
    const bill = new Bill()
    const desiredResponse = "prices and quantities have not the same length for /bill"
    const billArguments = { 
        prices :     [15, 11], 
        quantities : [1], 
        country :    "FR"
    }
    expect(bill.postBill(billArguments).error).toBe(desiredResponse)
})

test('POST /bill (bad arguments: not enough arguments)', () => {
    const bill = new Bill()
    const desiredResponse = "please check input arguments for /bill"
    const billArguments = { 
        prices :     [15, 11], 
        quantities : [1, 2], 
    }
    expect(bill.postBill(billArguments).error).toBe(desiredResponse)
})

test('POST /bill (bad arguments: this country does not exist)', () => {
    const bill = new Bill()
    const desiredResponse = "this country does not exist"
    const billArguments = { 
        prices :     [15, 11], 
        quantities : [1, 2], 
        country :    "AB"
    }
    expect(bill.postBill(billArguments).error).toBe(desiredResponse)
})

test('POST /bill', () => {
    const bill = new Bill()
    const desiredResponse = { total: 44.4 }
    const billArguments = { 
        prices :     [15, 11], 
        quantities : [1, 2], 
        country :    "FR" 
    }
    expect(bill.postBill(billArguments)).toStrictEqual(desiredResponse)
})
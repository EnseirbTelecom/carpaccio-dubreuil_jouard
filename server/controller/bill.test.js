// Test unitaire de la classe Bill

const Bill = require('./bill.js')

test('POST /bill (bad arguments: not the same length)', async () => {
    const bill = new Bill()
    const desiredResponse = "prices and quantities have not the same length for /bill"
    const billArguments = {
        prices :     [15, 11],
        quantities : [1],
        country :    "FR"
    }
    const result = await bill.postBill(billArguments);
    expect(result.error).toBe(desiredResponse)
})

test('POST /bill (bad arguments: not enough arguments)', async () => {
    const bill = new Bill()
    const desiredResponse = "please check input arguments for /bill"
    const billArguments = {
        prices :     [15, 11],
        quantities : [1, 2],
    }
    const result = await bill.postBill(billArguments);
    expect(result.error).toBe(desiredResponse)
})

test('POST /bill (bad arguments: this country does not exist)', async () => {
    const bill = new Bill()
    const desiredResponse = "this country does not exist"
    const billArguments = {
        prices :     [15, 11],
        quantities : [1, 2],
        country :    "AB"
    }
    const result = await bill.postBill(billArguments);
    expect(result.error).toBe(desiredResponse)
})

test('POST /bill (bad arguments: this discount does not exist)', async () => {
    const bill = new Bill()
    const desiredResponse = "this discount does not exist"
    const billArguments = {
        prices :     [15, 11],
        quantities : [1, 2],
        country :    "FR",
        discount:    "SUPER_DISCOUNT"
    }
    const result = await bill.postBill(billArguments);
    expect(result.error).toStrictEqual(desiredResponse)
})

test('POST /bill', async () => {
    const bill = new Bill()
    const desiredResponse = { total: 44.4 }
    const billArguments = {
        prices :     [15, 11],
        quantities : [1, 2],
        country :    "FR"
    }
    const result = await bill.postBill(billArguments);
    expect(result).toStrictEqual(desiredResponse)
})

test('POST /bill NO_DISCOUNT', async () => {
    const bill = new Bill()
    const desiredResponse = { total: 44.4 }
    const billArguments = {
        prices :     [15, 11],
        quantities : [1, 2],
        country :    "FR" ,
        discount:     "NO_DISCOUNT"
    }
    const result = await bill.postBill(billArguments);
    expect(result).toStrictEqual(desiredResponse)
})

test('POST /bill FLAT_DISCOUNT', async () => {
    const bill = new Bill()
    const desiredResponse = { total: 31.08 }
    const billArguments = {
        prices :     [15, 11],
        quantities : [1, 2],
        country :    "FR" ,
        discount:     "FLAT_DISCOUNT"
    }
    const result = await bill.postBill(billArguments);
    expect(result).toStrictEqual(desiredResponse)
})

test('POST /bill PROGRESSIVE_DISCOUNT PRICE<1000', async () => {
    const bill = new Bill()
    const desiredResponse = { total: 600 }
    const billArguments = {
        prices :     [100, 200],
        quantities : [1, 2],
        country :    "FR" ,
        discount:    "PROGRESSIVE_DISCOUNT"
    }
    const result = await bill.postBill(billArguments);
    expect(result).toStrictEqual(desiredResponse)
})

test('POST /bill PROGRESSIVE_DISCOUNT 1000<PRICE<5000', async () => {
    const bill = new Bill()
    const desiredResponse = { total: 4656 }
    const billArguments = {
        prices :     [1000, 1500],
        quantities : [1, 2],
        country :    "FR" ,
        discount:    "PROGRESSIVE_DISCOUNT"
    }
    const result = await bill.postBill(billArguments);
    expect(result).toStrictEqual(desiredResponse)
})

test('POST /bill PROGRESSIVE_DISCOUNT 5000<PRICE<7000 ', async () => {
    const bill = new Bill()
    const desiredResponse = { total: 5700 }
    const billArguments = {
        prices :     [2000, 1500],
        quantities : [1, 2],
        country :    "FR" ,
        discount:    "PROGRESSIVE_DISCOUNT"
    }
    const result = await bill.postBill(billArguments);
    expect(result).toStrictEqual(desiredResponse)
})

test('POST /bill PROGRESSIVE_DISCOUNT 7000<PRICE<10000', async () => {
    const bill = new Bill()
    const desiredResponse = { total: 6696 }
    const billArguments = {
        prices :     [3000, 1500],
        quantities : [1, 2],
        country :    "FR" ,
        discount:    "PROGRESSIVE_DISCOUNT"
    }
    const result = await bill.postBill(billArguments);
    expect(result).toStrictEqual(desiredResponse)
})

test('POST /bill PROGRESSIVE_DISCOUNT 10000<PRICE<50000', async () => {
    const bill = new Bill()
    const desiredResponse = { total: 16200 }
    const billArguments = {
        prices :     [5000, 5000],
        quantities : [1, 2],
        country :    "FR" ,
        discount:    "PROGRESSIVE_DISCOUNT"
    }
    const result = await bill.postBill(billArguments);
    expect(result).toStrictEqual(desiredResponse)
})

test('POST /bill PROGRESSIVE_DISCOUNT PRICE>50000', async () => {
    const bill = new Bill()
    const desiredResponse = { total: 71400 }
    const billArguments = {
        prices :     [10000, 30000],
        quantities : [1, 2],
        country :    "FR" ,
        discount:    "PROGRESSIVE_DISCOUNT"
    }
    const result = await bill.postBill(billArguments);
    expect(result).toStrictEqual(desiredResponse)
})

test('POST /bill 100<FIXED_DISCOUNT PRICE<100', async () => {
    const bill = new Bill()
    const desiredResponse = { total: 60 }
    const billArguments = {
        prices :     [20, 15],
        quantities : [1, 2],
        country :    "FR" ,
        discount:     "FIXED_DISCOUNT"
    }
    const result = await bill.postBill(billArguments);
    expect(result).toStrictEqual(desiredResponse)
})

test('POST /bill 100<FIXED_DISCOUNT 100<PRICE<400', async () => {
    const bill = new Bill()
    const desiredResponse = { total: 350 }
    const billArguments = {
        prices :     [100, 100],
        quantities : [1, 2],
        country :    "FR" ,
        discount:     "FIXED_DISCOUNT"
    }
    const result = await bill.postBill(billArguments);
    expect(result).toStrictEqual(desiredResponse)
})

test('POST /bill 400<FIXED_DISCOUNT PRICE<1000', async () => {
    const bill = new Bill()
    const desiredResponse = { total: 790 }
    const billArguments = {
        prices :     [200, 250],
        quantities : [1, 2],
        country :    "FR" ,
        discount:     "FIXED_DISCOUNT"
    }
    const result = await bill.postBill(billArguments);
    expect(result).toStrictEqual(desiredResponse)
})

test('POST /bill FIXED_DISCOUNT PRICE>1000', async () => {
    const bill = new Bill()
    const desiredResponse = { total: 1360 }
    const billArguments = {
        prices :     [500, 400],
        quantities : [1, 2],
        country :    "FR" ,
        discount:     "FIXED_DISCOUNT"
    }
    const result = await bill.postBill(billArguments);
    expect(result).toStrictEqual(desiredResponse)
})

test('POST /bill with currency', async () => {
    const bill = new Bill()
    const billArguments = { 
        prices :     [15, 11], 
        quantities : [1, 2], 
        country :    "FR",
        currency: "CAD",
    }
    const result = await bill.postBill(billArguments);
    console.log(result);
    expect(result.total == undefined).toBeFalsy()
})

test('POST /bill with bad currency', async () => {
    const bill = new Bill()
    desiredResponse = "this currency does not exist";
    const billArguments = { 
        prices :     [15, 11], 
        quantities : [1, 2], 
        country :    "FR",
        currency: "TOTO",
    }
    const result = await bill.postBill(billArguments);
    expect(result.error).toBe(desiredResponse)
})

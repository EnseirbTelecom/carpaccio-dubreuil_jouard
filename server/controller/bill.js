/*
/bill (requête POST) doit permettre de calculer un prix en
fonction d’un objet de paramètres envoyé à l’API en JSON dans
le body de la requête. L’objet est de la forme
{ "prices" : [15.99, 11.99], "quantities" : [1, 2], "country" : "ES" }
avec le paramètre country qui représente le code du pays, pour un calcul
du prix prenant en compte la TVA.
*/

// curl -H "Content-Type:application/json" -X POST -d '{"prices":[10,20], "quantities":[1,2]}' http://localhost:3000/bill


class Bill {
  constructor () {
    this.taxList = {
      "DE": 20,
      "UK": 21,
      "FR": 20,
      "IT": 25,
      "ES": 19,
      "PL": 21,
      "RO": 20,
      "NL": 20,
      "BE": 24,
      "EL": 20,
      "CZ": 19,
      "PT": 23,
      "HU": 27,
      "SE": 23,
      "AT": 22,
      "BG": 21,
      "DK": 21,
      "FI": 17,
      "SK": 18,
      "IE": 21,
      "HR": 23,
      "LT": 23,
      "SI": 24,
      "LV": 20,
      "EE": 22,
      "CY": 21,
      "LU": 25,
      "MT": 20
    }
    this.bill = {
      prices:     undefined,
      quantities: undefined,
      country:    undefined,
      discount:   undefined
    }
    this.response = {
      total: undefined
    }
  }

  paramChecker() {
    for (let attr in this.bill) {
      if (this.bill[attr] === undefined && attr != "discount")
        return ({ "error" : "please check input arguments for /bill" })
    }
    if (this.bill.prices.length != this.bill.quantities.length) {
      return ({ "error" : "prices and quantities have not the same length for /bill" })
    }
    if (!this.taxList[this.bill.country] && this.bill.country != undefined){
      return ({ "error" : "this country does not exist" })
    }
    if ((this.bill.discount != "NO_DISCOUNT") && (this.bill.discount != "PROGRESSIVE_DISCOUNT")
    && (this.bill.discount != "FLAT_DISCOUNT") && (this.bill.discount != "FIXED_DISCOUNT")
    && (this.bill.discount))
      return ({ "error" : "this discount does not exist" });
  }

  priceCalculator (prices, quantities, country) {
    let result = 0;
    for (let i = 0; i < prices.length; i++){
      result += prices[i] * quantities[i];
    }
    this.response.total = result * (1 + this.taxList[country]/100)
  }

  discountApply(price, country, discount){
    var result = price
    if (!discount){
      result = price
    }
    else{
      if (discount == "NO_DISCOUNT"){
        result = price
      }
      if (discount == "FLAT_DISCOUNT"){
        result = price * 0.7
      }
      if (discount == "PROGRESSIVE_DISCOUNT"){
        if (price >= 50000){
          result = price * 0.85
        }
        else if (price >= 10000){
          result = price * 0.9
        }
        else if (price >= 7000){
          result = price * 0.93
        }
        else if (price >= 5000){
          result = price * 0.95
        }
        else if (price >= 1000){
          result = price * 0.97
        }
      }
      if (discount == "FIXED_DISCOUNT"){
        if (price >= 1000)
          result = price - 200
        else if (price >= 400)
          result = price - 50
        else if (price >= 100)
          result = price - 10
      }
    }
    this.response.total = result
  }

  postBill (billArguments) {
    this.bill.prices      = billArguments.prices
    this.bill.quantities  = billArguments.quantities
    this.bill.country     = billArguments.country
    this.bill.discount    = billArguments.discount
    const err = this.paramChecker()

    if (err){
      return err
    } else {
      this.priceCalculator(this.bill.prices, this.bill.quantities, this.bill.country)
      this.discountApply(this.response.total, this.bill.country, this.bill.discount)
      return this.response;
    }
  }
}

module.exports = Bill

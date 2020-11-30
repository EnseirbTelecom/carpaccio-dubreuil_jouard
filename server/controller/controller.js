const taxList = {"DE":20, "UK": 21, "FR": 20, "IT": 25, "ES": 19, "PL": 21, "RO": 20, "NL": 20, "BE": 24, "EL": 20, "CZ": 19, "PT": 23, "HU": 27, "SE": 23, "AT": 22, "BG": 21, "DK": 21, "FI": 17, "SK": 18,"IE": 21, "HR":23 ,"LT":23 ,"SI":24 ,"LV":20 ,"EE":22 ,"CY":21 ,"LU":25 ,"MT":20}

const paramChecker = (bill) => {

	for (let attr in bill) {
		if (bill[attr] === undefined)
			return ({ "error" : "please check input arguments for /bill" })
  }
  if (bill.prices.length != bill.quantities.length) {
    return ({ "error" : "prices and quantities have not the same length for /bill" })
  }
	if (!taxList[bill.country]){
		return ({ "error" : "this country does not exist" })
	}
	return undefined;
}

const priceCalculator = (prices, quantities, country) => {
  let result = 0;
  for (let i = 0; i < prices.length; i++){
    result += prices[i] * quantities[i];
  }
  result = result * (1 + taxList[country]/100)
  return ({"total":result});
}

exports.getId = (req, res, next) => {
    return res.send('Welcome on the Carpaccio app\nBy Julien DUBREUIL & Maxime JOUARD\n');
};

exports.postBill = (req, res, next) => {
  const bill = {
    prices: req.body.prices,
    quantities: req.body.quantities,
    country: req.body.country
  }
  const err = paramChecker(bill)
  if (err){
    return res.status(400).json(err)
  }
  else{
    const result = priceCalculator(bill.prices, bill.quantities, bill.country)
    res.send(result);
  }

};

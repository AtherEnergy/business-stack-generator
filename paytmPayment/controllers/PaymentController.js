var paytm_config = require('../../paytm/paytm_config.js').paytm_config;
var paytm_checksum = require('../../paytm/checksum.js');
var rn = require('random-number');

module.exports = {
  
    generate_checksum: function(req,response){
        if(req.method == 'POST'){
			var paramarray = {};
			paramarray['MID'] = paytm_config.MID; //Provided by Paytm
			paramarray['ORDER_ID'] = 'ORDER_' + rn(); //unique OrderId for every request
			paramarray['CUST_ID'] = 'CUST001';  // unique customer identifier 
			paramarray['INDUSTRY_TYPE_ID'] = paytm_config.INDUSTRY_TYPE_ID; //Provided by Paytm
			paramarray['CHANNEL_ID'] = paytm_config.CHANNEL_ID; //Provided by Paytm
			paramarray['TXN_AMOUNT'] = req.body.amount + '.00'; // transaction amount
			paramarray['WEBSITE'] = paytm_config.WEBSITE; //Provided by Paytm
			paramarray['CALLBACK_URL'] = `${req.baseUrl}/verify_checksum`;//Handle callback send by payment
			paramarray['EMAIL'] = 'test@gmail.com'; // customer email id
			paramarray['MOBILE_NO'] = '1234567891'; // customer 10 digit mobile no.
			paytm_checksum.genchecksum(paramarray, paytm_config.MERCHANT_KEY, function (err, res) {
				response.view('./payments/checkout',{data: res})
			});
		}else{
			response.writeHead(200, {'Content-type' : 'text/json'});
			response.end();
		}
	},
	
	verify_checksum: function(request,response){
		if(request.method == 'POST'){
			if(paytm_checksum.verifychecksum(request.body, paytm_config.MERCHANT_KEY)) {
				console.log("true");
				response.view('./payments/confirmation',{message: "Success"})
			}else{
				console.log("false");
				response.view('./confirmation',{message: "Payment Failed"})
			}			
		}
	}
};


module.exports = {
  paytm_config: {
		MID: process.env.MID,// Provided by Paytm
		WEBSITE: 'WEBSTAGING',
    CHANNEL_ID: 'WEB',
    INDUSTRY_TYPE_ID: 'Retail',
    MERCHANT_KEY : process.env.MERCHANT_KEY// Provided by Paytm
	}
}
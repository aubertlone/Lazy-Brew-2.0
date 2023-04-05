const unirest = require("unirest");

const req = unirest("POST", "https://hotels4.p.rapidapi.com/properties/v2/list");

req.headers({
	"content-type": "application/json",
	"X-RapidAPI-Key": "96a2eebbe7mshd7ee8d64dfea7ebp12aa58jsne8065f5fdb1d",
	"X-RapidAPI-Host": "hotels4.p.rapidapi.com",
	"useQueryString": true
});

req.type("json");
req.send({
	"currency": "USD",
	"eapid": 1,
	"locale": "en_US",
	"siteId": 300000001,
	"destination": {
		"regionId": "2323"
	},
	"checkInDate": {
		"day": 10,
		"month": 10,
		"year": 2022
	},
	"checkOutDate": {
		"day": 15,
		"month": 10,
		"year": 2022
	},
	"rooms": [
		{
			"adults": 2,
			"children": [
				{
					"age": 5
				},
				{
					"age": 7
				}
			]
		}
	],
	"resultsStartingIndex": 0,
	"resultsSize": 5,
	"sort": "PRICE_LOW_TO_HIGH",
	"filters": {
		"price": {
			"max": 150,
			"min": 100
		}
	}
});

req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body.data.propertySearch.properties);
});

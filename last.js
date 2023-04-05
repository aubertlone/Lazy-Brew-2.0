const axios = require("axios");

const options = {
  method: 'POST',
  url: 'https://hotels4.p.rapidapi.com/properties/v2/list',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '2a3c3d1c3emsh266f4f3063e58bap18d7dbjsnbe5ea03be3c6',
    'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
  },
  data: {
    "currency": "USD",
    "eapid": 1,
    "locale": "en_US",
    "siteId": 300000001,
    "destination": {
      "regionId": "2323"
    },
    "checkInDate": {
      "day": 1,
      "month": 5,
      "year": 2023
    },
    "checkOutDate": {
      "day": 15,
      "month": 5,
      "year": 2023
    },
    "rooms": [
      {
        "adults": 2,
        "children": [
          {}
        ]
      }
    ],
    "resultsStartingIndex": 0,
    "resultsSize": 200,
    "sort": "REVIEW",
    "filters": {
      "price": {
        "max": 350,
        "min": 100
      }
    }
  }
};
axios.request(options).then(function (response) {
	console.log(response.data.data.propertySearch.properties);
}).catch(function (error) {
	console.error(error);
});
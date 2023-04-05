const axios = require("axios");

const options = {
  method: 'POST',
  url: 'https://hotels4.p.rapidapi.com/properties/v2/list',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '96a2eebbe7mshd7ee8d64dfea7ebp12aa58jsne8065f5fdb1d',
    'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
  },
  data: {"currency":"USD","eapid":1,"locale":"en_US","siteId":300000001,"destination":{"regionId":"6054439"},"checkInDate":{"day":10,"month":10,"year":2022},"checkOutDate":{"day":15,"month":10,"year":2022},"rooms":[{"adults":2,"children":[{"age":5},{"age":7}]}],"resultsStartingIndex":0,"resultsSize":200,"sort":"PRICE_LOW_TO_HIGH","filters":{"price":{"max":150,"min":100}}}
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
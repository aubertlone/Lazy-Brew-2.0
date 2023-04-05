// this module (query.js) exports a function called getHotelList to retrieve a list of hotels for a given destination ID
// It uses the Axios library to make a GET request to the Hotels4 API.


// Import the axios library for making HTTP requests
const axios = require("axios");

/**
 * Fetches a list of hotels for a given destination ID.
 *
 * @param {string} destinationID - The destination ID for which to fetch the hotels.
 * @returns {Promise} - Returns a Promise that resolves with the list of hotels.
 */
const getHotelList = (destinationID) => {
    // Define check-in and check-out dates
    let checkIn = '2022-09-19';
    let checkOut = '2022-09-22';

    // Configure the GET request options for the Hotels4 API
    const optionsProperties = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/properties/list',
        params: {
            destinationId: destinationID,
            pageNumber: '1',
            pageSize: '10',
            checkIn: checkIn,
            checkOut: checkOut,
            adults1: '1',
            sortOrder: 'PRICE',
            locale: 'en_US',
            currency: 'USD'
        },
        headers: {
            'X-RapidAPI-Key': '213bf8eeb6mshabac5e8f6740a32p17141djsnbf46e85640b0',
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
        }
    };

    // Make the GET request using axios and the configured options
    return axios.request(optionsProperties)
        .then((response) => {
            // Log the response data and return the list of hotels
            console.log(response.data.data.body.searchResults.results, 'response data');
            return (response.data.data.body.searchResults.results);
        })
        .catch((e) => {
            // Log any errors that occurred during the request
            console.error(e, 'e');
        });
}

// Uncomment the following line to test the function with 'Los_Angeles' as the destination ID
// getHotelList('Los_Angeles');

// Export the getHotelList function as the default export of the module
export default getHotelList;

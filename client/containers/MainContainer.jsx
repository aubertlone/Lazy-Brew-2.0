
import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import { Redirect } from 'react-router';
import axios from 'axios'
import Hotel from './Hotel';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import Login from './login';
import SignUp from './signup';
import { UserContext } from '../App';


//library for calculating distance using longitude/latitude
var geodist = require('geodist');

const mapStateToProps = (state) => ({});

const MainContainer = () => {

  const [hotelList, setHotelList] = useState([])
  const [hotelDone, setHotelDone] = useState(false)
  const [brewDone, setBrewDone] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  })
  const [isLoading, setIsLoading] = useState(true)

  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [selectedCity, setCity] = useState('')

  const [hotelResultNumber, setHotelResultNumber] = useState(9)

  const [userId, setUserId] = useContext(UserContext);
  const [userName, setUserName] = useContext(UserContext);

  //fetch request for hotels with check in/check out dates pertaining to city selected
  const getHotelData = () => {
    let checkIn = checkInDate.split("/").reverse().join("-")
    let checkOut = checkOutDate.split("/").reverse().join("-")

    const optionsProperties = {
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
          "regionId": selectedCity
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
        "resultsSize": 50,
        "sort": "REVIEW",
        "filters": {
          "price": {
            "max": 350,
            "min": 100
          }
        }
      }
    };
    setIsLoading(false)


    axios.request(optionsProperties)
      .then((response) => {
        let propertiesResult = response.data.data.propertySearch.properties
        
        return propertiesResult
      })
      .then((apiHotelList) => {
        console.log(apiHotelList, 'apiHotelList')
        let finalHotelData = []
        for (let i = 0; i < apiHotelList.length; i++) {
          const optionsBreweries = {
            method: 'GET',
            // url: `https://api.openbrewerydb.org/breweries?by_dist=${apiHotelList[i].coordinate.lat},${apiHotelList[i].coordinate.lon}&per_page=10`,
            url: `https://api.openbrewerydb.org/v1/breweries?by_dist=${apiHotelList[i].mapMarker.latLong.latitude},${apiHotelList[i].mapMarker.latLong.longitude}&per_page=10`
            
          }
          console.log(optionsBreweries)
          let oneProperty = apiHotelList[i]


          // n

          //based on hotel longitude/latitude, fetch request for breweries within 2 miles radius

          // at this point, we have a large array called optionsBreweries
          // each index location inside optionsBreweries contains a brewery object of the 10 closest breweries to the hotel

        }
      
        return finalHotelData.length
      })
      .then((finalData) => {
        //set state so that the page can rerender upon the promise fetch call completion
        setIsLoading(true)
      })
      .catch((e) => {
        console.error(e, 'hotels not compelte')
      })
  }

  // const navigate = useNavigate();
  // return navigate('/login')

  // const handleClicklogin = () => {
  //   console.log("I clicked the login button!")
  //   return Navigate('/login')


  // }

  // const handleClicksignup = () => {
  //   return Navigate('/signup')
  // }



  let Greeting = (
    <div className='greeting'></div>
  );

  if (userName !== '') {
    Greeting = (
      <div className='greeting'> Welcome back, {userName}.</div>
    )

  }

  let Picture = (
    <div className='Picture'></div>
  )


  const Navbar = (

    <div className='navbar'>
      <nav>
        <div className='logo'>
          <span className='Brand'><h1> Lazy Brew </h1></span>
          <img src='https://i.imgur.com/SuDASN5.png' className='logo-design'></img>
            {Greeting}
          <div className='login'>
            <Link to='/login' element={<Login />}>Log In</Link>
        </div>
        <div className='signup'>
        <Link to='/signup' element={<SignUp />}> Sign Up</Link>
          </div>
    </div>
      </nav >
    </div >
  )

// option Id's are gaiaId's from frapidapi locations/v3/search.

return (
  <div>
    {Navbar}
    <div className="FlexDisplay">
      <div className="ContainerMainContainer">
        <div id="main_wrapper2">
          <div><h1 id='lazyBrew-header'>Lazy Brew </h1><span id="convenientFont"><b>by ConvenientFinds</b></span></div>
          <br />
          <label>Select Destination</label>/
          <select onChange={(e) => setCity(e.target.value)}>
            <option value="" disabled selected>Select Your City</option>
            
            <option value={'2323'}>Kansas City</option>
            <option value={'2011'}>Los Angeles</option>
            <option value={'3132'}>San Francisco</option>
            <option value={'1488'}>Honolulu</option>
            <option value={'996'}>Denver</option>
            <option value={'7086'}>St. Louis</option>
            <option value={'3200'}>Salt Lake City</option>
            <option value={'3763'}>Washington D.C</option>
            <option value={'3121'}>Seattle</option>
            <option value={'1503'}>Houston</option>


          </select>

          <label>Check-in Date</label>
          <input type="date" onChange={(e) => setCheckInDate(e.target.value)}></input>
          <label>Check-in Date</label>
          <input type="date" onChange={(e) => setCheckOutDate(e.target.value)}></input>

          <Button onClick={(e) => {
            // Reseting hotel display to not show previous values
            console.log('Attempting to reset the list');
            setHotelList([]);
            getHotelData();
            setHotelDone(true)
          }}>See Hotels</Button>

          {isLoading || <div>Loading...</div>}
        </div>
      </div>
    </div>





    {/* <div className="ContainerMainContainer">
          <div id="main_wrapper">
          <div id="allHotelsWrapper"> */}


    {hotelDone && <Hotel
      setHotelList={setHotelList}
      hotelList={hotelList}
      hotelDone={hotelDone}
      brewDone={brewDone}
      setBrewDone={setBrewDone}
      setHotelDone={setHotelDone}
      isLoading={isLoading}
    />}
    {/* </div>
          </div>
          </div> */}


  </div>);

};

export default connect(mapStateToProps, null)(MainContainer);
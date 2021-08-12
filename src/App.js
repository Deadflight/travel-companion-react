import React, { useEffect, useState } from 'react'
import Header from './Header/Header'
import List from './List/List'
import Map from './Map/Map'
import { CssBaseline, Grid } from '@material-ui/core'
import { getPlacesData, getWeatherData } from './api'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { grey, blueGrey  } from '@material-ui/core/colors'

const theme = createTheme({
  dark: {
    text: grey[50],
    input: blueGrey[50],
    bg: '#2c3e50'
  }
});

const App = () => {
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([])
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setCoordinates({lat: latitude, lng: longitude});
    })
  }, []);

  //Filter Places
  useEffect(() => {
    const filteredPlaces = places?.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating,places])

  useEffect(() => {
    //console.log(coordinates, bounds);
    if(bounds.sw && bounds.ne){
      setIsLoading(true);
      getWeatherData(coordinates.lat, coordinates.lng)
        .then((data) => setWeatherData(data))
      getPlacesData(type, bounds.ne, bounds.sw)
        .then((data) => {
          //console.log(data);
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setIsLoading(false);
      });
    }
  },[type,bounds]);

  return (
    <>
      <CssBaseline/>
      <ThemeProvider theme={theme}>
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{with:'100%'}}>
        <Grid item xs={12} md={4}>
          <List 
            places={filteredPlaces?.length ? filteredPlaces : places} 
            childClicked={childClicked} 
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces?.length ? filteredPlaces : places} 
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
      </ThemeProvider>
    </>
  )
}


export default App

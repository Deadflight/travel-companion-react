import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import { Rating } from '@material-ui/lab'
import useStyles from './MapStyles'
import SnezyStyles from './SnezyStyles'

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact 
        bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50,50,50,50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: SnezyStyles }}
        onChange={(e) => {
          setCoordinates({          
            lat: e.center.lat,
            lng: e.center.lng
          });
          setBounds({
            ne : e.marginBounds.ne,  //North East
            sw : e.marginBounds.sw   //South West
          })
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
      {places?.map((place,index) => (
        <div key={index} className={classes.markerContainer} lat={place.latitude} lng={place.longitude}>
          {
            !isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>
                <img 
                  className={classes.pointer}
                  src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly/>
              </Paper>
            )
          }
        </div>
      ))}
      {weatherData?.list?.map((data, index) => (
        <div key={index} lat={data.coord.lat} lng={data.coord.lon}>
          <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" alt="weatherImg"/>        
        </div>
      ))}
      </GoogleMapReact>
    </div>
  )
}

export default Map
import Container from 'react-bootstrap/Container'
import './App.css';
import React, { Component } from "react";

import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

import InfoTable from './InfoTable';
import InfoPane from './InfoPane';

// Main class for combining all the components
class EarthMap extends Component {
  state: any
  map: any
  constructor(props: any){
    super(props)
    this.map = React.createRef();
    this.state= {
      locations: [],
      currentLocations: [],
      selectedLocation: null,
    };
  }


  async componentDidMount () {
    const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
    this.GetEarthquakes(URL);
  }

  GetEarthquakes = async (URL: string) =>{

    let data: any = await fetch(URL);
    data = await data.json();
    this.setState({locations: data.features, currentLocations: data.features}, () => console.log(this.state.locations));
    
  }

  setSelectedLocation = (location: object) => this.setState({selectedLocation: location});

  render() {
    return (
      <div className="App">
          <Container>
            <GoogleMap
              ref={map => {
                this.map = map;
              }}
              defaultZoom={3}
              defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
              onBoundsChanged={() => {
                
                let ne = this.map.getBounds().getNorthEast();
                let sw = this.map.getBounds().getSouthWest();

                let newLocations = this.state.locations.filter((location: any) => {
                  const lat = location.geometry.coordinates[1];
                  const lng = location.geometry.coordinates[0];

                  return lng < ne.lng() && lng > sw.lng() && lat > sw.lat() && lat > sw.lat()
                })
                console.log(ne.lng())
                console.log(sw.lng())
                console.log(ne.lat())
                console.log(ne.lat())

                this.setState({currentLocations: newLocations})

              }}

            >
              {this.state.currentLocations.map((location: any) => (
                <Marker
                  key={location.id}
                  position={{ 
                     lat: location.geometry.coordinates[1],
                     lng: location.geometry.coordinates[0] 
                    }}
                  onClick={() => this.setState({selectedLocation: location})}
                />  
                
              ))}
              {
                this.state.selectedLocation && (
                  <InfoWindow
                    position={{
                      lat: this.state.selectedLocation.geometry.coordinates[1],
                      lng: this.state.selectedLocation.geometry.coordinates[0] 
                    }}
                    onCloseClick={() => this.setState({selectedLocation: null})}
                  >
                    <InfoTable
                      location={this.state.selectedLocation}
                    />
                  </InfoWindow>
                )
              }

            </GoogleMap> 

              
              <InfoPane
                locations={this.state.currentLocations}
              />


                  
          </Container>

      </div>
    );
  }
}

const WrappedMap = withScriptjs(withGoogleMap(EarthMap));

export default function App(){
  return(
    <div style={{ width: "98vw", height: "80vh" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: `100%`}} />}
        containerElement={<div style={{ height: `100%`}} />}
        mapElement={<div style={{ height: `100%`}} />}
      />
    </div>
  )
}
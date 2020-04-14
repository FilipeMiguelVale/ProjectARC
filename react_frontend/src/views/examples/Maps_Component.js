import React from "react";
// react plugin used to create google maps
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
// reactstrap components
import {Card} from "reactstrap";
// core components


const MapWrapper = withScriptjs(
    withGoogleMap(props => <GoogleMap
            center = {{lat: props.Location.lat, lng: props.Location.lng}}
            defaultZoom={18}
            defaultOptions={{
              scrollwheel: false,
              styles: [
                {
                  featureType: "administrative",
                  elementType: "labels.text.fill",
                  stylers: [{color: "#444444"}]
                },
                {
                  featureType: "landscape",
                  elementType: "all",
                  stylers: [{color: "#f2f2f2"}]
                },
                {
                  featureType: "poi",
                  elementType: "all",
                  stylers: [{visibility: "off"}]
                },
                {
                  featureType: "road",
                  elementType: "all",
                  stylers: [{saturation: -100}, {lightness: 45}]
                },
                {
                  featureType: "road.highway",
                  elementType: "all",
                  stylers: [{visibility: "simplified"}]
                },
                {
                  featureType: "road.arterial",
                  elementType: "labels.icon",
                  stylers: [{visibility: "off"}]
                },
                {
                  featureType: "transit",
                  elementType: "all",
                  stylers: [{visibility: "on"}]
                },
                {
                  featureType: "water",
                  elementType: "all",
                  stylers: [{color: "#5e72e4"}, {visibility: "on"}]
                }
              ]
            }}
        >
        <Marker position={{ lat: props.Location.lat, lng: props.Location.lng }}/>
        </GoogleMap>
    ));


class Maps extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0
      }
  }

  getLocation = async () => {
    const response = await fetch(
        '/accident/1');
    const result = await response.json();
    this.setState(prevState => ({
      lat: result["location"]["lat"],
      lng: result["location"]["lng"]
    }))
  };

  componentDidMount(): void {
    this.getLocation();
  };

  render() 
  {
    return (
    <Card className="shadow border-0">
    <MapWrapper
        Location={this.state}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4aWR3SBGaa1oB0CuDf2vptnJfSMSguZU"
        loadingElement={<div style={{ height: `100%` }} />}
        center = {this.state}
        containerElement={
        <div
            style={{ height: `600px` }}
            className="map-canvas"
            id="map-canvas"
        />
        }
        mapElement={
        <div style={{ height: `100%`, borderRadius: "inherit" }} />
        }
    />
    </Card>
    );
  }
}

export default Maps;

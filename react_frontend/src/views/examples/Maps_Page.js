/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create google maps
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
// reactstrap components
import {Card, Container, Row} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";
import Maps from "./Maps_Component.js";

class Maps_Page extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      markers: [],
      initial_position: {
        lat: 0,
        lng: 0
      }
    } 
  }

  getAllLocations = async () => {
    let response = await fetch(
      `/list_accidents`);
    let result = await response.json();
    let all_locations = [];
    for (let i=0; i < result.length; i++){
      all_locations.push(
        {
          lat: result[i]["location"]["lat"],
          lng: result[i]["location"]["lng"],
          id: result[i]["id"]
        }
      )
    }
    this.setState(prevState => (
      {
        markers: all_locations,
        initial_position: {
          lat: result[0]["location"]["lat"],
          lng: result[0]["location"]["lng"]
        }
      }))
  }

  componentDidMount() {
    this.getAllLocations();
  }

  render() 
  {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow border-0">
                <Maps
                  markers={this.state.markers}
                  Location={this.state.initial_position}
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4aWR3SBGaa1oB0CuDf2vptnJfSMSguZU"
                  loadingElement={<div style={{ height: `100%` }} />}
                  center = {this.state.initial_position}
                  zoom = {10}
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
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Maps_Page;

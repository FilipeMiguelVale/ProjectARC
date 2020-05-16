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
import ImageGallery from './ImageGallery';
import "../../assets/css/custom.css"

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
  Button,
  UncontrolledCollapse,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, Badge
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";
import Maps from "./Maps_Component.js";
import {Redirect} from "react-router-dom";

const PREFIX_URL = 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';
const MEDIA_URL='/media/'

function fix_date(st) {
  let date = st.split('T');
  let year = date[0];
  let time  = date[1].split('.')[0];
  return year + " " + time;
}

class AccidentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      showIndex: false,
      showBullets: true,
      infinite: true,
      showThumbnails: true,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: false,
      showGalleryPlayButton: false,
      showNav: true,
      isRTL: false,
      slideDuration: 5,
      slideInterval: 2000,
      slideOnThumbnailOver: false,
      thumbnailPosition: 'left',
      showVideo: {},
      accident_data: {
        car: [],
        location: {
          address: " ",
          coords: {lat: 40, lng: 30 },
        },
        damage: 0.0,
        date: " ",
        n_cars_involved: 0,
        n_people_involved: 0,
        n_people_injured: 0, 
      },
      dropDownValue: 0,
      dropDownOpen: false,
    };
    this.numImg=0
    this.images = [
      {
        thumbnail: `${PREFIX_URL}4v.jpg`,
        original: `${PREFIX_URL}4v.jpg`,
        source: '',
        renderItem: this._renderVideo.bind(this)
      },
      {
        original: `${PREFIX_URL}image_set_default.jpg`,
        thumbnail: `${PREFIX_URL}image_set_thumb.jpg`,
        imageSet: [
          {
            srcSet: `${PREFIX_URL}image_set_cropped.jpg`,
            media : '(max-width: 1280px)',
          },
          {
            srcSet: `${PREFIX_URL}image_set_default.jpg`,
            media : '(min-width: 1280px)',
          }
        ]
      },
      {
        original: `${PREFIX_URL}1.jpg`,
        thumbnail: `${PREFIX_URL}1t.jpg`,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',

      },
      {
        original: `${PREFIX_URL}1.jpg`,
        thumbnail: `${PREFIX_URL}1t.jpg`,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
      },
      {
        original: `${PREFIX_URL}1.jpg`,
        thumbnail: `${PREFIX_URL}1t.jpg`,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
      },
    ]
  }


  get_data = async (id) => {
    const response = await fetch(
      `/accident/${id}`);
    const result = await response.json();
    this.setState(prevState => (
      {
        accident_data:  {
          car: result['cars'],
          location: 
          {
            address: result['location']['address'],
            coords: {lat: result['location']['lat'],lng: result['location']['lng']}
          },
          damage: result['damage'],
          date: fix_date(result['date']),
          n_cars_involved: result['n_cars_involved'],
          n_people_involved: result['n_people'],
          n_people_injured: result['n_people_injured'],
        },
        dropDownValue: result['status']
      }
    ));
    this.images[0]['source'] = `/media/${id}/video/1.mp4`
    this.images[0]['thumbnail']= `/media/${id}/video/1T.jpg`
    this.images[0]['original']= this.images[0]['thumbnail']
     const resp =await fetch(
      `/Nmedia/${id}/photos`);
    const res = await resp.json();
    this.numImg = res
    for (let i = 0; i < parseInt(this.numImg); i++) {
      this.images[i+1]['original']= `/media/${id}/photos/${i}.jpeg`
      this.images[i+1]['thumbnail']= `/media/${id}/photos/${i}.jpeg`
      ;
    }
    //this.images.concat(this._getStaticImages(id));
  }

  componentDidMount() {
    let id = this.props.match.params['id']
    this.get_data(id)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.slideInterval !== prevState.slideInterval ||
        this.state.slideDuration !== prevState.slideDuration) {
      // refresh setInterval
      this._imageGallery.pause();
      this._imageGallery.play();
    };
  }

  renderCars = (value,index) => {
    return(
      <CardBody className="border rounded">
        <CardTitle
          tag="h4"
          className="text-uppercase text-muted mb-0"
        >
          Car {index + 1}
        </CardTitle>
        <CardBody className="align-content-center">
          <Row>
            <span className="font-weight-bold">Activated ABS</span>
            <span>: {String(value['ABS'])}</span>
          </Row>
          <Row>
            <span className="font-weight-bold">Fired Airbag</span>
            <span>: {String(value['airbag'])}</span>
          </Row>
          <Row>
            <span className="font-weight-bold">Passengers</span>
            <span>: {value['n_people']} </span>
          </Row>
          <Row>
            <span className="font-weight-bold">Overturned</span>
            <span>: {String(value['overturned'])}</span>
          </Row>
          <Row>
            <span className="font-weight-bold">Temperature</span>
            <span>: {value['temperature']}</span>
          </Row>
          <Row>
            <span className="font-weight-bold">Collision velocity</span>
            <span>: {value['velocity']}</span>
          </Row>
        </CardBody>
      </CardBody>
    )
  }

  _onImageClick(event) {
    console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
  }

  _onImageLoad(event) {
    console.debug('loaded image', event.target.src);
  }

  _onSlide(index) {
    this._resetVideo();
    console.debug('slid to index', index);
  }

  _onPause(index) {
    console.debug('paused on index', index);
  }

  _onScreenChange(fullScreenElement) {
    console.debug('isFullScreen?', !!fullScreenElement);
  }

  _onPlay(index) {
    console.debug('playing from index', index);
  }

  _getStaticImages(id){
    let images = [];
    for (let i = 0; i < parseInt(this.numImg); i++) {
      images.push({
        original: `/media/${id}/photos/${i}.jpeg`,
        thumbnail: `${PREFIX_URL}image_set_thumb.jpg`
      });
    }

    return images;
  }

  _resetVideo() {
    this.setState({showVideo: {}});

    if (this.state.showPlayButton) {
      this.setState({showGalleryPlayButton: true});
    }

    if (this.state.showFullscreenButton) {
      this.setState({showGalleryFullscreenButton: true});
    }
  }

  _toggleShowVideo(url) {
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
    this.setState({
      showVideo: this.state.showVideo
    });

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({showGalleryPlayButton: false});
      }

      if (this.state.showFullscreenButton) {
        this.setState({showGalleryFullscreenButton: false});
      }
    }
  }

  _renderVideo(item) {
    return (
      <div>
        {
          this.state.showVideo[item.source] ?
            <div className='video-wrapper'>
                <a
                  className='close-video'
                  onClick={this._toggleShowVideo.bind(this, item.source)}
                >
                </a>
                <video autoPlay controls>
                  // width='100%'
                  // height='100%'
                  <source 
                  src={item.source}
                  type="video/mp4">

                  </source>
                  // frameBorder='0'
                  // allowFullScreen
                >
                </video>
            </div>
          :
            <a onClick={this._toggleShowVideo.bind(this, item.source)}>
              <div className='play-button'/>
              <img className='image-gallery-image' src={item.original} />
              {
                item.description &&
                  <span
                    className='image-gallery-description'
                    style={{right: '0', left: 'initial', height:'100%'}}
                  >
                    {item.description}
                  </span>
              }
            </a>
        }
      </div>
    );
  }

  onGoBack = () => {
      return <Redirect to="/admin/accidents"/>
  }

  /* Status dropdown functions */
  toggle() {
    this.setState({dropDownOpen: !this.state.dropDownOpen});
  }

  changeValue(e) {
    this.setState({dropDownValue: e.currentTarget.textContent})
  }

  setStatusColor() {
    if(this.state.dropDownValue === "Accident resolved"){
      return(
        <Badge color="" className="badge-dot badge-lg">
          <i className="bg-lime" />
        </Badge>
      )
    }
    if(this.state.dropDownValue === "Emergency services are on their way"){
      return(
        <Badge color="" className="badge-dot badge-lg">
          <i className="bg-yellow" />
        </Badge>
      )
    }
    else {
       return(
        <Badge color="" className="badge-dot badge-lg">
          <i className="bg-red" />
        </Badge>
      )
    }
  }

  updateDBToSelectedStatus(id) {
    if(this.state.dropDownValue === "Accident resolved"){
      fetch(`/set_accident_status/${id}`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "status": 2
        })
      })
    }
    if(this.state.dropDownValue === "Emergency services are on their way"){
      fetch(`/set_accident_status/${id}`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "status": 1
        })
      })
    }
    else {
      fetch(`/set_accident_status/${id}`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "status": 0
        })
      })
    }
  }

  render() {
    return (
      <>
        <Header />
        <Container className=" mt--7" fluid>
          <Row>
            <Col className=" col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <Row>
                    <Col>
                      <div className="d-flex">
                        <Button
                          className="icon icon-shape bg-info text-white rounded-circle shadow"
                          href="/#admin/accidents"
                          onClick= {this.onGoBack()}
                        >
                          <i className="fas fa-angle-left"/>
                        </Button>
                        <h2 className=" mt-2 ml-4 ">Accident Details</h2>
                      </div>
                    </Col>
                    <Col>
                      <div className="row justify-content-end">
                        <div className="mr-2">
                          {this.setStatusColor()}
                        </div>
                        <div className="mr-2 ">
                          <ButtonDropdown className="dropdown-width" isOpen={this.state.dropDownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                              {this.state.dropDownValue}
                            </DropdownToggle>
                            <DropdownMenu right>
                              <DropdownItem onClick={this.changeValue}>Accident still not answered</DropdownItem>
                              <DropdownItem onClick={this.changeValue}>Emergency services are on their way</DropdownItem>
                              <DropdownItem onClick={this.changeValue}>Accident resolved</DropdownItem>
                            </DropdownMenu>
                          </ButtonDropdown>
                          {this.updateDBToSelectedStatus(this.props.match.params['id'])}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row className="h-75 ">
                    <Col>
                      <Maps
                        Location={this.state.accident_data.location.coords}
                        markers = {[this.state.accident_data.location.coords]}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4aWR3SBGaa1oB0CuDf2vptnJfSMSguZU"
                        loadingElement={<div style={{ height: `100%` }} />}
                        center = {this.state.accident_data.location.coords}
                        zoom = {17}

                        containerElement={
                          <div
                            className="map-canvas"
                            id="map-canvas"
                          />
                        }
                        mapElement={
                          <div style={{ height: `85%`, borderRadius: "inherit" }} />
                        }

                      />

                      <Row>
                        <div className="col">
                          <p><strong>Address:</strong> {this.state.accident_data.location.address}</p>
                        </div>
                      </Row>
                      <Row>
                        <div className="col-sm">
                          <p><strong>Lat:</strong> {this.state.accident_data.location.coords.lat}</p>
                        </div>
                        <div className="col-sm">
                          <p><strong>Lng:</strong> {this.state.accident_data.location.coords.lng}</p>
                        </div>
                      </Row>
                    </Col>
                    <Col>
                      <CardBody>
                        <ImageGallery
                          ref={i => this._imageGallery = i}
                          items={this.images}
                          lazyLoad={false}
                          onClick={this._onImageClick.bind(this)}
                          onImageLoad={this._onImageLoad}
                          onSlide={this._onSlide.bind(this)}
                          onPause={this._onPause.bind(this)}
                          onScreenChange={this._onScreenChange.bind(this)}
                          onPlay={this._onPlay.bind(this)}
                          infinite={this.state.infinite}
                          showBullets={this.state.showBullets}
                          showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
                          showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
                          showThumbnails={this.state.showThumbnails}
                          showIndex={this.state.showIndex}
                          showNav={this.state.showNav}
                          isRTL={this.state.isRTL}
                          thumbnailPosition={this.state.thumbnailPosition}
                          slideDuration={parseInt(this.state.slideDuration)}
                          slideInterval={parseInt(this.state.slideInterval)}
                          slideOnThumbnailOver={this.state.slideOnThumbnailOver}
                          additionalClass="app-image-gallery"
                        />
                      </CardBody>
                    </Col>
                  </Row>
                  <CardHeader>
                    <h3> MORE DETAILS... </h3>
                  </CardHeader>
					<Row>
                     <Col lg="6" xl="3">
                        <Card className="card-stats mb-4 mb-xl-0">
                          <CardBody className="border rounded border-info">
                              <Row>
                                <div className="col">
                                  <CardTitle
                                    tag="h5"
                                    className="text-uppercase text-muted mb-0"
                                  >
                                    Number of cars involved
                                  </CardTitle>
                                  <span className="h2 font-weight-bold mb-0">{this.state.accident_data.n_cars_involved}</span>
                                </div>
                                  <Col className="col-auto">
                                    <Button className="icon icon-shape bg-success text-dark rounded-circle shadow" id="toggler">
                                      <i className="fas fa-car"/>
                                    </Button>
                                  </Col>
                              </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg="6" xl="3">
                        <Card className="card-stats mb-4 mb-xl-0">
                          <CardBody className="border rounded border-info">

                              <Row>
                                <div className="col">
                                  <CardTitle
                                    tag="h5"
                                    className="text-uppercase text-muted mb-0"
                                  >
                                    Number of persons involved
                                  </CardTitle>
                                  <span className="h2 font-weight-bold mb-0">
                                    {this.state.accident_data.n_people_involved}
                                  </span>
                                </div>
                                <Col className="col-auto">
                                  <div className="icon icon-shape bg-info text-dark rounded-circle shadow">
                                    <i className="fas fa-users"/>
                                  </div>
                                </Col>
                              </Row>

                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg="6" xl="3">
                        <Card className="card-stats mb-4 mb-xl-0">
                          <CardBody className="border rounded border-info">
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  Number of persons injured
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0">
                                  {this.state.accident_data.n_people_injured}
                                </span>
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-danger text-dark rounded-circle shadow">
                                  <i className="fas fa-user-injured"/>
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg="6" xl="3">
                        <Card className="card-stats mb-4 mb-xl-0">
                          <CardBody className="border rounded border-info">
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  Severity of the accident
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0 text-success">
                                  {this.state.accident_data.damage}
                                </span>
                              </div>
                              <Col className="col-auto">
                                <div className="icon icon-shape bg-yellow text-dark rounded-circle shadow">
                                  <i className="fas fa-exclamation-triangle"/>
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <UncontrolledCollapse toggler="#toggler">
                      <Card>
                        <CardBody>
                          <Row>
                            {this.state.accident_data["car"].map(this.renderCars)}
                          </Row>
                        </CardBody>
                      </Card>
                    </UncontrolledCollapse>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default AccidentDetails;

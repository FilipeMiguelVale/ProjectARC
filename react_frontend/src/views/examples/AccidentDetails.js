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
  UncontrolledCollapse
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";

const PREFIX_URL = 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';

class AccidentDetails extends React.Component {
  constructor() {
    super();
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
    };

    this.images = [
      {
        thumbnail: `${PREFIX_URL}4v.jpg`,
        original: `${PREFIX_URL}4v.jpg`,
        embedUrl: 'https://www.youtube.com/embed/4pSzhZ76GdM?autoplay=1&showinfo=0',
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
    ].concat(this._getStaticImages());
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.slideInterval !== prevState.slideInterval ||
        this.state.slideDuration !== prevState.slideDuration) {
      // refresh setInterval
      this._imageGallery.pause();
      this._imageGallery.play();
    }
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

  _handleInputChange(state, event) {
    this.setState({[state]: event.target.value});
  }

  _handleCheckboxChange(state, event) {
    this.setState({[state]: event.target.checked});
  }

  _handleThumbnailPositionChange(event) {
    this.setState({thumbnailPosition: event.target.value});
  }

  _getStaticImages() {
    let images = [];
    for (let i = 2; i < 12; i++) {
      images.push({
        original: `${PREFIX_URL}${i}.jpg`,
        thumbnail:`${PREFIX_URL}${i}t.jpg`
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
          this.state.showVideo[item.embedUrl] ?
            <div className='video-wrapper'>
                <a
                  className='close-video'
                  onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
                >
                </a>
                <iframe
                  width='560'
                  height='315'
                  src={item.embedUrl}
                  frameBorder='0'
                  allowFullScreen
                >
                </iframe>
            </div>
          :
            <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
              <div className='play-button'/>
              <img className='image-gallery-image' src={item.original} />
              {
                item.description &&
                  <span
                    className='image-gallery-description'
                    style={{right: '0', left: 'initial'}}
                  >
                    {item.description}
                  </span>
              }
            </a>
        }
      </div>
    );
  }
  render() {
    return (
      <>
        <Header />

        <Container className=" mt--7" fluid>
          <Row>
            <div className=" col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h2 className=" mb-0">Accident Details</h2>
                </CardHeader>
                <CardBody>
                    <Row>
                      <div className="col-lg-6">
                        <CardBody>
                          <Row>
                            <h1> INSERT MAP HERE </h1>
                          </Row>
                          <Row>
                            <div className="col">
                              <p>Address: Tigouga</p>
                            </div>
                          </Row>
                          <Row>
                            <div className="col-sm">
                              <p>Lat: 30.86</p>
                            </div>
                            <div className="col-sm">
                              <p>Lng: -8.62</p>
                            </div>
                          </Row>
                        </CardBody>
                      </div>
                      <div className="col-lg-6">
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
                      </div>
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
                                    Nº of cars involved
                                  </CardTitle>
                                  <span className="h2 font-weight-bold mb-0">1</span>
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
                                    Nº of persons involved
                                  </CardTitle>
                                  <span className="h2 font-weight-bold mb-0">2</span>
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
                                  Nº of persons injured
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0">0</span>
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
                                <span className="h2 font-weight-bold mb-0 text-success">NOT VERY SERIOUS</span>
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
                            <div className="col-lg-3">
                              <CardBody className="border rounded">
                                <CardTitle
                                  tag="h4"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  Car 1
                                </CardTitle>
                                <CardBody className="align-content-center">
                                  <Row>
                                    <span className="font-weight-bold">Activated ABS:</span>
                                    <span>True</span>
                                  </Row>
                                  <Row>
                                    <span className="font-weight-bold">Fired Airbag</span>
                                    <span>: False</span>
                                  </Row>
                                  <Row>
                                    <span className="font-weight-bold">Passengers</span>
                                    <span>: 2</span>
                                  </Row>
                                  <Row>
                                    <span className="font-weight-bold">Overturned</span>
                                    <span>: False</span>
                                  </Row>
                                  <Row>
                                    <span className="font-weight-bold">Temperature</span>
                                    <span>: 35.0</span>
                                  </Row>
                                  <Row>
                                    <span className="font-weight-bold">Collision velocity</span>
                                    <span>: 30.0</span>
                                  </Row>
                                </CardBody>
                              </CardBody>
                            </div>
                          </Row>
                        </CardBody>
                      </Card>
                    </UncontrolledCollapse>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default AccidentDetails;

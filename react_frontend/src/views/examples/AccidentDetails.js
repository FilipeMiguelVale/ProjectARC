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
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";
/*
var gallery = document.querySelector('.gallery');
var galleryItems = document.querySelectorAll('.gallery-item');
var itemWidth = 23; // percent: as set in css

var featured = document.querySelector('.featured-item');

var leftBtn = document.querySelector('.move-btn.left');
var rightBtn = document.querySelector('.move-btn.right');
var leftInterval;
var rightInterval;

var scrollRate = 0.2;
var left;

function selectItem(e) {
	if (e.target.classList.contains('active')) return;

	featured.style.backgroundImage = e.target.style.backgroundImage;

	for (var i = 0; i < galleryItems.length; i++) {
		if (galleryItems[i].classList.contains('active'))
			galleryItems[i].classList.remove('active');
	}

	e.target.classList.add('active');
}

function galleryWrapLeft() {
	var first = gallery.children[0];
	gallery.removeChild(first);
	gallery.style.left = -itemWidth + '%';
	gallery.appendChild(first);
	gallery.style.left = '0%';
}

function galleryWrapRight() {
	var last = gallery.children[gallery.children.length - 1];
	gallery.removeChild(last);
	gallery.insertBefore(last, gallery.children[0]);
	gallery.style.left = '-23%';
}

function moveLeft() {
	left = left || 0;

	leftInterval = setInterval(function() {
		gallery.style.left = left + '%';

		if (left > -itemWidth) {
			left -= scrollRate;
		} else {
			left = 0;
			galleryWrapLeft();
		}
	}, 1);
}

function moveRight() {
	//Make sure there is element to the leftd
	if (left > -itemWidth && left < 0) {
		left = left  - itemWidth;

		var last = gallery.children[gallery.children.length - 1];
		gallery.removeChild(last);
		gallery.style.left = left + '%';
		gallery.insertBefore(last, gallery.children[0]);
	}

	left = left || 0;

	leftInterval = setInterval(function() {
		gallery.style.left = left + '%';

		if (left < 0) {
			left += scrollRate;
		} else {
			left = -itemWidth;
			galleryWrapRight();
		}
	}, 1);
}

function stopMovement() {
	clearInterval(leftInterval);
	clearInterval(rightInterval);
}

if(leftBtn){
    leftBtn.addEventListener("mouseenter", moveLeft);
    leftBtn.addEventListener("mouseleave", stopMovement);
}
if(rightBtn){
    rightBtn.addEventListener("mouseenter", moveRight);
    rightBtn.addEventListener("mouseleave", stopMovement);
}



//Start this baby up
(function init() {
	var images = [
		'https://s3-us-west-2.amazonaws.com/forconcepting/800Wide50Quality/car.jpg',
		'https://s3-us-west-2.amazonaws.com/forconcepting/800Wide50Quality/city.jpg',
		'https://s3-us-west-2.amazonaws.com/forconcepting/800Wide50Quality/deer.jpg',
		'https://s3-us-west-2.amazonaws.com/forconcepting/800Wide50Quality/flowers.jpg',
		'https://s3-us-west-2.amazonaws.com/forconcepting/800Wide50Quality/food.jpg',
		'https://s3-us-west-2.amazonaws.com/forconcepting/800Wide50Quality/guy.jpg',
		'https://s3-us-west-2.amazonaws.com/forconcepting/800Wide50Quality/landscape.jpg',
		'https://s3-us-west-2.amazonaws.com/forconcepting/800Wide50Quality/lips.jpg',
		'https://s3-us-west-2.amazonaws.com/forconcepting/800Wide50Quality/night.jpg',
		'https://s3-us-west-2.amazonaws.com/forconcepting/800Wide50Quality/table.jpg'
	];

	//Set Initial Featured Image
    featured.style.backgroundImage = 'url(' + images[0] + ')';

	//Set Images for Gallery and Add Event Listeners
	for (var i = 0; i < galleryItems.length; i++) {
		galleryItems[i].style.backgroundImage = 'url(' + images[i] + ')';
		galleryItems[i].addEventListener('click', selectItem);
	}
})();
*/
class AccidentDetails extends React.Component {
 /*
  componentDidUpdate(): void {
    selectItem();
    galleryWrapLeft();
    galleryWrapRight();
    moveLeft();
    moveRight();
    stopMovement();
  }
 */
  render() {
    return (
      <>
        <Header />

        <Container className=" mt--7" fluid>
          <Row>
            <div className=" col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Accident Details</h3>
                </CardHeader>
                <CardBody>
					{/*
                      <div className="feature">
                        <figure className="featured-item image-holder r-3-2 transition"/>
                      </div>
                      <div className="gallery-wrapper">
                        <div className="gallery">
                          <div className="item-wrapper">
                            <figure className="gallery-item image-holder r-3-2 active transition"/>
                          </div>
                          <div className="item-wrapper">
                            <figure className="gallery-item image-holder r-3-2 transition"/>
                          </div>
                          <div className="item-wrapper">
                            <figure className="gallery-item image-holder r-3-2 transition"/>
                          </div>
                          <div className="item-wrapper">
                            <figure className="gallery-item image-holder r-3-2 transition"/>
                          </div>
                          <div className="item-wrapper">
                            <figure className="gallery-item image-holder r-3-2"/>
                          </div>
                          <div className="item-wrapper">
                            <figure className="gallery-item image-holder r-3-2 transition"/>
                          </div>
                          <div className="item-wrapper">
                            <figure className="gallery-item image-holder r-3-2 transition"/>
                          </div>
                          <div className="item-wrapper">
                            <figure className="gallery-item image-holder r-3-2 transition"/>
                          </div>
                          <div className="item-wrapper">
                            <figure className="gallery-item image-holder r-3-2 transition"/>
                          </div>
                          <div className="item-wrapper">
                            <figure className="gallery-item image-holder r-3-2 transition"/>
                          </div>
                        </div>
                      </div>

                      <div className="controls">
                        <button className="move-btn left">&larr;</button>
                        <button className="move-btn right">&rarr;</button>
                    </div>
                    */}
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

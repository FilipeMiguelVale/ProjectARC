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
import {Redirect} from "react-router-dom";
import "../../assets/css/custom.css"

// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    Media,
    Table,
    Container,
    Row,
    Button, Col, Progress,
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";
import Maps from "./Maps_Component.js"


function fix_date(st) {
  let date = st.split('T');
  let year = date[0];
  let time  = date[1].split('.')[0];
  return [year,time];
}

class Tables extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      table_data : [],
      table_buttons:[],
      table_page:1
    }
  }

  redirect_to_details = (index) => {
    return <Redirect to={`/admin/accident_details/${index}`}/>
  }

  getData = async (id) => {
    const response = await fetch(
        `/range_accidents/${id}`
    );

    const result = await response.json();
    this.setState(
      prevState => (
        {
          table_data : result
        }
      )
    );
  }

  /* Sets status colors
  *     0 -> red (this accident was not answered yet)
  *     1 -> yellow (emergency services are on their way)
  *     2 -> green (accident resolved)
  */
  setStatus = (value) => {
      if (value === 2) {
          return (
              <Badge color="" className="badge-dot badge-lg">
                <i id="bg-lime" className="bg-lime" />
              </Badge>
          )
      }
      else if (value === 1){
          return (
              <Badge color="" className="badge-dot badge-lg">
                <i className="bg-yellow" />
              </Badge>
          )
      }
      else {
          return (
              <Badge color="" className="badge-dot badge-lg">
                <i className="bg-red" />
              </Badge>
          )
      }
  }

  renderArray = (value,index) => {
    return(
      <tr key={index} >
        <th scope="row">
          <span className="mb-0 text-sm">
            {fix_date(value["date"])[0]}<br/>{fix_date(value["date"])[1]}
          </span>
        </th>
        <th scope="row" width="5%">
          <span className="mb-0 text-sm">
            {value["location"]["address"]}
          </span>
        </th>
        <th scope = "row" style={{textAlign:"center"}}>
          <span className="mb-0 text-sm">
            {value["n_cars_involved"]}
          </span>
        </th>
        <th scope = "row" style={{textAlign:"center"}}>
          <span className="mb-0 text-sm">
            {value["n_people"]}
          </span>
        </th>
        <th scope = "row" style={{textAlign:"center"}}>
          <span className="mb-0 text-sm">
            {value["n_people_injured"]}
          </span>
        </th>
       <th scope = "row" style={{textAlign:"center"}}>
           <span className="mr-2">{value["damage"]}</span>
           <div>
               <Progress
                  max="100"
                  value={value["damage"]}
                  barClassName="bg-gradient-severity"
                />
            </div>
        </th>
        <th scope = "row" style={{textAlign:"center"}}>
            {this.setStatus(value["status"])}
        </th>
        <th scope = "row" style={{textAlign:"center"}}>
            <Button
                className="icon icon-shape bg-transparent border-default text-white rounded-circle"
                href={`/#admin/accident_details/${value["id"]}`}
                onClick={this.redirect_to_details.bind(this,value['id'])}
            >
              <i className="fas fa-ellipsis-h"/>
            </Button>
        </th>
      </tr>
    )
  }



  componentDidMount() {
    this.getData(1);
  }

  handleClick = (e,id) => {
    e.preventDefault();
    console.log(e);
    this.state.table_page=id
    this.getData(id);
  };

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Dark table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="bg-default shadow">
                  <CardHeader className="bg-transparent border-0">
                    <Row >
                      <Col>
                          <div className="row ml">
                          <h1 className="text-white mb-0" style={{ paddingLeft: 20}} >Accidents</h1>
                              </div>
                      </Col>
                      <Col >
                          <div className="row justify-content-center">
                          <nav aria-label="Page navigation example">
                              <ul className="pagination">
                                  <li className="page-item"><a className="page-link" onClick={(e)=>this.handleClick(e,this.state.table_page-1)}><i
                                      className="fas fa-angle-left"></i></a></li>
                                  <li className="page-item"><a className="page-link" onClick={(e)=>this.handleClick(e,1)}>1</a></li>
                                  <li className="page-item"><a className="page-link" onClick={(e)=>this.handleClick(e,2)} >2</a></li>
                                  <li className="page-item"><a className="page-link" onClick={(e)=>this.handleClick(e,3)}>3</a></li>
                                  <li className="page-item"><a className="page-link" onClick={(e)=>this.handleClick(e,this.state.table_page+1)}><i
                                      className="fas fa-angle-right"></i></a></li>
                              </ul>
                          </nav>
                          </div>
                      </Col>
                      <Col>
                          <div className="row justify-content-end">
                          <div className="dropdown" align="left">
                              <button className="btn btn-secondary dropdown-toggle" type="button"
                                      id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                      aria-expanded="false">
                                  Sort by
                              </button>
                              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                  <a className="dropdown-item" href="#">Date/Hour</a>
                                  <a className="dropdown-item" href="#">Nº cars</a>
                                  <a className="dropdown-item" href="#">Nº people</a>
                                  <a className="dropdown-item" href="#">Nº injured</a>
                                  <a className="dropdown-item" href="#">Severity</a>
                                  <a className="dropdown-item" href="#">Status</a>
                              </div>
                          </div>
                          </div>
                      </Col>
                    </Row>
                  </CardHeader>
                <Table bordered
                  className="align-items-center table-dark table-responsive"
                  hover
                >
                  <thead className="thead-dark">
                    <tr >
                      <th scope="col-lg-3 " style={{textAlign:"center"}}>
                       <div align="center" className="icon icon-shape bg-transparent text-white rounded-circle">
                           <i className="fas fa-calendar-alt"/>
                       </div>
                      <div >
                           <span className="ml-1">Date/Hour</span>
                      </div>

                      </th>
                      <th scope="col-lg-3"  style={{textAlign:"center"}}>
                       <div  className="icon icon-shape bg-transparent text-white rounded-circle" >
                           <i  className="fas fa-map-marked-alt"/>
                       </div>
                       <div >
                           <span className="ml-1">Location</span>
                       </div>
                      </th>
                      <th scope="col" style={{textAlign:"center"}}>
                       <div className="icon icon-shape bg-transparent text-white rounded-circle">
                           <i className="fas fa-car"/>
                       </div>
                          <div>
                           <span className="ml-1">Nº cars</span>
                       </div>

                      </th>
                      <th scope="col" style={{textAlign:"center"}}>
                       <div className="icon icon-shape bg-transparent text-white rounded-circle">
                           <i className="fas fa-users"/>
                       </div>
                      <div>
                           <span className="ml-1">Nº people</span>
                       </div>
                      </th>
                      <th scope="col" style={{textAlign:"center"}}>
                        <div className="icon icon-shape bg-transparent text-white rounded-circle">
                           <i className="fas fa-user-injured"/>
                       </div>
                      <div>
                       <span className="ml-1">Nºinjured</span>
                      </div>
                      </th>
                      <th scope="col"style={{textAlign:"center"}}>
                       <div className="icon icon-shape bg-transparent text-white rounded-circle">
                           <i className="fas fa-exclamation-triangle"/>
                       </div>
                      <div>
                       <span className="ml-1">Severity</span>
                      </div>
                      </th>
                      <th scope="col"style={{textAlign:"center"}}>
                       <div className="icon icon-shape bg-transparent text-white rounded-circle">
                           <i className="fas fa-flag"/>
                       </div>
                      <div>
                       <span className="ml-1">Status</span>
                      </div>
                      </th>
                      <th scope="col" style={{textAlign:"center"}}   />

                    </tr>
                  </thead>
                  <tbody>
                    {this.state["table_data"].map(this.renderArray)}
                  </tbody>
                </Table>
                <CardHeader className="bg-transparent border-0">
                    <Row >
                      <Col>
                          <div className="row ml">
                          <h1 className="text-white mb-0" style={{ paddingLeft: 20}} ></h1>
                              </div>
                      </Col>
                      <Col >
                          <div className="row justify-content-center">
                          <nav aria-label="Page navigation example">
                              <ul className="pagination">
                                  <li className="page-item"><a className="page-link" href="#"><i
                                      className="fas fa-angle-left"></i></a></li>
                                  <li className="page-item"><a className="page-link" href="#">1</a></li>
                                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                                  <li className="page-item"><a className="page-link" href="#"><i
                                      className="fas fa-angle-right"></i></a></li>
                              </ul>
                          </nav>
                          </div>
                      </Col>
                      <Col>
                          <div className="row justify-content-end">
                          <div className="dropdown" align="left">
                              <button className="btn btn-secondary dropdown-toggle" type="button"
                                      id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                      aria-expanded="false">
                                  Sort by
                              </button>
                              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                  <a className="dropdown-item" href="#">Date/Hour</a>
                                  <a className="dropdown-item" href="#">Nº cars</a>
                                  <a className="dropdown-item" href="#">Nº people</a>
                                  <a className="dropdown-item" href="#">Nº injured</a>
                                  <a className="dropdown-item" href="#">Severity</a>
                                  <a className="dropdown-item" href="#">Status</a>
                              </div>
                          </div>
                          </div>
                      </Col>
                    </Row>
                  </CardHeader>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;

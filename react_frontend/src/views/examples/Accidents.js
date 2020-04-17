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
import {Link, Redirect} from "react-router-dom";

// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    Media,
    Table,
    Container,
    Row,
    Button, Col,
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";
import Maps from "./Maps_Component.js"


function fix_date(st) {
  let date = st.split('T');
  let year = date[0];
  let time  = date[1].split('.')[0];
  return year + " " + time;
}

class Tables extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      table_data : []
    }
  }

  redirect_to_details = (index) => {
    return <Redirect to={`/admin/accident_details/${index}`}/>
  }

  getData = async () => {
    const response = await fetch(
      '/list_accidents'
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

  renderArray = (value,index) => {
    return(
      <tr key={index} >
        <th scope="row">
          <Media className="align-items-center">
            <Media>
              <span className="mb-0 text-sm">
                {fix_date(value["date"])}
              </span>
            </Media>
          </Media>
        </th>
        <th scope="row" width="5%">
          <Media className="align-items-center">
            <Media>
              <span className="mb-0 text-sm">
                {value["location"]["address"]}
              </span>
            </Media>
          </Media>
        </th>
        <th scope = "row">
          <Media className="align-items-center">
            <Media>
              <span className="mb-0 text-sm">
                {value["n_cars_involved"]}
              </span>
            </Media>
          </Media>
        </th>
        <th scope = "row">
          <Media className="align-items-center">
            <Media>
              <span className="mb-0 text-sm">
                {value["n_people"]}
              </span>
            </Media>
          </Media>
        </th>
        <th scope = "row">
          <Media className="align-items-center">
            <Media>
              <span className="mb-0 text-sm">
                {value["n_people_injured"]}
              </span>
            </Media>
          </Media>
        </th>
        <td>
          <Badge color="" className="badge-dot mr-4">
            <i className="bg-warning" />
            {value["damage"]}
          </Badge>
        </td>
        <Button  href={`/#admin/accident_details/${value["id"]}`} onClick={this.redirect_to_details.bind(this,value['id'])}>
          DETAILS
        </Button>
      </tr>
    )
  }

  componentDidMount() {
    this.getData();
  }

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
                  <h3 className="text-white mb-0">Accidents</h3>
                </CardHeader>
                <Table bordered
                  className="align-items-center table-dark table-responsive"
                  hover
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col-lg-3">
                       <div className="icon icon-shape bg-transparent text-white rounded-circle">
                           <i className="fas fa-calendar-alt"/>
                       </div>
                       <span className="ml-1">Date/Hour</span>
                      </th>
                      <th scope="col">
                       <div className="icon icon-shape bg-transparent text-white rounded-circle">
                           <i className="fas fa-map-marked-alt"/>
                       </div>
                       <span className="ml-1">Location</span>
                      </th>
                      <th scope="col">
                       <div className="icon icon-shape bg-transparent text-white rounded-circle">
                           <i className="fas fa-car"/>
                       </div>
                       <span className="ml-1">Number of cars</span>
                      </th>
                      <th scope="col">
                       <div className="icon icon-shape bg-transparent text-white rounded-circle">
                           <i className="fas fa-users"/>
                       </div>
                       <span className="ml-1">Number of persons</span>
                      </th>
                      <th scope="col">
                        <div className="icon icon-shape bg-transparent text-white rounded-circle">
                           <i className="fas fa-user-injured"/>
                       </div>
                       <span className="ml-1">Number of injured</span>
                      </th>
                      <th scope="col">
                       <div className="icon icon-shape bg-transparent text-white rounded-circle">
                           <i className="fas fa-exclamation-triangle"/>
                       </div>
                       <span className="ml-1">Severity</span>

                      </th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state["table_data"].reverse().map(this.renderArray)}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;

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
    Button, Col, Progress, DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown,
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

class Accidents extends React.Component {

  constructor(props) {
    super(props);
    this.toggle2 = this.toggle2.bind(this);
    this.changeValue2 = this.changeValue2.bind(this);

    this.state = {
      table_data : [],
      table_buttons:[],
      curent_page:1,
      num_accidents:0,
      num_to_show:10,
      dropDownValue: "Sort by",
      dropdownIndex:"between",
      dropDownOpen: false
    }
  }

  redirect_to_details = (index) => {
    return <Redirect to={`/admin/accident_details/${index}`}/>
  }

  getData = async (id) => {
     const response = await fetch(
        `/num_accidents`
    );

    const result = await response.json();
    this.setState(
      prevState => (
        {
          num_accidents : result
        }
      )
    );
    const response1 = await fetch(
        `/range_accidents?id=${id}&filter=${this.state.dropdownIndex}`
    );

    const result1 = await response1.json();
    this.setState(
      prevState => (
        {
          table_data : result1
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
                <i className="bg-lime" />
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
  getBarColor(damage){
      if(damage<30){return"bg-gradient-success"
      }else if(damage < 45){return"bg-gradient-info"
      }else if(damage < 75){return"bg-gradient-warning"
      }else{return"bg-gradient-danger"}
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
                  barClassName={this.getBarColor(value["damage"])}
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

  renderButtons(){

     if(this.state.num_accidents > this.state.num_to_show){
      const Buttons = []
      if(this.state.curent_page >1)
        Buttons.push(<li className="page-item"><a className="page-link" onClick={(e)=>this.handleClick(e,this.state.curent_page-1)}><i
                       className="fas fa-angle-left"></i></a></li>)
      for (let i = 1; i < Math.ceil(this.state.num_accidents/this.state.num_to_show)+1; i++) {
        if(i==this.state.curent_page){
          Buttons.push(<li className="page-item active"><a className="page-link" onClick={(e)=>this.handleClick(e,`${i}`)}>{i}</a></li>)
        }
        else{
          Buttons.push(<li className="page-item"><a className="page-link" onClick={(e)=>this.handleClick(e,`${i}`)}>{i}</a></li>)
        }
      }
      if(this.state.curent_page < Math.ceil(this.state.num_accidents/this.state.num_to_show) )
        Buttons.push(<li className="page-item"><a className="page-link" onClick={(e)=>this.handleClick(e,parseInt(this.state.curent_page)+1)}><i
                       className="fas fa-angle-right"></i></a></li>)

      return(
              <div className="row justify-content-center">
                 <nav aria-label="Page navigation example">
                     <ul className="pagination">
                        {Buttons}
                     </ul>
                 </nav>
              </div>
      )}
      else{
          return
      }
  }

  componentDidMount() {
    this.getData(1);
  }

  handleClick = (e,id) => {
    console.log(id)
    e.preventDefault();
    this.state.curent_page=id
    this.getData(id);
  };

 /* DropDown functions */
  toggle2() {
    this.setState({dropDownOpen: !this.state.dropDownOpen});
  }

  changeValue2(e,id) {

      const a = ["","between","cars","people","injured","severity","status"]
      console.log(a[id])
      this.setState({dropDownValue: e.currentTarget.textContent,dropdownIndex:`${a[id]}`})
      this.getSortData(id)
  }
  getSortData = async (id) => {
     const response = await fetch(
        `/num_accidents`
    );

    const result = await response.json();
    this.setState(
      prevState => (
        {
          num_accidents : result
        }
      )
    );
    const response1=[];
    if(id==1) {
        const response1 = await fetch(
            `/range_accidents?id=${this.state.curent_page}&filter=between`
        );
    }else if(id ==2){
        const response1 = await fetch(
            `/range_accidents?id=${this.state.curent_page}&filter=cars`
        );
    }else if(id ==3){
        const response1 = await fetch(
            `/range_accidents?id=${this.state.curent_page}&filter=people`
        );
    }else if(id ==4){
        const response1 = await fetch(
            `/range_accidents?id=${this.state.curent_page}&filter=injured`
        );
    }else if(id ==5){
        const response1 = await fetch(
            `/range_accidents?id=${this.state.curent_page}&filter=severity`
        );
    }else {
        const response1 = await fetch(
            `/range_accidents?id=${this.state.curent_page}&filter=status`
        )}
    const result1 = await response1.json();
    this.setState(
      prevState => (
        {
          table_data : result1
        }
      )
    );
  }

  /**************************/

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
                      {this.renderButtons()}
                    </Col>
                    <Col>
                      <div className="row justify-content-end">
                        <ButtonDropdown isOpen={this.state.dropDownOpen} toggle={this.toggle2}>
                          <DropdownToggle caret>
                            {this.state.dropDownValue}
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem onClick={(e)=>this.changeValue2(e,1)}>Date/Hour</DropdownItem>
                            <DropdownItem onClick={(e)=>this.changeValue2(e,2)}>Nº cars</DropdownItem>
                            <DropdownItem onClick={(e)=>this.changeValue2(e,3)}>Nº people</DropdownItem>
                            <DropdownItem onClick={(e)=>this.changeValue2(e,4)}>Nº injured</DropdownItem>
                            <DropdownItem onClick={(e)=>this.changeValue2(e,5)}>Severity</DropdownItem>
                            <DropdownItem onClick={(e)=>this.changeValue2(e,6)}>Status</DropdownItem>
                          </DropdownMenu>
                        </ButtonDropdown>
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
                    <Col className="row justify-content-center">
                      {this.renderButtons()}
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

export default Accidents;

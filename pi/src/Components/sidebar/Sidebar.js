
import React,{useState} from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import Cat from '../../images/cat.png';
import {Avatar, Image, Typography} from 'antd'
import { SidebarContainer } from './SideStyles'
const Sidebar = () =>{
 
  const { Title } = Typography;

    return (
      <SidebarContainer >
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel">Find Friends</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body px-3">
            <Row>
                  <input type="text" className="w-100 p-2" placeholder="Search for friends"></input>
            </Row>
            <Row className="my-2 friend">
              <Col lg={3} xl={2}><Avatar shape="square" src={Cat} alt="" size={54}/></Col>
              <Col  className="d-flex justify-content-center align-items-center"><Title level={3}>Raven</Title></Col>
            </Row>
            
          </div>
        </div>
      </SidebarContainer>
    );
  
}
export default Sidebar;
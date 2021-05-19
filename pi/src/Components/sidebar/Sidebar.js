
import React,{useState} from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import Cat from '../../images/cat.png';
import {Avatar, Image, Typography} from 'antd'
import { SidebarContainer } from './SideStyles'
const Sidebar = () =>{
 
  const { Title } = Typography;

    return (
      <SidebarContainer >
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Find Friends</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <Row>
              <Form>
                <Form.Group>
                  <Form.Control type="text" placeholder="Search for friends"></Form.Control>
                </Form.Group>
              </Form>
            </Row>
            <Row className="my-2">
              <Col lg={3} xl={2}><Avatar src={Cat} alt="" size={54}/></Col>
              <Col  className="d-flex justify-content-center align-items-center"><Title level={3}>Raven</Title></Col>
            </Row>
            
          </div>
        </div>
      </SidebarContainer>
    );
  
}
export default Sidebar;
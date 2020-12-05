import React from "react";
import "./details.css";
import { Drawer, Divider, Col, Row, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import * as moment from "moment";

export default function Details(props) {
  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );

  return (
    <div>
      <Drawer
        width={640}
        // title={
        //   <div>
        //     <Avatar
        //       src={props.user.image}
        //       icon={props.user.image === null && <UserOutlined />}
        //     />{" "}
        //     &nbsp;
        //     {props.user.name}
        //   </div>
        // }
        placement="right"
        closable={false}
        onClose={props.onClose}
        visible={props.visible}
      >
        <Row>
          <Col>
            <img className="photo-avatar" src={props.user.image} placement="" />
          </Col>
        </Row>
        
        {/* <Row>
          <Col span={12}>
            <DescriptionItem
              title="Gender"
              content={`${props.user.gender ? "Male" : "Female"}`}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Age"
              content={2020 - moment(props.user.dateOfBirth).format("YYYY")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <DescriptionItem
              title="Birthday"
              content={props.user.dateOfBirth}
            />
          </Col>
        </Row> */}
        <Divider />
        <p className="site-description-item-profile-p">Contacts</p>
        <Row>
        <Col span={12}>
            <DescriptionItem
              className="name-avatar"
              title="Full Name"
              content={`${props.user.name}`}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Email" content={props.user.email} />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Phone Number"
              content={props.user.phone}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem title="Address" content={props.user.address} />
          </Col>
        </Row>
      </Drawer>
    </div>
  );
}

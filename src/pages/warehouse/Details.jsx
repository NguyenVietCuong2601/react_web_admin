import React, { useEffect, useState } from "react";
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
  
  useEffect(()=>{
    console.log(props.warehouse.city);
  })

  return (
    <div>
      <Drawer
        width={640}
        title={
          <div>
            <Avatar
              src={props.warehouse.image}
              icon={props.warehouse.image === null && <UserOutlined />}
            />{" "}
            &nbsp;
            {props.warehouse.name}
          </div>
        }
        placement="right"
        closable={false}
        onClose={props.onClose}
        visible={props.visible}
      >
        <Row>
          <Col span={4}>
            <DescriptionItem
              title="Id"
              content={`${props.warehouse.id}`}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Warehouse Name"
              content={`${props.warehouse.name}`}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Address"
              content={`${props.warehouse.address}`}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Create At"
              content={moment(props.warehouse.createdAt).format("YYYY-MM-DDTHH:mm:ss")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <DescriptionItem
              title="Update At"
              content={moment(props.warehouse.updatedAt).format("YYYY-MM-DDTHH:mm:ss")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <DescriptionItem
              title="City"
              content={`${props.warehouse.city ? props.warehouse.city.name : "none"}`}
              //content = {"help"}
            />
          </Col>
        </Row>
        {/* <Divider />
        <p className="site-description-item-profile-p">Category</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Name" content={`${props.warehouse.category ? props.warehouse.category.name : "none"}`} />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Description"
              content={`${props.warehouse.category ? props.warehouse.category.description : "none"}`}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Update At"
              content={props.warehouse.category ? moment(props.warehouse.category.updatedAt).format("YYYY-MM-DDTHH:mm:ss") : "none"}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Create At"
              content={props.warehouse.category ? moment(props.warehouse.category.createdAt).format("YYYY-MM-DDTHH:mm:ss") : "none"}
            />
          </Col>
        </Row> */}
      </Drawer>
    </div>
  );
}

import React,{useEffect,useState} from "react";
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

  console.log(props.products)
  return (
    <div>
      <Drawer
        width={640}
        title={
          <div>
            <Avatar
              src={props.products?.image}
              icon={ <UserOutlined />}
            />{" "}
            &nbsp;
            {props.products?.name}
          </div>
        }
        placement="right"
        closable={false}
        onClose={props.onClose}
        visible={props.visible}
      >
        <Row>
          <Col>
            <DescriptionItem
              title="Product Name"
              content={`${props.products?.name}`}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Note"
              content={`${props.products?.note }`}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Create At"
              content={moment(props.products?.createdAt).format("YYYY-MM-DDTHH:mm:ss")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <DescriptionItem
              title="Update At"
              content={moment(props.products?.updatedAt).format("YYYY-MM-DDTHH:mm:ss")}
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Category</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Name" content={`${props.products?.category ? props.products.category.name : "none"}`} />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Description"
              content={`${props.products?.category ? props.products.category?.description : "none"}`}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Update At"
              content={props.products?.category ? moment(props.products.category?.updatedAt).format("YYYY-MM-DDTHH:mm:ss") : "none"}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Create At"
              content={props.products?.category ? moment(props.products.category?.createdAt).format("YYYY-MM-DDTHH:mm:ss") : "none"}
            />
          </Col>
        </Row>
      </Drawer>
    </div>
  );
}

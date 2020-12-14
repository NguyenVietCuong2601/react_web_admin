
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Form, Input, Button, Col, Row, Avatar, Typography, Space } from "antd";
import {
  UserAddOutlined,
  SearchOutlined,
  ReloadOutlined,
  UserOutlined
} from "@ant-design/icons";
import avatar from "../../assets/avatar.jpg"
import UsersList from "./WarehouseManagement/UsersList"
import ProductsList from "./WarehouseManagement/ProductsList"
import HistoryList from "./WarehouseManagement/HistoryList"
import WarehouseServices from "../../api/WarehouseServices"
//import { useHistory } from "react-router-dom";
const { Title } = Typography;
function Details(props) {
  const dateFormat = "YYYY/MM/DD";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  //const history = useHistory();
  const _id = props.match.params.id;
  
  const [searchTerm, setSearchTerm] = useState("");
  const [buttonState, setButtonState] = useState({
    user: true,
    product: false,
    history: false
  });

  useEffect(() => {
    async function fetchData() {
      await WarehouseServices.getDetailWarehouse(_id)
        .then((res) => {
          setData(res[0]);
          setLoading(false);
          console.log(data)
          console.log(res[0])
        })
        .catch((err) => setLoading(false));
    }
    fetchData();
  }, [_id]);


  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );

  
  const suffix = (
    <SearchOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );
  
  const onReload = () => {
    window.location.reload();
  };
  const LoadingList = () => {
    if (buttonState.user) return <UsersList searchTerm={searchTerm} id={_id} />;
    if (buttonState.product) return <ProductsList searchTerm={searchTerm} id={_id} />;
    if (buttonState.history) return <HistoryList searchTerm={searchTerm} id={_id} />;
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: 1, padding: "20px", textAlign: "left" }}>

          <Title level={2}>
            <Avatar src={data ? data.image : avatar} size="large" />
            {" "}
            &nbsp;
            {data ? data.name : "loading..."}
          </Title>
        </div>
        <div style={{ flex: 1, padding: "10px", textAlign: "left" }}>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Address"
                content={`${data ? data.address : "loading..."}`}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Create At"
                content={data ? moment(data.createdAt).format("YYYY-MM-DDTHH:mm:ss") : "loading..."}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Description"
                content={`${data ? data.description : "loading..."}`}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Update At"
                content={data ? moment(data.createdAt).format("YYYY-MM-DDTHH:mm:ss") : "loading..."}
              />
            </Col>
          </Row>
        </div>

      </div>
      <div
        style={{
          flex: 4,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingBottom: 15,
          paddingLeft: 10,
        }}
      >
        <Space>
          <Input
            style={{ width: 500 }}
            placeholder="search something..."
            suffix={suffix}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="primary" onClick={onReload} icon={<ReloadOutlined />}>
            Reload
          </Button>

        </Space>
        <Space style={{ marginLeft: "auto" }}>
          <Button type="primary" ghost={buttonState.user} onClick={() => { setButtonState({ user: true, product: false,history: false }) }} >
            Users
          </Button>
          <Button type="primary" ghost={buttonState.product} onClick={() => { setButtonState({ user: false, product: true,history:false }) }}>
            Product
          </Button>
          <Button type="primary" ghost={buttonState.history} onClick={() => { setButtonState({ user: false, product: false,history:true }) }} >
            History
          </Button>
        </Space>
      </div>
      <div style={{ padding: 10 }}>
        <LoadingList />
      </div>

    </>
  );
}
export default Details;

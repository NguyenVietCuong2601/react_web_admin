import React, { useEffect, useState } from "react";
import Details from "../../../../../pages/warehouse/Details";
import { Link } from "react-router-dom";
import DeleteButton from "../../../../../components/DeleteButton";
import { Table, Space, Button, Tag, notification ,Typography,Input,Avatar} from "antd";
import * as moment from "moment";
import {
    FolderViewOutlined,
    EditOutlined,
    DeleteOutlined,
    ReloadOutlined,
    SearchOutlined
} from "@ant-design/icons";
import avatar from "../../../../../assets/avatar.jpg"
import UsersServices from "../../../../../api/UsersServices";
import useDebounce from "../../../../../hooks/useDebounce";
//New Shit
const { Title } = Typography;

function History(props) {
    //local state
    const [user, setUser] = useState([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState([]);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([]);
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm,setSearchTerm] = useState("");
    const warehouseId = props.callfromWarehouse;
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const suffix = (
        <SearchOutlined
          style={{
            fontSize: 16,
            color: "#1890ff",
          }}
        />
      );

    const loadData = (id) => {
        UsersServices.getHistoryUser(id)//this shit is change.
            .then((res) => {
                setData(res[0]);
                setLoading(false);
                setResult(res[0]);
                console.log(res[0])

            })
            .catch((err) => {
                console.log("error", err);
                setLoading(false);
            });
    };
    const loadUserData = (id) => {
        UsersServices.getDetailUser(id)//this shit is change.
            .then((res) => {
                setUser(res[0].data);
                console.log(res[0]);
            })
            .catch((err) => {
                console.log("error", err);
            });
    };
    useEffect(() => {
        setLoading(true);
        loadData(warehouseId);
        loadUserData(warehouseId);
    }, []);
    useEffect(() => {
        if (debouncedSearchTerm) {
            const items = data.filter(
                (item) =>
                    item.username.toLowerCase().includes(debouncedSearchTerm) ||
                    item.email.toLowerCase().includes(debouncedSearchTerm)
            );
            return setResult(items);
        }
        return setResult(data);
    }, [debouncedSearchTerm, data]);

    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
            duration: 2,
        });
    };
    const onSelect = (item) => {
        console.log(item.city)
        setSelectedWarehouse(item);
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    
    const onDelete = (id) => {
        setLoading(true);
        UsersServices.deleteUser(id)
            .then((res) => {
                setLoading(false);
                openNotificationWithIcon(
                    "success",
                    "Success!",
                    "This user doesn't exist anymore !"
                );
                loadData();
            })
            .catch((err) => {
                setLoading(false);
                openNotificationWithIcon("error", "Error!", "Deleted failed");
                loadData();
            });
    };

    const onReload = () => {
        window.location.reload();
      };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: (id) => `${id ? id : "none"}`,
        },
        // {
        //     title: "Image",
        //     dataIndex: "image",
        //     key: "image",
        //     render: (image) => <img src={image} style={{width:"50px",height:"50px"}}></img>,
        // },
        {
            title: "Warehouse Name",
            dataIndex: "warehouse",
            key: "warehouse",

            render: (warehouse) => <div>{warehouse ? warehouse.name : "none"}</div>,
        },
        {
            title: "Product Name",
            dataIndex: "products",
            key: "products",

            render: (products) => <div>{products[0] ? products[0].name : "none"}</div>,
        },
        {
            title: "Type",
            dataIndex: "typeId",
            key: "typeId",
            render: (typeId) => <div>{typeId == "1" ? "IMPORT" : "EXPORT"}</div>,
        },
        {
            title: "Amount",
            dataIndex: "products",
            key: "products",
            //render: (products) => <div>{products ? products[0].ProductHistory.amount : "none"}</div>,
            render: (products) => <div>{"none"}</div>,
        },
        {
            title: "Time",
            dataIndex: "date",
            key: "date",
            render: (date) => <div>{date ? moment(date).format('MMMM Do YYYY, h:mm:ss a') : "none"}</div>,
        },
        

    ];
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
                        <Avatar src={user ? user.image : avatar} size="large" />
                        {" "}
            &nbsp;
            {user ? user.name : "loading..."}
                    </Title>
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
                
            </div>
            <div style={{ padding: 10 }}>
                <Table
                loading={loading}
                dataSource={data}
                columns={columns}
                size="small"
                rowKey={(record) => `${record.id}`}
            />
            </div>


            
            {/* <Details warehouse={selectedWarehouse} visible={visible} onClose={onClose} /> */}
        </>
    );
}

export default History;

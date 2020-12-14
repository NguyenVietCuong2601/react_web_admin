import React, { useEffect, useState } from "react";
import Details from "../../../../../pages/warehouse/Details";
import { Link } from "react-router-dom";
import DeleteButton from "../../../../../components/DeleteButton";
import { Table, Space, Button, Tag, notification } from "antd";
import * as moment from "moment";
import {
    FolderViewOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import UsersServices from "../../../../../api/UsersServices";
import useDebounce from "../../../../../hooks/useDebounce";
//New Shit
import WarehouseServices from "../../../../../api/WarehouseServices"

function Warehouse(props) {
    //local state
    const [selectedWarehouse, setSelectedWarehouse] = useState([]);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([]);
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const searchTerm = props.searchTerm;
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const loadData = () => {
        WarehouseServices.getWarehouse()//this shit is change.
            .then((res) => {
                setData(res[0]);
                setLoading(false);
                setResult(res[0]);
                //setSelectedWarehouse(res[1])
                console.log(selectedWarehouse)
            })
            .catch((err) => {
                console.log("error", err);
                setLoading(false);
            });
    };
    useEffect(() => {
        setLoading(true);
        loadData();
    }, []);
    useEffect(() => {
        if (debouncedSearchTerm) {
            const items = data.filter(
                (item) =>
                    item.name.toLowerCase().includes(debouncedSearchTerm)
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
    //   const onToggleStatus = (id, status) => {
    //     setLoading(true);
    //     UsersServices.changeStatus(id, status)
    //       .then((res) => {
    //         openNotificationWithIcon(
    //           "success",
    //           "Success!",
    //           `This user is now ${status}`
    //         );
    //         setLoading(false);
    //         loadData();
    //       })
    //       .catch((e) => {
    //         console.log(e);
    //         setLoading(false);
    //       });
    //   };
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

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: (id) => `${id}`,
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image) => <img src={image} style={{width:"50px",height:"50px"}}></img>,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: {
                compare: (a, b) => a.name.length - b.name.length,
            },
            render: (name) => <div>{name}</div>,
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            render: (address) => `${address}`,
        },
        {
            title: "Action",
            key: "action",
            align: "center",
            responsive: ["lg"],
            render: (record) =>
                record.authority !== "ROLE_ADMIN" ? (
                    <Space size="small">
                        {/* <Button
                            icon={<FolderViewOutlined />}
                            onClick={() => onSelect(record)}
                        ></Button> */}
                        {/* <Link target="_top" to={`/home/users/${record.id}/edit`}>
                            <Button type="primary" icon={<FolderViewOutlined />} />
                        </Link> */}
                        <Link target="_top" to={`/home/warehouse/${record.id}/detail`}>
                            <Button type="primary" icon={<FolderViewOutlined />} />
                        </Link>
                        <DeleteButton
                            loading={loading}
                            item={record}
                            onSelected={(id) => {
                                onDelete(id);
                            }}
                        />
                    </Space>
                ) : (
                        <Space size="small">
                            <Button
                                icon={<FolderViewOutlined />}
                                onClick={() => onSelect(record)}
                            />
                            <Button disabled type="primary" icon={<EditOutlined />} />
                            <Button danger disabled type="primary" icon={<DeleteOutlined />} />
                        </Space>
                    ),
        },

    ];
    return (
        <>
            <Table
                loading={loading}
                dataSource={result}
                columns={columns}
                size="small"
                rowKey={(record) => `${record.id}`}
            />
            {/* <Details warehouse={selectedWarehouse} visible={visible} onClose={onClose} /> */}
        </>
    );
}

export default Warehouse;

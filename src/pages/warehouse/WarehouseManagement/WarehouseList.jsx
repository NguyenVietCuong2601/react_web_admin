import React from "react";
import Warehouse from "../../../features/main/components/Warehouses/components";

function WarehouseList(props) {
  return (
    <div>
      <Warehouse searchTerm={props.searchTerm} />
    </div>
  );
}
export default WarehouseList;

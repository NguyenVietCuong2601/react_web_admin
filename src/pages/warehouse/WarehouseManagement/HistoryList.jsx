import React from "react";
import History from "../../../features/main/components/Warehouses/components/history";

function HistoryList(props) {
  return (
    <div>
      <History searchTerm={props.searchTerm} callfromWarehouse={props.id}/>
    </div>
  );
}
export default HistoryList;
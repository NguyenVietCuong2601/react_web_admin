import React from "react";
import History from "../../../features/main/components/Users/components/history";

function HistoryList(props) {
    const _id = props.match.params.id;
  return (
    <div>
      <History searchTerm={props.searchTerm} callfromWarehouse={_id} />
    </div>
  );
}
export default HistoryList;
import React from "react";

function TabSelector(props) {
  return (
    <div className="TabSelector">
      <div
        id="Reorder Invoice Attribute"
        onClick={props.handleChangeTab}
        className={props.activeId === "Reorder Invoice Attribute" ? "active" : ""}
      >
        Reorder Invoice Attribute
      </div>
      <div
        id="Reorder Itemization and Allocation Attribute"
        onClick={props.handleChangeTab}
        className={props.activeId === "Reorder Itemization and Allocation Attribute" ? "active" : ""}
      >
        Reorder Itemization and Allocation Attribute
      </div>
      <div
        id="Show hide tabs"
        onClick={props.handleChangeTab}
        className={props.activeId === "Show hide tabs" ? "active" : ""}
      >
        Show hide tabs
      </div>
    </div>
  );
}

export default TabSelector;
import React, { useState, useEffect, useRef } from "react";
import AddExpenseConfigureParent from "./AddExpenseConfigureParent";
import DividerHeading from "./DividerHeading";
import ItemziationAttributeConfig from "./ItemizationAttributeConfig";
import TabSelector from "./TabSelector";


const AddExpenseConfigEntry = () => {


  const [itemizationAttribute, setItemizationAttribute] = useState(
    [
      {
        "group_name": "AllocationCustom",
        "attribute_id": 2,
        "attribute_name": "nameRandom6",
        "attribute_type": 1,
        "seq": 2,
        "is_editable": 0,
        "is_disable": 0,
        "is_active": 1
      },
      {
        "group_name": "AllocationCustom",
        "attribute_id": 3,
        "attribute_name": "nameRandom3",
        "attribute_type": 1,
        "seq": 3,
        "is_editable": 0,
        "is_disable": 0,
        "is_active": 1
      },
      {
        "group_name": "AllocationCustom",
        "attribute_id": 4,
        "attribute_name": "nameRandom9",
        "attribute_type": 0,
        "seq": 4,
        "is_editable": 0,
        "is_disable": 0,
        "is_active": 1
      },
      {
        "group_name": "AllocationCustom",
        "attribute_id": 7,
        "attribute_name": "nameRandom8",
        "attribute_type": 0,
        "seq": 7,
        "is_editable": 0,
        "is_disable": 0,
        "is_active": 1
      }
    ]
  );
  
  const [allocationAttribute,setAllocationAttribute]= useState([...itemizationAttribute]);


    const handleItemizationAttributeOrderChange = (newList)=>{
      setItemizationAttribute(newList);
    }

    const handleAllocationAttributeOrderChange = (newList)=>{
      setAllocationAttribute(newList);
    }

  const [activeId, setActiveId] = useState("Reorder Invoice Attribute")






  const handleChangeTab = (event) => {
    const buttonId = event.target.id;

    setActiveId(buttonId);
  }



  const getTabContent = () => {
    switch (activeId) {
      case "Reorder Invoice Attribute":
        return <AddExpenseConfigureParent />
      case "Reorder Itemization and Allocation Attribute":
        return<>
        
        <DividerHeading heading={"Itemization Attribute"} />
       <ItemziationAttributeConfig  attributeList={itemizationAttribute} setAttributeList = {handleItemizationAttributeOrderChange} />
       
       <DividerHeading heading={"Allocation Attribute"} />
       <ItemziationAttributeConfig  attributeList={allocationAttribute} setAttributeList = {handleAllocationAttributeOrderChange} />
       
       </>
       
       
      case "Show hide Tabs":
        return <h1>All Good</h1>
      default:
        return '';
    }
  }


  return <div className="App">
    <TabSelector
      handleChangeTab={handleChangeTab}
      activeId={activeId}
    />

    <div className="App-content">{getTabContent()}</div>
  </div>



}

export default AddExpenseConfigEntry;
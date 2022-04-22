
import React, { useState, useEffect, useRef } from "react";


const AddExpenseConfigureParent = () => {


    const [configuredAttributes, setConfiguredAttributes] = useState([]);
    const [notConfiguredAttriubte, setNotConfiguredAttribute] = useState([]);
    const [allCustomExpenseAttribute, setAllCustomExpenseAttribute] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false);
    


   

    
//--------------data fetch apis---------------------
const fetchExpenseCustomAttribute = async () => {

    return new Promise((resolve, reject) => {



        resolve("fetched  ;_;")
    })
}
const fetchConfiguredExpenseAttribute = () => {

    return new Promise((resolve, reject) => {


        resolve("fetched all");
    })
}

const fetchItemizationAttribute = async () => {

    return new Promise((resolve, reject) => {



        resolve("fetched  ;_;")
    })

}

const fetchAllocationAttribute = async () => {

    return new Promise((resolve, reject) => {



        resolve("fetched  ;_;")
    })

}

//---------------------------------------------

    const generateRandomAttribute = (num) => {
        const attributeObj = {

            group_name: "",
            attribute_id: "",
            attribute_name: "",
            attribute_type: "",
            attribute_id: "",
            seq: "",
            is_editable: 0,
            is_disable: 0,
            is_active: 1,
        };

        attributeObj.group_name = "ExpenseCustom";
        attributeObj.attribute_id = num;
        attributeObj.attribute_name = "nameRandom" + Math.floor(Math.random() * 10 + 1);
        attributeObj.attribute_type = Math.floor(Math.random() * 10 + 1) % 2;
        attributeObj.is_active = 1;
        attributeObj.seq = num;
        return attributeObj;
    }

    const RandomAttributeSetter = (num = 12) => {
        let configured = [];
        let all = [];
        for (let i = 0; i < num; i++) {
            let obj = generateRandomAttribute(i);

            let rand = Math.floor(Math.random() * 100 + 1) % 2;
            all.push(obj);

            if (rand == 0) configured.push(obj);

        }
        configured.sort((a,b) => a.seq - b.seq);
        setConfiguredAttributes(configured);
        setAllCustomExpenseAttribute(all);

    } 

    useEffect(() => {
        RandomAttributeSetter();
        setIsLoaded(true);

    }, []);

    useEffect(() => {
        GetNotConfiguredAttributes();
    }, [allCustomExpenseAttribute, configuredAttributes]);


    //-------------------------------Drag Event Handleers
    const [isDrag, setIsDrag] = useState(false);
    const dragAttribute = useRef();
    const dragOverAttribute = useRef();
    const handleDragStart = (e, info) => {
        
        console.log(e);
        console.log("drag start");
        setTimeout(()=>{setIsDrag(true);});
        
        dragAttribute.current=info.attribute;
    }

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("drag enter");
    }
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e);
        console.log("drag over");
        if(e.type === "dragend")setIsDrag(false);
    }

    const handleDrop = (e,info) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log("on drop",{info})
        setIsDrag(false);
        let seq=info.seq;
        let attribute=info.droped_attribute;
        AddToConfiguredAttribute(attribute.attribute_id,seq);
        
     }



    //--------------------Context Menu----------------------
    const [isContextMenu, setIsContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ "clientX": -1, "clientY": -1 });
    const [contextClicketedAttribute, setContextClickedAttribute] = useState({});

    const contextDelete = () => {
        console.log("Delete the attribute with id " ,{contextClicketedAttribute});
        console.log(contextClicketedAttribute);
        RemoveFromConfiguredAttribute(contextClicketedAttribute.attribute_id)
        setIsContextMenu(false);
        
    }
    const contextDisable = (e)=>{
        e.preventDefault();
        setIsContextMenu(false);

    }

    const contextReadOnly = (e)=>{
        e.preventDefault();
        setIsContextMenu(false);
    }

    const handleContext = (event, object) => {
        console.log({ event });
        setIsContextMenu(true);
        setContextClickedAttribute(object.attribute);

        event.preventDefault();
        event.stopPropagation();
        console.log(event);
        let position = {
            "clientX": event.clientX,
            "clientY": event.clientY
        };
        setContextMenuPosition(position);
        console.log({ position, object });

    }

    const handleContextClose = (e)=>{
        e.preventDefault();
        setIsContextMenu(false);

    }

    const handleBubbleClick = (e) => {
        console.log("why click anywhere");
        (isContextMenu) ? setIsContextMenu(false) : console.log("already closed");
        e.preventDefault();
        e.stopPropagation();

    }

    //------------------Utils functions ----------------------------

    
    const GetNotConfiguredAttributes = () => {

        let allAtt = CreateDeepCopy(allCustomExpenseAttribute);

        let notConigured = allAtt.filter((cur) => {

            return configuredAttributes.findIndex((conat) => cur.attribute_id == conat.attribute_id) === -1;
        })

        setNotConfiguredAttribute(notConigured);
    };
    const GetConfiguredAttributes = () => {



    };
    const AddToConfiguredAttribute = (attribute_id, seq) => {

        let newConfig = CreateDeepCopy(configuredAttributes);
        let attObj = allCustomExpenseAttribute.find((obj) => { return obj.attribute_id == attribute_id })
        if (attObj) {
            attObj = CreateDeepCopy(attObj);
            attObj.seq = seq;
            attObj.is_editable = 1;
            attObj.is_disable = 0;
            attObj.is_active = 1;
            console.log("configuredObj",attObj);
            newConfig.push(attObj);
        }
        newConfig.sort((a,b) => a.seq - b.seq);
        setConfiguredAttributes(newConfig);

    };
    const RemoveFromConfiguredAttribute = (attribute_id) => {
        
        let index = configuredAttributes.findIndex((attObj) => { return attObj.attribute_id == attribute_id });
        let newConfigured = [...configuredAttributes];
        if (index != -1) newConfigured.splice(index, 1);
        newConfigured.sort((a,b) => a.seq - b.seq);
        console.log("about to delete ---> new configured",{index},{configuredAttributes},{newConfigured});
        setConfiguredAttributes(newConfigured);


    };

    const CreateDeepCopy = (obj) => {
        //data loss possibility (functions, nan, regex)
        let newObj = JSON.parse(JSON.stringify(obj));
        return newObj;
    }

    
    const GetConfiguredJSX = () => {


        function NotConfiguredCardJSX(curCnt) {

            let tc = curCnt;

            let divEl = <div key={curCnt} data-attribute_id={null} className="abc-notConfiguredCard"
                onDragEnter={(e) => handleDragEnter(e, { "seq": curCnt, "attribute_id": null })}
                onDragOver={(e) => handleDragOver(e, { "seq": curCnt, "attribute_id": null })}
                onDrop={(e) => handleDrop(e, { "seq": tc, "droped_attribute": dragAttribute.current })}

            >

                <span> Empty </span>
            </div>;

            return divEl;
        }
        function ConfiguredCardJSX(curAttri) {
            let divEl = <div key={curAttri.seq} data-attribute_id={curAttri.attribute_id} className="abc-configuredCard"


                onContextMenu={(e) => { handleContext(e, { "attribute": curAttri }); } }
            >

                <span> {curAttri.attribute_name}</span>
            </div>;
            return divEl;

        }



        const attributeLi = [];       
        let curCnt = 1;
        for (let i = 0; i < configuredAttributes.length; i++) {
            let curAttri = configuredAttributes[i];

            while (curCnt < curAttri.seq) {
                
                let divEl =NotConfiguredCardJSX(curCnt);
                attributeLi.push(divEl);             
                curCnt++;
            }
            let divEl = ConfiguredCardJSX(curAttri);                
            curCnt++;
            attributeLi.push(divEl);

        }        
        return attributeLi;

    }
    const GetStyle=(eventName,data)=>
    {
        console.log({eventName,data});
        switch(eventName){

            case "dragging":
                return (isDrag && data == dragAttribute.current.attribute_id )?"configli-drag":"";
                break;
        }
    }
    const GetAllAttributeJSX = () => {

        let litem = [];
        notConfiguredAttriubte.forEach(
            (el) => {

                let jsxEl =
                    <div key={el.attribute_id} className={`configLi-card  configLi-shadow ${GetStyle("dragging",el.attribute_id)}`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, { "attribute": el })}
                        onDragEnd={(e) => handleDragOver(e, { "attribute": el })}


                    >
                        <span>{el.attribute_name}</span>
                    </div>;

                litem.push(jsxEl);

            }
        )
        return litem;
    }


   

    return (

        <>
            {isLoaded &&<div style={{display:"flex",width:"100%"}}> <div className="button-61" style={{"margin-left":"90%" ,"margin-top":"10px"}} role="button">Save</div></div>}
            {isLoaded &&
                <div className="abc-main" onClick={handleBubbleClick}>
                    
                    <div className="abc-configured">

                        {GetConfiguredJSX()}

                    </div>

                    <div className="abc-notConfigured">


                        {GetAllAttributeJSX()}

                    </div>



                </div>



            }

            {isContextMenu &&
             <ContextMenu position={contextMenuPosition} contextDelete={contextDelete} contextClose={handleContextClose} contextDisable={contextDisable}  contextReadOnly={contextReadOnly}/>}
        </>
    )



    //Utility Functions -----------------
    // AddToConfiguredAttribute --> attribute_id

    // DeleteFromConfiguredAttribute -->attribute_id

    //DisableConfiguredAttribute   -->attribute_id

    //SaveConfiguredData

    // ------------Data Functions

    //GetAllInvoiceAttribute
    //GetAddExpenseConfiguredAttributeData

    //RemoveConfigureFromAll


    //Add Expense Configured Attribute

    // All Attribute 
    // a. Expense Invoice Attribute (is_expenseLevel = 0,1 and attribute_type =2)
    // b. Expense Itemization Attribute
    // c. Expense Allocation Attribute


}


const ContextMenu = ({ position, contextDelete, contextClose ,contextDisable,contextReadOnly }) => {

    const mystyle =
    {
        "position": "absolute",
        "left": position.clientX + "px",
        "top": position.clientY + "px",
        "display": "inline-block",
        "border": "1px solid rgb(238, 238, 238)",
        "boxShadow": "rgb(204, 204, 204) 0px 2px 2px",
        "width": "200px", "padding": "20px",
        "margin": "20px",
        "cursor": "pointer",
        "zIndex": "100",
        "background": "white"
    };

    console.log({ mystyle });
    console.log({ position })

    return (<>

        <div style={mystyle}>
            <div onClick={contextDelete}>Delete</div>
            <div onClick={contextDisable} >Disable</div>
            <div onClick={contextReadOnly}>Set To ReadOnly </div>
            <div onClick={contextClose}>Close Menu</div>
        </div>


    </>)
}


export default AddExpenseConfigureParent;
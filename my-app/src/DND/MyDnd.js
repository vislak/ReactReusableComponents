import React, { useState, useEffect, useRef } from "react";




const MyDnd = () => {


    const [order, setOrder] = useState([{ groupName: "g1", aname: "Name", seq: 1 }, { groupName: "g1", aname: "Currency", seq: 5 }, { groupName: "g1", aname: "Amount", seq: 6 }])
    const [allAttribute, setAllAttribute] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [rowLimit, setRowLimit] = useState(4);
    const [rowCnt, setRowCnt] = useState(0);
    const [litem, setLitem] = useState([]);
    const [dragging, setDragging] = useState(false);

    const [isContextMenu, setIsContextMenu] = useState(false);
    const [contextMenuPosition,setContextMenuPosition] = useState({})
    const [contextClickedElementInfo,setContextClickedInfo]=useState({});

    const dragItem = useRef();
    const dragItemNode = useRef();



    const contextDelete= ()=>{

        console.log(contextClickedElementInfo);
    }

    const handleContext = (event, object) => {
        console.log({event});
        setIsContextMenu(true);
        setContextClickedInfo(object);

        event.preventDefault();
        event.stopPropagation();
       
        let position = {"clientX":event.clientX,
                        "clientY":event.clientY};
        setContextMenuPosition(position);
        console.log({position,object});

    }



    const handleBubbleClick = (e) => {
        console.log("why click anywhere");
        (isContextMenu)?setIsContextMenu(false):console.log("already closed");
        e.preventDefault();
        e.stopPropagation();

    }


    const getAllAttribute = async () => {
        return new Promise((resolve, reject) => {


            let alist = ["Paying Entity", "Paid by SPV", "Allocation Basis", "Vendor", "itemT1", "Test Date", "Allocation Date"];
            resolve(alist);

        })

    }

    useEffect(() => {

        getAllAttribute().then((res) => {

            console.log({ res });
            setAllAttribute(res);
            setIsLoaded(true);
            setRowCnt(getIntialCntRows());
        });


    }, []);


    const getIntialCntRows = () => {
        let cur = 0;
        order.forEach((el) => { cur = Math.max(cur, el.seq) });
        console.log(cur);
        console.log("getIntialCntRows", cur);
        cur = Math.ceil(cur / rowLimit);
        return cur
    }



    const handletDragStart = (e, item) => {
        console.log('Starting to drag', e, item)

        dragItemNode.current = e.target;
        // dragItemNode.current.addEventListener('dragend', handleDragEnd)
        dragItem.current = item;

        setTimeout(() => {
            setDragging(true);
        }, 0)
    }
    const handleDragEnter = (e, targetItem) => {
        e.preventDefault()
        console.log('Entering a drag target', targetItem)
        if (dragItemNode.current !== e.target) {
            console.log('Target is NOT the same as dragged item')


        }
    }
    const handleDragOver = (e, seq) => {
        console.log("handleDropOver---->");
        console.log({ e, seq });
        e.preventDefault();
    }


    const handleDrop = (e, seq) => {
        e.preventDefault();
        console.log("handleDrop---->");
        console.log({ e, seq });


        let newOrder = [...order];
        newOrder.push({
            groupName: "g1", aname: allAttribute[dragItem.current.index], seq: seq.curSeq

        });

        let newAllAttribute = [...allAttribute];
        console.log("---------->", { newOrder });
        console.log(dragItem.current.index);
        newAllAttribute.splice(dragItem.current.index, 1);
        setOrder(newOrder);
        setAllAttribute(newAllAttribute)

    }
    const handleDragEnd = (e) => {
        e.preventDefault();
        console.log("handleDropEnd");
        console.log(e);
        setDragging(false);
        dragItem.current = null;
        dragItemNode.current.removeEventListener('dragend', handleDragEnd)
        dragItemNode.current = null;
    }
    const getStyles = (item) => {

        return "dnd-item"
    }






    const RenderRow = () => {

        const litem = [];
        for (let i = 0; i < rowCnt; i++) {
            for (let j = 0; j < rowLimit; j++) {
                let curSeq = (i) * rowLimit + j + 1;
                console.log({ curSeq });
                let index = order.find((obj) => (obj.seq == curSeq))
                console.log(index);
                if (!index) {

                    litem.push(<div className="ecard" key={curSeq}
                        draggable key={curSeq} onDragStart={(e) => handletDragStart(e, { "orderAttr": "orderAttr", curSeq })}

                        onDragEnter={dragging ? (e) => { handleDragEnter(e, { "orderAttr": "orderAttr", curSeq }) } : null}

                        onDragOver={(e) => handleDragOver(e, { curSeq })}

                        onDrop={(e) => handleDrop(e, { curSeq })}
                    ><span> </span> </div>)
                }
                else {
                    litem.push(<div className="ecard dropableEcard" key={curSeq}
                    onContextMenu={(e) => handleContext(e, { id: curSeq, groupName: "orderAttr" })}
                    ><span>{index.aname}</span></div>)

                }
            }
        }
        console.log({ rowCnt });
        console.log({ litem });

        return litem;
    }

    const renderAllAttribute = () => {

        const li = [];
        console.log({ allAttribute })
        allAttribute.forEach((el, index) => {
            let isInOrder = order.find(obj => obj.aname == el)
            if (isInOrder) return;
            li.push(

                <div className="li-div" draggable key={el}

                    onDragStart={(e) => handletDragStart(e, { "allAttr": "allAttr", index })} onDragEnter={dragging ? (e) => { handleDragEnter(e, { "allAttr": "allAttr", index }) } : null}


                > {el}</div>)
        })
        return li;

    }

    const parentStyle = {
        
        backgroundColor: "white",
        padding: "10px",
        fontFamily: "Arial",
        width: "100%",
        height: "100%",
        overFlow: "hidden"

    };

    return (<>
        <div style={parentStyle} onClick={handleBubbleClick}>
        {isLoaded &&
            <div className="horizontal-flex">
                {RenderRow()}
            </div>
        }
        {isLoaded && <div className="allAttribute">
            {renderAllAttribute()}
        </div>}

        
        </div>

        {isContextMenu && <ContextMenu position={contextMenuPosition} contextDelete={contextDelete}/>}

    </>);


}

const ContextMenu= ({position,contextDelete})=>{

    const mystyle=
        {"position":"absolute",
        "left":position.clientX+"px",
        "top": position.clientY+"px",
        "display":"inline-block",
        "border":"1px solid rgb(238, 238, 238)",
        "boxShadow":"rgb(204, 204, 204) 0px 2px 2px",
        "width":"200px","padding":"20px",
        "margin":"20px",
        "cursor":"pointer",
        "zIndex":"100",
        "background":"white"};
    
        console.log({mystyle});
        console.log({position})
    
    return(<>

      <div style={mystyle}>
        <div onClick={contextDelete}>Delete</div>
        <div>Disable</div>
        <div>Close Menu</div>
      </div>
    
    
    </>)
}

export default MyDnd;
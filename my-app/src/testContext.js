import React, { useState, useRef, useEffect } from 'react'

const TextContext = () => {


    const [isContextMenu, setIsContextMenu] = useState(false);
    const [contextMenuPosition,setContextMenuPosition]= useState({"clientX": -1,"clientY":-1});
    const mystyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial",
        width: "200px",
        height: "200PX",
        margin: "10px"

    };
    const parentStyle = {
        color: "white",
        backgroundColor: "lightgrey",
        padding: "10px",
        fontFamily: "Arial",
        width: "100%",
        height: "100%",
        overFlow: "hidden"

    };
    const handleContext = (event, object) => {
        console.log({event});
        setIsContextMenu(true);
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

    return (


        <>
            <div style={parentStyle} onClick={handleBubbleClick}>
                <div style={mystyle} onContextMenu={(e) => handleContext(e, { id: 1, groupName: "itemziation" })} > first div</div>
                <div style={mystyle}> Second div</div>
                <div style={mystyle}> third div</div>
            </div>
        {isContextMenu && <ContextMenu position={contextMenuPosition}/>}

        </>
    )

}

const ContextMenu= ({position})=>{

    const mystyle=
        {"position":"absolute",
        "left":position.clientX+"px",
        "top": position.clientY+"px",
        "display":"inline-block",
        "border":"1px solid rgb(238, 238, 238)",
        "boxShadow":"rgb(204, 204, 204) 0px 2px 2px",
        "width":"200px","padding":"20px",
        "margin":"20px",
        
        "zIndex":"100",
        "background":"white"};
    
        console.log({mystyle});
        console.log({position})
    
    return(<>

      <div style={mystyle}>
        <div>Delete</div>
        <div>Disable</div>
        <div>Close Menu</div>
      </div>
    
    
    </>)


}
export default TextContext;
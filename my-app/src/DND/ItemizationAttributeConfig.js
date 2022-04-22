import React, { useState, useEffect, useRef } from "react";

const ItemziationAttributeConfig = ({attributeList,setAttributeList}) => {

   console.log(attributeList);
   console.log({setAttributeList});
    const [dragging, setDragging] = useState(false);



    const dragItem = useRef();
    const dragItemNode = useRef();

    useEffect(() => {

    }, [attributeList])


    const handletDragStart = (e, item) => {
    
        console.log('Starting to drag', e, item)

        dragItemNode.current = e.target;
        dragItemNode.current.addEventListener('dragend', handleDragEnd)
        dragItem.current = item.attribute;

        setTimeout(() => {
            setDragging(true);
        }, 0)
    }
    const handleDragEnter = (e, item) => {
       console.log("handleDragEnter------------------->")
       console.log({item});
       console.log(dragItem.current);
      let newList = [...attributeList];
      let i1= newList.findIndex((el)=>el.attribute_id==item.attribute.attribute_id);
      let i2 = newList.findIndex((el)=>el.attribute_id==dragItem.current.attribute_id);
     

      [newList[i1],newList[i2]]=   [newList[i2],newList[i1]];
      setAttributeList(newList);

       
    }
    const handleDragEnd = (e) => {
        setDragging(false);
        dragItem.current = null;
        dragItemNode.current.removeEventListener('dragend', handleDragEnd)
        dragItemNode.current = null;
    }
    const getStyles = (item) => {
        if (dragItem.current.attribute_id === item.attribute.attribute_id) {
            return "dnd-item current"
        }
        return "dnd-item"
    }

    const GetItemizationAttributeJsx = () => {

        const litem = [];
        console.log({attributeList})
        attributeList.forEach((attribute,index) => {



            let divEl = <div draggable key={attribute.attribute_id} 

            onDragStart={(e) => handletDragStart(e, { "attribute": attribute })} 
            onDragEnter={dragging ? (e) => { handleDragEnter(e, { "attribute": attribute,"index":index }) } : null} 
            className={dragging ? getStyles({ "attribute": attribute}) : "dnd-item"}>



                <span>{attribute.attribute_name}</span>
            </div>;

           
            litem.push(divEl);



        });
        
        return litem;
    }

    if (attributeList) {
        return (
            <div className="drag-n-drop">
               {GetItemizationAttributeJsx()}
            </div>
        )
    } else { return null }



}


export default ItemziationAttributeConfig;
import React, { useState, useEffect, useRef } from "react";

import './DndFrame.css'
import DragNDrop from "./DragNDrop";
const DnDFrame = () => {

    const defaultData = [
        {title: 'group 1', items: ['1', '2', '3']},
        {title: 'group 2', items: ['4', '5']}
      ]
      


      const [data, setData] = useState();  
      useEffect(() => {
      
          setData(defaultData)
        
      }, [])
      return (
        <div className="App">
          <header className="App-header">
          <DragNDrop data={data} />
        
          </header>
        </div>
      );

}

export default DnDFrame;
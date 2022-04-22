import React ,{useState,useRef} from "react";

import Comp_B from "./comp_B";



const Comp_A = ({SaveAllComponentData})=>{

    const [cntComponent,setCntComponent]= useState(['id1','id2','id3']);

    const [dataChildComponent,setDataChildCompoenent] = useState([{},{},{}]);

    const [isDataRequired,setIsDataRequried]= useState([false,false,false]);

   

    const dataRequestCnt= useRef(0);


    const callBackDataSaver = (obj,index)=>{

        console.log(obj,index,"why");
        let temp = [...dataChildComponent];
        temp[index]=obj;
        setDataChildCompoenent(temp);

        dataRequestCnt.current=dataRequestCnt.current+1;
        
    }

    let childComponentList= cntComponent.map((id,index)=>(<div key={id}><Comp_B key={id} index={index} callBackDataSaver={callBackDataSaver} isDataRequired={isDataRequired[index]} sentReq={dataRequestCnt.current}  /></div>));

    const handleSaveBtn = ()=>{

       
        let tempIsDataRequired = isDataRequired.map((val)=>!val);
        console.log("tempIsDataRequied",tempIsDataRequired);
       setIsDataRequried(tempIsDataRequired);
        console.log("handle Save Btn called ");


    }

   

    if(dataRequestCnt==cntComponent.length)
    {
        console.log("this is one time thing",dataRequestCnt);
        dataRequestCnt.current=0;
        console.log(dataRequestCnt);
        console.log("hii");
        //forward data to root compoennet 
        SaveAllComponentData(dataChildComponent);        
        
        let tempIsDataRequired=isDataRequired.map((val)=>false);
        console.log("state temp",tempIsDataRequired);
        setIsDataRequried(tempIsDataRequired);


        //
        
    }



    return (
        <>

        <div onClick={handleSaveBtn}>SAVE BTN</div>
        <div className="body-child">
        {childComponentList}
        </div>
        </>
    )


}

export default Comp_A;
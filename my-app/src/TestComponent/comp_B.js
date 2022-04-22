import React ,{useEffect,useState,useRef} from "react";

const Comp_B = ({ index ,callBackDataSaver, isDataRequired,sentReq})=>{

    const [formData,setFormData]= useState({

        text1:"some intial value"

    })



    if(isDataRequired && sentReq==0)
    {
        
        callBackDataSaver(formData,index)

    }

    const handleChange = (event)=>
    {
        event.preventDefault();
        console.log(event);
        const {name,value}= event.target;
        let curformData= {...formData , [name]:value};
        setFormData(curformData);

        
    }


    return <>

            <input type="text" name="text1" val={formData.text1} onChange ={handleChange}/>

        </>

}

export default Comp_B;
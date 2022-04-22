import React , {useState,useEffect} from 'react'

import CustomClassTable from './CustomClassTable'




const CustomClassConfiguration = ()=>{ 

    const [classDetail,setClassDetail] = useState([]);
    const [ isInit , setIsInit] = useState(false);

    useEffect(() => {
        // GET request using fetch inside useEffect React hook
       let res = {
        "d": "{\"Table\":[{\"custom_class_id\":2,\"custom_class_detail_id\":2,\"class_name\":\"com.ivp.cashMaster.EASCustomClassValidation.CastleLake.EASGenerateExtractFromExpense\",\"assembly_path\":\"EASCustomClassValidation\",\"call_type\":\"POST\",\"exec_sequence\":1,\"module_name\":\"Expense\",\"sub_module_name\":\"\",\"control_id\":\"ChangeStatus\",\"validation_type\":\"No Validation\",\"execution_type\":\"POST\",\"business_groups\":\"\"}]}"
       };
       let final = JSON.parse(res.d);
       console.log(final.Table);
       setClassDetail(final.Table);
       setIsInit(!isInit);

       
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);



    console.log("lol"+ classDetail);

  

    return   <div>
        <CustomClassTable/>
    </div>
     

}



export default CustomClassConfiguration


import React , {useState,useEffect} from 'react'
import './WorkflowConfig.css'
const AllocationWorkflowTable = (props) => {



    const [data, setData] = useState([]);




    const [inAddMode, setInAddMode] = useState({ status: false, rowKey: null });






    const fetchAllocationWorkflowDetials = () => {

        
       
    }


    const DeleteAllocationWorkflowDetials = (AllocationWorkflowId) => {

       
    }

    const UpdateAllocationWorkflowConfigDetails = (AllocationWorkflowObj) => {

       
    }

    const InsertAllocationWorkflowConfigDetails = (AllocationWorkflowObj) => {

        
    }



    useEffect(() => {

        //fetchAllocationWorkflowDetials();

        var AllocationWorkflowDetail = [{ "custom_class_id": 2, "custom_class_detail_id": 2, "class_name": "com.ivp.cashMaster.EASAllocationWorkflowValidation.ValidateAbcDe", "assembly_path": "EASAllocationWorkflowValidation", "call_type": "POST", "exec_sequence": 1, "module_name": "Expense", "sub_module_name": "", "control_id": "ChangeStatus", "validation_type": "No Validation", "execution_type": "POST", "business_groups": "", "is_active": 0 }];
        setData(AllocationWorkflowDetail);

    }, []);






    const onRemove = (AllocationWorkflowId) => {

    

       

    }


    const addAllocationWorkflow = (entryObj) => {
        try {
            if (entryObj == null) {
                setInAddMode({ status: false, rowKey: null });
                return;
            }

            console.log("--->" + entryObj);
            console.log(entryObj);
            InsertAllocationWorkflowConfigDetails(entryObj);
            // setData(data => [...data, entryObj]);




        }
        catch (err) {

        }

    }

    const updateAllocationWorkflow = (entryObj) => {
        try {
            if (entryObj == null) {
                setInAddMode({ status: false, rowKey: null });
                return;
            }

            console.log("--->" + entryObj);
            console.log(entryObj);
            UpdateAllocationWorkflowConfigDetails(entryObj);
            // setData(data => [...data, entryObj]);




        }
        catch (err) {

        }

    }
    const onUpdate = ()=>{

    }



    let disableClass = 'custom-disable-color';

    return (
        <>
            <div className='AllocationWorkflow-new-entry btn btnSave'  >Add New Entry</div>

            <div className="AllocationWorkflowfield-tablecontainer">

                <div className="AllocationWorkflowfield-table">
                    <div className="AllocationWorkflowfield-tablehead">
                        <div className='left-pad'></div>

                        <div className="AllocationWorkflow-table-attribute1"><span>Sno </span></div>

                        <div className="AllocationWorkflow-table-attribute2"><span>Name</span></div>
                        <div className="AllocationWorkflow-table-attribute3"><span>Updated by</span></div>
                        <div className="AllocationWorkflow-table-attribute4"><span>Updated on</span></div>


                        <div className="AllocationWorkflow-table-attribute5"><span>Rename</span></div>
                        <div className="AllocationWorkflow-table-attribute6" ><span>Configure</span></div>
                        <div className="AllocationWorkflow-table-attribute7" ><span>Remove</span></div>
                        <div className="AllocationWorkflow-table-attribute8" ><span>{"     "}</span></div>

                    </div>
                    <div className="AllocationWorkflowfield-tablebody">
                        {

                            data.map((item, index) => (
                                
                                <div key={item.configuration_key} className='AllocationWorkflowfield-row'>
                                    <div className='left-pad'></div>
                                    <div className={"AllocationWorkflow-table-attribute1" + (1 ? '' : ' ' + disableClass)} ><span > {index + 1}</span></div>


                                    <div className={"AllocationWorkflow-table-attribute2" + (1 ? '' : ' ' + disableClass)} ><span > {"Expense Test"}</span></div>

                                    <div className={"AllocationWorkflow-table-attribute3" + (1 ? '' : 'custom-disable-color')}><span>{"user 118"}</span></div>
                                    <div className={"AllocationWorkflow-table-attribute4 " + (1 ? '' : 'custom-disable-color')}><span>{"16/02/2022"}</span></div>




                                    <div className="AllocationWorkflow-table-attribute5" onClick={() => onUpdate({ id: item.configuration_key })}><span><i className={"fas fa-cog"}></i></span></div>

                                    <div className="AllocationWorkflow-table-attribute6" onClick={() => onUpdate({ id: item.configuration_key })}><span><i className={"fas fa-cog"}></i></span></div>

                                    <div className="AllocationWorkflow-table-attribute7" onClick={() => onRemove({ id: item.configuration_key })}><span><i className={"fas fa-trash-alt"}></i></span></div>


                                    <div className="AllocationWorkflow-table-attribute8" onClick={() => onRemove({ id: item.configuration_key })}><span>Approve</span></div>


                                </div>
                            ))

                        }

                    </div>
                </div>
            </div>

        </>
    )


}


export default AllocationWorkflowTable;
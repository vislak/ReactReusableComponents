import React , {useState,useEffect} from 'react'

import './WorkflowConfig.css'
import WorkflowRenamePop from './WorkflowRenamePop';



const ExpenseWorkflowTable = (props) => {



    const [data, setData] = useState([]);

    const [renamePop,setRenamePop] = useState(false);
    const [clickedWorkflowId, setClickedWorkflowId] = useState(-1); 


    

    const [inAddMode, setInAddMode] = useState({ status: false, rowKey: null });

   




    useEffect(() => {

        //fetchExpenseWorkflowDetials();

        var ExpenseWorkflowDetail = [{ "custom_class_id": 2, "custom_class_detail_id": 2, "class_name": "com.ivp.cashMaster.EASExpenseWorkflowValidation.ValidateAbcDe", "assembly_path": "EASExpenseWorkflowValidation", "call_type": "POST", "exec_sequence": 1, "module_name": "Expense", "sub_module_name": "", "control_id": "ChangeStatus", "validation_type": "No Validation", "execution_type": "POST", "business_groups": "", "is_active": 0 }];
        setData(ExpenseWorkflowDetail);

    }, []);






    const onRemove = (ExpenseWorkflowId) => {

      

    }



    const onUpdate = ()=>{

    }

    const onNewEntry=()=>{

    }

    const onRename = (workflowClicked)=>{
        setClickedWorkflowId(workflowClicked);
        setRenamePop(!renamePop);

    }

    const ToggleRenamePop = ()=>{
        setRenamePop(!renamePop);
    }


   

    let disableClass = 'custom-disable-color';

    return (
        <>
        <div className='ExpenseWorkflow-new-entry btn btnSave' onClick={() => onNewEntry()} >Add New Entry</div>

        <div className="ExpenseWorkflowfield-tablecontainer">

            <div className="ExpenseWorkflowfield-table">
                <div className="ExpenseWorkflowfield-tablehead">
                    <div className='left-pad'></div>

                    <div className="ExpenseWorkflow-table-attribute1"><span>Sno </span></div>

                    <div className="ExpenseWorkflow-table-attribute2"><span>Name</span></div>
                    <div className="ExpenseWorkflow-table-attribute3"><span>Updated by</span></div>
                    <div className="ExpenseWorkflow-table-attribute4"><span>Updated on</span></div>


                    <div className="ExpenseWorkflow-table-attribute5"><span>Rename</span></div>
                    <div className="ExpenseWorkflow-table-attribute6" ><span>Configure</span></div>
                    <div className="ExpenseWorkflow-table-attribute7" ><span>Remove</span></div>
                    <div className="ExpenseWorkflow-table-attribute8" ><span>{"     "}</span></div>

                </div>
                <div className="ExpenseWorkflowfield-tablebody">
                    {

                        data.map((item,index) => (
                            <div key={item.configuration_key} className='ExpenseWorkflowfield-row'>
                                <div className='left-pad'></div>
                                <div className={"ExpenseWorkflow-table-attribute1" + (1 ? '' : ' ' + disableClass)} ><span > {index + 1}</span></div>
                                

                                <div className={"ExpenseWorkflow-table-attribute2" + (1 ? '' : ' ' + disableClass)} ><span > {"Expense Test"}</span></div>

                                <div className={"ExpenseWorkflow-table-attribute3" + (1 ? '' : 'custom-disable-color')}><span>{"user 118"}</span></div>
                                <div className={"ExpenseWorkflow-table-attribute4 " + (1 ? '' : 'custom-disable-color')}><span>{"16/02/2022"}</span></div>


                              

                                <div className="ExpenseWorkflow-table-attribute5" onClick={() => onRename(0)}><span><i className={"fas fa-cog"}></i></span></div>

                                <div className="ExpenseWorkflow-table-attribute6" onClick={() => onUpdate({ id: item.configuration_key })}><span><i className={"fas fa-cog"}></i></span></div>

                                <div className="ExpenseWorkflow-table-attribute7" onClick={() => onRemove({ id: item.configuration_key })}><span><i className={"fas fa-trash-alt"}></i></span></div>


                                <div className="ExpenseWorkflow-table-attribute8" ><span>Approve</span></div>
                                

                            </div>
                        ))

                    }

                </div>
            </div>

           { (renamePop)? <WorkflowRenamePop workflow_id={0} worflowName={"TestExpense"}   CloseModal={ToggleRenamePop} />:''}
        </div>

    </>
    )


}



export default ExpenseWorkflowTable;
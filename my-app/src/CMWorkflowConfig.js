import React, {useState} from 'react';
import ExpenseWorkflowTable from './ExpenseWorkflowTable';
import AllocationWorkflowTable from './AllocationWorkflow';
function CMWorkflowConfig() {
    
    return (
        <div id="CMWorkflowConfig" >
            <div><span>Creator </span></div>
            <div className="">

                <div>
                    <div>
                            <span>Expense Workflows </span>
                    </div>

                    <ExpenseWorkflowTable />

                    <AllocationWorkflowTable/>


                </div>


            </div>



        </div>
    );
}

export default CMWorkflowConfig;


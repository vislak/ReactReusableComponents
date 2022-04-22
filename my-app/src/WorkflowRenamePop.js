import React,{useEffect,useState} from 'react'

const WorkflowRenamePop = ({workflow_id,worflowName,CloseModal})=>
{
console.log(workflow_id,worflowName);
const [newWorkflowName,setNewWorkFlowName] = useState(worflowName);

const onRename = (workflow_id)=>{
    //ajax call to rename this
}

const onCancel = (workflow_id)=>{



}

return <>

<div  class="modal">
    <div class="modal__content">
        <h1>CSS Only Modal</h1>

        <p>
            You can use the :target pseudo-class to create a modals with Zero JavaScript. Enjoy!
        </p>

        <div class="modal__footer">
            Made with <i class="fa fa-heart"></i>, by <a href="https://twitter.com/denicmarko" target="_blank">@denicmarko</a>
        </div>

        <a href="#" class="modal__close">&times;</a>
    </div>
</div>

</>


}

export default WorkflowRenamePop;

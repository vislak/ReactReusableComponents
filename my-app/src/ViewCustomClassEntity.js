import React , {useState,useEffect} from 'react'

const ViewCustomClassEntity = ({onClose,detail,addCustomClass,inViewMode})=>
{
    console.log(detail);


 
  const [inputField, setInputField] = useState({ ...detail })
  const [isEdit, setIsEdit] = useState(inViewMode.editView );



  const inputsHandler = (e) => {
    const { name, value } = e.target;
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const submitButton = () => {

    console.log(inputField);
    console.log("form submited from view mode");
    addCustomClass(inputField);
    onClose();

  }

  const editButton = () => {
    setIsEdit(!isEdit);
  }

  const cancelButton = () => {

    setIsEdit(false);
    setInputField(detail);

  }
  


    return (<>
    
      <div>
        <div onClick={onClose} className='custom-form-close'>X</div>

        <div>
          <div className='custom-form'>
          <div className='custom-Add-header'> Custom Class Details</div>

            <div className='custom-form-field' >
              <label>Class Name</label>
              <input type="text" name="class_name" placeholder=" " onChange={inputsHandler} value={inputField.class_name} disabled={ ! isEdit } />
            </div>

            <div className='custom-form-field'>
              <label>Assembly Path</label>
              <input type="text" name="assembly_path" placeholder="" onChange={inputsHandler} value={inputField.assembly_path} disabled={ ! isEdit } />
            </div>


            <div className='custom-form-field'>
              <label>Call Type</label>
              <input type="text" name="call_type" placeholder=" " onChange={inputsHandler} value={inputField.call_type} disabled={ ! isEdit } />
            </div>

            <div className='custom-form-field'>
              <label>Exec Sequence</label>
              <input type="text" name="exec_sequence" placeholder="" onChange={inputsHandler} value={inputField.exec_sequence} disabled={ ! isEdit } />
            </div>


            <div className='custom-form-field'>
              <label>Module Name</label>
               <select
              name="module_name"  onChange={inputsHandler}
              value={inputField.module_name} disabled={ ! isEdit }
            >
            <option value="Expense">Expense</option>
              <option value="Allocation">Allocation</option>
       
      </select>
            
            
            </div>


            <div className='custom-form-field'>
              <label>Sub Module Name</label>
              <input type="text" name="sub_module_name" placeholder=" " onChange={inputsHandler}  onChange={inputsHandler} value={inputField.sub_module_name} disabled={ ! isEdit } />
            </div>


            <div className='custom-form-field'>
              <label>Control Id</label>
              <input type="text" name="control_id" placeholder=" " onChange={inputsHandler} value={inputField.control_id} disabled={ ! isEdit } />
            </div>


            <div className='custom-form-field'>
              <label>Validation Type</label>
              <input type="text" name="validation_type" placeholder="" onChange={inputsHandler} value={inputField.validation_type} disabled={ ! isEdit } />
            </div>

            <div className='custom-form-field'>
              <label>Execution Type</label>
              <input type="text" name="execution_type" placeholder=" " onChange={inputsHandler} value={inputField.execution_type} disabled={ ! isEdit } />
            </div>

            <div className='custom-form-field'>
              <label>Business Groups</label>
               <input type="text" name="business_groups" placeholder="" onChange={inputsHandler} value={inputField.business_groups} disabled={ ! isEdit } />
            </div>



            <div className='custom-btn-group'>
              {(!isEdit) ? <div className='' onClick={editButton}>Edit</div> : <> <div className='' onClick={submitButton}>Submit</div>   <div className='' onClick={cancelButton}>Cancel</div></>}
              <div className='' onClick={onClose}>Close</div>
            </div>

          </div>

          
        </div>


      </div>
        
    </>);
}

export default ViewCustomClassEntity
import React , {useState,useEffect} from 'react'
import $ from 'jquery';
import './CustomClassTable.css'
import '../node_modules/font-awesome/css/font-awesome.min.css';  
import ViewCustomClassEntity from './ViewCustomClassEntity';
import AddCustomClassEntity from './AddCustomClassEntity';



const CustomClassTable = (props) => {



    const [data, setData] = useState([]);

    const [inEditMode, setInEditMode] = useState({     status: false,  rowKey: null });

    const [inViewMode, setInViewMode] = useState({status: false, rowKey: null, editView: false });

    const [inDeleteMode, setInDeleteMode] = useState({ status: false, rowKey: null });

    const [inAddMode, setInAddMode] = useState({   status: false,     rowKey: null  });

    const onView = (customClassId) => { setInViewMode({ status: true, rowKey: customClassId, editView: false }); }

  


    const fetchCustomClassDetials = () => {

        // $.when(callService("/Resources/Services/EASAdminService.svc/GetCustomClassConfigDetails", {})).then(function (res) {


        //     let final = JSON.parse(res.d);
        //     console.log(final.Table);
        //     setData(final.Table);

        // });
    }

    const ToggleCustomClassDetials = ( customClassId) => {

        // $.when(callService("/Resources/Services/EASAdminService.svc/ToggleCustomClass", { custom_class_id: customClassId })).then(function (res)
        // {
        //  let final = JSON.parse(res.d);
        //  fetchCustomClassDetials();
        // });
    }

    const DeleteCustomClassDetials = (customClassId) => {

        // $.when(callService("/Resources/Services/EASAdminService.svc/DeleteCustomClass", { custom_class_id: customClassId })).then(function (res) {
        //     let final = JSON.parse(res.d);
        //     fetchCustomClassDetials();
        // });
    }

    const UpdateCustomClassConfigDetails = (customClassObj) => {

        // $.when(callService("/Resources/Services/EASAdminService.svc/UpdateCustomClassConfigDetails", { data: customClassObj})).then(function (res) {
        //     let final = JSON.parse(res.d);
        //     setInAddMode({ status: false, rowKey: null });
        //     fetchCustomClassDetials();
        // });
    }

    const InsertCustomClassConfigDetails = (customClassObj) => {

        // $.when(callService("/Resources/Services/EASAdminService.svc/InsertCustomClassDetails", { data: customClassObj })).then(function (res) {
        //     let final = JSON.parse(res.d);
        //     setInAddMode({ status: false, rowKey: null });
        //     fetchCustomClassDetials();
        // });
    }



    useEffect(() => {

       // fetchCustomClassDetials();

        var customClassDetail = [{ "custom_class_id": 2, "custom_class_detail_id": 2, "class_name": "com.ivp.cashMaster.EASCustomClassValidation.ValidateAbcDe", "assembly_path": "EASCustomClassValidation", "call_type": "POST","class_type":"", "exec_sequence": 1, "module_name": "Expense", "sub_module_name": "", "control_id": "ChangeStatus", "validation_type": "No Validation", "execution_type": "POST", "business_groups": "", "is_active": 0 },{ "custom_class_id": 2, "custom_class_detail_id": 2, "class_name": "com.ivp.cashMaster.EASCustomClassValidation.ValidateAbcDe", "assembly_path": "EASCustomClassValidation", "call_type": "POST","class_type":"", "exec_sequence": 1, "module_name": "Expense", "sub_module_name": "", "control_id": "ChangeStatus", "validation_type": "No Validation", "execution_type": "POST", "business_groups": "", "is_active": 1 }];
        setData(customClassDetail);

    }, []);






    const onUpdate = (customClassId) => {

        
        setInViewMode({ status: true, rowKey: customClassId, editView: true });
    }

    const onRemove = (customClassId) => {
        console.log("lets delete row with id " + customClassId);
        DeleteCustomClassDetials(customClassId.id);

    }


    const onNewEntry = () => {
        setInAddMode({ status: true, rowKey: null });
    }

    const addCustomClass = (entryObj) => {
        try {
            if (entryObj == null) {
                setInAddMode({ status: false, rowKey: null });
                return;
            }

            console.log("--->" + entryObj);
            console.log(entryObj);
            InsertCustomClassConfigDetails(entryObj);
           // setData(data => [...data, entryObj]);


           

        }
        catch (err) {

        }

    }

    const updateCustomClass = (entryObj) => {
        try {
            if (entryObj == null) {
                setInAddMode({ status: false, rowKey: null });
                return;
            }

            console.log("--->" + entryObj);
            console.log(entryObj);
            UpdateCustomClassConfigDetails(entryObj);
            // setData(data => [...data, entryObj]);




        }
        catch (err) {

        }

    }

    const closeViewDetails = () => {
        console.log("closing view");
        setInViewMode({ status: false, rowKey: null, editView: false });
    }

    const onToggle = (customClassId) => {
        //send request to deactivate class with this id 
        ToggleCustomClassDetials(customClassId.id);
      
        //after success call fetchcustomclassdetail

    }



    if (inAddMode.status) {
        return <AddCustomClassEntity addCustomClass={addCustomClass} />
    }

    let disableClass = 'custom-disable-color';

    return !inViewMode.status ? (<>

        <div className="customclasstable-name"><span>Custom Class Configuration </span></div>
        <div className='customclass-new-entry btn btnSave' onClick={() => onNewEntry()} >Add New Entry</div>

        <div className="customclassfield-tablecontainer">

            <div className="customclassfield-table">
                <div className="customclassfield-tablehead">
                    <div className='left-pad'></div>

                    <div className="customclass-table-attribute"><span>Class Name</span></div>

                    <div className="customclass-table-leg"><span>Call Type</span></div>
                    <div className="customclass-table-leg"><span>Module Name</span></div>
                    <div className="customclass-table-leg"><span>Control</span></div>



                    <div className="customclass-table-view"><span>View Details</span></div>
                    <div className="customclass-table-update"><span>Update</span></div>
                    <div className="customclass-table-remove" ><span>Remove</span></div>
                    <div className="customclass-table-toggle" ><span>Active</span></div>

                </div>
                <div className="customclassfield-tablebody">
                    {

                        data.map((item) => (



                            <div key={item.custom_class_id} className='customclassfield-row'>
                                <div className={  (item.is_active ? 'left-pad' :  'custom-disable-left-pad' )}></div>

                                <div className={"customclass-table-attribute" + (item.is_active ? '' : ' ' +  disableClass )} ><span > {item.class_name}</span></div>

                                <div className={"customclass-table-leg " + (item.is_active ? '' :   'custom-disable-color' )}><span>{item.call_type}</span></div>
                                <div className={"customclass-table-leg " + (item.is_active ? '' :    'custom-disable-color' )}><span>{item.module_name}</span></div>
                                <div className={"customclass-table-leg " + (item.is_active ? '' :   'custom-disable-color' )}><span>{item.control_id}</span></div>

                                <div className="customclass-table-view " onClick={() => onView({ id: item.custom_class_id })}><span><i className={"fas fa-plus"}></i></span></div>
                                <div className="customclass-table-update" onClick={() => onUpdate({ id: item.custom_class_id })}><span><i className={"fas fa-cog"}></i></span></div>
                                <div className="customclass-table-remove" onClick={() => onRemove({ id: item.custom_class_id })}><span><i className={"fas fa-trash-alt"}></i></span></div>
                                <div className="customclass-table-toggle" onClick={() => onToggle({ id: item.custom_class_id })}><span> {item.is_active ? <i class='fas fa-toggle-on' style={{ fontSize: '16px' }} ></i> : <i class="fas fa-toggle-off" style={{ fontSize: '16px' }}></i>} </span> </div>




                            </div>

                        ))

                    }


                </div>
            </div>
        </div>

    </>
    ) : (<ViewCustomClassEntity detail={data.find((obj)=>inViewMode.rowKey.id==obj.custom_class_id)} onClose={closeViewDetails} updateCustomClass={updateCustomClass} inViewMode={inViewMode} />)


}



export default CustomClassTable

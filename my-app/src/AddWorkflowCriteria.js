import React ,{useState,useEffect,useRef} from "react";
import   './App.css';


const RADDataExtDropDown = ({ anchorEle, handleClose, values, EnableSearch = false, multiselect = false, updateTitle, selected }) => {

    const ddRef = useRef(null);
    const [text, setText] = useState("");
    const [selectList, setSelectList] = useState(selected);

    useEffect(() => {
        function handleOutsideClick(e) {
            if (e.target.className == "DropDownMultiSelectSearch")
                return;
            if (multiselect) {
                if (anchorEle && anchorEle.contains(e.target) && ddRef.current.contains(e.target)) {
                    if (selectList.includes(e.target.id))
                        setSelectList(selectList.filter(x => x != e.target.id));
                    else
                        setSelectList([...selectList, e.target.id]);
                    updateTitle(selectList, e.target.id);
                }
                else
                    handleClose(selectList);
            }
            else {
                if (anchorEle && anchorEle.contains(e.target) && ddRef.current.contains(e.target))
                    handleClose(e.target.id);
                else
                    handleClose(selectList);
            }
        }

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        }

    }, [anchorEle, selectList]);

    var list = [...values];
    if (list.length > 0) {
        if (EnableSearch)
            list = list.filter(x => x.text.toLowerCase().indexOf(text.toLowerCase()) != -1);
        if (multiselect)
            list = list.map(x => {
                if (selectList.includes(x.id))
                    return (<div id={x.id} title={x.text} className="DropDownMultiSelectOption DropDownMultiSelectOptionSelected" ><span className="DropDownMultiSelectSelectIcon fas fa-check"></span>{x.text}</div>);
                else
                    return (<div id={x.id} title={x.text} className="DropDownMultiSelectOption" >{x.text}</div>)
            });
        else
            list = list.map(x => {
                if (selectList == x.id)
                    return (<div id={x.id} title={x.text} className="DropDownMultiSelectOption DropDownMultiSelectOptionSelected" ><span className="DropDownMultiSelectSelectIcon fas fa-check"></span>{x.text}</div>);
                else
                    return (<div id={x.id} title={x.text} className="DropDownMultiSelectOption" >{x.text}</div>)
                });
    }
    return (
        <div ref={ddRef} className="DropDownMultiSelect">
            {EnableSearch && <div className="DropDownMultiSelectSearchParent"><span className="DropDownMultiSelectSearchIcon"><i class="fas fa-search"></i></span><input className="DropDownMultiSelectSearch" onChange={(e) => setText(e.target.value)}></input></div>}
            <div className="DropDownMultiSelectBody">
                {list}
            </div>
        </div>
    );
}

const DropdownWrapper = (props) => {
    const [anchorEleTagType, setanchorEleTagType] = useState(null);

  const  handleCloseDD = (data) => {
        typeof (props.callBackMethod) == 'function' && props.callBackMethod(data, props.id);
        setanchorEleTagType(null);
    }
  const  handleOptionClick = (data, id) => {
        if (id != undefined) {
            if (data.includes(id))
                data = data.filter(x => x != id);
            else
                data.push(id);
        }
        setSelectedList(fillLabel(data));
        setTitle(fillLabelTitle(data));
    }
    function openMappingCellDD(e) {
        if (!props.disabled)
            setanchorEleTagType(e.currentTarget);
    }
    function fillLabel(data) {
        if (props.options.length > 0 && data.length > 0) {
            if (data.length > 1)
                return props.options.filter(x => x.id == data[0])[0].text + " [+" + (data.length - 1) + "more]";
            else
                return props.options.filter(x => x.id == data[0])[0].text;
        }
        else
            return props.Placeholder;
    }
    function fillLabelTitle(data) {
        if (props.options.length > 0 && data.length > 0) {
            if (data.length > 1)
                return props.options.filter(x => data.includes(x.id)).map(e => e.text).join(", ");
            else
                return props.options.filter(x => x.id == data[0])[0].text;
        }
        else
            return props.Placeholder;
    }
    const [SelectedList, setSelectedList] = useState();
    const [title, setTitle] = useState();

    useEffect(() => {
        if (props.multiselect) {
            if (props.selected != undefined && props.selected.length > 0) {
                setSelectedList(fillLabel(props.selected));
                setTitle(fillLabelTitle(props.selected));
            }
            else {
                setSelectedList(props.Placeholder);
                setTitle(props.Placeholder);
            }
        }
        else {
            if (props.selected != undefined && props.selected.length > 0) {
                var data = []; data.push(props.selected)
                setSelectedList(fillLabel(data));
                setTitle(fillLabelTitle(data));
            }
            else {
                setSelectedList(props.Placeholder);
                setTitle(props.Placeholder);
            }
        }
    }, [props.selected]);

    useEffect(() => {
        if (props.multiselect) {
            if (props.selected != undefined && props.selected.length > 0) {
                setSelectedList(fillLabel(props.selected));
                setTitle(fillLabelTitle(props.selected));
            }
            else {
                setSelectedList(props.Placeholder);
                setTitle(props.Placeholder);
            }
        }
        else {
            if (props.selected != undefined && props.selected.length > 0) {
                var data = []; data.push(props.selected)
                setSelectedList(fillLabel(data));
                setTitle(fillLabelTitle(data));
            }
            else {
                setSelectedList(props.Placeholder);
                setTitle(props.Placeholder);
            }
        }
    }, [props.options]);
    return (
        <div style={{ "display": "inline-block", "width": "100%" }} title={title}>
            {props.label != undefined && <label className="AttributeParentIcon">{props.label}</label>}
            <div class={props.label != undefined ? (props.disabled ? "dropDownDivWithLabel disableDropDownLabel" : "dropDownDivWithLabel") : (props.disabled ? "dropDownDivWithoutLabel disableDropDownLabel" : "dropDownDivWithoutLabel")} id={props.id} onClick={openMappingCellDD}>
                <label style={{"padding-left":"5px"}}>{SelectedList}</label>
                <b class="caret" style={{ "float": "right", "margin": "6px","color": "#808080"}}></b>
                {(Boolean(anchorEleTagType) && anchorEleTagType.id == props.id) &&
                    <RADDataExtDropDown anchorEle={anchorEleTagType} handleClose={handleCloseDD} values={props.options} EnableSearch={props.EnableSearch} multiselect={props.multiselect} updateTitle={handleOptionClick} selected={props.selected} />}
            </div>
        </div>
    )

}




const AddWorkflowCriteria = ({handleDeleteCriteria, componentKey,sendMeData,SaveCriteriaHelper, workflowInitObject}) => {


    console.log("ok");

    //lets store the render count

    const renderCounter = useRef(0);
    renderCounter.current = renderCounter.current+1;


    const [isloaded,setIsloaded]=useState(false);

    //Hooks for managing what is currently selected 

        const [selectedEntityType, setSelectedEntityType] = useState({ entity_type_name: "", entity_type_id: "", dataType: "", rm_entity_type_name: "", rm_entity_type_id: "" });
        
        const [selectedEntityAttribute, setSelectedEntityAttribute] = useState({ __type: "", Key: "", Value: "" });

        const [selectedOperator, setSelectedOperator] = useState({id:"",text:""});
        const [selectedAttributeValue, setSelectedAttributeValue] = useState({ id: "", text: "" });
        const [selectedValue,setSelectedValue]=useState({id:"",text:""});

        const [selectedEntityTypeRefId, setSelectedEntityTypeRefId] = useState([0]); 


    
    
    
        //drop down index selected 
        const [selectedEntityTypeDDNIndex, setSelectedEntityTypeDDNIndex] = useState(0);
        const [selectedEntityAttributeDDNIndex, setSelectedEntityAttributeDDNIndex] = useState(0);
        const [selectedOperatorIndex, setselectedOperatorIndex] = useState(0);
        const [selectedAttributeValueDDNIndex, setselectedAttributeValueDDNIndex] = useState(0);
        
        
            //Hooks for storing DATA
            const [entityAttributes, setEntityAttribute] = useState([]);
            const [attributeValue, setAttributeValue] = useState([]);
            const [operator, setOperator] = useState([]);
            const [entityType, setEntityType] = useState([]);

            const [attributeValueDDn,setAttributeValueDDN]= useState([]);



        const fetchEntityType = () => {

                    
            let data = [{ entity_type_name: "Expense Type", entity_type_id: "25", dataType: "", rm_entity_type_name: "Expense Type", rm_entity_type_id: "2" }, { entity_type_name: "Vendor", entity_type_id: "35", dataType: "", rm_entity_type_name: "Vendor", rm_entity_type_id: "1" }, { entity_type_name: "Category", entity_type_id: "70", dataType: "", rm_entity_type_name: "Payment Category", rm_entity_type_id: "16" }, { entity_type_name: "Business Group", entity_type_id: "87", dataType: "", rm_entity_type_name: "Business Group", rm_entity_type_id: "15" }, { entity_type_name: "Paying Entity", entity_type_id: "6", dataType: "Reference", rm_entity_type_name: "Management Company", rm_entity_type_id: "3" }];
            
            setEntityType(data);
        }

        const fetchEntityAttribute = ()=>
        {
            
            
                
            console.log("only called if entity type changes -->",selectedEntityType);
            let res = { "d": [ { __type: "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "Name", Value: "Name" }, { __type: "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "Code", Value: "Code" }, { "__type": "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "Email ID", Value: "Email_ID" }, { "__type": "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "Vendor currency", Value: "Vendor_currency" }, { "__type": "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "Payment Terms", Value: "Payment_Terms" }, { "__type": "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "EIN", Value: "EIN" } ] };

            res = res.d;
            console.log(res);
            setEntityAttribute(res);
            
        }

        const fetchAttributeValue = () => {

        
                console.log(selectedAttributeValue,"----->this is selected attribute value");

            let res = { "d": [{ "__type": "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "Bloomberg", Value: "VEIV00001" }, { "__type": "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "KPMG", Value: "VEIV00002" }, { "__type": "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "E&Y", Value: "VEIV00003" }, { "__type": "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "Vedder Price", Value: "VEIV00004" }, { "__type": "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "Markit", Value: "VEIV00005" }, { "__type": "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "Barclays", Value: "VEIV00006" }, { "__type": "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "JP Morgan", Value: "VEIV00007" }, { "__type": "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "Vendor 1", Value: "VEIV00008" }] };
            res = res.d;
            console.log("fetchattributeValue->",res);

            let uniqueValue = res;
            
            let flags=[],output=[],l=res.length;
            for(let i=0,j=0;i<l;i++)
            {
                if(flags[res[i].Key])continue;
                flags[res[i].Key]=true;


                output.push({id:j++,text:res[i].Key});
            }


            setAttributeValueDDN(output);
            

        }

        const fetchOperatorList = () => {
            if (selectedEntityType.dataType == "" || selectedEntityType.dataType == "reference") {
                setOperator( [{id:"1",text:"In"}, {id:"2",text:"Not In"}]);
            }
            else return ["Equals", "Not Equals", "Greater Than", "Less Than", "Between"];
        }



        useEffect(() => {

            //get entity type 
            fetchEntityType();

        }, []);


        useEffect(() => {
            //get attribute list 
            if(selectedEntityType.entity_type_name =="")return;
            console.log("why you changed entity type");
            fetchEntityAttribute();

        }, [selectedEntityType]);


        useEffect(() => {

            // get operator list 
            if(selectedEntityAttribute.Value =="")return;
            fetchAttributeValue();
            fetchOperatorList();
            console.log("why you selected entity attribute");

            // get value list 
        }, [selectedEntityAttribute]);

    
        const getFrameObject = ()=>{
            let obj= new Object();
          //   obj ={
          //       "__type": "EASWFCriteria:#com.ivp.cashMaster.EASCommon",
          //       "AttributeId": 25,
          //       "AttributeName": "Expense Type",
          //       "EntityAttribute": "Code",
          //       "IsCustomAttribute": false,
          //       "Operator": null,
          //       "Values": [
          //         "EXTY00003",
          //         "EXTY00004"
          //       ]
          //  };
           obj.__type=null;
           obj.AttributeId=null;
           obj.AttributeName=null;
           obj.EntityAttribute=null;
           obj.IsCustomAttribute=false;
           obj.Operator=null;
           obj.Values=null;
          
           return obj;
          }




        let data;
        let SubArray = data = entityType;
        let SubDataArray = new Array();
        for (var i = 0; i < SubArray.length; i++) {
            SubDataArray.push({
                id: data[i].entity_type_id,
                text: data[i].entity_type_name
            });
        }

        const handleEntityTypeChangeDropdown = (data) => {
        
            console.log(data);
            let selectedValue = SubArray.filter(x => x.entity_type_id == data);

            console.log(selectedValue);
            setSelectedEntityType({ ...selectedValue[0] });
        
            setSelectedEntityTypeDDNIndex([data]);
        };

    
        const handleEntityAttributeChangeDropdown = (data) => {
            
            console.log(";_;---->",data);

            let selectedValue = entityAttributes.filter(x => x.Key == data);
            
            console.log(selectedValue);
            
            setSelectedEntityAttribute({...selectedValue[0]});
            setSelectedEntityAttributeDDNIndex([data]);
        };

        const handleOperatorChangeDropdown = (data)=>
        {
            let selectedValue = operator.filter(x => x.id == data);

            setSelectedOperator({...selectedValue[0]});
            setselectedOperatorIndex([data]);
        }

        const handleValueChangeDropdown = (data,name) => {

            
            console.log(";_;---->",data);

            console.log(name);
           
        };



        const IntialiseWorkflow = async ()=>{
            //set attribute name first
            const res= await fetchEntityType();

            // then set 
        }


    
    
     let attributeOptions = (entityAttributes.length > 0) ?
     entityAttributes.map(
        (obj) => { return { "id": obj.Key, "text": obj.Value }; }
        ) : [];
        
        console.log("attrbiutedropdown");
        console.log(attributeOptions);



   



        console.log(selectedOperator);
        console.log(selectedAttributeValue);

        const DeleteC=()=>{
            handleDeleteCriteria( componentKey);
        }

        if(sendMeData){
            SaveCriteriaHelper( componentKey,{"abc":selectedEntityType.entity_type_name});
        }
        

     return (
        <>
        <h1> working </h1>
            <div className="rules-criteria-flex-horizontal">

                <div className="rules-criteria-flex-vertical">
                    <div> Select Entity </div>

                    <div className="workflow-criteria-d1">
                        <DropdownWrapper className="workflow-criteria-entityTypeClass" id="workflow-criteria-entityTypeId" label="" options={SubDataArray} callBackMethod={handleEntityTypeChangeDropdown}
                            Placeholder={(selectedEntityType.entity_type_name.length>0)?selectedEntityType.entity_type_name:"Select Entity Type"}
                            selected={selectedEntityTypeDDNIndex} />
                    </div>

                </div>

                <div className="rules-criteria-flex-vertical">
                    <div> Select Attribute </div>
                    <div className="workflow-criteria-d2">
                        <DropdownWrapper className="workflow-criteria-attributeTypeClass" id="workflow-criteria-attributeTypeId" label="" options={attributeOptions} callBackMethod={handleEntityAttributeChangeDropdown}
                            Placeholder={(selectedEntityAttribute.Value.length>0)?selectedEntityAttribute.Value:"Select attribute"}
                            selected={selectedAttributeValue.Key} />
                    </div>
                   
                </div>

                <div className="rules-criteria-flex-vertical">
                    <div>  Operator </div>
                  {(operator.length != 0)? <div className="workflow-criteria-d3">
                        <DropdownWrapper className="workflow-criteria-operatorClass" id="workflow-criteria-opertorId" label="" options={operator} callBackMethod={handleOperatorChangeDropdown}
                            Placeholder={(selectedOperator.text.length>0)?selectedOperator.text:"Select Operator"}
                            selected={selectedOperator.id} />
                    </div> :null }

                </div>

                <div className="rules-criteria-flex-vertical">
                    <div>  Values </div>
                    {(attributeValueDDn.length != 0)? <div className="workflow-criteria-d4">
                        <DropdownWrapper  id="workflow-criteria-attributeValueId"  options={attributeValueDDn} callBackMethod={handleValueChangeDropdown}
                            Placeholder={(selectedValue != undefined && selectedValue.text.length>0)?selectedValue.text:"Select Value"}
                            selected={[1,2,3]} />
                    </div> :null }

                </div>

                

            </div>

            <div className="rules-criteria-flex-horizontal rules-criteria-wid30 ">
               
                <div onClick={DeleteC}>delete</div>
            </div>


        </>);




}

export default AddWorkflowCriteria;
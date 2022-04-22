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




const MultiSelectBind = ()=>{



    const [selectedAttributeValue,setSelectedAttributeValue] = useState([]);

    const [attributeValue,setAttributeValue]=useState([]);
    const [attrbiuteValueDDN,setAttributeValueDDN] = useState([]);

    const fetchAttributeValue = () => {

            
      

    let res = { "d": [{ "__type": "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "Bloomberg", Value: "VEIV00001" }, { "__type": "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "KPMG", Value: "VEIV00002" }, { "__type": "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "E&Y", Value: "VEIV00003" }, { "__type": "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "Vedder Price", Value: "VEIV00004" }, { "__type": "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "Markit", Value: "VEIV00005" }, { "__type": "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "Barclays", Value: "VEIV00006" }, { "__type": "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "JP Morgan", Value: "VEIV00007" }, { "__type": "CMCommonKeyValuMap:#com.ivp.cashMaster.EASCommon", Key: "Vendor 1", Value: "VEIV00008" }] };
    res = res.d;
    console.log("fetchattributeValue->",res);

    let uniqueValue = res;
        

        setAttributeValue(res);
    let flags=[],output=[],l=res.length;
    for(let i=0,j=0;i<l;i++)
    {
        if(flags[res[i].Key])continue;
        flags[res[i].Key]=true;


        output.push({id:j++,text:res[i].Key});
    }
    console.log(output);

    setAttributeValueDDN(output);


    }



    useEffect(()=>{fetchAttributeValue();},[])

    const handleValueChangeDropdown = (data)=>{
        console.log(data);
    }

    return (<div><h1> hi </h1>
    
                 <div className="rules-criteria-flex-vertical">
                    <div>  Values </div>
                     <div className="workflow-criteria-d4">
                        <DropdownWrapper  options={[{id:"1",text:"abc"},{id:"2",tex:"abc"}]} callBackMethod={handleValueChangeDropdown}
                            Placeholder="Select Value" multiselect={true} EnableSearch={true}
                            selected={["1","2"]} />
                    </div> 

                </div>
    
    
    </div>   )




}


export default MultiSelectBind;
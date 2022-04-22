const DropdownWrapper = (props) => {
    const [anchorEleTagType, setanchorEleTagType] = useState(null);

    handleCloseDD = (data) => {
        typeof (props.callBackMethod) == 'function' && props.callBackMethod(data, props.id);
        setanchorEleTagType(null);
    }
    handleOptionClick = (data, id) => {
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

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
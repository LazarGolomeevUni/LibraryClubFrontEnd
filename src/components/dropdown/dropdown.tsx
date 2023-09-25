import React, { useState } from 'react'
import './dropdown.css'
import { useRef } from "react"


const Dropdown = (props: { content: Array<string> , onSelectedValue: any}) => {

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [elementVisible, setElementVisible] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const [contents, setContents] = useState(props.content);

    const catMenu = useRef(null)

    function toggleDropdown() {
        setIsDropdownVisible((prevState) => !prevState);
    }

    function filterFunction(event: React.ChangeEvent<HTMLInputElement>) {
        const input = event.target.value;
        if (input != "") {
            const newContent = contents.filter(content => content.includes(input));
            if (newContent.length>0){
                setContents(newContent);
            }else{
                setContents(props.content)
            }
        } else {
            setContents(props.content);
        }

        // const filter = event.target.value.toUpperCase();
        // const dropdown = document.getElementById('myDropdown') as HTMLElement;
        // const links = dropdown.getElementsByTagName('a');
        // for (let i = 0; i < links.length; i++) {
        //     const linkText = links[i].textContent || links[i].innerText;
        //     if (linkText.toUpperCase().indexOf(filter) > -1) {
        //         setElementVisible(true);
        //     } else {
        //         setElementVisible(false);
        //     }
        // }
        // setSearchText(filter);
    }

    const Content: any = () =>
        contents.map((content) => (
            <a className="on-hover" onClick={() => handleValueSelect(content)}>
                {content}
            </a>
        ));

    function handleValueSelect(value: string) {
        setSelectedValue(value);
        props.onSelectedValue(value);
        toggleDropdown();
    }

    return (
        <div className="dropdown">
            {/* TODO: refactor this to use already made button and delete dropdown styling */}
            <button onClick={toggleDropdown} ref={catMenu} className="dropbtn" type='button'>
                {selectedValue ? selectedValue : "Dropdown"}
            </button>
            <div
                id="myDropdown"
                className={`dropdown-content ${isDropdownVisible ? "show" : ""}`}
            >
                <input
                    type="text"
                    placeholder="Search.."
                    className='myInput'
                    onChange={filterFunction}
                />
                <Content />
                {/* {elementVisible ? <a href="">a</a> : null}
                <a href="">a</a>
                <a href="">b</a>
                <a href="">c</a>
                <a href="">d</a>
                <a href="">e</a>
                <a href="">f</a> */}
            </div>
        </div>
    );
};

export default Dropdown;


import SearchInput from './SearchInput';
import { useState, useEffect } from 'react';
function SmartSelect({ countries, noOfItems, privilege, SelectedCountry, addAndSelectHandler, selectHandler }) {

    const [showList, setShowList] = useState(false);
    const [searchVal, setsearchVal] = useState('');
    const [List, setList] = useState([]);
    const [listStart, setlistStart] = useState(0);
    const [listEnd, setlistEnd] = useState(0);

    // let List = countries.slice();
    const onClick = (country) => {
        selectHandler(country);
        setShowList(false);
    }

    useEffect(() => {
        setList(countries.slice());
        setlistEnd(noOfItems)
    }, [countries, noOfItems]);

    const handleSearchInput = (e) => {
        let val = e.target.value;
        let fltrVals = countries.filter(cont => cont.name.toLowerCase().includes(val.toLowerCase()));
        setsearchVal(val);
        setList(fltrVals);
        resetListCount();
    }

    const addNewEntry = (country) => {
        addAndSelectHandler(country); // parent component method
        setShowList(false);
        setsearchVal('');
        resetListCount();
    }

    const handleLoadmore = () => {
        if (listEnd >= List.length) { return false }
        let count = listEnd + noOfItems;
        if (count > List.length) {
            count = List.length;
        }
        setlistStart(listStart + noOfItems);
        setlistEnd(count);
    }

    const resetListCount = () => {
        setlistStart(0);
        setlistEnd(noOfItems);
    }

    const handleDropDownClick = () => {
        setShowList(!showList)
        resetListCount();
    }


    return (
        <div className="container">
            <div className="searchable">
                <div className="dropDown" onClick={handleDropDownClick}>
                    <span>{SelectedCountry ? SelectedCountry : 'Select Location'}</span>
                    <i className="fa fa-sort-down iconRight "> </i>
                </div>
                {showList &&

                    <div className="searchDropDown">
                        <SearchInput searchVal={searchVal} handleSearchInput={handleSearchInput} />
                        {List.length
                            ?
                            <div>
                                <ul>
                                    {List.slice(listStart, listEnd).map(loc => <li key={loc.name} onClick={() => onClick(loc.name)} >{loc.name}</li>)}
                                </ul>
                                <span className="moreInfo">{listEnd < List.length ?
                                    <div onClick={handleLoadmore} > {noOfItems} more... </div> : 'end of list'} </span>
                            </div>
                            :
                            <div className="not-found">
                                <span>{`"${searchVal}" not found`}</span>
                                {privilege && <button className="button" onClick={() => addNewEntry(searchVal)}> Add & Select</button>}
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default SmartSelect;
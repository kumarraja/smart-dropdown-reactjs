function SearchInput({searchVal, handleSearchInput}){
    return (
        <div>
        <i className="fa fa-search icon"> </i>
        <input className="searchablInput" value={searchVal} onChange={handleSearchInput} type="text" placeholder="Search..." />
      </div>
    )
} 

export default SearchInput;
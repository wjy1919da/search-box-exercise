import { useState, useEffect } from "react";
import "./App.css";
import useSearchQueryStore from "./store/store";
import useGetDropdownList from "./hooks/useGetDropdownList";
import useFetchDropdownList from "./hooks/useFetchDropdownList";
//search-bar-demo/src/store/store.js

function App() {
  const setTempSearchParam = useSearchQueryStore(
    (state) => state.setTempSearchParam
  );
  const searchQuery = useSearchQueryStore((state) => state.searchQuery);
  const handleInputChange = (e) => {
    setTempSearchParam(e.target.value);
  };
  const handleClickDropdrown = (tagName) => {
    // console.log("event:", tagName);
    setTempSearchParam(tagName);
  };
  const data = useGetDropdownList();
  // const data = useFetchDropdownList();

  // console.log("dropdownList", data);

  return (
    <>
      {/* <button>login</button> */}
      <input
        type="text"
        value={searchQuery.tempSearchParam || ""}
        onChange={handleInputChange}
      />
      {/* {data?.data && ( */}
      {data?.data?.data && (
        <div className="autoComplete-dropDown">
          {/* {data?.data.map((item, index) => ( */}
          {data?.data?.data.map((item, index) => (
            <div onClick={() => handleClickDropdrown(item.tagName)} key={index}>
              {item.tagName}
            </div>
          ))}
        </div>
      )}
      {/* <input type="text" /> */}
    </>
  );
}

export default App;

import { useState, useEffect } from "react";
import useSearchQueryStore from "../store/store";
import useDebounce from "./useDebounce";
const useFetchDropdownList = () => {
  const [data, setData] = useState(null);
  const searchQuery = useSearchQueryStore((state) => state.searchQuery);
  const debounceSearchParam = useDebounce(searchQuery.tempSearchParam, 300);
  const fetchData = async () => {
    const requestBody = {
      currentPage: 1,
      pageSize: 5,
      tag: searchQuery.tempSearchParam,
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1MDciLCJleHAiOjE3MDY1NjA2OTcsImlhdCI6MTcwNjQ3NDI5N30.eho_qOZhPvC5LayYsQIt_tckHnL1H0bMGKe6t3tYdf4",
      },
      body: JSON.stringify(requestBody),
    };
    try {
      const response = await fetch(
        "https://api-dev.charm-life.com/post/fuzzySearchTags",
        config
      );
      // 在 Axios, 是 status
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      // 如果是 Axios 就不用转Json
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Fetching error:", error);
      setData(null);
    }
  };
  useEffect(() => {
    if (debounceSearchParam) {
      // 确保不会在搜索参数为空时发起请求
      fetchData();
    }
  }, [debounceSearchParam]);

  return data;
};
export default useFetchDropdownList;

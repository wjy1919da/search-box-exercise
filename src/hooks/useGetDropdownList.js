import { useState, useEffect } from "react";
import axios from "axios";
import useSearchQueryStore from "../store/store";
import useDebounce from "./useDebounce";

const useGetDropdownList = () => {
  const [data, setData] = useState(null);
  const searchQuery = useSearchQueryStore((state) => state.searchQuery);
  const debounceSearchParam = useDebounce(searchQuery.tempSearchParam, 300);
  const fetchDropdownList = async () => {
    const requestBody = {
      currentPage: 1,
      pageSize: 5,
      tag: searchQuery.tempSearchParam,
    };
    const config = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1MDciLCJleHAiOjE3MDY1NjA2OTcsImlhdCI6MTcwNjQ3NDI5N30.eho_qOZhPvC5LayYsQIt_tckHnL1H0bMGKe6t3tYdf4",
      },
    };
    try {
      // 使用 await 等待 axios.post 请求完成
      const res = await axios.post(
        "https://api-dev.charm-life.com/post/fuzzySearchTags",
        requestBody,
        config
      );

      // 请求成功，使用响应数据
      setData(res);
    } catch (error) {
      // 请求失败，处理错误
      console.log(error);
      setData(null);
    }
  };
  useEffect(() => {
    fetchDropdownList();
  }, [debounceSearchParam]);
  return data;
};
export default useGetDropdownList;

import create from "zustand";

const useSearchQueryStore = create((set) => ({
  searchQuery: {
    tempSearchParam: "",
    realSearchParam: "",
  },
  setTempSearchParam: (tempSearchParam) =>
    set((state) => ({
      searchQuery: { ...state.searchQuery, tempSearchParam },
    })),
  setRealSearchParam: (realSearchParam) =>
    set((state) => ({
      searchQuery: { ...state.searchQuery, realSearchParam },
    })),
}));

export default useSearchQueryStore;

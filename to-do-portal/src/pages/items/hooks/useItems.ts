import { useGetItems } from "./useGetItems";

export const useItems = () => {
  const pageSize = 10;

  const { queryItems, pageNumber, setPageNumber, setFilterQuery, setOrderBy } =
    useGetItems(pageSize);

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const {
    data: itemsResponse,
    isLoading: isLoadingItems,
    refetch: refetchItems,
  } = queryItems;

  return {
    items: itemsResponse?.data,
    totalItems: itemsResponse?.total,
    refetchItems,
    isLoadingItems,
    pageNumber,
    pageSize,
    handlePageChange,
    setFilterQuery,
    setOrderBy,
  };
};

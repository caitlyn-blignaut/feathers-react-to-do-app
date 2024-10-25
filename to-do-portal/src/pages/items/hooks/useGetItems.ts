import { useState } from "react";
import { useApi } from "../../../api/useApi";
import { useQuery } from "@tanstack/react-query";
import { SortDirection } from "../types/SortDirection";
import { Paginated } from "@feathersjs/feathers";
import { Items } from "integration-api";
import { ItemsParams } from "integration-api/lib/services/items/items.class";

export const useGetItems = (pageSize: number) => {
  // const itemsApi = useApi("items");
  const itemsApi = useApi().service("items");
  const [pageNumber, setPageNumber] = useState(1);
  const [orderBy, setOrderBy] = useState({
    field: "dateCreated",
    direction: SortDirection.Ascending,
  });
  const [filterQuery, setFilterQuery] = useState({ field: "", value: "" });

  const getItems = async (
    pageNumber: number,
    orderBy: { field: string; direction: SortDirection },
    filterQuery: { field: string; value: string }
  ): Promise<Paginated<Items>> => {
    const querySort =
      orderBy?.field && orderBy?.direction
        ? { [orderBy.field]: orderBy.direction }
        : undefined;
    const filter =
      filterQuery?.field && filterQuery?.value
        ? { [filterQuery.field]: filterQuery.value }
        : undefined;

    const params: ItemsParams = {
      query: {
        $skip: (pageNumber - 1) * pageSize,
        $sort: querySort,
        ...filter,
      },
    };

    const result = await itemsApi.find(params);

    return result;
  };

  const queryItems = useQuery({
    queryKey: ["items", pageNumber, orderBy, filterQuery],
    queryFn: () => getItems(pageNumber, orderBy, filterQuery),
  });

  return { queryItems, pageNumber, setPageNumber, setOrderBy, setFilterQuery };
};

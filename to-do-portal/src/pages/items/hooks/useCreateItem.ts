import { Items } from "integration-api";
import { useApi } from "../../../api/useApi";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";

type UseCreateItemProps = {
  refetchItems: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<unknown, Error>>;
};

export const useCreateItem = (props: UseCreateItemProps) => {
  const { refetchItems } = props;
  // const itemsApi = useApi("items");
  const itemsApi = useApi().service("items");

  const mutation = useMutation({
    mutationFn: (newItem: Items) => {
      return itemsApi.create(newItem);
    },
    onSuccess: async () => {
      refetchItems();
    },
  });

  return { createItem: mutation };
};

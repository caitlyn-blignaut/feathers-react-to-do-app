import { useApi } from "../../../api/useApi";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { ItemsPatch } from "integration-api";

type UseEditItemProps = {
  id: number;
  refetchItems: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<unknown, Error>>;
};

export const useEditItem = (props: UseEditItemProps) => {
  const { refetchItems, id } = props;
  // const itemsApi = useApi("items");
  const itemsApi = useApi().service("items");

  const mutation = useMutation({
    mutationFn: (item: ItemsPatch) => {
      return itemsApi.patch(id, item);
    },
    onSuccess: async () => {
      refetchItems();
    },
  });

  return { editItem: mutation };
};

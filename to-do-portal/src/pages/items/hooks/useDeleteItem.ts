import { useApi } from "../../../api/useApi";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";

type UseDeleteItemProps = {
  id: number;
  refetchItems: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<unknown, Error>>;
};

export const useDeleteItem = (props: UseDeleteItemProps) => {
  const { refetchItems, id } = props;
  // const itemsApi = useApi("items");
  const itemsApi = useApi().service("items");

  const mutation = useMutation({
    mutationFn: () => {
      return itemsApi.remove(id);
    },
    onSuccess: async () => {
      refetchItems();
    },
  });

  return { deleteItem: mutation };
};

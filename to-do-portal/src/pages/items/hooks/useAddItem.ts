import { Items } from "integration-api";
import { AddItemProps } from "../components/AddItem";
import { useCreateItem } from "./useCreateItem";
import { useForm } from "react-hook-form";

export const useAddItem = (props: AddItemProps) => {
  const { refetchItems } = props;

  const { handleSubmit, register, reset, watch, setValue, control } =
    useForm<Items>();
  const { createItem } = useCreateItem({ refetchItems });

  const onAddClick = (data: Items) => {
    console.log(data);
    createItem.mutate(data);
    reset();
  };

  return {
    handleSubmit,
    onAddClick,
    register,
    watch,
    setValue,
    control,
  };
};

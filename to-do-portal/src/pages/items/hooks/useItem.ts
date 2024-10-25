import { useState } from "react";
import { ItemProps } from "../components/Item";
import { useEditItem } from "./useEditItem";
import { useDeleteItem } from "./useDeleteItem";

export const useItem = (props: ItemProps) => {
  const { item, refetchItems } = props;
  const [editable, setEditable] = useState(false);
  const [text, setText] = useState(item.text);
  const [dueDate, setDueDate] = useState<Date | null>(item.dueDate ?? null);

  const { editItem } = useEditItem({
    id: item.id ?? 0,
    refetchItems: refetchItems,
  });

  const { deleteItem } = useDeleteItem({
    id: item.id ?? 0,
    refetchItems: refetchItems,
  });

  const onCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    editItem.mutate({ checked: event.target.checked });
  };

  const onEditClick = () => {
    setEditable(true);
  };

  const onUpdateClick = () => {
    editItem.mutate({
      text: text,
      dueDate: dueDate ? dueDate : undefined,
    });
    setEditable(false);
  };

  const onDeleteClick = () => {
    deleteItem.mutate();
  };

  return {
    onCheckChange,
    editable,
    dueDate,
    setDueDate,
    text,
    setText,
    onEditClick,
    onUpdateClick,
    onDeleteClick,
  };
};

import { Form, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaCheck, FaInfoCircle, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useItem } from "../hooks/useItem";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import { Items } from "integration-api";

export type ItemProps = {
  item: Items;
  refetchItems: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<unknown, Error>>;
};

export const Item = (props: ItemProps) => {
  const { item } = props;
  const {
    dueDate,
    setDueDate,
    text,
    setText,
    onCheckChange,
    editable,
    onEditClick,
    onUpdateClick,
    onDeleteClick,
  } = useItem(props);

  return (
    <InputGroup className="rounded-0 bg-transparent">
      <InputGroup.Checkbox
        defaultChecked={item.checked}
        onChange={onCheckChange}
      />
      <Form.Control
        defaultValue={text}
        disabled={!editable}
        onChange={(e) => setText(e.currentTarget.value)}
        style={{ textDecorationLine: item.checked ? "line-through" : "" }}
      />
      {editable && (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="SetDueDate">Set due date</Tooltip>}
        >
          <div>
            <DatePicker
              placeholderText="Due date"
              showIcon
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
            />
          </div>
        </OverlayTrigger>
      )}
      {!editable && (
        <InputGroup.Text>
          {dueDate
            ? `Due: ${new Date(dueDate).toLocaleDateString()}`
            : "No due date"}
        </InputGroup.Text>
      )}
      <InputGroup.Text>
        {!editable && (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="EditTodo">Edit</Tooltip>}
          >
            <div onClick={onEditClick}>
              <FaPencilAlt className="me-2" color="info" />
            </div>
          </OverlayTrigger>
        )}
        {editable && (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="UpdateTodo">Update</Tooltip>}
          >
            <div onClick={onUpdateClick}>
              <FaCheck className="me-2" color="info" />
            </div>
          </OverlayTrigger>
        )}
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="DeleteTodo">Delete</Tooltip>}
        >
          <div onClick={onDeleteClick}>
            <FaTrashAlt className="me-2" color="danger" />
          </div>
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id="DateCreated">
              Created:{" "}
              {item.dateCreated
                ? new Date(item.dateCreated).toLocaleString().split(",")
                : ""}
            </Tooltip>
          }
        >
          <div>
            <FaInfoCircle className="me-2" />
          </div>
        </OverlayTrigger>
      </InputGroup.Text>
    </InputGroup>
  );
};

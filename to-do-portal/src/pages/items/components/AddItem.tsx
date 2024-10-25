import {
  Button,
  Card,
  Form,
  FormControl,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { IconContext } from "react-icons";
import { MdAddCircleOutline } from "react-icons/md";
import { useAddItem } from "../hooks/useAddItem";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Controller } from "react-hook-form";

export type AddItemProps = {
  refetchItems: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<unknown, Error>>;
};

export const AddItem = (props: AddItemProps) => {
  const { onAddClick, handleSubmit, register, watch, setValue, control } =
    useAddItem(props);

  const dueDate = watch("dueDate");

  return (
    <div className="pb-2">
      <Card>
        <Form onSubmit={handleSubmit(onAddClick)}>
          <InputGroup>
            <FormControl
              id="text"
              placeholder="To do item"
              {...register("text")}
            />
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="SetDueDate">Set due date</Tooltip>}
            >
              <div>
                <Controller
                  name="dueDate"
                  control={control}
                  defaultValue={dueDate}
                  render={() => {
                    return (
                      <DatePicker
                        placeholderText="Due date"
                        showIcon
                        selected={dueDate ? new Date(dueDate) : null}
                        onChange={(value) =>
                          setValue(
                            "dueDate",
                            value ? value.toISOString() : undefined,
                            {
                              shouldDirty: true,
                            }
                          )
                        }
                      />
                    );
                  }}
                />
              </div>
            </OverlayTrigger>
            <Button
              type="submit"
              variant="outline-secondary"
              disabled={!watch("text")}
            >
              <IconContext.Provider
                value={{
                  size: "25px",
                  style: { verticalAlign: "middle" },
                }}
              >
                <MdAddCircleOutline />
              </IconContext.Provider>
            </Button>
          </InputGroup>
        </Form>
      </Card>
    </div>
  );
};

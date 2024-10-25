import { FormSelect, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { SortDirection } from "../types/SortDirection";

type FilterItemsProps = {
  setFilterQuery: React.Dispatch<
    React.SetStateAction<{
      field: string;
      value: string;
    }>
  >;
  setOrderBy: React.Dispatch<
    React.SetStateAction<{
      field: string;
      direction: SortDirection;
    }>
  >;
};

export const FilterItems = (props: FilterItemsProps) => {
  const { setFilterQuery, setOrderBy } = props;

  return (
    <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
      <p className="small mb-0 me-2 text-muted">Filter</p>
      <FormSelect
        onChange={(value) =>
          setFilterQuery({ field: "checked", value: value.currentTarget.value })
        }
      >
        <option value="">All</option>
        <option value="true">Checked</option>
        <option value="false">Unchecked</option>
      </FormSelect>
      <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>
      <FormSelect
        onChange={(value) =>
          setOrderBy({
            field: value.currentTarget.value,
            direction: SortDirection.Ascending,
          })
        }
      >
        <option value="dateCreated">Date Added</option>
        <option value="dueDate">Due Date</option>
      </FormSelect>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="Ascending">Ascending</Tooltip>}
      >
        <div>
          <FaSortAmountDownAlt className="ms-2" style={{ color: "#23af89" }} />
        </div>
      </OverlayTrigger>
    </div>
  );
};

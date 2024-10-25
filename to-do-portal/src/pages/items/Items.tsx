import {
  Alert,
  Card,
  CardBody,
  Col,
  Container,
  Pagination,
  Row,
} from "react-bootstrap";
import { FaCheckSquare } from "react-icons/fa";
import { AddItem } from "./components/AddItem";
import { FilterItems } from "./components/FilterItems";
import { useItems } from "./hooks/useItems";
import { Item } from "./components/Item";

export const Items = () => {
  const {
    items,
    totalItems,
    refetchItems,
    pageSize,
    pageNumber,
    handlePageChange,
    setFilterQuery,
    setOrderBy,
  } = useItems();

  return (
    <Container className="py-5">
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col>
          <Card
            id="list1"
            style={{ borderRadius: ".75rem", backgroundColor: "#eff1f2" }}
          >
            <CardBody className="py-4 px-4 px-md-5">
              <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                <FaCheckSquare className="me-1" />
                My Todo-s
              </p>
              <AddItem refetchItems={refetchItems} />
              <hr className="my-4" />
              <FilterItems
                setFilterQuery={setFilterQuery}
                setOrderBy={setOrderBy}
              />
              {items &&
                items?.map((item) => {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      refetchItems={refetchItems}
                    />
                  );
                })}
              {items?.length === 0 && (
                <Alert variant={"secondary"}>No items</Alert>
              )}
              {Array.isArray(items) && items?.length > 0 && totalItems && (
                <div
                  className="center"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Pagination className="me-10">
                    {[...Array<number>(Math.ceil(totalItems / pageSize))].map(
                      (_, index) => {
                        return (
                          <Pagination.Item
                            onClick={() => handlePageChange(index + 1)}
                            key={index + 1}
                            active={index + 1 === pageNumber}
                          >
                            {index + 1}
                          </Pagination.Item>
                        );
                      }
                    )}
                  </Pagination>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

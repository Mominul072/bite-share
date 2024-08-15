import { useMemo } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import dayjs from "dayjs";
import { useGetSummarryQuery } from "../../../redux/service/summarryService";
import TableComponent from "../../../component/table/Table";
import { useGetMembarQuery } from "../../../redux/service/membarService";

const Summary = () => {
  const { data: summaryData, isLoading } = useGetSummarryQuery();
  const data1 = summaryData?.data || [];
  const data = data1?.data || [];

  const { data: memberData } = useGetMembarQuery();

  const columns = useMemo(
    () => [
      {
        Header: "S.L",
        accessor: "sl",
        Cell: ({ row }) => row.index + 1,
        classes: "table-user",
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row }) => {
          const findMembarName = memberData?.data?.data.find((b) => b._id === row.original.member);
          return findMembarName ? findMembarName.name : "n/a";
        },
        classes: "table-user",
      },
      {
        Header: "Meal Quantity",
        accessor: "mealQuantity",
        Cell: ({ value }) => value || "n/a",
        classes: "table-user",
      },
      {
        Header: "Meal Rate",
        accessor: "mealRate",
        Cell: ({ value }) => (value !== undefined ? value.toFixed(2) : "n/a"),
        classes: "table-user",
      },
      {
        Header: "Summary Amount",
        accessor: "summaryAmount",
        Cell: ({ value }) => (value !== undefined ? value.toFixed(1) : "n/a"),
        classes: "table-user",
      },
      {
        Header: "Total Cost",
        accessor: "totalCost",
        Cell: ({ value }) => (value !== undefined ? value.toFixed(2) : "n/a"),
        classes: "table-user",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }) => (value ? dayjs(value).format("DD-MM-YYYY") : "n/a"),
        classes: "table-user",
      },
    ],
    [memberData] // dependency array
  );

  return (
    <div className="mx-2 mt-3 border-none">
      <Card>
        <Card.Body>
          <div className="text-center mb-3">
            <h2>Summary Overview</h2>
          </div>
          
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <TableComponent columns={columns} data={data} />
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Summary;

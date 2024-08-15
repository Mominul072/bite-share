import { useMemo } from "react";
import { useGetMembarQuery } from "../../../redux/service/membarService";
import dayjs from "dayjs";
import { Card, Button, Spinner } from "react-bootstrap";
import TableComponent from "../../../component/table/Table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"; // Import icons

const Membar = () => {
  const { data: member, isLoading } = useGetMembarQuery();
  const data = member?.data?.data || []; // Simplified data extraction

  const columns = useMemo(
    () => [
      {
        Header: "S.L",
        accessor: "sl",
        Cell: ({ row }) => row.index + 1,
        className: "table-user",
      },
      {
        Header: "Member",
        accessor: "name",
        Cell: ({ value }) => value || "n/a",
        className: "table-user",
      },
      {
        Header: "Mobile",
        accessor: "mobile",
        Cell: ({ value }) => value || "n/a",
        className: "table-user",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }) => (value ? dayjs(value).format("DD-MM-YYYY") : "n/a"),
        className: "table-user",
      },
      {
        Header: "Updated At",
        accessor: "updatedAt",
        Cell: ({ value }) => (value ? dayjs(value).format("DD-MM-YYYY") : "n/a"),
        className: "table-user",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => value || "n/a",
        className: "table-user",
      },
    ],
    []
  );

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="mx-2 mt-3 border-none">
      <Card>
        <Card.Body>
          <div className="text-center mb-3">
            <h2>Member Details</h2>
          </div>
          <div className="d-flex justify-content-start">
            <Button className="mb-3">Add Member</Button>
          </div>
          <TableComponent columns={columns} data={data} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Membar;

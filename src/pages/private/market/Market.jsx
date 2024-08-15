import { useMemo, useState } from "react";
import { useDeleteMarketMutation, useGetMarketQuery } from "../../../redux/service/marketService";
import TableComponent from "../../../component/table/Table";
import dayjs from "dayjs";
import { Button, Card, Spinner } from "react-bootstrap";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetMembarQuery } from "../../../redux/service/membarService";
import Swal from 'sweetalert2';
import { message } from "antd";
import MarketCreateUpdate from "./MarketCreateUpdate";

export const DEFAULT_MARKET_VALUE = {
  marketDate: "",
  member: "",
  totalPrice: "",
};

const Market = () => {
  const { data: marketData, isLoading: isMarketLoading } = useGetMarketQuery();
  const data1 = marketData?.data || [];
  const data = data1?.data || [];

  const { data: memberData } = useGetMembarQuery();
  const [modal, setModal] = useState(false);
  const [defaultValues, setDefaultValues] = useState(DEFAULT_MARKET_VALUE);
  const [editMarketData, setEditMarketData] = useState(false);
  const [deleteMarket] = useDeleteMarketMutation();

  const toggle = () => {
    if (!modal) {
      setModal(!modal);
    } else {
      setModal(false);
      setDefaultValues(DEFAULT_MARKET_VALUE);
    }
  };

  const ActionColumn = ({ row }) => {
    const edit = () => {
      setDefaultValues({
        ...row.original,
        marketDate: dayjs(row.original.marketDate).format("YYYY-MM-DD"),
      });
      setModal(true);
      setEditMarketData(row.original);
    };

    const remove = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteMarket({ id })
            .unwrap()
            .then(() => {
              message.success("Market deleted successfully");
            })
            .catch((error) => {
              console.error(error);
              message.error("There was an error deleting the market entry.");
            });
        }
      });
    };

    return (
      <>
        <span role="button" className="text-primary mx-2" onClick={() => edit(row)}>
          <EditOutlined />
        </span>
        <span role="button" className="text-danger mx-2" onClick={() => remove(row.original._id)}>
          <DeleteOutlined />
        </span>
      </>
    );
  };

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
        Header: "Total Price",
        accessor: "totalPrice",
        Cell: ({ value }) => value || "n/a",
        classes: "table-user",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }) => (value ? dayjs(value).format("DD-MM-YYYY") : "n/a"),
        classes: "table-user",
      },
      {
        Header: "Market Date",
        accessor: "marketDate",
        Cell: ({ value }) => (value ? dayjs(value).format("DD-MM-YYYY") : "n/a"),
        className: "table-user",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ActionColumn,
        className: "table-action",
      },
    ],
    [memberData]
  );

  if (isMarketLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <div className="mx-2 mt-3 border-none">
        <Card>
          <Card.Body>
            <div className="text-center">
              <h2>Market Details</h2>
            </div>
            <div className="d-flex justify-content-start">
              <Button onClick={() => setModal(true)} className="mb-3">Add Market</Button>
            </div>
            <TableComponent columns={columns} data={data} />
          </Card.Body>
        </Card>
      </div>
      {modal && (
        <MarketCreateUpdate
          modal={modal}
          editMarketData={editMarketData}
          toggle={toggle}
          defaultValues={defaultValues}
          setModal={setModal}
          setEditMarketData={setEditMarketData}
          setDefaultValues={setDefaultValues}
        />
      )}
    </>
  );
};

export default Market;

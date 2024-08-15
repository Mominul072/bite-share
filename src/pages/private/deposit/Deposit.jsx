import  { useMemo, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import TableComponent from "../../../component/table/Table";
import dayjs from "dayjs";
import { useDeleteDepositMutation, useGetDepositQuery } from "../../../redux/service/depositService";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetMembarQuery } from "../../../redux/service/membarService";
import DepositCreateUpdate from "./DepositCreateUpdate";
import Swal from "sweetalert2";
import { message } from "antd";

export const DEFAULT_MEMBER_VALUE = {
  depositDate: "",
  member: "",
  depositAmount: "",
};

const Deposit = () => {
  const { data: depositData, isLoading: isDepositLoading } = useGetDepositQuery();
  const deposits = depositData?.data?.data || [];

  const { data: memberData, isLoading: isMemberLoading } = useGetMembarQuery();
  const [modal, setModal] = useState(false);
  const [defaultValues, setDefaultValues] = useState(DEFAULT_MEMBER_VALUE);
  const [editDepositData, setEditDepositData] = useState(false);

  const [deleteDeposit] = useDeleteDepositMutation();

  const toggle = () => {
    if (!modal) {
      setModal(true);
    } else {
      setModal(false);
      setDefaultValues(DEFAULT_MEMBER_VALUE);
    }
  };

  const ActionColumn = ({ row }) => {
    const edit = () => {
      setDefaultValues({
        ...row.original,
        depositDate: dayjs(row.original.depositDate).format("YYYY-MM-DD"),
      });
      setModal(true);
      setEditDepositData(row.original);
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
          deleteDeposit({ id })
            .unwrap()
            .then(() => {
              message.success("Deposit deleted successfully");
            })
            .catch((error) => {
              console.log(error);
              message.error("There was an error deleting the deposit entry.");
            });
        }
      });
    };

    return (
      <>
        <span role="button" className="text-primary mx-2" onClick={edit}>
          <EditOutlined />
        </span>
        <span
          role="button"
          className="text-danger mx-2"
          onClick={() => remove(row.original._id)}
        >
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
        Header: "Deposit Amount",
        accessor: "depositAmount",
        Cell: ({ value }) => value || "n/a",
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
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }) => (value ? dayjs(value).format("DD-MM-YYYY") : "n/a"),
        classes: "table-user",
      },
      {
        Header: "Deposit Date",
        accessor: "depositDate",
        Cell: ({ value }) => (value ? dayjs(value).format("DD-MM-YYYY") : "n/a"),
        classes: "table-user",
      },
      {
        Header: "Action",
        accessor: "action",
        classes: "table-action",
        Cell: ActionColumn,
      },
    ],
    [memberData]
  );

  if (isDepositLoading || isMemberLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <div className="mx-2 mt-3 border-none">
        <Card.Body>
          <div className="text-center">
            <h2>Deposit Details</h2>
          </div>
          <div className="d-flex justify-content-start">
            <Button onClick={() => setModal(true)} className="mb-3">Add Deposit</Button>
          </div>
          <TableComponent columns={columns} data={deposits || []} />
        </Card.Body>
      </div>
      {modal && (
        <DepositCreateUpdate
          modal={modal}
          editDepositData={editDepositData}
          toggle={toggle}
          defaultValues={defaultValues}
          setModal={setModal}
          setEditDepositData={setEditDepositData}
          setDefaultValues={setDefaultValues}
        />
      )}
    </>
  );
};

export default Deposit;

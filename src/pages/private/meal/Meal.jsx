import { useMemo, useState } from "react";
import {
  useDeleteMealMutation,
  useGetMealQuery,
} from "../../../redux/service/mealService";
import { Button, Card, Spinner } from "react-bootstrap";
import TableComponent from "../../../component/table/Table";
import dayjs from "dayjs";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetMembarQuery } from "../../../redux/service/membarService";
import MealCreateUpdate from "./MealCreateUpdate";
import Swal from "sweetalert2";
import { message } from "antd";

export const DEFAULT_MEAL_VALUE = {
  mealDate: "",
  meals: [],
};

const Meal = () => {
  const { data: mealData, isLoading: isMealLoading } = useGetMealQuery();
  const data1 = mealData?.data?.data || [];

  const { data: memberData, isLoading: isMemberLoading } = useGetMembarQuery();
  const [modal, setModal] = useState(false);
  const [defaultValues, setDefaultValues] = useState(DEFAULT_MEAL_VALUE);
  const [editMealData, setEditMealData] = useState(null);

  const [deleteMeal] = useDeleteMealMutation();

  const toggleModal = () => {
    setModal(!modal);
    if (modal) {
      setDefaultValues(DEFAULT_MEAL_VALUE);
      setEditMealData(null);
    }
  };

  const ActionColumn = ({ row }) => {
    const edit = () => {
      setDefaultValues({
        ...row.original,
        mealDate: dayjs(row.original.mealDate).format("YYYY-MM-DD"),
      });
      setEditMealData(row.original);
      toggleModal();
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
          deleteMeal({ id })
            .unwrap()
            .then(() => {
              message.success("Meal deleted successfully");
            })
            .catch((error) => {
              console.error(error);
              message.error("There was an error deleting the meal entry.");
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
        Header: "Name",
        accessor: "name",
        Cell: ({ row }) => {
          const member = memberData?.data?.data.find(
            (b) => b._id === row.original.member
          );
          return member ? member.name : "n/a";
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
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }) =>
          value ? dayjs(value).format("DD-MM-YYYY") : "n/a",
        classes: "table-user",
      },
      {
        Header: "Meal Date",
        accessor: "mealDate",
        Cell: ({ value }) =>
          value ? dayjs(value).format("DD-MM-YYYY") : "n/a",
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

  if (isMealLoading || isMemberLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
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
              <h2>Meal Details</h2>
            </div>
            <div className="d-flex justify-content-start">
              <Button onClick={toggleModal} className="mb-3">
                Add Meal
              </Button>
            </div>
            <TableComponent columns={columns} data={data1} />
          </Card.Body>
        </Card>
      </div>
      {modal && (
        <MealCreateUpdate
          modal={modal}
          editMealData={editMealData}
          toggle={toggleModal}
          defaultValues={defaultValues}
          setModal={setModal}
          setEditMealData={setEditMealData}
          setDefaultValues={setDefaultValues}
        />
      )}
    </>
  );
};

export default Meal;

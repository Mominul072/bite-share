import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { message } from "antd";
import { useGetMembarQuery } from "../../../redux/service/membarService";
import { useCreateMealMutation } from "../../../redux/service/mealService";

const MealCreateUpdate = ({
  modal,
  toggle,
  editMealData,
  defaultValues,
  setModal,
  setEditMealData,
  setDefaultValues,
}) => {
  const { data: members } = useGetMembarQuery();
  const [createMeal] = useCreateMealMutation();
  const [mealQuantities, setMealQuantities] = useState({});

  const schemaResolver = yup.object().shape({
    mealDate: yup
      .date()
      .required("Please enter the meal date")
      .min(dayjs(), "Meal date must be today or in the future"),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaResolver),
    defaultValues,
  });
  const onSubmit = (FormData) => {
    const { mealDate } = FormData;
    const mealsArray = Object.entries(mealQuantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([memberId, quantity]) => ({
        member: memberId,
        mealQuantity: quantity,
      }));

    if (mealsArray.length === 0) {
      message.error("Please enter a meal quantity for at least one member.");
      return;
    }

    const postBody = {
      mealDate: dayjs(mealDate).toISOString(),
      meals: mealsArray,
    };

    createMeal({ postBody })
      .unwrap()
      .then(() => {
        message.success("Meals created successfully");
        setModal(false);
        setDefaultValues({});
        setEditMealData(null);
      })
      .catch((error) => {
        console.error("Error creating meals:", error);
        message.error(error.data.message.join(", "));
      });
  };

  useEffect(() => {
    if (defaultValues) {
      reset({
        mealDate: defaultValues.mealDate
          ? dayjs(defaultValues.mealDate).format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD"),
      });
    }
  }, [defaultValues, reset]);

  useEffect(() => {
    if (modal) {
      const initialQuantities = members?.data?.data.reduce((acc, member) => {
        acc[member._id] = 0;
        return acc;
      }, {});
      setMealQuantities(initialQuantities);
    }
  }, [modal, members]);

  return (
    <Modal show={modal} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>{editMealData ? "Edit Meal" : "Add Meal"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="my-4">
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="mealDate">Meal Date</Form.Label>
                    <Controller
                      name="mealDate"
                      control={control}
                      render={({ field }) => (
                        <Form.Control
                          {...field}
                          type="date"
                          isInvalid={!!errors.mealDate}
                          autoComplete="off"
                        />
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.mealDate?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={8}>
                  {members?.data?.data.map((member) => (
                    <Row key={member._id}>
                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor={`quantity-${member._id}`}>
                            {member.name}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            id={`quantity-${member._id}`}
                            value={mealQuantities[member._id] || 0}
                            onChange={(e) => {
                              const value = Math.max(
                                0,
                                parseInt(e.target.value, 10)
                              );
                              setMealQuantities((prev) => ({
                                ...prev,
                                [member._id]: value,
                              }));
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Row>
              <Button type="submit" className="w-100">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
};

MealCreateUpdate.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  editMealData: PropTypes.object,
  defaultValues: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
  setEditMealData: PropTypes.func.isRequired,
  setDefaultValues: PropTypes.func.isRequired,
};

export default MealCreateUpdate;

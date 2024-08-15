import React, { useEffect } from "react";
import { Modal, Button, Form, Col, Row, Card } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { message } from "antd";
import {
  useCreateDepositMutation,
  useUpdateDepositMutation,
} from "../../../redux/service/depositService";
import { DEFAULT_MEMBER_VALUE } from "./Deposit";
import { useGetMembarQuery } from "../../../redux/service/membarService";

const DepositCreateUpdate = ({
  modal,
  toggle,
  editDepositData,
  defaultValues,
  setModal,
  setEditDepositData,
  setDefaultValues,
}) => {
  const { data: members } = useGetMembarQuery();
  const [createDeposit, { isSuccess: isCreateSuccess }] =
    useCreateDepositMutation();
  const [editDeposit, { isSuccess: editSuccess }] = useUpdateDepositMutation();

  const schemaResolver = yup.object().shape({
    depositDate: yup.date().required("Please enter the deposit date"),
    member: yup.string().required("Please select a member"),
    depositAmount: yup
      .number()
      .typeError("Deposit amount must be a number")
      .required("Please enter the deposit amount")
      .positive("Deposit amount must be a positive number"),
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaResolver),
    defaultValues,
  });

  // const onSubmit = (formData) => {
  //     if (!editDepositData) {
  //         createDeposit({ postBody: formData });
  //         message.success("Deposit created successfully");
  //     } else {
  //         const postBody = {
  //             depositDate: dayjs(formData.depositDate).toISOString(),
  //             member: formData.member,
  //             depositAmount: formData.depositAmount,
  //         };
  //         editDeposit({ postBody, id: formData._id });
  //         message.success("Deposit updated successfully");
  //     }
  // };

  // const onSubmit = (formData) => {
  //     const postBody = {
  //         depositDate: dayjs(formData.depositDate).toISOString(),
  //         member: formData.member,
  //         depositAmount: parseFloat(formData.depositAmount), // Ensure the amount is a number
  //     };

  //     if (!editDepositData) {
  //         createDeposit({ postBody })
  //             .unwrap()
  //             .then(() => {
  //                 message.success("Deposit created successfully");
  //             })
  //             .catch((error) => {
  //                 message.error(error.data.message.join(", "));
  //             });
  //     } else {
  //         editDeposit({ postBody, id: formData._id })
  //             .unwrap()
  //             .then(() => {
  //                 message.success("Deposit updated successfully");
  //             })
  //             .catch((error) => {
  //                 message.error(error.data.message.join(", "));
  //             });
  //     }
  // };

  // const onSubmit = (formData) => {
  //     const postBody = {
  //         depositDate: dayjs(formData.depositDate).toISOString(),
  //         member: formData.member,
  //         depositAmount: parseFloat(formData.depositAmount), // Ensure the amount is a number
  //     };

  //     if (!editDepositData) {
  //         createDeposit({ postBody })
  //             .unwrap()
  //             .then(() => {
  //                 message.success("Deposit created successfully");
  //             })
  //             .catch((error) => {
  //                 message.error(error.data.message.join(", "));
  //             });
  //     } else {
  //         console.log(`Editing deposit with ID: ${formData._id}`);
  //         editDeposit({ id: formData._id, postBody })
  //             .unwrap()
  //             .then(() => {
  //                 message.success("Deposit updated successfully");
  //             })
  //             .catch((error) => {
  //                 message.error(error.data.message.join(", "));
  //             });
  //     }
  // };
  const onSubmit = (formData) => {
    const postBody = {
      depositDate: dayjs(formData.depositDate).toISOString(),
      member: formData.member,
      depositAmount: parseFloat(formData.depositAmount),
    };

    if (!editDepositData) {
      createDeposit({ postBody })
        .unwrap()
        .then(() => {
          message.success("Deposit created successfully");
        })
        .catch((error) => {
          message.error(error.data.message.join(", "));
        });
    } else {
      // Ensure formData._id is set properly
      if (!editDepositData._id) {
        console.error("Edit Deposit Data does not have an ID");
        message.error("Cannot edit deposit: ID is missing.");
        return;
      }
      console.log(`Editing deposit with ID: ${editDepositData._id}`);
      editDeposit({ id: editDepositData._id, postBody })
        .unwrap()
        .then(() => {
          message.success("Deposit updated successfully");
        })
        .catch((error) => {
          message.error(error.data.message.join(", "));
        });
    }
  };

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues]);

  useEffect(() => {
    if (isCreateSuccess || editSuccess) {
      setModal(false);
      setDefaultValues(DEFAULT_MEMBER_VALUE);
      setEditDepositData(false);
    }
  }, [isCreateSuccess, editSuccess]);

  return (
    <Modal show={modal} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>Add Deposit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="my-4">
          <Card.Body>
            <Card.Title>Form</Card.Title>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="depositDate" className="form-label">
                      Deposit Date
                    </Form.Label>
                    <Controller
                      name="depositDate"
                      control={control}
                      render={({ field }) => (
                        <div className="input-group">
                          <Form.Control
                            {...field}
                            type="date"
                            placeholder="Deposit Date"
                            className={`form-control ${
                              errors.depositDate ? "is-invalid" : ""
                            }`}
                            autoComplete="off"
                          />
                          {errors.depositDate && (
                            <div className="invalid-feedback">
                              {errors.depositDate.message}
                            </div>
                          )}
                        </div>
                      )}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="member" className="form-label">
                      Member
                    </Form.Label>
                    <Controller
                      name="member"
                      control={control}
                      render={({ field }) => (
                        <div className="input-group">
                          <Form.Select
                            {...field}
                            className={`form-control ${
                              errors.member ? "is-invalid" : ""
                            }`}
                          >
                            <option value="">Select Member</option>
                            {members &&
                              members?.data?.data.map((member) => (
                                <option
                                  selected={member._id === field.value}
                                  key={member._id}
                                  value={member._id}
                                >
                                  {member.name}
                                </option>
                              ))}
                          </Form.Select>
                          {errors.member && (
                            <div className="invalid-feedback">
                              {errors.member.message}
                            </div>
                          )}
                        </div>
                      )}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="depositAmount" className="form-label">
                      Deposit Amount
                    </Form.Label>
                    <Controller
                      name="depositAmount"
                      control={control}
                      render={({ field }) => (
                        <div className="input-group">
                          <Form.Control
                            {...field}
                            type="number"
                            placeholder="Deposit Amount"
                            className={`form-control ${
                              errors.depositAmount ? "is-invalid" : ""
                            }`}
                            autoComplete="off"
                          />
                          {errors.depositAmount && (
                            <div className="invalid-feedback">
                              {errors.depositAmount.message}
                            </div>
                          )}
                        </div>
                      )}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" className="btn btn-primary w-100">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
};

DepositCreateUpdate.propTypes = {
  modal: PropTypes.bool,
  toggle: PropTypes.func,
  editDepositData: PropTypes.func,
  defaultValues: PropTypes.object,
  editSuccess: PropTypes.bool,
  editDepositData: PropTypes.bool,
};

export default DepositCreateUpdate;

import React, { useEffect } from "react";
import { useGetMembarQuery } from "../../../redux/service/membarService";
import {
  useCreateMarketMutation,
  useUpdateMarketMutation,
} from "../../../redux/service/marketService";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { message } from "antd";
import PropTypes from "prop-types";
import * as yup from "yup";

const MarketCreateUpdate = ({
  modal,
  toggle,
  editMarketData,
  defaultValues,
  setModal,
  setEditMarketData,
  setDefaultValues,
}) => {
  const { data: members } = useGetMembarQuery();
  const [createMarket, { isSuccess: isCreateSuccess }] =
    useCreateMarketMutation();
  const [editMarket, { isSuccess: editSuccess }] = useUpdateMarketMutation();

  const schemaResolver = yup.object().shape({
    marketDate: yup.date().required("Please enter the market date"),
    member: yup.string().required("Please select a member"),
    totalPrice: yup
      .number()
      .typeError("Market amount must be a number")
      .required("Please enter the market amount")
      .positive("Market amount must be a positive number"),
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

  const onSubmit = (formData) => {
    const postBody = {
      marketDate: dayjs(formData.marketDate).toISOString(),
      member: formData.member,
      totalPrice: parseFloat(formData.totalPrice),
    };

    if (!editMarketData) {
      createMarket({ postBody })
        .unwrap()
        .then(() => {
          message.success("Market created successfully");
        })
        .catch((error) => {
          message.error(error.data.message.join(", "));
        });
    } else {
      console.log(`Editing market with ID: ${formData._id}`);
      editMarket({ id: formData._id, postBody })
        .unwrap()
        .then(() => {
          message.success("Market updated successfully");
        })
        .catch((error) => {
          message.error(error.data.message.join(", "));
        });
    }
  };
  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        marketDate: defaultValues.marketDate
          ? dayjs(defaultValues.marketDate).format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD"),
      });
    }
  }, [defaultValues, reset]);

  useEffect(() => {
    if (isCreateSuccess || editSuccess) {
      setModal(false);
      setDefaultValues({});
      setEditMarketData(null);
    }
  }, [isCreateSuccess, editSuccess]);

  return (
    <Modal show={modal} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>Add Market</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="my-4">
          <Card.Body>
            <Card.Title>Form</Card.Title>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="marketDate" className="form-label">
                      Market Date
                    </Form.Label>
                    <Controller
                      name="marketDate"
                      control={control}
                      render={({ field }) => (
                        <div className="input-group">
                          <Form.Control
                            {...field}
                            type="date"
                            placeholder="Market Date"
                            className={`form-control ${
                              errors.marketDate ? "is-invalid" : ""
                            }`}
                            autoComplete="off"
                          />
                          {errors.marketDate && (
                            <div className="invalid-feedback">
                              {errors.marketDate.message}
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
                    <Form.Label htmlFor="totalPrice" className="form-label">
                      Total Price
                    </Form.Label>
                    <Controller
                      name="totalPrice"
                      control={control}
                      render={({ field }) => (
                        <div className="input-group">
                          <Form.Control
                            {...field}
                            type="number"
                            placeholder="Total Price"
                            className={`form-control ${
                              errors.totalPrice ? "is-invalid" : ""
                            }`}
                            autoComplete="off"
                          />
                          {errors.totalPrice && (
                            <div className="invalid-feedback">
                              {errors.totalPrice.message}
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

MarketCreateUpdate.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  editMarketData: PropTypes.object,
  defaultValues: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
  setEditMarketData: PropTypes.func.isRequired,
  setDefaultValues: PropTypes.func.isRequired,
};

export default MarketCreateUpdate;

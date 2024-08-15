import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/service/auth/authService";
import * as yup from "yup";
import "./Login.css";

const loginSchema = yup.object().shape({
  mobile: yup
    .string()
    .matches(/^[0-9]{11}$/, "Mobile number must be 11 digits!")
    .required("Please input your mobile number!"),
  password: yup.string().required("Please input your Password!"),
});

const DefaultValues = {
  mobile: "01710303309",
  password: "MMS12345",
};

const Login = () => {
  const navigate = useNavigate();
  const [login, { data }] = useLoginMutation();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: DefaultValues,
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    setValue("mobile", DefaultValues.mobile);
    setValue("password", DefaultValues.password);
  }, [setValue]);

  const onSubmit = async (values) => {
    console.log("Received values of form: ", values);
    await login(values);
  };

  useEffect(() => {
    if (data?.data?.token) {
      localStorage.setItem("token", data?.data?.token);
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <Container className="container">
      <div className="form-container">
        <Form className="w-70" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="mb-4 ">Login</h3>
          <Form.Group className="mb-3" controlId="formBasicMobile">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your mobile number"
              {...register("mobile")}
              isInvalid={!!errors.mobile}
            />
            <Form.Control.Feedback type="invalid">
              {errors.mobile?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;

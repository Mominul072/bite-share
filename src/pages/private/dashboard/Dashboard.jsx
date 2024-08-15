import { useGetDashboardQuery } from "../../../redux/service/dashBoardService";
import { Card, Row, Col, Container } from "react-bootstrap";
import { FaUtensils, FaUsers, FaMoneyBill, FaCartPlus } from "react-icons/fa";
import "./dashboard.css"; // Import custom CSS for additional styling

const Dashboard = () => {
  const { data: DashBoradData, isLoading } = useGetDashboardQuery();
  const data1 = DashBoradData?.data || {};

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={6} lg={3} className="mb-4">
          <Card className="text-center shadow-lg h-100">
            <Card.Body>
              <FaUtensils size={50} color="#4CAF50" />
              <Card.Title className="mt-3">Meal Rate</Card.Title>
              {isLoading ? (
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              ) : (
                <Card.Text className="display-6">
                  {data1.mealRate?.toFixed(2)}
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={6} lg={3} className="mb-4">
          <Card className="text-center shadow-lg h-100">
            <Card.Body>
              <FaUsers size={50} color="#2196F3" />
              <Card.Title className="mt-3">Total Active Members</Card.Title>
              {isLoading ? (
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              ) : (
                <Card.Text className="display-6">
                  {data1.totalActiveMember}
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={6} lg={3} className="mb-4">
          <Card className="text-center shadow-lg h-100">
            <Card.Body>
              <FaMoneyBill size={50} color="#FF9800" />
              <Card.Title className="mt-3">Total Cash in Hand</Card.Title>
              {isLoading ? (
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              ) : (
                <Card.Text className="display-6">
                  {data1.totalCashInHand?.toFixed(2)}
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={6} lg={3} className="mb-4">
          <Card className="text-center shadow-lg h-100">
            <Card.Body>
              <FaCartPlus size={50} color="#9C27B0" />
              <Card.Title className="mt-3">Total Cost</Card.Title>
              {isLoading ? (
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              ) : (
                <Card.Text className="display-6">
                  {data1.totalCost?.toFixed(2)}
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={6} lg={3} className="mb-4">
          <Card className="text-center shadow-lg h-100">
            <Card.Body>
              <FaUsers size={50} color="#F44336" />
              <Card.Title className="mt-3">Total Inactive Members</Card.Title>
              {isLoading ? (
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              ) : (
                <Card.Text className="display-6">
                  {data1.totalInActiveMember}
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={6} lg={3} className="mb-4">
          <Card className="text-center shadow-lg h-100">
            <Card.Body>
              <FaUtensils size={50} color="#4CAF50" />
              <Card.Title className="mt-3">Total Meals</Card.Title>
              {isLoading ? (
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              ) : (
                <Card.Text className="display-6">
                  {data1.totalMeal}
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={6} lg={3} className="mb-4">
          <Card className="text-center shadow-lg h-100">
            <Card.Body>
              <FaUtensils size={50} color="#FF5722" />
              <Card.Title className="mt-3">Total Negative Members</Card.Title>
              {isLoading ? (
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              ) : (
                <Card.Text className="display-6">
                  {data1.totalNegativeMember}
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={6} lg={3} className="mb-4">
          <Card className="text-center shadow-lg h-100">
            <Card.Body>
              <FaUtensils size={50} color="#4CAF50" />
              <Card.Title className="mt-3">Total Positive Members</Card.Title>
              {isLoading ? (
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              ) : (
                <Card.Text className="display-6">
                  {data1.totalPositiveMember}
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

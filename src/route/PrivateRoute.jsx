import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (token) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  };
  
  export default PrivateRoute;
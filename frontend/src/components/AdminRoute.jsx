import { Navigate } from "react-router-dom";
 
const AdminRoute = ({ element }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("isAdmin");
 
  return role === "true" ? element : <Navigate to="/" />;
};
 
export default AdminRoute;
import AdminDash from "../components/dashboards/AdminDash";
import RespSidebar from "../components/sidebars/RespSidebar";

/*
---------------------------------------------------------------------------
  Purpose: Displays Admin Home page
  Return: - Responsive sidebar components and admin dashboard 
--------------------------------------------------------------------------
 */
const Admin = () => {
  
    return (
      <>
        <RespSidebar />
        <AdminDash />
      </>
      
      );
}
 
export default Admin;
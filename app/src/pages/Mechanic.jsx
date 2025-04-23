import MechanicDash from "../components/dashboards/MechanicDash";
import MechSidebar from "../components/sidebars/MechSidebar";
/*
---------------------------------------------------------------------------
  Purpose: Displays Mechanic Home page
  Return: - Responsive sidebar components and mechanic dashboard 
--------------------------------------------------------------------------
 */
const Mechanic = () => {
    return (
        <>
        <MechSidebar />
        <MechanicDash />
        </>
      );
}
 
export default Mechanic;
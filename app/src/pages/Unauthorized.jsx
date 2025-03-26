import { Link } from "react-router-dom";

const Unauthorized = () => {
    return (
        <>
        <h1 style={{color: 'orange'}}>401</h1>
        <h2 style={{color: 'white'}}>Error Unauthorized</h2>
        <nav><Link to ='/'>Return</Link></nav>
        </>
      );
}
 
export default Unauthorized;
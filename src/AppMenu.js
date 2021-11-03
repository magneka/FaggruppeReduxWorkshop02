import { useState } from "react";
import { Link } from "react-router-dom";

export const AppMenu = () => {

    const styles = {
      container: {
        backgroundColor: "lightGray",
        fontSize: "20px",
        height: "40px",
        padding: "20px"
      },
      left: {
        display: "block",
        float:"left",
        width: "100px"
      },    
      right: {
        display: "block",
        float: "right",
        width: "300px"
      },   
    };
  

  const [filter, setFilter] = useState('')

  const onFilterChange = (e) => {
      setFilter(e.target.value)
  }
  
  
    return (
      <div style={styles.container}>
        
        <span><Link to="/counter">Counter</Link></span>
        <span><Link to="/CustomerList">Customers</Link></span>
        <span><Link to="/ProductList">Products</Link></span>       
        
        <span style={styles.right}>Filter:
          <input
            value={filter ? filter : ''}
            onChange={onFilterChange}
          />
        </span>
  
      </div>
    )
  }

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TablePage = () => {
  const [tableData, setTableData] = useState([]);
  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    setForceRender(true)
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://spices-2jcs.onrender.com/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log("API Response Data:", response.data.data);
        setTableData(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchUserData();
  }, []);

  // console.log("tableData:", tableData);

  return (
    <div key={forceRender} className="container" style={{ paddingTop: '150px' }}>
      <h1 className="my-4">Inquiry List</h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Number</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={row.id || index} className={row.color === 'black' ? 'table-dark' : ''}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>{row.contactno}</td>
                <td>{row.email}</td>
                <td>{row.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePage;

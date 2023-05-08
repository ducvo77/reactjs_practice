import Table from "react-bootstrap/Table";
import { fetchUserAccount } from "../api/UserService.js";
import { useEffect, useState } from "react";

function Main() {
  const [dataUsers, setDataUsers] = useState([]);

  const getUserAccount = async () => {
    let res = await fetchUserAccount();
    if (res && res.data) setDataUsers(res.data);
  };

  useEffect(() => {
    getUserAccount();
  }, []);

  return (
    <div className="m-5">
      <Table striped bordered hover>
        <thead>
          <tr className="tc">
            <th>ID</th>
            <th>EMAIL</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
          </tr>
        </thead>
        <tbody>
          {dataUsers?.map((item, index) => (
            <tr key={`user-${index}`}>
              <td>{item.id}</td>
              <td>{item.email}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Main;

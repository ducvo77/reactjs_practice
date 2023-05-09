import Table from "react-bootstrap/Table";
import { fetchUserAccount } from "../api/UserService.js";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function Main() {
  const [dataUsers, setDataUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const handlePageClick = (event) => {
    setPage(+event.selected + 1);
  };

  const getUserAccount = async (page) => {
    let res = await fetchUserAccount(page);
    if (res && res.data) {
      setDataUsers(res.data);
      setTotalPages(res.total_pages);
    }
    console.log(res);
  };

  useEffect(() => {
    getUserAccount(page);
  }, [page]);

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
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
}

export default Main;

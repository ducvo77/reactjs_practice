import Table from "react-bootstrap/Table";
import {
  fetchUserAccount,
  postCreateUserAccount,
  updateUserAccount,
  deleteUserAccount,
} from "../api/UserService.js";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Button, Form, Modal } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function Main() {
  const [dataUsers, setDataUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [showModalDelete, setShowModaldelete] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [user, setUser] = useState(null);

  const handleCloseModalDelete = () => setShowModaldelete(false);
  const handleShowModaldelete = (user) => {
    setShowModaldelete(true);
    setUser(user);
  };

  const handleClose = () => {
    setShow(false);
    setName("");
    setModalUpdate(false);
  };
  const handleShow = () => setShow(true);

  const handlePageClick = (event) => {
    setPage(+event.selected + 1);
  };

  const notifySuccess = () =>
    toast.success("Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyfailure = () =>
    toast.error("Err!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const updateUser = (user) => {
    setShow(true);
    setModalUpdate(true);
    setName(user.first_name);
    setUser(user);
  };

  const getUserAccount = async (page) => {
    let res = await fetchUserAccount(page);
    if (res && res.data) {
      setDataUsers(res.data);
      setTotalPages(res.total_pages);
    }
  };

  const handleSaveUser = async () => {
    let res = await postCreateUserAccount(name, job);
    if (res && res.id) {
      // Sucessfully
      setShow(false);
      setName("");
      setJob("");
      notifySuccess();
      setDataUsers([{ first_name: name, id: res.id }, ...dataUsers]);
    } else {
      //failure
      notifyfailure();
    }
  };

  const deleteUser = async () => {
    await deleteUserAccount(user.id);
    const deleteUser = dataUsers.filter((dataUser) => dataUser.id !== user.id);
    setDataUsers(deleteUser);
    notifySuccess();
    // Đối với API thực tế có hỗ trợ xóa dữ liệu
    // await getUserAccount();
    handleCloseModalDelete();
  };
  console.log(user);
  const handleUpdateUser = async () => {
    let res = await updateUserAccount({
      ...user,
      name: name,
    });

    setShow(false);
    // Đối với API thực tế có hỗ trợ cập nhật dữ liệu
    // await getUserAccount();
    let updateData = dataUsers.filter((dataUser) => dataUser.id !== res.id);
    setDataUsers(
      [{ ...user, first_name: res.first_name }, ...updateData].sort(
        (a, b) => a.id - b.id
      )
    );
    notifySuccess();
  };

  useEffect(() => {
    getUserAccount(page);
  }, [page]);

  return (
    <div className="m-5">
      <div className="d-flex justify-content-between mb-2 align-items-end">
        <span className="">#Danh sách user</span>
        <Button variant="primary" onClick={handleShow}>
          Thêm user
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr className="tc">
            <th>ID</th>
            <th>EMAIL</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {dataUsers?.map((item, index) => (
            <tr key={`user-${index}`}>
              <td>{item.id}</td>
              <td>{item.email}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td className="d-flex justify-content-between">
                <Button variant="success" onClick={() => updateUser(item)}>
                  Update
                </Button>

                <Button
                  variant="danger"
                  onClick={() => handleShowModaldelete(item)}
                >
                  Delete
                </Button>
                {/* Modal delete */}
                <Modal
                  backdrop={false}
                  show={showModalDelete}
                  onHide={handleCloseModalDelete}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Xóa phần tử</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Xóa ${user?.email}!</Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={handleCloseModalDelete}
                    >
                      Đóng
                    </Button>
                    <Button variant="danger" onClick={deleteUser}>
                      Xóa
                    </Button>
                  </Modal.Footer>
                </Modal>
                {/* Modal edit, create */}
                <Modal backdrop={false} show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {modalUpdate ? "Cập nhật User" : "Thêm user mới"}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={name}
                          autoFocus
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Job</Form.Label>
                        <Form.Control
                          type="text"
                          value={job}
                          onChange={(e) => setJob(e.target.value)}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      onClick={modalUpdate ? handleUpdateUser : handleSaveUser}
                    >
                      {modalUpdate ? "Sửa đổi" : "Tạo mới"}
                    </Button>
                  </Modal.Footer>
                </Modal>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center ">
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

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default Main;

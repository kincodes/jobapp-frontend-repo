import React, { useRef, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MdNoteAdd } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import "../styles/Dash.css";
import axios from "../api/axios";
import { format } from "date-fns";

const statuses = [
  { value: "Applied", label: "Applied" },
  { value: "Interview", label: "Interview" },
  { value: "Successful", label: "Successful" },
  { value: "No Response", label: "No Response" },
  { value: "Rejected", label: "Rejected" },
];

const Manage = () => {
  const errRef = useRef();

  const [errMsg, setErrMsg] = React.useState("");
  useEffect(() => {
    setErrMsg("");
  }, []);

  const successRef = useRef();
  const [successMsg, setSuccessMsg] = React.useState("");
  useEffect(() => {
    setSuccessMsg("");
  }, []);

  const [validatedAdd, setValidatedAdd] = useState(false);
  const [validatedUpdate, setValidatedUp] = useState(false);
  const [validatedDelete, setValidatedDel] = useState(false);

  const [errorStatus, setErrorStatus] = React.useState("");

  const [filterVal, setFilterVal] = useState("");
  const [searchVal, setSearchVal] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [dateApplied, setDateApplied] = React.useState("");
  const [lastModified, setLastModified] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [jobs, setJobs] = React.useState([]);

  const [showAdd, setShowAdd] = useState(false);
  let handleShowAdd = () => {
    setLastModified(format(Date.now(), "yyyy-MM-dd"));
    setShowAdd(true);
  };

  const handleCloseAdd = () => {
    setShowAdd(false);
    handleClear(true);
  };

  //show edit modal
  const [showEdit, setShowEdit] = useState(false);

  let handleShowEdit = (job) => {
    setShowEdit(true);
    setSearchVal(job.id);
    setPosition(job.position);
    setCompany(job.company);
    setDateApplied(job.dateApplied);
    setLastModified(format(Date.now(), "yyyy-MM-dd"));
    setStatus(job.status);
  };

  // close edit modal
  const handleCloseEdit = () => {
    setShowEdit(false);
    handleClear(true);
  };

  //show delete modal
  const [showDelete, setShowDelete] = useState(false);

  let handleShowDel = (job) => {
    setShowDelete(true);
    setSearchVal(job.id);
    setPosition(job.position);
    setCompany(job.company);
  };

  //close delete modal
  const handleCloseDel = () => {
    setShowDelete(false);
    handleClear(true);
  };

  const handleClear = () => {
    setPosition("");
    setCompany("");
    setDateApplied("");
    setLastModified("");
    setStatus("");
  };

  //validate select
  function validateSelect() {
    if (status.length === 0) {
      setErrorStatus("Please select a valid job status.");
      return false;
    } else {
      setErrorStatus("");
      return true;
    }
  }
  //view all jobs
  useEffect(() => {
    const getJobs = async () => {
      try {
        const repsonse = await axios
          .get("/job/getAll", {})
          .then(function (response) {
            setJobs(response.data);
          });
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing fields");
        } else if (err.response?.status === 401) {
          setErrMsg("Unathorized");
        } else {
          setErrMsg("loading data failed");
        }
      }
    };
    getJobs();
  }, []);

  // add jobs
  const handleSave = async (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (validateSelect() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      const job = {
        position,
        company,
        dateApplied,
        lastModified,
        status,
      };
      //console.log(job);

      try {
        const response = await axios
          .post("/job/add", JSON.stringify(job))
          .then(() => {
            console.log("New job added sucessfully!!");
            setSuccessMsg("Success");
            setShowAdd(false);
          });

        handleClear(true);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing fields");
        } else if (err.response?.status === 401) {
          setErrMsg("Unathorized");
        } else {
          setErrMsg("Saving data failed");
        }
      }
    }
    setValidatedAdd(true);
  };

  // update jobs
  const handleUpdate = async (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (validateSelect() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      const job = {
        position,
        company,
        dateApplied,
        lastModified,
        status,
      };
      // console.log(job);

      try {
        const response = await axios
          .put("/job/update/" + searchVal, JSON.stringify(job))
          .then(() => {
            console.log("Job updated sucessfully!!");
            setSuccessMsg("Success");
            setShowEdit(false);
          });

        handleClear(true);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing fields");
        } else if (err.response?.status === 401) {
          setErrMsg("Unathorized");
        } else {
          setErrMsg("Updating data failed");
        }
      }
    }
    setValidatedUp(true);
  };

  // update jobs
  const handleDelete = async (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();

      try {
        const response = await axios
          .delete("/job/delete/" + searchVal)
          .then(() => {
            console.log("Job deleted!!");
            setSuccessMsg("Success");
            setShowDelete(false);
          });

        handleClear(true);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing fields");
        } else if (err.response?.status === 401) {
          setErrMsg("Unathorized");
        } else {
          setErrMsg("Updating data failed");
        }
      }
    }
    setValidatedDel(true);
  };

  return (
    <section className="wrapper-section">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreeen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <p
        ref={successRef}
        className={successMsg ? "successmsg" : "onscreeen"}
        aria-live="assertive"
      >
        {successMsg}
      </p>

      <div className="content">
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Button className="add-button" onClick={() => handleShowAdd()}>
                <MdNoteAdd className="add-icon" /> Add Job
              </Button>
            </Form.Group>
            <Form.Group as={Col} md="4"></Form.Group>

            <Form.Group as={Col} md="4">
              <Form.Control
                type="search"
                placeholder="Search"
                style={{ marginRight: "20px" }}
                aria-label="Search"
                onChange={(e) => setFilterVal(e.target.value)}
              />
            </Form.Group>
          </Row>
        </Form>
        <Table style={{ marginLeft: "10px", marginRight: "10px" }}>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Role/ Position</th>
              <th>Company</th>
              <th>Date Applied</th>
              <th>Last Modified</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs
              .filter((row) => {
                return (
                  !filterVal.length ||
                  row.id
                    .toString()
                    .toLowerCase()
                    .includes(filterVal.toString().toLowerCase()) ||
                  row.position
                    .toString()
                    .toLowerCase()
                    .includes(filterVal.toString().toLowerCase()) ||
                  row.company
                    .toString()
                    .toLowerCase()
                    .includes(filterVal.toString().toLowerCase()) ||
                  row.status
                    .toString()
                    .toLowerCase()
                    .includes(filterVal.toString().toLowerCase())
                );
              })
              .map((job) => (
                <tr key={job.id}>
                  <td>{job.id}</td>
                  <td>{job.position}</td>
                  <td>{job.company}</td>
                  <td>{job.dateApplied}</td>
                  <td>{job.lastModified}</td>
                  <td>{job.status}</td>
                  <td>
                    {" "}
                    <MdEdit onClick={() => handleShowEdit(job)} /> |{" "}
                    <GiCancel onClick={() => handleShowDel(job)} />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Form noValidate validated={validatedUpdate} onSubmit={handleUpdate}>
            <Modal.Header closeButton>
              <Modal.Title>Update Job</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a role/position.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid company.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                  <Form.Label>Date Applied</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    value={dateApplied}
                    onChange={(e) => setDateApplied(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid date of application.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom05">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    required
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>Select ...</option>
                    {statuses.map((status, optionId) => (
                      <option key={optionId} value={status.label}>
                        {status.label}
                      </option>
                    ))}
                  </Form.Select>
                  <p className="text-danger">{errorStatus}</p>
                </Form.Group>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEdit}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Update Record
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Modal show={showDelete} onHide={handleCloseDel}>
          <Form noValidate validated={validatedDelete} onSubmit={handleDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Job</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom06">
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    readOnly
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom07">
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </Form.Group>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDel}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Delete Record
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Modal show={showAdd} onHide={handleCloseAdd}>
          <Form noValidate validated={validatedAdd} onSubmit={handleSave}>
            <Modal.Header closeButton>
              <Modal.Title>Add Job</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom08">
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a role/position.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom09">
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid company.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom10">
                  <Form.Label>Date Applied</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    value={dateApplied}
                    onChange={(e) => setDateApplied(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid date of application.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom11">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    required
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>Select ...</option>
                    {statuses.map((status, optionId) => (
                      <option key={optionId} value={status.label}>
                        {status.label}
                      </option>
                    ))}
                  </Form.Select>
                  <p className="text-danger">{errorStatus}</p>
                </Form.Group>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAdd}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Add Record
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </section>
  );
};

export default Manage;

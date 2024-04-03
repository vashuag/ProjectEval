import React, { useState, useEffect } from "react";
import { Container, Table, Button, ButtonGroup, Typography, CircularProgress } from "@material-ui/core";
import NavigationBar from "../Components/NavigationBar";
import { evaluateStudent, getAssignedStudents, unassignStudent, lockMarks } from "../utils/api";
import { useNavigate } from "react-router-dom";

const StudentsViewPage = () => {
  let mentor = localStorage.getItem("mentor");
  if (mentor) mentor = JSON.parse(mentor);

  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [evaluatedFilter, setEvaluatedFilter] = useState("all");
  const [loading, setLoading] = useState(false); // State to track loading status

  const fetchStudents = async () => {
    const data = await getAssignedStudents(mentor.id);
    setStudents(data);
    setFilteredStudents(data);
  };

  const filterStudents = (filter) => {
    switch (filter) {
      case "pending":
        setFilteredStudents(
          students.filter(
            (student) =>
              student.evaluated_by === null &&
              (student.idea_marks !== null ||
                student.execution_marks !== null ||
                student.presentation_marks !== null ||
                student.communication_marks !== null)
          )
        );
        break;
      case "evaluated":
        setFilteredStudents(
          students.filter(
            (student) =>
              student.evaluated_by !== null &&
              student.idea_marks !== null &&
              student.execution_marks !== null &&
              student.presentation_marks !== null &&
              student.communication_marks !== null
          )
        );
        break;
      default:
        setFilteredStudents(students);
        break;
    }
  };

  const handleUnassign = async (studentId) => {
    await unassignStudent(mentor.id, studentId);
    await fetchStudents();
  };

  const evaluateStudentn = (studentId) => {
    navigate(`/student-evaluate/${studentId}`);
  };

  const allMarksAssigned = () => {
    return students.every((student) => student.total_marks !== null);
  };

  const handleSubmitAll = async () => {
    if (!allMarksAssigned()) {
      alert("Please assign marks to all students before submitting.");
      return;
    }

    setLoading(true); // Set loading to true before starting submission

    try {
      for (let student of students) {
        await evaluateStudent(mentor.id, student.id);
      }

      await lockMarks(mentor.id);
      alert("Marks for all students have been locked successfully.");
      setLoading(false); // Set loading to false after successful submission
      navigate("/student-view", { replace: true }); // Refresh the page
    } catch (error) {
      console.error("Error submitting all marks:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <>
      <NavigationBar />
      <Container className="mt-3" style={{ maxWidth: "100%", overflowX: "auto" }}>


        <ButtonGroup className="mb-3" variant="outlined">
          <Button
            color={evaluatedFilter === "all" ? "primary" : "default"}
            onClick={() => {
              setEvaluatedFilter("all");
              setFilteredStudents(students);
            }}
          >
            All
          </Button>
          <Button
            color={evaluatedFilter === "pending" ? "primary" : "default"}
            onClick={() => {
              setEvaluatedFilter("pending");
              filterStudents("pending");
            }}
          >
            Pending
          </Button>
          <Button
            color={evaluatedFilter === "evaluated" ? "primary" : "default"}
            onClick={() => {
              setEvaluatedFilter("evaluated");
              filterStudents("evaluated");
            }}
          >
            Evaluated
          </Button>
        </ButtonGroup>
        <Table >

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Idea Marks</th>
              <th>Execution Marks</th>
              <th>Presentation Marks</th>
              <th>Communication Marks</th>
              <th>Total Marks</th>
              <th>Evaluate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.idea_marks ?? "-"}</td>
                <td>{student.execution_marks ?? "-"}</td>
                <td>{student.presentation_marks ?? "-"}</td>
                <td>{student.communication_marks ?? "-"}</td>
                <td>{student.total_marks ?? "-"}</td>
                <td>
                  {student.evaluated_by === null ? (
                    <Button variant="contained" color="primary" onClick={() => evaluateStudentn(student.id)}>Edit</Button>
                  ) : (
                    <Typography variant="body2" color="textSecondary">Evaluated</Typography>
                  )}
                </td>
                <td>
                  <Button variant="contained" color="secondary" onClick={() => handleUnassign(student.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitAll}
          disabled={!allMarksAssigned() || loading} // Disable button when loading
        >
          {loading ? <CircularProgress size={24} /> : "Submit All"}
        </Button>
      </Container>
    </>
  );
};

export default StudentsViewPage;

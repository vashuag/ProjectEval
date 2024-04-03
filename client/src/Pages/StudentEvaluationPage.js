import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import NavigationBar from "../Components/NavigationBar";
import { useNavigate } from "react-router-dom";
import { evaluateStudent, getStudentMarks, markStudent,lockMarks } from "../utils/api";

const StudentEvaluationPage = () => {
  let mentor = localStorage.getItem("mentor");
  if (mentor) mentor = JSON.parse(mentor);

  const navigate = useNavigate();
  const params = useParams();
  const studentId = params.id;

  const [student, setStudent] = useState({
    idea_marks: "",
    execution_marks: "",
    presentation_marks: "",
    communication_marks: "",
    total_marks: "",
  });
  const [loading,setLoading] = useState(false);

  // Function to validate marks entered by the mentor
  const validateMarks = (marks) => {
    return marks >= 0 && marks <= 10;
  };

  // Function to check if all marks are entered
  const allMarksEntered = () => {
    return (
      student.idea_marks !== "" &&
      student.execution_marks !== "" &&
      student.presentation_marks !== "" &&
      student.communication_marks !== ""
    );
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
  
    // Validate marks for each parameter
    if (
      !validateMarks(student.idea_marks) ||
      !validateMarks(student.execution_marks) ||
      !validateMarks(student.presentation_marks) ||
      !validateMarks(student.communication_marks)
    ) {
      alert("Marks should be between 0 and 10.");
      return;
    }
  
    // Ensure that marks are not empty or undefined
    const ideaMarks = student.idea_marks || 0;
    const executionMarks = student.execution_marks || 0;
    const presentationMarks = student.presentation_marks || 0;
    const communicationMarks = student.communication_marks || 0;
  
    await markStudent(mentor.id, student.id, {
      idea_marks: ideaMarks,
      execution_marks: executionMarks,
      presentation_marks: presentationMarks,
      communication_marks: communicationMarks,
    });
    await fetchStudentDetails()
    .then(()=>navigate(`/student-view`));
    setLoading(false)
  };
  
  const handleCompleteEvaluation = async () => {
    if (!allMarksEntered()) {
      return; // Exit if any mark is not entered
    }
  
    await evaluateStudent(mentor.id, student.id);
    await lockMarks(mentor.id); // Lock the marks after evaluation
    navigate("/student-view");
  };
  
  

  const fetchStudentDetails = async () => {
    const data = await getStudentMarks(studentId);
    setStudent({
      ...data,
      idea_marks: data.idea_marks || 0,
      execution_marks: data.execution_marks || 0,
      presentation_marks: data.presentation_marks || 0,
      communication_marks: data.communication_marks || 0,
      // Calculate total marks
      total_marks:
        (parseFloat(data.idea_marks) || 0) +
        (parseFloat(data.execution_marks) || 0) +
        (parseFloat(data.presentation_marks) || 0) +
        (parseFloat(data.communication_marks) || 0),
    });
  };

  useEffect(() => {
    fetchStudentDetails();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchStudentDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavigationBar />
      <Container>
        <form onSubmit={handleSubmit}>
          <Card style={{ margin: "20px auto" }}>
            <Grid container direction="column" alignItems="center">
              <Grid item xs={12} md={6}>
                <h3>{student.name}</h3>
                <p>Email: {student.email}</p>
                <p>Phone: {student.phone}</p>
              </Grid>
            </Grid>
          </Card>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Idea Marks"
                type="number"
                value={student?.idea_marks}
                onChange={(e) =>
                  setStudent({ ...student, idea_marks: e.target.value })
                }
                fullWidth
                variant="outlined"
                margin="normal"
                inputProps={{ min: 0, max: 10 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Execution Marks"
                type="number"
                value={student?.execution_marks}
                onChange={(e) =>
                  setStudent({ ...student, execution_marks: e.target.value })
                }
                fullWidth
                variant="outlined"
                margin="normal"
                inputProps={{ min: 0, max: 10 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Presentation Marks"
                type="number"
                value={student?.presentation_marks}
                onChange={(e) =>
                  setStudent({
                    ...student,
                    presentation_marks: e.target.value,
                  })
                }
                fullWidth
                variant="outlined"
                margin="normal"
                inputProps={{ min: 0, max: 10 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Communication Marks"
                type="number"
                value={student?.communication_marks}
                onChange={(e) =>
                  setStudent({
                    ...student,
                    communication_marks: e.target.value,
                  })
                }
                fullWidth
                variant="outlined"
                margin="normal"
                inputProps={{ min: 0, max: 10 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Total Marks"
                type="number"
                value={student?.total_marks}
                disabled
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Button variant="contained" disabled={loading} color="primary" type="submit">
                Submit
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                onClick={handleCompleteEvaluation}
                disabled={!allMarksEntered()} // Disable button if any mark is not entered
              >
                Complete Evaluation
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default StudentEvaluationPage;

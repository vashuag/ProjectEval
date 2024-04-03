import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Snackbar,
  CardContent, 
  CardActions 
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import NavigationBar from "../Components/NavigationBar";
import { searchMentor } from "../utils/api";
import { useNavigate } from "react-router-dom";

const MentorSelectPage = () => {
  // Get the mentor value from localStorage
  let mentor = localStorage.getItem("mentor");
  if (mentor) mentor = JSON.parse(mentor);

  const navigate = useNavigate();

  // state for search bar input
  const [searchString, setSearchString] = useState("");
  // state for the list of mentors
  const [mentors, setMentors] = useState([]);
  // state for the selected mentor
  const [selectedMentor, setSelectedMentor] = useState(mentor);
  // state for error messages
  const [message, setMessage] = useState("");
  // state for showing/hiding error message
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleMentorSearch = (e) => {
    e.preventDefault();
    // fetch mentors from the server based on search string
    fetchMentors(searchString);
  };

  const handleMentorSelect = (mentor) => {
    setSelectedMentor(
      // select/deselect mentor by updating state
      selectedMentor && selectedMentor.id === mentor.id ? null : mentor
    );
  };

  const handleConfirmSelection = () => {
    if (selectedMentor) {
      // save selected mentor to localStorage
      localStorage.setItem("mentor", JSON.stringify(selectedMentor));

      navigate("/student-select");
    } else {
      // display an alert if no mentor is selected
      setOpenSnackbar(true);
    }
  };

  // Function to search for mentors on the server
  const fetchMentors = async (searchString) => {
    const data = await searchMentor(searchString);
    if (typeof data === "string") {
      // set error message if response is a string
      setMessage(data);
    } else {
      // set list of mentors if response is an array of mentors
      setMentors(data);
    }
  };

  useEffect(() => {
    // fetch all mentors from the server when the component mounts
    fetchMentors("");
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <NavigationBar />
      <Container style={{ marginTop: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              Select Mentor
            </Typography>
            <form onSubmit={handleMentorSearch}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search mentor"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "10px",marginTop: "10px" }}
                onClick={handleMentorSearch}
              >
                Search
              </Button>
            </form>
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              {mentors.map((mentor) => (
                <Grid item key={mentor.id} xs={12} sm={6} md={4}>
                  <Card style={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="h6">{mentor.name}</Typography>
                      <Typography variant="body2">{mentor.email}</Typography>
                      <Typography variant="body2">{mentor.phone}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color={selectedMentor && selectedMentor.id === mentor.id ? "secondary" : "primary"}
                        onClick={() => handleMentorSelect(mentor)}
                      >
                        {selectedMentor && selectedMentor.id === mentor.id ? "Deselect" : "Select"}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            {selectedMentor ? (
              <Card style={{ marginTop: "20px", padding: "10px" }}>
                <CardContent>
                  <Typography variant="h5">Selected Mentor</Typography>
                  <Typography variant="h6">{selectedMentor.name}</Typography>
                  <Typography variant="body2">{selectedMentor.email}</Typography>
                  <Typography variant="body2">{selectedMentor.phone}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleMentorSelect(selectedMentor)}
                  >
                    Deselect
                  </Button>
                </CardActions>
              </Card>
            ) : (
              <Typography variant="h5" style={{ marginTop: "20px" }}>
                No mentor selected
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              onClick={handleConfirmSelection}
            >
              Confirm Selection
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity="error" elevation={6} variant="filled">
          Please select a mentor
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default MentorSelectPage;

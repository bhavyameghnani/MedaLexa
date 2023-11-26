import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useSpeechSynthesis } from "react-speech-kit";
import toast, { Toaster } from "react-hot-toast";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import Spinner from "../ICD/Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://i.pinimg.com/originals/2b/91/91/2b9191c0750915300106a457fddec474.gif)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    //margin: theme.spacing(3, 0, 2),
  },
  card: {
    backgroundColor: "#e2e1fc",
  },
}));

const Affirmations = () => {
  const classes = useStyles();
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [notes, setNotes] = React.useState([]);
  const [response, setResponse] = React.useState([]);
  const [loader, setLoader] = useState(false);
  const { speak } = useSpeechSynthesis();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {}, []);

  function stopCapture() {
    SpeechRecognition.stopListening();
    console.log(transcript);
    const formData = new FormData();
    formData.append("user_question", transcript);
    speak({
      text: "Query has been made for " + transcript,
      rate: 0.9,
    });
    setLoader(true);
    setNotes((prevArray) => [...prevArray, transcript]);

    axios
      .post("http://127.0.0.1:5000/getpatientsummary", formData)
      .then((response) => {
        console.log(response.data);
        setNotes((prevArray) => [...prevArray, response.data.data]);
        setLoader(false);
        speak({
          text: "Response from MexdaLexa is " + response.data.data,
          rate: 0.9,
        });
      })
      .catch((error) => {
        // Handle any errors that occurred during the upload
      });
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      {loader && <Spinner></Spinner>}
      <Container maxWidth="lg" align="center">
        <Grid container component="main" className={classes.root}>
          <CssBaseline />

          <Grid item xs={12} component={Paper} elevation={5}>
            <div className={classes.paper}>
              <img
                alt="mind_note"
                width="80%"
                height="40%"
                src="https://www.pocketprep.com/wp-content/uploads/2021/03/Brain-dumps-and-other-test-day-hacks_post-image-full.jpg"
              />
              <div>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.submit}
                  onClick={SpeechRecognition.startListening}
                >
                  Capture
                </Button>
                &nbsp;
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.submit}
                  onClick={stopCapture}
                >
                  Stop
                </Button>
                &nbsp;
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.submit}
                  onClick={resetTranscript}
                >
                  Reset
                </Button>
                <p>
                  <b>
                    <i>Ask me any query about the patient !!</i>
                  </b>
                </p>
                <h5>{transcript}</h5>
              </div>
              <Container maxWidth="lg">
                <Grid container spacing={4}>
                  {notes.map((note) => (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      style={{ display: "flex" }}
                    >
                      <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                          <Typography
                            gutterBottom
                            variant="body1"
                            component="h1"
                          >
                            {note}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
              {/* {response && <Container maxWidth="lg">
                <Grid container spacing={4}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    style={{ display: "flex" }}
                  >
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="body1" component="h1">
                          {response}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Container>} */}
              <br />
            </div>
          </Grid>
        </Grid>
      </Container>
      <br />
    </React.Fragment>
  );
};
export default Affirmations;

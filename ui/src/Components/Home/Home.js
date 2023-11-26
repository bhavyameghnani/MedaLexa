import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Spinner from "../Spinner";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import axios from "axios";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Button from "@material-ui/core/Button";
import Affirmations from "../Affirmations/Affirmations";
import BigTable from "../Affirmations/BigTable";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(0),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  search: {
    margin: theme.spacing(1),
    width: 600,
  },
  root: {
    maxWidth: 1255,
  },
  media: {
    height: 140,
  },
}));

export default function Home() {
  const classes = useStyles();

  const [loader, setLoader] = React.useState(false);

  return (
    <React.Fragment>
      <CssBaseline />
      {loader && <Spinner></Spinner>}

      <Header title="MedaLexa - powered by GenAI" />
      <main>
        <MainFeaturedPost post={mainFeaturedPost} />

        <TextField
          id="standard-basic"
          variant="outlined"
          multiline
          style={{ margin: 10, width: 700 }}
          placeholder="Patient Profile Search by ID"
        />

        <Typography variant="h6" component="h2" align="center">
          Current value selected by Admin (patient id):
          c3b2e799-5291-dc30-dbfc-679181de00aa
        </Typography>
        <br />
      </main>

      <Container maxWidth="lg">
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <BigTable />
          </Grid>
        </Grid>
      </Container>

      <br/><br/>

      <Grid container item xs={12} spacing={2}>
        <Grid item xs={6} align="center">
          <Container maxWidth="lg" align="center">
            <Affirmations></Affirmations>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="https://www.cloud4c.com/sg/sites/sg/files/2023-01/fundamentals-of-data-analytics-as-a-service-banner.jpg"
                title="GenAI"
              />
              <CardContent>
                <div style={{ align: "center" }}>
                  <AvatarGroup max={6}>
                    <Avatar
                      alt="Travis Howard"
                      style={{ height: "220px", width: "220px" }}
                      src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
                    />
                    <Avatar
                      alt="Travis Howard"
                      style={{ height: "220px", width: "220px" }}
                      src="https://cdn4.iconfinder.com/data/icons/communication-v2/64/number_numero_count_thirty_two-2-512.png"
                    />
                    <Avatar
                      alt="Travis Howard"
                      style={{ height: "220px", width: "220px" }}
                      src="https://cdn.britannica.com/33/4833-050-F6E415FE/Flag-United-States-of-America.jpg"
                    />
                  </AvatarGroup>
                </div>
                <br />
                <Typography variant="h6" component="h2" align="left">
                  Patient ID: c3b2e799-5291-dc30-dbfc-679181de00aa
                </Typography>
                <Typography variant="h6" component="h2" align="left">
                  Birth Date: 23-02-1987, Age: 32
                </Typography>
                <Typography variant="h6" component="h2" align="left">
                  Place: Concord, California
                </Typography>
                <Typography variant="h6" component="h2" align="left">
                  Gender: Male
                </Typography>
                <br />

                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={6}>
                    <Button fullWidth variant="contained" color="primary">
                      Read More
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button fullWidth variant="contained" color="secondary">
                      Capture Symptoms
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
            <CardActions></CardActions>
          </Card>
        </Grid>
      </Grid>
      

      <br />
    </React.Fragment>
  );
}

const mainFeaturedPost = {
  title: "MedaLexa powered by GenAI",
  description:
    "Revolutionize the healthcare industry by optimizing the generation of diagnosis codes ",
  image:
    "https://www.nibm.lk/wp-content/uploads/2021/10/banner-vishwapasla-4.jpg",
  imgText: "main image description",
  linkText: "Continue reading…",
};

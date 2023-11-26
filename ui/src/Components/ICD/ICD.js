import { React, useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import axiosService from "../../Service/api";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { clsx } from "clsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { TypeAnimation } from "react-type-animation";
import Typed from "react-typed";
import { animateScroll } from "react-scroll";
import Typewriter from "typewriter-effect";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import FileUpload from "react-material-file-upload";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Spinner from "./Spinner";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

import Header from "../Home/Header";
import MainFeaturedPost from "../Home/MainFeaturedPost";
import MedicalTestTable from "./MedicalTestTable";

const mainFeaturedPost = {
  title: "MedaLexa ICD Codes Generator & Validator Engine",
  description:
    "GenAI for precise code suggestions & Integration with medical databases for up-to-date information",
  image:
    "https://www.nibm.lk/wp-content/uploads/2021/10/banner-vishwapasla-4.jpg",
  imgText: "main image description",
  linkText: "Continue reading…",
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  typomsg: {
    padding: "5px",
  },
  formControl: {
    margin: "8px",
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: "16px",
  },
  paddingData: {
    padding: "20px",
  },
  paddingData1: {
    padding: "30px 20px 20px 20px",
  },
  photo: {
    gridArea: "photo",
    background: "yellow",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  bacgroundimage: {
    backgroundImage: `url("https://img.freepik.com/free-vector/white-technology-background_23-2148390329.jpg")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  copyIcon: {
    textAlign: "inherit",
    cursor: "pointer",
  },
  bacgroundimageChat: {
    backgroundImage: `url("https://img.freepik.com/free-vector/white-technology-background_23-2148390329.jpg") !important`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },

  textAlignRight: {
    float: "right",
    borderRadius: "20px",
    display: "table",
    backgroundColor: "lightblue",
    margin: "20px",
    padding: "10px",
  },
  textAlignLeft: {
    textAlign: "left",
    borderRadius: "20px",
    display: "inline-block",
    backgroundColor: "lightgrey",
    margin: "20px",
    padding: "10px",
  },
  textAlignRightColor: {
    borderRadius: "20px",
    padding: "20px",
    backgroundColor: "lightblue",
  },
  textAlignLeftColor: {
    borderRadius: "20px",
    padding: "20px",
    backgroundColor: "lightgrey",
  },
  opacity: {
    pointerEvents: "none",
    opacity: 0.5,
  },
  inputMultiline: {
    "& .MuiInputBase-input": {
      height: "100vh", //here add height of your container
    },
  },
});

export default function ICD() {
  const classes = useStyles();
  const [validate_result, setvalidate_result] = useState(false);
  const [files, setFiles] = useState();
  const [file, setFile] = useState();
  const [showpdfpreview, setshowpdfpreview] = useState(false);
  const [loader, setLoader] = useState(false);
  const [promptdata, setpromptdata] = useState([]);

  const [showsna, setshowsna] = useState(false);
  const [backendresponseedit, setbackendresponseedit] = useState([]);
  const [backendresponse, setbackendresponse] = useState([]);

  const [user_prompt, setuser_prompt] = useState([
    {
      name: "Test Reports",
      user_prompt: [
        {
          prompt:
            "Please act like medical specialists and help in summarising the report attached and also generate both types of ICD codes in format - ICD-10-CM (Clinical Modification): <value> & ICD-10-PCS (Procedure Coding System): <value>",
          checked: false,
        },
        
      ],
    },

    
  ]);

  function handleChange(e) {
    console.log(user_prompt);
    console.log(e.target.value);
    console.log(user_prompt[e.target.value].user_prompt);
    setpromptdata(user_prompt[e.target.value].user_prompt);
  }

  function promptsend(e, index, row) {
    let old_prompt = [...promptdata];
    old_prompt[index]["checked"] = e.target.checked;
    setpromptdata(old_prompt);

    console.log("old_prompt", old_prompt);
  }

  function callapifile(e) {
    const formData = new FormData();

    let checked = 0;

    promptdata.map((row, index) => {
      if (row.checked) {
        checked = checked + 1;
      }
    });
    console.log("checked", checked);
    if (checked > 2 || checked == 0) {
      setshowsna(true);
    } else {
      setLoader(true);
      for (let i = 0; i < file.length; i++) {
        formData.append("file", file[i]);
      }
      formData.append("user_question", JSON.stringify(promptdata));

      axios
        .post("http://127.0.0.1:5000/getanswer", formData)
        .then((response) => {
          // setFile()
          console.log(response.data);
          setbackendresponse(response.data.data);
          setbackendresponseedit(response.data.data);

          // Handle the response from the server
          setLoader(false);
        })
        .catch((error) => {
          // Handle any errors that occurred during the upload
        });
    }
  }

  function call_pdf_file(e, file_name) {
    setLoader(true);
    axios
      .get("http://localhost:5000/get_pdf_file?file_name=" + file_name)
      .then((response) => {
        // setFile()
        console.log(response.data);
        setpdf_file_base64(response.data.pdf_file);
        setshowpdfpreview(true);
        // Handle the response from the server
        setLoader(false);
      })
      .catch((error) => {
        // Handle any errors that occurred during the upload
      });
  }
  const handleFileChange = (event) => {
    // const file = event.target.files;
    // console.log("file 1",file)
    setFile(event);
  };

  const [pdf_file_base64, setpdf_file_base64] = useState("");

  function setFileData(e) {
    console.log(e);
    setFiles(e);
  }

  function storePromptedit(e, index) {
    let temp_data = [...backendresponseedit];
    temp_data[index]["answer"] = e.target.value;
    setbackendresponseedit(temp_data);
  }

  function storePrompt(e, index) {
    let old_prompt = [...promptdata];
    old_prompt[index]["prompt"] = e.target.value;
    setpromptdata(old_prompt);
  }

  function handleClose() {
    setshowsna(false);
  }

  return (
    <div>
      {loader && <Spinner></Spinner>}
      <Header title="MedaLexa - powered by GenAI (For Doctors to generate & validate ICD Codes)" />
      <MainFeaturedPost post={mainFeaturedPost} />


      <Container maxWidth="lg">
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <MedicalTestTable/>
          </Grid>
        </Grid>
      </Container>

      <br/><br/>


      <Grid item container lg={12} sm={12} md={12}>
        {showsna && (
          <Snackbar
            ContentProps={{
              sx: {
                background: "red",
              },
            }}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={showsna}
            autoHideDuration={3000}
            onClose={handleClose}
            message="Please select 2 checkbox only"
            // action={action}
          />
        )}

        <Grid
          item
          container
          lg={12}
          sm={12}
          md={12}
          style={{ padding: "10px 0px 20px 0px", display: "contents" }}
        >
          {/* <Grid
            item
            container
            lg={12}
            sm={12}
            md={12}
            className={classes.photo}
            style={{
              padding: "10px 0px 10px 0px",
              marginTop: "10px",
              minHeight: "300px",
              maxHeight: "400px",
              backgroundPosition: "inherit",
              backgroundRepeat: "round",
              backgroundSize: "cover",
              backgroundImage:
                "url(" +
                "https://t3.ftcdn.net/jpg/02/96/61/94/360_F_296619471_iEGweTy9VsokHtbCJsVmyez0d2rocmmA.jpg" +
                ")",
            }}
          ></Grid> */}

          <Grid
            item
            container
            lg={6}
            sm={6}
            md={6}
            style={{
              border: "1px solid lightgrey",
              minHeight: "450px",
              maxHeight: "700px",
              overflow: "auto",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <Grid
              item
              container
              lg={12}
              sm={12}
              md={12}
              style={{ display: "flex" }}
            >
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                style={{ padding: "10px 10px 0px 10px" }}
              >
                {/* <input type="file" multiple accept=".pdf" onChange={handleFileChange} /> */}

                <FileUpload
                  value={file}
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </Grid>

              <Grid
                item
                lg={10}
                md={10}
                sm={10}
                style={{ display: "grid", paddingTop: "10px" }}
              >
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Select Prompt
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    //   value={age}
                    onChange={(e) => handleChange(e)}
                    label="Select Prompt"
                    className={clsx({
                      [classes.opacity]: file == "" || file == undefined,
                    })}
                  >
                    <MenuItem value="0">Generate ICD Codes from Patient Data & Test Reports</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                lg={2}
                md={2}
                sm={2}
                style={{ padding: "25px 10px  0px 10px", display: "block" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className={clsx({
                    [classes.opacity]:
                      file == "" || promptdata.length == 0 || file == undefined,
                  })}
                  onClick={(e) => callapifile(e)}
                >
                  Process
                </Button>
              </Grid>
            </Grid>

            <Grid
              item
              container
              lg={12}
              sm={12}
              md={12}
              style={{ display: "flex" }}
            >
              {promptdata &&
                promptdata.map((row, index) => (
                  <Grid
                    item
                    container
                    lg={12}
                    md={12}
                    sm={12}
                    style={{ display: "flex", padding: "20px 20px 20px 10px" }}
                  >
                    <Grid item container lg={12} md={12} sm={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={row.checked}
                            onChange={(e) => promptsend(e, index, row)}
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label=""
                      />
                    </Grid>

                    <Grid
                      item
                      container
                      lg={12}
                      md={12}
                      sm={12}
                      style={{ display: "grid" }}
                    >
                      <TextField
                        id="outlined-multiline-static"
                        label={"Prompt " + (index + 1)}
                        multiline
                        rows={8}
                        //   defaultValue={row.prompt}
                        variant="outlined"
                        value={row.prompt}
                        onChange={(e) => storePrompt(e, index)}
                      />
                    </Grid>
                  </Grid>
                ))}
            </Grid>
          </Grid>

          <Grid
            item
            container
            lg={6}
            sm={6}
            md={6}
            style={{
              border: "1px solid lightgrey",
              minHeight: "450px",
              maxHeight: "710px",
              overflow: "auto",
            }}
          >
            {backendresponse &&
              backendresponse.map((row, index) => (
                // <Grid item container lg={12} md={12} sm={12} style={{padding:'20px',display:'block'}}>
                //     {/* <Typography style={{padding:'10px',backgroundColor:'lightgrey'}}>Question</Typography>
                //     <br></br>
                //     <Typography style={{padding:'10px 10px 20px 10px'}}>{row.prompt}</Typography> */}

                //     <Typography style={{padding:'10px',backgroundColor:'lightgrey'}}>Answer By Ex-GMO GPT for Prompt {row.question_no}</Typography>
                //     <br></br>
                //     <Typography style={{padding:'10px 10px 10px 10px'}}>{row.answer}</Typography>

                //     </Grid>
                <Grid
                  item
                  container
                  lg={12}
                  md={12}
                  sm={12}
                  style={{ padding: "20px", display: "grid" }}
                >
                  <TextField
                    id="outlined-multiline-static"
                    label={"Answer By Ex-GMO GPT for Prompt " + row.question_no}
                    multiline
                    disabled
                    rows={row.question_no.length / 10}
                    //   defaultValue={row.prompt}
                    variant="outlined"
                    value={row.answer}
                    onChange={(e) => storePromptedit(e, index)}
                  />
                </Grid>
              ))}
          </Grid>

          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            style={{ padding: "15px 10px 10px 10px", display: "flex" }}
          >
            <Grid item lg={10} md={10} sm={10}></Grid>
            <Grid item lg={1} md={1} sm={1}>
              <Button
                variant="contained"
                color="primary"
                className={clsx({
                  [classes.opacity]: backendresponse.length == 0,
                })}
                onClick={(e) => setvalidate_result(true)}
              >
                Validate
              </Button>
            </Grid>

            <Grid item lg={1} md={1} sm={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => setvalidate_result(false)}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>

          {showpdfpreview && validate_result && (
            <Grid
              item
              container
              lg={12}
              sm={12}
              md={12}
              style={{ padding: "10px", display: "block" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => setshowpdfpreview(false)}
                style={{ marginBottom: "10px" }}
              >
                Back
              </Button>
            </Grid>
          )}
          {validate_result && (
            <Grid
              item
              container
              lg={12}
              sm={12}
              md={12}
              style={{ padding: "10px 0px 20px 0px", display: "flex" }}
            >
              <Grid
                item
                container
                lg={6}
                sm={6}
                md={6}
                style={{
                  border: "1px solid lightgrey",
                  minHeight: "700px",
                  maxHeight: "700px",
                  overflow: "auto",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                {!showpdfpreview ? (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead style={{ backgroundColor: "aliceblue" }}>
                        <TableRow>
                          <TableCell>File Name</TableCell>
                          <TableCell>View File</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {file &&
                          file.map((row, index) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell
                                style={{
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                }}
                                onClick={(e) => call_pdf_file(e, row.name)}
                              >
                                View
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Grid
                    item
                    container
                    lg={12}
                    sm={12}
                    md={12}
                    style={{ display: "flex", padding: "20px" }}
                  >
                    <Grid item container lg={12} sm={12} md={12}>
                      <embed
                        src={"data:application/pdf;base64," + pdf_file_base64}
                        style={{ width: "inherit" }}
                      ></embed>
                    </Grid>
                  </Grid>
                )}
              </Grid>

              <Grid
                item
                container
                lg={6}
                sm={6}
                md={6}
                style={{
                  border: "1px solid lightgrey",
                  minHeight: "700px",
                  maxHeight: "700px",
                  overflow: "auto",
                  marginTop: "10px",
                  marginBottom: "10px",
                  display: "block",
                }}
              >
                {backendresponseedit &&
                  backendresponseedit.map((row, index) => (
                    <Grid
                      item
                      container
                      lg={12}
                      md={12}
                      sm={12}
                      style={{ padding: "20px", display: "grid" }}
                    >
                      <TextField
                        id="outlined-multiline-static"
                        label={
                          "Answer By Ex-GMO GPT for Prompt " + row.question_no
                        }
                        multiline
                        rows={row.question_no.length / 10}
                        //   defaultValue={row.prompt}
                        variant="outlined"
                        value={row.answer}
                        onChange={(e) => storePromptedit(e, index)}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

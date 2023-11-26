import React, { useState ,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../Home/Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import Spinner from "../Spinner";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import axiosService from "../../Service/api";
import Grid from "@material-ui/core/Grid";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { clsx } from 'clsx';

import AssistantIcon from "@material-ui/icons/Assistant";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import FileUpload from "react-material-file-upload";
import WorkspaceFeaturedPost from "./WorkspaceFeaturedPost";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  avatarRoot: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
  media: {
    height: 150,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  promotion:
  {
    backgroundImage:`url("https://charmhealthchallenge.com/wp-content/uploads/next-med-2.png")`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover'
  },
  promotion1:
  {
    backgroundImage:`url("https://www.charmhealth.com/newsletter/images/jan2022-charmhealth-101.jpg")`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover'
  },
  promotion2:
  {
    backgroundImage:`url("https://media.licdn.com/dms/image/D4E10AQE6mEO01kBg1w/image-shrink_800/0/1694519240722?e=2147483647&v=beta&t=iE0IY1uKYL62AxEpvEkAxbUmPIwYzy81ggVXIlTd5wQ")`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover'
  }
}));

export default function Workspace() {
  const classes = useStyles();

  const [ideaPrompt, setIdeaPrompt] = useState(
    "Please help in solving the mentioned query by looking into the tech support documents. Please share steps-wise procedure to solve the issue",
    );

  const [loader, setLoader] = React.useState(false);
  const [ideaDetails, setIdeaDetails] = useState();
  const [url, setUrl] = useState();

  const [indexdata, setindexdata] = useState(0);

  const [file1, setFile1] = useState();
  const [file, setFile] = useState();
  const [file2, setFile2] = useState();
  const [userdatachange,setuserdatachange]=React.useState(true)
  const [chatgpthistory,setchatgpthistory]=React.useState([])

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  

  const handleClose1 = (e) => {
    setOpen(false);
    callapi1(e)
    setIdeaPrompt('')
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleIdeaField = (event) => {
    
    setuserquery(event.target.value)
    
  };

  const handleIdeaField1 = (event) => {
    
    setIdeaDetails(event.target.value)
    
  };

  
  const [question_index,setquestion_index]=React.useState(0)

  function handleIdeaDetails(e) {
    
   let old_data_new=[...chatgpthistory]
            console.log("APi old Data",old_data_new)
            old_data_new.push({'response':ideaDetails,'url':url})
            setchatgpthistory(old_data_new)
            setIdeaDetails('')
  }

  function callapi(event)
  {
    setLoader(true)
    let old_data=[...chatgpthistory]
    old_data.push({'response':userquery})
    console.log(" old Data",old_data)
    setchatgpthistory(old_data)

    axiosService.get("generateIdeaDetails?prompt="+userquery).then(
          response => 
          {

            setIdeaDetails(response.data.answer)
            setUrl(response.data.url)
              
            
              setuserquery('')
              setLoader(false)
                      }
          
          )
          .catch(error => 
              
              {
                console.log(error)
                  setLoader(false)
                  let old_data_new=[...chatgpthistory]
                  console.log("APi old Data",old_data_new)
                  old_data_new.push({'response':"Something Went Wrong. Please try again after sometime"})
                  setchatgpthistory(old_data_new)
              }
          )


  }

  function callapi1(event)
  {
    setLoader(true)
  
    axiosService.get("generateIdeaDetails?prompt="+ideaPrompt).then(
          response => 
          {

            setIdeaDetails(response.data.answer)
              
            
              setuserquery('')
              setLoader(false)
                      }
          
          )
          .catch(error => 
              
              {
                console.log(error)
                  setLoader(false)
                  // let old_data_new=[...chatgpthistory]
                  // console.log("APi old Data",old_data_new)
                  // old_data_new.push({'response':"Something Went Wrong. Please try again after sometime"})
                  // setchatgpthistory(old_data_new)
              }
          )


  }
  // function callApi()
  // {
  //   axiosService.post("getresponsetest?question_index="+question_index,chatgpthistory).then(
  //     response => 
  //     {
          
  //         setchatgpthistory(response.data.data)
  //         let oldindex=[...question_index]
  //         oldindex=oldindex+1
  //         setquestion_index(oldindex)   
  //         setTimeout(callApi,2000)
  //     }
      
  //     )
  //     .catch(error => 
          
  //         {
  //           console.log(error)
  //             setLoader(false)
  //             let old_data_new=[...chatgpthistory]
  //             console.log("APi old Data",old_data_new)
  //             old_data_new.push({'response':"Something Went Wrong. Please try again after sometime"})
  //             setchatgpthistory(old_data_new)
  //         }
  //     )
  // }

  

  const handleFileChange = (event) => {
    setFile(event);
  };

  const handleFileChange1 = (event) => {
    setFile1(event);
  };

  const [offer,setoffer]=React.useState(0)
  const handleFileChange2 = (event) => {
    setFile2(event);
  };
  const [userquery,setuserquery]=React.useState('')

  const MINUTE_MS = 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      setoffer(Math.floor(Math.random() * 3));
    }, MINUTE_MS);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      {loader && <Spinner></Spinner>}
      <Header title="MedaLexa Bot Insurance Companies to Validate the ICD Codes" />

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {
            "Do you wish to customise your Prompt? Prompt Engineering is the key to everything!"
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              id="outlined-multiline-static"
              label="Your Prompt"
              multiline
              rows={6}
              fullWidth
              onChange={(e)=>setIdeaPrompt(e.target.value)}
              value={ideaPrompt}
              variant="outlined"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e)=>handleClose1(e)} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <main>
        <WorkspaceFeaturedPost post={mainFeaturedPost} /> <center></center>
        <Container maxWidth align="center">
          <div className={classes.avatarRoot}>
            <Typography color="primary" variant="h6" gutterBottom>
              <b>
                <i>Workspace Contributors:</i>
              </b>
            </Typography>
            <Avatar
              alt="Remy Sharp"
              src="https://media.licdn.com/dms/image/C4D03AQF9mLPOG-UkSA/profile-displayphoto-shrink_400_400/0/1595870041988?e=1695859200&v=beta&t=3yeqGiFHW80XksNBszcVUzr54lE1RMxx2VrtGZyMr40"
            />
            <Avatar
              alt="Travis Howard"
              src="https://media.licdn.com/dms/image/C4D03AQH_eyBZ31bdCA/profile-displayphoto-shrink_400_400/0/1627129228561?e=1695859200&v=beta&t=9kyL0kmxVFlvI2Z6vK6jvBEqvlCnLXqhQi6yAjmlvko"
            />
            <Avatar
              alt="Travis Howard"
              src="https://media.licdn.com/dms/image/D4D03AQEhAsaviJSCMg/profile-displayphoto-shrink_100_100/0/1682155391773?e=1695859200&v=beta&t=huJhWXZpOCDUeQHVFZqYMV0GHCsodDZ1jAcObxKhToc"
            />
            <Avatar
              alt="Cindy Baker"
              src="https://media.licdn.com/dms/image/D4E03AQHLgz81wUXPmg/profile-displayphoto-shrink_100_100/0/1669743796427?e=1695859200&v=beta&t=WC6mcR7NXaOibvUfjxI8pn5PA9vuCVNfgoIqbMzs83A"
            />
            <Avatar
              alt="Remy Sharp"
              src="https://media.licdn.com/dms/image/C4D03AQFZzlKALf-yhg/profile-displayphoto-shrink_100_100/0/1663861197639?e=1695859200&v=beta&t=6v8E0N_NrnNbHjMtXITy2elUdtp4oOnkNLic2UkCP1s"
            />
            <Avatar
              alt="Travis Howard"
              src="https://media.licdn.com/dms/image/C5603AQHU-WsNy7f7Og/profile-displayphoto-shrink_100_100/0/1613056323665?e=1695859200&v=beta&t=bQ9GF1UsmPAB3OyDbag7IxFVfFHjXoDxL605i3ag3dk"
            />
            <Avatar
              alt="Cindy Baker"
              src="https://media.licdn.com/dms/image/D4D03AQHyG7KEszqt3Q/profile-displayphoto-shrink_100_100/0/1675850258776?e=1695859200&v=beta&t=tNrpkzpbt6tNE-rdhasnuj21vKLTh6pPMWfcLrl6L9o"
            />
            <Typography color="primary" variant="h6" gutterBottom>
              <b>
                <i>Connect with Emergency Services:</i>
              </b>
            </Typography>
            <AvatarGroup max={6}>
              <Avatar
                alt="Travis Howard"
                src="https://static.vecteezy.com/system/resources/previews/022/613/026/original/google-play-store-icon-logo-symbol-free-png.png"
              />
              <Avatar
                alt="Cindy Baker"
                src="https://cdn-icons-png.flaticon.com/512/3670/3670151.png"
              />
              <Avatar
                alt="Cindy Baker"
                src="https://static-00.iconduck.com/assets.00/instagram-icon-2048x2048-uc6feurl.png"
              />
              <Avatar
                alt="Cindy Baker"
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              />
              <Avatar
                alt="Cindy Baker"
                src=" https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png "
              />
              <Avatar
                alt="Cindy Baker"
                src=" https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png "
              />
              <Avatar
                alt="Cindy Baker"
                src=" https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png "
              />
            </AvatarGroup>
          </div>
          <br />
          <Grid container spacing={3}>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={4}>
                      <Typography color="secondary" variant="h6" gutterBottom>
                        <b>Medical & Domain related documents</b>
                      </Typography>
                      <FileUpload
                        value={file}
                        accept="application/pdf"
                        onChange={handleFileChange}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="secondary" variant="h6" gutterBottom>
                        <b>Consulting report and Knowledge Inventory</b>
                      </Typography>
                      <FileUpload
                        value={file1}
                        accept="application/pdf"
                        onChange={handleFileChange1}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="secondary" variant="h6" gutterBottom>
                        <b>Hospital Structure, Medicine lists</b>
                      </Typography>
                      <FileUpload
                        value={file2}
                        accept="application/pdf"
                        onChange={handleFileChange2}
                      />
                    </Grid>
                  </Grid>
                  
                </Paper>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={2}>
             
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                <Typography style={{borderBottom:'2px solid lightgrey',textAlign:'left',fontWeight:'bolder'}}
                
                
                className="blink">News & Feeds</Typography>
                  <Grid item container lg={12} sm={12} md={12} 
                  
                 

                  className={clsx( {                  
                    [classes.promotion]: (offer==0),    
                    [classes.promotion1]: (offer==1),              

                    [classes.promotion2]: (offer==2),              

                    
                  })}
                  
                  style={{minHeight:'255px',marginTop:'10px',maxHeight:'255px',overflow:'auto',border:'1px solid lightgrey'}}>

                    
                    
                  </Grid>
                  <Grid style={{paddingTop:'20px'}}
                  
                  ></Grid>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    id="outlined-multiline-static"
                    label="Query"
                    multiline
                    maxRows={1}
                    fullWidth
                    value={userquery}
                    variant="outlined"
                    onChange={(e) => handleIdeaField(e)}
                    onKeyPress={event => {
                      if (event.key === 'Enter') {
                          callapi(event)
                      }
                    }}                  />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Grid item container lg={12} sm={12} md={12} style={{minHeight:'365px',maxHeight:'365px',overflow:'auto',border:'1px solid lightgrey',display:'block'}}>


                    {chatgpthistory && chatgpthistory.map((row,index)=>
                    
                    (
                      <Grid item container lg={12} sm={12} md={12}>

                        {index%2==0 && <Grid lg={12} md={12} sm={12} style={{textAlign:'right',padding:'10px 10px 0px 10px',marginLeft:'100px'}}>

                          
                          
                          <p style={{border:'1px solid lightgrey',padding:'5px',borderRadius:'10px',backgroundColor:'lightgrey'}}>{row.response}</p></Grid>}
                        {index%2!=0 && <Grid lg={12} md={12} sm={12} style={{textAlign:'left',padding:'0px 10px 10px 10px',marginRight:'100px'}}>
                          
                        <p style={{border:'1px solid lightgrey',padding:'5px',borderRadius:'10px',backgroundColor:'lightblue',
                      display: 'grid' ,whiteSpace: 'pre-wrap',wordWrap:'break-word'
                      }}>{row.response}</p>
                          </Grid>}


                          {row.url &&    <img style={{width:'25%',marginLeft:'6%'}}src={row.url} alt="Chat Conversation " />}

                        </Grid>
                    )
                    )}

                    {chatgpthistory.length==0 && 
                    
                    <Grid item container lg={12} sm={12} md={12}>
                          <img style={{width:'53%',marginLeft:'26%'}}src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYm1ycmNoam1zODBhbGlyc3M1eW92NzB3OHc5a2hxa2dyNGNtMjN4cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/oH9EpHYhOtlIZipqpk/giphy.gif" alt="Chat Conversation " />

                      </Grid>
                    
                    
                    }
                  </Grid>
                  {/* <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    id="outlined-multiline-static"
                    label="Your Query"
                    multiline
                    rows={12}
                    defaultValue={"Chatbot will come here"}
                    fullWidth
                    value={ideaDetails}
                    variant="outlined"
                    onChange={(e) => handleIdeaField(e)}
                  /> */}
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={2}>
                      <EmojiObjectsIcon
                        color="secondary"
                        fontSize="medium"
                      ></EmojiObjectsIcon>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography variant="h6" gutterBottom>
                        MedaLexa Bot Real-time Response Generator
                      </Typography>
                    </Grid>
                  </Grid>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    id="outlined-multiline-static"
                    label="Response from Gen AI"
                    multiline
                    rows={12}
                    fullWidth
                    value={ideaDetails}
                    variant="outlined"
                    onChange={(e) => handleIdeaField1(e)}
                  />
                  <br /> <br />
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={2} style={{cursor:'pointer'}}>
                      <AssistantIcon
                        color="secondary"
                        fontSize="large"
                        onClick={handleClickOpen}
                      />
                    </Grid>
                    <Grid item xs={10} style={{cursor:'pointer'}}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={(e)=>handleIdeaDetails(e)}
                      >
                        Enhance Response using MedaLexa Bot
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

const mainFeaturedPost = {
  title: "MedaLexa Validator Engine for Insurance Claims",
  description:
    "Secure data exchange for insurance companies to verify diagnosis codes & Real-time feedback on code accuracy to streamline claims processing",
  image:
    "https://media.licdn.com/dms/image/D5612AQG-FsJ_6TJPuA/article-cover_image-shrink_720_1280/0/1679628763431?e=2147483647&v=beta&t=6cM4C82xiRe7XMavhoNQYGsjSd2ZgrAsE4StFT8J_VE",
  imgText: "main image description",
  linkText: "Continue reading…",
};

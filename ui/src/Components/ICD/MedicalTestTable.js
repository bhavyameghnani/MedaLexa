import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(
  patientid,
  testid,
  testname,
  date,
  doctor,
  device,
  result,
  note
) {
  return { patientid, testid, testname, date, doctor, device, result, note };
}

const rows = [
    createData('c3b2e799-5291-dc30-dbfc-679181de00aa','Test001', 'MRI Scan', '2023-10-01', 'Dr. Smith', 'MRI Machine', 'Torn ACL in the left knee', 'MRI scan revealed a torn ACL in the patient\'s left knee. Further consultation with an orthopedic specialist recommended.'),
    createData('c3b2e799-5291-dc30-dbfc-679181de00aa','Test002', 'X-ray', '2023-10-05', 'Dr. Johnson', 'X-ray Machine', 'Fracture in the tibia', 'X-ray examination identified a fracture in the patient\'s tibia. Casting and immobilization advised for recovery.'),
    createData('c3b2e799-5291-dc30-dbfc-679181de00aa','Test003', 'Ultrasound', '2023-10-10', 'Dr. Davis', 'Ultrasound Machine', 'Soft tissue damage in the ligament', 'Ultrasound examination showed soft tissue damage in the ligament. Physical therapy recommended for rehabilitation.'),
    createData('c3b2e799-5291-dc30-dbfc-679181de00aa','Test004', 'CT Scan', '2023-10-15', 'Dr. Anderson', 'CT Scan Machine', 'Confirmation of ligament tear and assessment of surrounding structures', 'CT scan confirmed the ligament tear and provided detailed assessment of surrounding structures. Surgical intervention discussed with the patient.'),
    createData('c3b2e799-5291-dc30-dbfc-679181de00aa','Test005', 'Physical Examination', '2023-10-20', 'Dr. Miller', 'None', 'Evaluation of range of motion and joint stability', 'Physical examination conducted to assess the patient\'s range of motion and joint stability. Exercise regimen prescribed for strengthening.'),
    createData('c3b2e799-5291-dc30-dbfc-679181de00aa','Test006', 'Blood Test', '2023-10-25', 'Dr. Wilson', 'Blood Testing Equipment', 'Rule out infection and assess overall health', 'Blood test performed to rule out infection and assess overall health. No abnormalities detected; patient advised to continue with prescribed medications.'),
    createData('c3b2e799-5291-dc30-dbfc-679181de00aa','Test007', 'Arthroscopy', '2023-10-30', 'Dr. White', 'Arthroscopy Equipment', 'Direct visualization of the ligament and joint structures', 'Arthroscopy procedure conducted for direct visualization of the ligament and joint structures. Surgical options discussed for ligament repair.'),
    createData('c3b2e799-5291-dc30-dbfc-679181de00aa','Test008', 'Electromyography (EMG)', '2023-11-05', 'Dr. Brown', 'EMG Machine', 'Assessment of nerve function in the affected area', 'EMG performed to assess nerve function in the affected area. Results indicate nerve integrity, and physical therapy recommended for nerve recovery.'),
    createData('c3b2e799-5291-dc30-dbfc-679181de00aa','Test009', 'Bone Density Test', '2023-11-10', 'Dr. Taylor', 'Bone Densitometer', 'Evaluation of bone health and density', 'Bone density test conducted to evaluate bone health and density. No signs of osteoporosis detected; patient advised on maintaining bone health.'),
    createData('c3b2e799-5291-dc30-dbfc-679181de00aa','Test010', 'Functional Movement Assessment', '2023-11-15', 'Dr. Harris', 'Motion Capture System', 'Analysis of movement patterns and biomechanics', 'Functional movement assessment performed to analyze movement patterns and biomechanics. Personalized exercise plan provided for improved functional mobility.')
    
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function MedicalTestTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Patient ID)</StyledTableCell>
            <StyledTableCell align="right">Test ID</StyledTableCell>
            <StyledTableCell align="right">Test Name</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Doctor</StyledTableCell>
            <StyledTableCell align="right">Device Used</StyledTableCell>
            <StyledTableCell align="right">Results</StyledTableCell>
            <StyledTableCell align="right">Doctor's Note</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.patientid}>
              <StyledTableCell component="th" scope="row">
                {row.patientid}
              </StyledTableCell>
              <StyledTableCell align="right">{row.testid}</StyledTableCell>
              <StyledTableCell align="right">{row.testname}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
              <StyledTableCell align="right">{row.doctor}</StyledTableCell>
              <StyledTableCell align="right">{row.device}</StyledTableCell>
              <StyledTableCell align="right">{row.result}</StyledTableCell>
              <StyledTableCell align="right">{row.note}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

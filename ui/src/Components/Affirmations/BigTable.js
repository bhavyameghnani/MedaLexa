import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(name, duration, condition, devices, allergy, medication, immunization) {
  return { name, duration, condition, devices, allergy, medication,immunization };
}

// const rows = [
//   createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '1 month ago', 'Sprain (morphologic abnormality)','Blood glucose meter (physical object)', 'Shellfish (substance) allergy by food', 'Oxycodone Hydrochloride 10 MG Oral Tablet', 'Influenza  seasonal  injectable'),
//   createData('c3b2e799-5291-dc30-dbfc-679181de00aa','2 month ago', 'Sprain of ankle', 'Blood glucose meter (physical object)','SNOMED-CT Mold (organism) allergy by environment','Penicillin V Potassium 500 MG Oral Tablet', 'zoster vaccine live'),
//   createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '1 month ago', 'Acute bronchitis (disorder)', 'Oxygen concentrator (physical object)', 'Sulfamethoxazole / Trimethoprim allergy by medication', 'Acetaminophen 325 MG Oral Tablet', 'zoster vaccine live'),
//   createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '15 days ago', 'Chronic low back pain (finding)', 'Manual wheelchair (physical object)', 'SNOMED-CT Mold (organism) allergy by environment', 'Penicillin V Potassium 500 MG Oral Tablet', 'Influenza  seasonal  injectable')
// ];

const rows = [
    createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '15 years ago', 'Pediatric Checkup', 'Stethoscope (physical object)', 'None', 'None', 'None'),
createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '14 years ago', 'Common Cold', 'Thermometer (physical object)', 'Pollen (substance) allergy by environment', 'Acetaminophen 500 MG Oral Tablet', 'None'),
createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '13 years ago', 'Toothache', 'Dental mirror (physical object)', 'None', 'Ibuprofen 200 MG Oral Tablet', 'None'),
createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '12 years ago', 'Ankle Twist', 'Crutches (physical object)', 'None', 'Naproxen 220 MG Oral Tablet', 'None'),
createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '11 years ago', 'Headache', 'None', 'Dust mite (substance) allergy by environment', 'Aspirin 81 MG Oral Tablet', 'None'),
createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '10 years ago', 'Stomachache', 'None', 'Lactose (substance) allergy by food', 'Antacid Tablet', 'None'),
createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '9 years ago', 'Infection', 'None', 'Penicillin (medication) allergy by medication', 'Amoxicillin 500 MG Oral Tablet', 'None'),
createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '8 years ago', 'Allergic Rhinitis', 'Nebulizer (physical object)', 'Pollen (substance) allergy by environment', 'Fluticasone Propionate 50 MCG/ACTUAT Nasal Spray', 'None'),
createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '7 years ago', 'Sprained Knee', 'Knee brace (physical object)', 'None', 'Ibuprofen 400 MG Oral Tablet', 'None'),
createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '6 years ago', 'Migraine', 'None', 'Chocolate (substance) allergy by food', 'Sumatriptan 50 MG Oral Tablet', 'None'),
createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '5 years ago', 'Ear Infection', 'Otoscope (physical object)', 'None', 'Amoxicillin 500 MG Oral Tablet', 'None'),
createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '4 years ago', 'Dental Checkup', 'Dental chair (physical object)', 'None', 'None', 'None'),
createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '3 years ago', 'Allergic Conjunctivitis', 'Eye drops (physical object)', 'Dust mite (substance) allergy by environment', 'Antihistamine Eye Drops', 'None'),
createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '2 years ago', 'Stomach Flu', 'None', 'Shellfish (substance) allergy by food', 'Ondansetron 4 MG Oral Tablet', 'Influenza vaccine'),
createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '1 year ago', 'Broken Tooth', 'Dental X-ray (physical object)', 'None', 'None', 'None'),
createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '6 months ago', 'Concussion', 'CT Scan (physical object)', 'None', 'Acetaminophen 500 MG Oral Tablet', 'None'),
createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '5 months ago', 'Gastroenteritis', 'IV Drip (physical object)', 'Lactose (substance) allergy by food', 'None', 'None'),
createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '4 months ago', 'Pneumonia', 'Oxygen mask (physical object)', 'Penicillin (medication) allergy by medication', 'Amoxicillin 500 MG Oral Tablet', 'Influenza vaccine'),
createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '3 months ago', 'Ligament Tear', 'Knee brace (physical object)', 'None', 'Ibuprofen 600 MG Oral Tablet', 'None'),
createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '2 months ago', 'Ligament Tear', 'Crutches (physical object)', 'None', 'Naproxen 220 MG Oral Tablet', 'Influenza vaccine'),
createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '1 month ago', 'Ligament Tear', 'MRI (physical object)', 'None', 'Oxycodone Hydrochloride 10 MG Oral Tablet', 'None')

]

export default function BigTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><b>Patient ID</b></TableCell>
            <TableCell><b>Duration</b></TableCell>
            <TableCell><b>Conditions</b></TableCell>
            <TableCell align="right"><b>Devices</b></TableCell>

            <TableCell align="right"><b>Allergies</b></TableCell>
            <TableCell align="right"><b>Medications</b></TableCell>
            <TableCell align="right"><b>Immunization</b></TableCell>
       
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.duration}</TableCell>
              <TableCell align="right">{row.condition}</TableCell>
              <TableCell align="right">{row.devices}</TableCell>
              <TableCell align="right">{row.allergy}</TableCell>
              <TableCell align="right">{row.medication}</TableCell>
              <TableCell align="right">{row.immunization}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
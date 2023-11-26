import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(name, duration, condition, devices) {
  return { name, duration, condition, devices };
}

const rows = [
  createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '1 month ago', 'Sprain (morphologic abnormality)','Blood glucose meter (physical object)'),
  createData('c3b2e799-5291-dc30-dbfc-679181de00aa','2 month ago', 'Sprain of ankle (left)', 'Blood glucose meter (physical object)'),
  createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '1 month ago', 'Acute bronchitis (disorder)', 'Oxygen concentrator (physical object)'),
  createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '15 days ago', 'Chronic low back pain (finding)', 'Manual wheelchair (physical object)'),
  createData('c3b2e799-5291-dc30-dbfc-679181de00aa', '30 days ago', 'Chronic low back pain (finding)', 'Automatic wheelchair')
];

export default function ConditionDeviceTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><b>Patient ID</b></TableCell>
            <TableCell><b>Duration</b></TableCell>
            <TableCell><b>Conditions</b></TableCell>
            <TableCell align="right"><b>Devices</b></TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
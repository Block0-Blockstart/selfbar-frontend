import React from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

import { Title } from '../../shared/Title';
import { toIsoDate } from '../../utils/date';

// Generate Data
function createData(id, name, onboardDate) {
  return { id, name, onboardDate };
}

/* eslint-disable prettier/prettier */
const mock = [
  createData(0,     'Super Invest SA', 1652542166842),
  createData(1,     'Beer Universe SCRL', 1653994659590),
  createData(2,     'Howard Wolowitz', 1654260905220),
  createData(3,     'Raj Koothrappali', 1659042594382),
  createData(4,     'Amy Farrah Fowler', 1659238681274),
  createData(5,     'Easy Drink SPRL', 1661078589939),
  createData(6,     'Rocket Launch BVBA', 1661460685797),
  createData(7,     'Thomas A. Anderson', 1661743559045),
  createData(8,     'Mathilde de Belgique', 1663520165264),
  createData(9,     'Brazilian Beer Association', 1664016243886),
  createData(10,    'Sheldon Cooper', 1664638725402),
  createData(11,    'Ariane de Libioul', 1664817200931),
  createData(12,    'Leonard Hofstadter', 1665302634745),
];
/* eslint-enable prettier/prettier */

// //generate timestamps between may 14 and oct 14
// const vals = Array(12)
//   .fill('')
//   .map(_v => 1652542166842 + Math.round(Math.random() * 13219200000))
//   .sort();
// console.log(vals);

export function StakeholdersTable() {
  return (
    <>
      <Title>Stakeholders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Onboard since</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mock.map(sh => (
            <TableRow key={sh.id}>
              <TableCell>{sh.name}</TableCell>
              <TableCell align="right">
                <Typography>{toIsoDate(sh.onboardDate)}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

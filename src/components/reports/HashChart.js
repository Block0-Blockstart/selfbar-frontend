import React, { useEffect, useState } from 'react';
import { CartesianGrid, Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';

import { getHashesByDayFrom } from '../../services/notarizationService';
import { DropList } from '../../shared/DropList';
import { Title } from '../../shared/Title';
import { toLocaleDate } from '../../utils/date';

const chartTypes = [
  { id: 1, value: 'linear', label: 'Linear' },
  { id: 2, value: 'monotone', label: 'Monotone' },
  { id: 3, value: 'natural', label: 'Natural' },
  { id: 4, value: 'step', label: 'Step' },
  { id: 5, value: 'stepBefore', label: 'Step Before' },
  { id: 6, value: 'stepAfter', label: 'Step After' },
];

export function HashChart() {
  const theme = useTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getHashChart = async () => {
      const sevenDaysAgoUnix = Math.round(Date.now() / 1000) - 7 * 24 * 60 * 60;
      const res = await getHashesByDayFrom(sevenDaysAgoUnix);
      if (res.error) console.error(res.error.message); // extra feature => skip errors
      else setData(res.data.sort((a, b) => a.day - b.day).map(v => ({ ...v, date: toLocaleDate(v.day * 1000) })));
    };
    getHashChart();
  }, []);

  const [chartType, setChartType] = useState(chartTypes[0].value);

  return (
    <>
      <Box display={'flex'} alignItems={'flex-start'} justifyContent={'space-between'}>
        <Title>Hashes Notarized by Day</Title>
        <DropList items={chartTypes} value={chartType} setValue={setChartType} />
      </Box>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}>
          <XAxis dataKey="date" stroke={theme.palette.text.secondary} style={theme.typography.body2} />
          <YAxis stroke={theme.palette.text.secondary} style={theme.typography.body2}>
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}>
              Hashes
            </Label>
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line
            isAnimationActive={false}
            type={chartType}
            dataKey="hashes"
            stroke={theme.palette.darkGreen.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

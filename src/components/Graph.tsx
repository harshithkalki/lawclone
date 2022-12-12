import React from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
interface props {
  data: number;
  dates: string;
}

const monthIndex: gindex[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

type gindex =
  | 'Jan'
  | 'Feb'
  | 'Mar'
  | 'Apr'
  | 'May'
  | 'Jun'
  | 'Jul'
  | 'Aug'
  | 'Sep'
  | 'Oct'
  | 'Nov'
  | 'Dec';

type gxdataprop = {
  [key in gindex]: number;
};

export const Graph = ({ data, color }: { data: props[]; color: string }) => {
  const gxdata: gxdataprop = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };
  data.forEach((d) => {
    const date: Date = new Date(d.dates);
    const index: gindex = monthIndex[date?.getMonth()] as gindex;
    gxdata[index] = gxdata[index] + d.data;
  });
  const gdata = [];
  for (let i = 0; i < 12; i++) {
    const index = monthIndex[i] as gindex;
    const data = { value: gxdata[index], month: monthIndex[i] };
    gdata[i] = data;
  }
  return (
    <>
      <ResponsiveContainer width='95%' height={250}>
        <LineChart data={gdata}>
          <Line
            type='monotone'
            dataKey='value'
            stroke={color}
            strokeWidth={3}
            // fill='#79adad'
          />
          {/* <CartesianGrid stroke='#545454' strokeDasharray='5 5' /> */}
          <Tooltip contentStyle={{ backgroundColor: '#212020' }} />
          <XAxis dataKey='month' />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

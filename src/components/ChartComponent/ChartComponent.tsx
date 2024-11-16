import React, { useEffect, useRef, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { ChartComponentProps } from '../../utils/type';
import { formatMinutesToTime } from '../../utils';

const ChartComponent: React.FC<ChartComponentProps> = ({
  totalActivityMinutes,
  totalMeetingMinutes,
  totalWorkMinutes,
  totalManualMinutes,
}) => {
  const dataLabelsFormatter = (
    value: number,
    { seriesIndex }: { seriesIndex: number }
  ): string => {
    const seriesData = [
      totalWorkMinutes,
      totalMeetingMinutes,
      totalActivityMinutes,
      totalManualMinutes,
    ];
    return formatMinutesToTime(seriesData[seriesIndex]);
  };

  const tooltipFormatter = (value: number): string => {
    return formatMinutesToTime(value);
  };

  const determineColors = (): string[] => {
    const colors: string[] = [];
    if (totalWorkMinutes > 0) colors.push('#00ab55');
    if (totalMeetingMinutes > 0) colors.push('#2196f3');
    if (totalActivityMinutes > 0) colors.push('#e7515a');
    if (totalManualMinutes > 0) colors.push('#FFA500');
    if (colors.length === 0) {
      colors.push('#d3d3d3');
    }
    return colors;
  };

  const determineLabels = (): string[] => {
    const labels = ['Work', 'Meeting', 'Activity', 'Manual'];
    const seriesData = [
      totalWorkMinutes,
      totalMeetingMinutes,
      totalActivityMinutes,
      totalManualMinutes,
    ];
    return labels.filter((_, index) => seriesData[index] > 0);
  };

  const calculateTotalHours = (): string => {
    const totalMinutes =
      totalWorkMinutes +
      totalMeetingMinutes +
      totalActivityMinutes +
      totalManualMinutes;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const seriesData = [
    totalWorkMinutes,
    totalMeetingMinutes,
    totalActivityMinutes,
    totalManualMinutes,
  ];
  const series = seriesData.filter((value) => value > 0);

  if (series.length === 0) {
    return <div>No data available</div>;
  }

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'Nunito, sans-serif',
    },
    stroke: {
      show: true,
      width: 8,
    },
    labels: determineLabels(),
    legend: {
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '80%',
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '29px',
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '26px',
              color: '#bfc9d4',
              offsetY: 16,
              formatter: (val: any) => {
                return formatMinutesToTime(val);
              },
            },
            total: {
              show: true,
              label: 'Total',
              color: '#888ea8',
              fontSize: '29px',
              formatter: () => {
                return calculateTotalHours();
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
      formatter: dataLabelsFormatter,
    },
    fill: {
      colors: determineColors(),
    },

    tooltip: {
      y: {
        formatter: tooltipFormatter,
        title: {
          formatter: (seriesName: string) => seriesName,
        },
      },
    },

    colors: determineColors(),
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type='donut'
      height='250'
    />
  );
};

export default ChartComponent;

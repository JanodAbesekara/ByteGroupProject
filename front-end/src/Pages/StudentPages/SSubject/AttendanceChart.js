import { PieChart, BarChart } from 'react-chartjs-2';


function AttendanceChart({ attendancePercentage }) {
  const chartData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [attendancePercentage, 100 - attendancePercentage],
        backgroundColor: ['#28a745', '#dc3545'],
        hoverBackgroundColor: ['#207735', '#b02a37'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <PieChart data={chartData} options={chartOptions} />;
}

export default AttendanceChart;

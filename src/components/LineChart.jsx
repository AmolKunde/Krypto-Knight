import React from 'react';
import millify from 'millify'
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import { useGetValueQuery } from '../services/exchangeApi'
import Loader from './Loader'
const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {

  const { data: exchangeValue,isFetching } = useGetValueQuery();
  const value = exchangeValue?.conversion_rate;
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price * value);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In INR',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  if (isFetching) return <Loader />
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: Rs {millify(coinPrice[coinPrice.length - 1])}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;

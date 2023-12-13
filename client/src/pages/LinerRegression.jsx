import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const LinearRegression = ({ data, selectedCategory }) => {
  const [prediction, setPrediction] = useState(null);
  const [aggregatedExpenseData, setAggregatedExpenseData] = useState([]);
  const XDate = "Date";

  useEffect(() => {
    const runLinearRegression = async () => {
      if (data.length === 0) {
        console.warn("No data available for prediction.");
        setPrediction(null);
        return;
      }

      // Prepare data for selected category, excluding income
      const filteredData = data.filter(
        (item) => item.category === selectedCategory && item.type === "expense"
      );

      if (filteredData.length === 0) {
        console.warn(
          `No expense data available for the selected category ${selectedCategory}.`
        );
        setPrediction(null); // Reset prediction if no expense data
        return;
      }

      // Calculate the average amount for prediction, excluding income
      const totalAmount = filteredData.reduce(
        (acc, item) => acc + item.amount,
        0
      );
      const averageAmount = totalAmount / filteredData.length;

      setPrediction(averageAmount);
    };

    runLinearRegression();
  }, [data, selectedCategory]);

  // Prepare data for Recharts
  useEffect(() => {
    const expenseData = data
      .filter(
        (item) => item.category === selectedCategory && item.type === "expense"
      )
      .reduce((acc, item) => {
        const existingItem = acc.find(
          (entry) =>
            new Date(entry.date).getMonth() === new Date(item.date).getMonth()
        );
        if (existingItem) {
          existingItem.totalExpense += item.amount;
        } else {
          acc.push({
            date: item.date,
            totalExpense: item.amount,
          });
        }
        return acc;
      }, []);

    setAggregatedExpenseData(expenseData);
  }, [data, selectedCategory]);

  const roundedPrediction = prediction !== null ? Math.round(prediction) : null;

  const regressionLineData =
    roundedPrediction !== null && aggregatedExpenseData.length > 0
      ? [
          {
            regressionLine: roundedPrediction,
          },
        ]
      : [];

  const CustomTooltip = ({ active, payload, label }) => {
    const getFormattedDate = (dateString) => {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString("default", {
          month: "long",
          year: "numeric",
        });
      } else {
        return "";
      }
    };

    if (active && payload && payload.length) {
      const date = getFormattedDate(label);
      const lineColor = payload[0].stroke || "#000"; // Default to black if stroke color is not available

      return (
        <div
          className="custom-tooltip"
          style={{ background: "#000", color: lineColor }}
        >
          <p className="label">
            {`Date: ${
              date ||
              new Date().toLocaleDateString("default", { month: "long" })
            }`}
          </p>
          <p className="intro">{`Total Expense: ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="chart-container">
      <h3>{`Expense Linear Regression Prediction for ${selectedCategory}`}</h3>
      {prediction !== null && aggregatedExpenseData.length > 0 ? (
        <LineChart
          className="line-chart"
          width={450}
          height={300}
          data={aggregatedExpenseData.concat(regressionLineData)}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="date"
            tickFormatter={() => XDate}
            tick={{ fill: "#fff" }}
          />
          <YAxis
            label={{ value: "Date", angle: -90, position: "insideBottomLeft" }}
            tick={{ fill: "#fff" }}
          />
          <CartesianGrid stroke="#4ADE80" strokeDasharray="5 5" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="totalExpense" stroke="#FF0000" />
          <Line
            type="monotone"
            dataKey="regressionLine"
            stroke="#ADD8E6"
            strokeWidth={8}
            strokeDasharray="3 3"
          />
        </LineChart>
      ) : (
        <p>{`No expense data available for the selected category ${selectedCategory}.`}</p>
      )}
    </div>
  );
};

export default LinearRegression;

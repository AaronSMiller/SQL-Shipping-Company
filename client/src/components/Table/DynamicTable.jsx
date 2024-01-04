import React from 'react';

const formatDate = (dateString) => {
  // Create a new Date object from the date string
  const date = new Date(dateString);
  // Use Intl.DateTimeFormat to format the date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

const DynamicTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  // Get columns from the first row of the data
  const columns = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column.replace('_', ' ').toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column + index}>
                {column === 'ship_date' ? formatDate(row[column]) : row[column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;

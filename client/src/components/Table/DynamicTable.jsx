import React from 'react';

const DynamicTable = ({ data }) => {
  if (!data || !data.length) {
    return <div>No data available</div>;
  }

  const columns = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {columns.map(column => <th key={column}>{column}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map(column => <td key={column}>{row[column]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;

import React from "react";
import "./table.css";

const Table = ({ countries }) => {
  return (
    <table className="data">
      {countries.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td>
            <strong>{country.cases}</strong>
          </td>
        </tr>
      ))}
    </table>
  );
};

export default Table;

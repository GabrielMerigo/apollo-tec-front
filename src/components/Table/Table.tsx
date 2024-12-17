import React, { ReactNode } from "react";
import { Table } from "react-bootstrap";

type TableCell = {
  id: string | number;
  content: ReactNode;
};

type CustomTableProps = {
  headers: TableCell[];
  rows: TableCell[][];
  headStyles?: React.CSSProperties;
  bodyStyles?: React.CSSProperties;
};

export const CustomTable: React.FC<CustomTableProps> = ({
  headStyles,
  bodyStyles,
  headers,
  rows,
}) => {
  const cellStyle = {
    body: {
      padding: "19px",
      fontSize: "14px",
      ...bodyStyles,
    },
    head: {
      padding: "15px 18px 15px 18px",
      ...headStyles,
    },
    lastColumn: {
      width: "100px",
    },
  };

  return (
    <Table className="shadow-sm" hover size="sm">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={header.id}
              style={{
                ...cellStyle.head,
                ...(index === headers.length - 1 ? cellStyle.lastColumn : {}),
              }}
            >
              {header.content}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                key={cell.id}
                style={{
                  ...cellStyle.body,
                  ...(cellIndex === row.length - 1 ? cellStyle.lastColumn : {}),
                }}
              >
                {cell.content}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

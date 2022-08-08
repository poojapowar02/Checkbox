import React from "react";
import { Table } from "semantic-ui-react";
import { isEqual } from "lodash";

const TableRow = React.memo(
  ({ columns, data }) => {
    console.log("Rendring", data.id);
    return (
      <Table.Row>
        {columns.map((column, idx) => (
          <Table.Cell key={idx}>
            {"render" in column ? column.render(data) : data[column.property]}
          </Table.Cell>
        ))}
      </Table.Row>
    );
  },
  (prev, next) => isEqual(prev.data, next.data)
);

function DataTable({ columns, data }) {
  return (
    <Table
      basic="very"
      tableData={data}
      renderBodyRow={(row, i) => (
        <TableRow key={i} columns={columns} data={row} />
      )}
      headerRow={
        <Table.Row>
          {columns.map((column, idx) => (
            <Table.HeaderCell key={idx}>{column.header}</Table.HeaderCell>
          ))}
        </Table.Row>
      }
    />
  );
}

export default DataTable;
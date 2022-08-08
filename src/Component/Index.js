import React, { useState, useEffect } from 'react';
import { Checkbox } from "semantic-ui-react";
import DataTable from "./DataTable";

// Generated with https://mockaroo.com/
//const data = require("./data.json");

function App() {
  const [selectedIds, setSelectedIds] = React.useState(new Set());
  const [data, setTableData] = useState([])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((data) => data.json())
      .then((data) => setTableData(data))
  }, [])
   console.log(data)

  const allChecked = selectedIds.size === data.length;
  const onCheckboxClick = React.useCallback((e, row) => {
    setSelectedIds((selectedIds) => {
      const result = new Set(selectedIds);
      if (!result.delete(row.id)) result.add(row.id);
      return result;
    });
  }, []);

  const columns = [
    {
      header: (
        <Checkbox
          indeterminate={selectedIds.size > 0 && !allChecked}
          checked={allChecked}
          onClick={() => {
            [...document.querySelectorAll("input[type='checkbox']")].forEach(
              (input) => (input.checked = !allChecked)
            );
            setSelectedIds(
              new Set(allChecked ? [] : data.map((entry) => entry.id))
            );
          }}
        />
      ),
      render: (entry) => <Checkbox id={entry.id} onClick={onCheckboxClick} />
    },
    { header: "ID", property: "id", width:150 },
    { header: "Title", property: "title", width:350}
    
  ];

  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
export default App;
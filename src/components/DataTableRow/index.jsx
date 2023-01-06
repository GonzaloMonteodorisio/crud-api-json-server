import React from 'react';

const DataTableRow = ({ player, setDataToEdit, deleteData }) => {
  let { id, firstName, lastName, age, shirtNumber } = player;
  return (
    <tr key={id}>
      <td>{shirtNumber}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{age}</td>
      <td>
        <button onClick={() => setDataToEdit(player)}>Edit</button>
        <button onClick={() => deleteData(id)}>Delete</button>
      </td>
    </tr>
  );
}

export default DataTableRow;
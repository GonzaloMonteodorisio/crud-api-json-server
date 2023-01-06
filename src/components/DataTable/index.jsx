import React from 'react';
import DataTableRow from '../DataTableRow';

const DataTable = ({data, setDataToEdit, deleteData}) => {
  return (
    <div>
      <h2>Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>Shirt number</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data.length === 0 
              ? (
              <tr>
                <td colSpan='5'>
                  No Data
                </td>
              </tr>) 
              : (
                data.map(player => 
                  <DataTableRow 
                    key={player.id}
                    player={player}  
                    setDataToEdit={setDataToEdit}
                    deleteData={deleteData}
                />)
              )
          }
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
import React, { useState } from 'react';
import DataTable from '../DataTable';
import Form from '../Form';

const CrudApi = () => {

  const [players, setPlayers] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);

  const createData = data => {
    data.id = Date.now();
    console.info('data: ', data);
    setPlayers([...players, data]);
  }

  const updateData = data => {
    let newData = players.map(player => player.id === data.id ? data : player);
    setPlayers(newData);
  }

  const deleteData = id => {
    let isDelete = window.confirm(`Are you sure to delete the record with id ${id}?`);

    if (isDelete) {
      let newData = players.filter(player => player.id !== id);
      setPlayers(newData);
    } else {
      return;
    }

  }

  return (
    <>
      <article className="grid-1-2">
        <Form 
          createData={createData} 
          updateData={updateData} 
          dataToEdit={dataToEdit} 
          setDataToEdit={setDataToEdit} 
        />
        <DataTable 
          data={players} 
          deleteData={deleteData}
          setDataToEdit={setDataToEdit} 
        />
      </article>
    </>
  );
}

export default CrudApi;
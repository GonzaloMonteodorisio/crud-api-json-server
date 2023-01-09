import React, { useEffect, useState } from 'react';
import { helpHttp } from '../../helpers/helpHttp';
import DataTable from '../DataTable';
import Form from '../Form';
import Loader from '../Loader';
import Message from '../Message';

const CrudApi = () => {

  const [players, setPlayers] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let api = helpHttp();
  let url = 'http://localhost:5000/player';

  useEffect(() => {
    setLoading(true);
    helpHttp().get(url)
      .then(res => {
        if (!res.err) {
          console.info('res.err: ', res.err);
          setPlayers(res);
          setError(null);
          setLoading(null);
        } 
      })
      .catch(error => {
        console.info('error: ', error);
        setPlayers(null);
        setError(error);
        setLoading(null);
      });
  }, [url]);

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
        {loading && <Loader />}
        {
          error && 
            <Message 
              msg={`Error: ${error.status}: ${error.statusText}`}
              bgColor='#dc3545'
            />
        }
        {
          players &&         
            <DataTable 
              data={players} 
              deleteData={deleteData}
              setDataToEdit={setDataToEdit} 
            />
        }
      </article>
    </>
  );
}

export default CrudApi;
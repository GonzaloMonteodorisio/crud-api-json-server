import React, { useEffect, useState } from 'react';

const initialForm = {
  id: '',
  firstName: '',
  lastName: '',
  age: '',
  shirtNumber: ''
}

const Form = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleChange = e => {
    if (isNaN(parseInt(e.target.value))) {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: parseInt(e.target.value)
      });     
    }
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.age || !form.shirtNumber) {
      alert('Datos incompletos');
      return;
    }

    if (form.id === '') {
      createData(form);
    } else {
      updateData(form);
    }
    handleReset();
  }

  const handleReset = e => {
    setForm(initialForm);
    setDataToEdit(null);
  }

  return (
    <div>
      <h2>{dataToEdit ? 'Edit' : 'Add'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First name: </label>
        <input type="text" name="firstName" id="firstName" placeholder='Albert' onChange={handleChange} value={form.firstName} />
        <label htmlFor="lastName">Last name: </label>
        <input type="text" name="lastName" id="lastName" placeholder='King' onChange={handleChange} value={form.lastName} />
        <label htmlFor="age">Age: </label>
        <input type="number" name="age" id="age" placeholder='26' onChange={handleChange} value={form.age} />
        <label htmlFor="shirtNumber">Shirt number: </label>
        <input type="number" name="shirtNumber" id="shirtNumber" placeholder='10' onChange={handleChange} value={form.shirtNumber} />
        <input type="submit" value="Send" />
        <input type="reset" value="Reset" onClick={handleReset} />
      </form>
    </div>
  )
}

export default Form;
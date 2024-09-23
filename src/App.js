import { useEffect, useState } from 'react';
import './App.css';
import { EmployeeData } from './EmployeeData';

function App() {

  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);


  useEffect(() => {
    setData(EmployeeData)
  }, [])

  const handleEdit = (id) => {
    const dt = data.filter(item => item.id === id);
    if (dt !== undefined) {
      setFirstName(dt[0].firstName)
      setLastName(dt[0].lastName)
      setAge(dt[0].age)
      setId(id)
      setIsUpdate(true)
    }

  }
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm('Are you sure to delete this item')) {
        const dt = data.filter(item => item.id !== id);
        setData(dt);
      }

    }

  }

  const handleSave = (e) => {
    let error='';
    if(firstName === '')
      error += 'First Name is required, ';
    if(lastName === '')
      error += 'Last Name is required, ';
    if(age <= 0)
      error += 'Age is required.';

    if(error ===  '')
    {
    e.preventDefault();
    const dt=[...data];
    const newObject = {
      
      id:EmployeeData.length + 1,
      firstName:firstName,
      LastName:lastName,
      age:age
    }
    dt.push(newObject);
    setData(dt);

  }
  else
  {
  alert(error)
  }
  }

  const handleUpdate = () => {
    const index = data.map((item) => {
      return item.id
    }).indexOf(id);


    const dt = [...data]
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;
    setData(dt)
    handleClear();
}

  const handleClear = () => {
    setFirstName('')
    setLastName('')
    setAge('')
    setId(0)
    setIsUpdate(false);

  }


  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '10px' }}>
        <div>
          <label>First Name :</label>
          <input type='text' placeholder='Enter your first name' onChange={(e) => setFirstName(e.target.value)} value={firstName}></input>&nbsp;&nbsp;
        </div>
        <div>
          <label>Last Name :</label>
          <input type='text' placeholder='Enter your Last name' onChange={(e) => setLastName(e.target.value)} value={lastName}></input>&nbsp;&nbsp;
        </div>
        <div>
          <label>Age:</label>
          <input type='text' placeholder='Enter your Age' onChange={(e) => setAge(e.target.value)} value={age}></input>&nbsp;&nbsp;
        </div>
        <div>
          {
            !isUpdate ?
              <button className='btn btn-primary' onClick={(e) => handleSave(e)}>Save</button>
               :
              <button className='btn btn-primary' onClick={(e) => handleUpdate()}>Update</button>
          }
          <button className='btn btn-danger' onClick={(e) => handleClear()}>Clear</button>


        </div>

      </div>
      <table className='table table-hover'>
        <thead>
          <tr>
            <td>Sr.No</td>
            <td>Id</td>
            <td>FirstName</td>
            <td>LastName</td>
            <td>Age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.LastName}</td>
                  <td>{item.age}</td>
                  <td>
                    <button className='btn btn-primary' onClick={(e) => handleEdit(item.id)}>Edit</button>&nbsp;
                    <button className='btn btn-danger' onClick={(e) => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              )

            })
          }
        </tbody>
      </table>



    </div>
  );
}

export default App;

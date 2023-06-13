import React from 'react';


export default function App (){
  const [users, setUsers] = React.useState([]);
  const [name, setName] = React.useState('');
  const [updateName, setUpdateName] = React.useState('');


  React.useEffect(() => {
    fetch('http://localhost:9292/users')
      .then(response => response.json())
      .then(users => setUsers(users));
  }, []); 
  console.log (users)

  function handleSubmit(e){
    e.preventDefault();
    fetch('http://localhost:9292/users', {
      method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({name:name})
      
    })
    .then(response => response.json())
    .then(data=>{
    setUsers([...users, data])
    })
  }


  function handleUpdate(e){
    e.preventDefault();
    fetch('http://localhost:9292/users', {
      method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({name:name})
      
    })
    .then(response => response.json())
    .then(data=>{
    setUpdateName([updateName, data])
    })
  }


  function handleDelete(id){
    fetch(`http://localhost:9292/users/${id}`,{
      method: 'DELETE',
      'Content-Type':'application/json'
      

    })
    .then (res=>res.json())
    .then (data=> {
      console.log(data)
      let rem = users.filter(user => user.id !==id)
      setUsers(rem)
      
    })


  }
  return (
    <div>
      <h1>Hello World</h1>
      <ul>
        {users.map(user=> (
          <div>
            <p>{user.name}</p>
            <p>{user.created_at}</p>
            <form onSubmit={handleUpdate}>
              <input type='text' value={updateName} onChange={e=>setUpdateName(e.target.value)}/>
              <button>EDIT</button>
            </form>
            <button onClick= {()=>handleDelete(user.id)}>DELETE</button>
          </div>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="name" value= {name}
        onChange={e=>setName(e.target.value)}/>
        <button> Add</button>
      
       
      </form>
    </div>
  )
}



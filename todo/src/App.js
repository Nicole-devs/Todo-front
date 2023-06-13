// import React from 'react';
// import UserList from './UserList';
// import UserForm from './UserForm';
// import TaskForm from './TaskForm';

// const App = () => {
  // const [users, setUsers] = React.useState([]);

  // React.useEffect(() => {
  //   fetch('http://localhost:9292/users')
  //     .then(response => response.json())
  //     .then(users => setUsers(users));
  // }, []);

//   const handleAddUser= user => {
//     const name1 ={name:user}
//     console.log('Rendering UserList with users:', users);
//     fetch('http://localhost:9292/users', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(name1),
//     })
//       .then(response => response.json())
//       // .then(data => console.log(data))
//       .then(user => setUsers(users => [...users, user]));
      
//   };

//   const handleAddTask = task => {
//     fetch('http://localhost:9292/tasks', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(task),
//     })
//       .then(response => response.json())
//       .then(task => {
//         setUsers(users =>
//           users.map(user =>
//             user.id === task.userId
//               ? { ...user, tasks: [...user.tasks, task] }
//               : user
//           )
//         );
//       });
//   };

//   return (
//     <>
//       <h1>Users</h1>
//       <UserList users={users} />
//       <h2>Add a User</h2>
//       <UserForm onAddUser={handleAddUser} />
//       <h2>Add a Task</h2>
//       <TaskForm users={users} onAddTask={handleAddTask} />
//     </>
//   );
// };

// export default App;


import React from 'react';

function App (){
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
    e.preventDefault()
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
    e.preventDefault()
    fetch('http://localhost:9292/users', {
      method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({name:name})
      
    })
    .then(response => response.json())
    .then(data=>{
    setUpdateName([...name, data])
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

export default App;

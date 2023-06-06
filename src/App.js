import React, { useState } from 'react';
import AddUserInput from './components/Users/AddUserInput/AddUserInput';
import UserList from './components/Users/UserList/UserList';

function App() {
  const [usersList, setUsersList] = useState([
    {
      id: Math.random().toString(),
      name: 'Max',
      age: 28
    }
  ]);

  const addUserHandler = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      return [...prevUsersList, {id: Math.random().toString(), name: uName, age: uAge}];
      // const updatedUsersList = [...prevUsersList];
      // updatedUsersList.unshift({ name: uName, age: uAge, id: Math.random().toString() });
      // return updatedUsersList;

    });
  };

  const deleteUserHandler = (userId) => {
    setUsersList((prevUsersList) => {
      const updatedUsersList = prevUsersList.filter(user => user.id !== userId);
      return updatedUsersList;
    });
  };

  let content = (
    <p style={{textAlign: 'center'}}>No users found. Maybe add one?</p>
  );

  if (usersList.length > 0) {
    content = (<UserList users={usersList} onDeleteUser={deleteUserHandler}/>)
  }

  return (
    <div>
      <AddUserInput onAddUser={addUserHandler}/>
      {content}
    </div>
  );
}

export default App;

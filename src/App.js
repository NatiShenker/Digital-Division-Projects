import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from './Components/Welcome/Welcome';
import TableContainer from './Components/Table/TableContainer';
import Users from './StoredData/Users.json';
import './App.css';


function App() {

  const [currentUser, setCurrenUser] = useState(false)
  const [...usersList] = JSON.parse(JSON.stringify(Users.users))
  const [error, setError] = useState(false)

  //Error on Log-in
  const handleError = () => {
    if (error) console.error('Log-in error: incorrect user details')
    setError(err => !err);
  }

  const handleUser = (user) => {

    const [ ...tempUsersList ] = usersList;

    const tempUser = tempUsersList.filter(u => (
      u.email.toLowerCase() === user?.email?.toLowerCase() && u.password === user?.password
    ));

    if (tempUser.length > 0) {
      setCurrenUser(user => tempUser.length > 0)
      console.log(`Log-in succeed: ${tempUser[0].email} logged in`)
    }
    else if (user === false) {
      setCurrenUser(false)
      console.log(`Log-out succeed: user logged out`)
    }
    else handleError();

  }

  return (
    <div
      key={currentUser}
      className="App"
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Welcome
                currentUser={currentUser}
                onSignIn={handleUser}
                error={error}
                onError={handleError}
              />
            }
          />
          <Route
            path="/projects"
            element={
              <TableContainer
                currentUser={currentUser}
                onSignOut={handleUser}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import Context from './Store/Context';
import SignupPage from './Pages/SignupPage';
import TasksPage from './Pages/TasksPage';
import DetailPage
  from './Pages/DetailPage';
export const ContextApi = React.createContext();

function App()
{
  const [state, dispatch] = Context();
  return (
    <ContextApi.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="detail/:id" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </ContextApi.Provider>
  );
}

export default App;


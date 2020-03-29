import React from 'react';
import StudentList from './components/student/StudentList'
import InputForm from './components/student/InputForm';
//import Nevbar from './components/nevbar/menu'
import './App.css'

const App = () => {
  return (
    <div className='body-App'>
      
      <h1>Insert Data</h1>
      <InputForm />
      <h1>Students Infomation</h1>
      <StudentList />
    </div>
  );
}

export default App;

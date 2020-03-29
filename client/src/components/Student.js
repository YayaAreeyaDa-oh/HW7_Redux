import React, {useState, useEffect}  from 'react'
import axios from 'axios'
import '../css/style.css'
const port = 8080


const Student = () => {
  const [students, setstudents] = useState({}) 
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [grade, setGrade] = useState('')
  const [year, setYear] = useState(0)
  const [fac, setFac] = useState('') 
  

  useEffect( () => {
    getStudents()
  } , [] )

  const printStudents = () => {
    if ( students && students.length )
        return students.map((student,index) => {
            return (
                <li key={index}>
                    {student.fac} {student.name} {student.surename}  : Class {student.class} : Grade {student.grade} &emsp;
                    <button onClick={() => getStudent(student.id)}> Get </button>&nbsp;
                    <button onClick={() => delStudent(student.id)}> Del </button>&nbsp;
                    <button onClick={() => updateStudent(student.id)}> Update </button>
                </li>
            )
        })
    else {
        return (<h2> No student </h2>)
    }

  }

  const getStudents = async () => {
    const result = await axios.get(`http://localhost:${port}/api/students`)
    console.log(result.data)
    setstudents(result.data)
  }

  const getStudent = async (id) => {
          const result = await axios.get(`http://localhost:${port}/api/students/${id}`)
          console.log(result.data)
          setName(result.data.name)
          setSurname(result.data.surname)
          setGrade(result.data.grade)
          setYear(result.data.year)
          setFac(result.data.fac)        
  }

  const addStudent = async () => {
    const result = await axios.post(`http://localhost:${port}/api/students`, {
        name,
        surname,
        grade,
        year,
        fac
    })
    console.log(result.data)
    getStudents()
  }

  const updateStudent = async (id) => {
    const result = await axios.put(`http://localhost:${port}/api/students/${id}`,{
      name,
      surname,
      grade,
      year,
      fac
    })
    console.log(result.data)
    setName(result.data.name)
    setSurname(result.data.surname)
    setGrade(result.data.grade)
    setYear(result.data.year)
    setFac(result.data.fac)  
    getStudents()    
  } 

  const delStudent = async (id) => {
    const result = await axios.delete(`http://localhost:${port}/api/students/${id}`)
    console.log(result.data)       
    getStudents()   
}


  return (
    <div >
      <h1>Student infomation</h1>
      <ul>
        {printStudents()}
      </ul>
    <form>
      <label>Name&nbsp;:&nbsp;<input 
                    placeholder="Name"
                    type="text"
                    name="name"
                    onChange={ (e)=> setName(e.target.value) }
                  /> </label>
      <label>SurName&nbsp;:&nbsp;<input 
                    placeholder="Surname"
                    type="text"
                    name="surname"
                    onChange={ (e)=> setSurname(e.target.value) }
                  /> </label>
     <label> Grade&nbsp;:&nbsp;<input 
                    placeholder="Grade"
                    type="text"
                    name="grade"
                    onChange={ (e)=> setGrade(e.target.value) }
                  /> </label>
      <label>Year&nbsp;:&nbsp; <input 
                    placeholder="Year"
                    type="number"
                    name="year"
                    onChange={ (e)=> setYear(e.target.value) }
                  /> </label>
      <label>Faculty&nbsp;:&nbsp;<input 
                    placeholder="Faculty"
                    type="text"
                    name="fac"
                    onChange={ (e)=> setFac(e.target.value) }
                  /></label><br/>

      <button class="btn" onClick={addStudent}>Add </button>
    </form>
    </div>
  );
}

export default Student;

import React, { useEffect } from 'react'
import StudentCard from './StudentCard';
import './StudentList.css';
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
const  port = 8080

const StudentList = props => {

    const students = useSelector(state => state.student);
    const dispatch = useDispatch(); 

    // const getStudents = async () => {
    //     const result = await axios.get(`http://localhost:${port}/api/students`)
    //     dispatch({ type: 'GET_STUDENTS', students: result.data })
    // }

    useEffect(() => {
        const getStudents = async () => {
            const result = await axios.get(`http://localhost:${port}/api/students`)     
            dispatch({ type: 'GET_STUDENTS', students: result.data }) 
        }
        getStudents()
        // eslint-disable-next-line
      }, [props])

    if (!students || !students.length)
        return (<h2>No students</h2>)

    return (
        
            <div className='cd-container'>
                <div className='section-grid'>
                {
                    students.map((student, index) => (
                            <StudentCard  {...student} key={index} />
                    ))
                }
                </div>
             </div>
        

    )
}

export default StudentList;
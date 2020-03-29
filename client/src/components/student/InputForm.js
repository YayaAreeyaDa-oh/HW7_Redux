import React from 'react'
import './InputForm.css'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

const port = 8080

const InputForm = () => {
    const dispatch = useDispatch();
    const form = useSelector( state => state.form )
    const students = useSelector( state => state.student )

    const addstudent = async () => {
        await axios.post(`http://localhost:${port}/api/students`, form)
        dispatch( { 
            type:'ADD_STUDENT', 
            student: {
                id: students.length > 0 ? students[ students.length-1 ].id+1 : 0,
                ...form
            } 
        } )
    }

    return(
        <div className='if-container'>
            <div className='if-grid'>
                <div className='if-l'>
                    <label htmlFor='name'>Name</label>
                    <input id='name' type="text" onChange={(e) => dispatch({ type:'CHENG_NAME', name: e.target.value })} /><br /><br />

                    <label htmlFor='surname'>Surname</label>
                    <input id='surname' type="text" onChange={(e) => dispatch({ type:'CHENG_SURNAME', surname: e.target.value })} /><br /><br />

                    <label htmlFor='fac'>Faculty</label>
                    <input id='fac' type="text" onChange={(e) => dispatch({ type:'CHENG_FAC', fac: e.target.value })} /><br /><br />

                    <label htmlFor='img'>URL IMG</label>
                    <input id='img' type="text" onChange={(e) => dispatch({ type:'CHENG_IMG', img: e.target.value })} /><br /><br />
                    
                    <button className='btn' onClick={addstudent}>INSERT DATA</button>
                </div>
                <div className='if-r'>
                    <p>Preview Image</p><br />
                    {form.img && <img src={`${form.img}`} alt='preview img' />}
                    {!form.img && <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ-HTI1S2w4KbwpeOY9upP1BWcZ0Oc-SQ4vfJb6JIv4jX9VbO-G' alt='img not found' />}
                </div>
            </div>
        </div>
    )
}

export default InputForm;
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from 'redux-logger'

const initialForm = {
    name: '',
    surname:'',
    fac:'',
    img: ''
}

const formReducer = (data = initialForm, action) => {
    switch(action.type) {
        case 'CHENG_NAME' : 
            return {...data, name: action.name};
        case 'CHENG_SURNAME' : 
            return {...data, surname: action.surname};
        case 'CHENG_FAC' : 
            return {...data, fac: action.fac};
        case 'CHENG_IMG' : 
            return {...data, img: action.img};
        default :
            return data

    }

}

const studentReducer = (students = [], action) => {
    switch(action.type) {
        case 'GET_STUDENTS' : 
            return action.students;   //action.payload
        case 'ADD_STUDENT' :
            return [...students, action.student];
        case 'DEL_STUDENT' :
            return students.filter(student => +student.id !== +action.id);
        case 'UPDATE_STUDENT' :
            return students.map(student => {
                if(+student.id === +action.id)
                    return action.student;
                else return student;
            })
        default :
            return students ;
    }
}

const reducers = combineReducers({
    student: studentReducer,
    form: formReducer
})

export const store = createStore(reducers, applyMiddleware(logger));

import React, {useState} from "react";

import Card from '../UI/Card'
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from './AddUser.module.css';

const AddUser = props => {
    const [enteredUserName, setEnteredUserName] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();
    const addUserHandler = (event) => {
        event.preventDefault();
        if (enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Champ vide',
                message: 'Veuillez remplir les champs svp '
            })
            return;
        }

        if (+enteredAge < 1) {
            setError({
                title: 'Champ incorrect',
                message: 'Veuillez changer la valeur du champ Age '
            })
            return;
        }
        props.onAddUser(enteredUserName, enteredAge);
        setEnteredUserName('');
        setEnteredAge('');
    }

    const changeUserNameHandler = (event) => {
        setEnteredUserName(event.target.value);
    }
    const changeAgeHandler = (event) => {
        setEnteredAge(event.target.value);
    }

    const errorHandler = () => {
        setError(null);
    }

    return <div>
        {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
        <Card className={classes.input}>
            <form onSubmit={addUserHandler}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={enteredUserName} onChange={changeUserNameHandler}/>
                <label htmlFor="age">Age</label>
                <input type="number" id="age" value={enteredAge} onChange={changeAgeHandler}/>
                <Button type="submit"> Add User</Button>
            </form>
        </Card>
    </div>
}

export default AddUser;
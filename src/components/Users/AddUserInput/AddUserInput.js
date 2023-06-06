import React, { useState } from 'react';

import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import ErrorModal from '../../UI/ErrorModal/ErrorModal';
import styles from './AddUserInput.module.css';

const AddUserInput = (props) => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [error, setError] = useState();

    const addUserHandler = (e) => {
        e.preventDefault();
        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            });
            setIsValid(false);
            return;
        }   
        // For more safety, we can use the unary plus operator to convert the string to a number. So this is a number
        if (+enteredAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (> 0).'
            });
            setIsValid(false);
            return;
        }
        props.onAddUser(enteredUsername, enteredAge);
        setEnteredUsername('');
        setEnteredAge('');
    }

    const userNameChangeHandler = (e) => {
        setEnteredUsername(e.target.value);
    }

    const ageChangeHandler = (e) => {
        setEnteredAge(e.target.value);
    }

    const errorHandler = () => {
        setError(null);
    }

    return (
        <div>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
            <Card className={`${styles.input} ${!isValid && styles.invalid}`}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input autoComplete='off' value={enteredUsername} onChange={userNameChangeHandler} id="username" type="text"/>
                    <label htmlFor="age">Age (Years)</label>
                    <input autoComplete='off' value={enteredAge} onChange={ageChangeHandler} id="age" type="number" />
                    <Button type='submit'>Add User</Button>
                </form>
            </Card>
        </div>
    );
};

export default AddUserInput;
import React, { useState, useRef } from 'react';

import Wrapper from '../../Helpers/Wrapper';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import ErrorModal from '../../UI/ErrorModal/ErrorModal';

import styles from './AddUserInput.module.css';

const AddUserInput = (props) => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();

    // const [enteredUsername, setEnteredUsername] = useState('');
    // const [enteredAge, setEnteredAge] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [error, setError] = useState();

    const addUserHandler = (e) => {
        e.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredUserAge = ageInputRef.current.value;
        if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            });
            setIsValid(false);
            return;
        }   
        // For more safety, we can use the unary plus operator to convert the string to a number. So this is a number
        if (+enteredUserAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (> 0).'
            });
            setIsValid(false);
            return;
        }
        props.onAddUser(enteredName, enteredUserAge);
        // setEnteredUsername('');
        // setEnteredAge('');
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    }

    const userNameChangeHandler = (e) => {
        //setEnteredUsername(e.target.value);
    }

    const ageChangeHandler = (e) => {
        //setEnteredAge(e.target.value);
    }

    const errorHandler = () => {
        setError(null);
    }

    return (
        <Wrapper>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
            <Card className={`${styles.input} ${!isValid && styles.invalid}`}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    {/* value={enteredUsername} */}
                    <input autoComplete='off'  onChange={userNameChangeHandler} id="username" type="text" ref={nameInputRef}/>
                    <label htmlFor="age">Age (Years)</label>
                    {/* value={enteredAge} */}
                    <input autoComplete='off'  onChange={ageChangeHandler} id="age" type="number" ref={ageInputRef}/>
                    <Button type='submit'>Add User</Button>
                </form>
            </Card>
        </Wrapper>
    );
};

export default AddUserInput;
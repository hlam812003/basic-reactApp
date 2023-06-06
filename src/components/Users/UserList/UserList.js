import React from "react";

import Card from "../../UI/Card/Card";
import styles from './UserList.module.css'

const UserList = (props) => {

    const deleteUserHandler = (userId) => {
        props.onDeleteUser(userId);
    }

    return (
        <Card className={styles.users}>
            <ul>
                {props.users.map(user => {
                    return (
                        <li key={user.id} onClick={() => deleteUserHandler(user.id)}>
                            {user.name} ({user.age} years old)
                        </li>
                    );
                })}
            </ul>
        </Card>
    );
};

export default UserList;
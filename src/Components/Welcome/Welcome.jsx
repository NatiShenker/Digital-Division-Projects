import React from 'react';
import styles from '../../Components/Components.module.css';
import { Paper } from '@mui/material';
import Header from '../Header/Header';


const Welcome = ({ currentUser, onSignIn, error, onError }) => {
    return (
        <div className={styles.welcome}>
            <Header
                currentUser={currentUser}
                onSignIn={onSignIn}
                error={error}
                onError={onError}
            />
            <Paper className={styles.paper}>
                <h3>Welcome to</h3>
                <h1>
                    Digital Division
                    <br/>
                    Projects
                </h1>
            </Paper>
        </div>
    );
};

export default Welcome;
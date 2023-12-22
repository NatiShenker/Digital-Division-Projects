import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button, TextField, Dialog } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from '../../Components/Components.module.css';


const Header = ({ currentUser, onSignIn, error, onError }) => {

    const emailLabel = "Enter Your Email";
    const passwordLabel = "Enter Your Password";
    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [label, setLabel] = useState(emailLabel);
    const [buttonToShow, setButtonToShow] = useState(false);

    const handleErrorDialog = () => {
        onError()
        resetStates()
    }

    //Resets input, label, button states
    const resetStates = () => {
        handleUserDetails()
        handleInputAndLabel()
        handleButtonToShow()
    }

    const handleInputAndLabel = () => {
        if (error) {
            setLabel(emailLabel)
        }
        else if (userEmail && userPassword) {
            onSignIn({ email: userEmail, password: userPassword})
        }
        else if (userEmail) {
            setLabel(passwordLabel)
        }
        else if (userPassword) {
            handleButtonToShow()
        }
    }

    const handleUserDetails = (e, label) => {
        if (error) {
            setUserEmail(null)
            setUserPassword(null)
        }
        else if (label === emailLabel) {
            setUserEmail(e.target.value)
        }
        else if (label === passwordLabel) {
            setUserPassword(e.target.value)
        }
    }

    const handleButtonToShow = (e) => {
        if (buttonToShow && !userPassword) return;
        setButtonToShow(button => !button)
    }

    return (
        <div className={styles.header}>
            <Button
                key={!userEmail && !userPassword}
                variant='contained'
                disabled={!userEmail && !userPassword}
                onClick={(e) => handleInputAndLabel(e)}
            >
                {
                    userEmail && !userPassword
                    ? <ArrowForwardIcon />
                    : 'Sign In'
                }
            </Button>
            <TextField
                key={label}
                id="outlined-basic"
                label={label}
                variant="outlined"
                onChange={(e) => handleUserDetails(e, label)}
                onFocus={(e) => handleButtonToShow(e)}
            />
            
            {
                currentUser &&
                <Navigate to="/projects" />
            }
            {
                error &&
                <Dialog
                    key={error}
                    open={error}
                    onClose={() => handleErrorDialog()}
                    sx={{
                        '& .css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop': {
                            backgroundColor: 'unset',
                            },
                    }}
                >
                    <h3 className={styles.dialogText}>Error Log-in<br/>Please Try Again</h3>
                </Dialog>
            }
        </div>
    );
};

export default Header;
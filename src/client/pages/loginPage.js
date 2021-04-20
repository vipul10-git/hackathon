import React ,{useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createNewUser } from '../store/action';
import Error from '../component/errorPopup';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    let history = useHistory()
    const classes = useStyles();
    const [userId, setUserId] = useState('')
    const [error, setError] = useState({ showError: false, errMsg: '' });

    useEffect(()=>{
        sessionStorage.removeItem('UserId');
    })
    const openNewTask = (e) => {
        e.preventDefault()
        if (userId !== '') {
            sessionStorage.setItem('UserId', userId);
            history.push('/dashboard');
        } else {
            setError({ showError: true, errMsg: 'Id cannot be empty' });
            setTimeout(() => {
                setError({ showError: false, errMsg: '' })
            }, 1500)
        }
    }
    const setUser = (e) => {
        e.preventDefault();
        setUserId(e.target.value)
    }
    let { showError, errMsg } = error
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    LogIn
        </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="employId"
                        label="Employ Id"
                        name="employId"
                        autoFocus
                        onChange={(e) => setUser(e)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e)=>openNewTask(e)}
                    >
                        LogIn
                    </Button>
                </form>
            {showError && <Error errMsg={errMsg} />}
            </div>
        </Container>
    );
}
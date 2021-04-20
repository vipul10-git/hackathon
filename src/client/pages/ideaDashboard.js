import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addData, getUserData } from '../store/action';
import TextField from '@material-ui/core/TextField'
import Error from '../component/errorPopup';
import { Typography, Paper, Grid, Button, CssBaseline, CardContent, CardActionArea, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
    },
    media: {
        height: 140,
    },
});
function IdeaDashbaord() {
    let history = useHistory();
    const [idea_name, setIdeaName] = useState('');
    const [idea_detail, setIdeaDetail] = useState('');
    const [error, setError] = useState({ showError: false, errMsg: '' });
    const [user, setuser] = useState('')
    const [previousData, setUserHasPreviousdata] = useState({ Userdata: {}, hasPreviousData: false })
    useEffect(() => {
        let data = sessionStorage.getItem('UserId');
        if (data) {
            setuser(data)
            getUserData(data).then(res => {
                if (res.exists()) {
                    setUserHasPreviousdata({ Userdata: res.val().ideas, hasPreviousData: true })
                }
            })
        } else {
            history.push('/')
        }
    }, [])

    const ideaNameChange = (e) => {
        e.preventDefault(); setIdeaName(e.target.value);
    }
    const detailChange = (e) => {
        e.preventDefault(); setIdeaDetail(e.target.value);
    }
    const addIdea = () => {

        if (idea_name !== '' && idea_detail !== '') {
            addData(user, idea_name, idea_detail)
            setTimeout(() => {
                history.goBack()
            }, 500)
        } else {
            setError({ showError: true, errMsg: 'Both fields are equally important' });
            setTimeout(() => {
                setError({ showError: false, errMsg: '' })
            }, 1500)
        }
    }

    let { showError, errMsg } = error
    const classes = useStyles();

    let { Userdata, hasPreviousData } = previousData
    return (
        <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
            <PowerSettingsNewIcon onClick={()=>history.push('/')} style={{cursor:'pointer'}}/>
            <CssBaseline />
            <Typography variant="h4" align="center" component="h1" gutterBottom>
                🏁 Submit your Idea
      </Typography>
            <Paper style={{ padding: 16 }}>
                <Grid container alignItems="flex-start" spacing={2}>
                    <TextField
                        fullWidth
                        required
                        name="Idea"
                        type="text"
                        label="Idea Name"
                        onChange={(e) => ideaNameChange(e)}
                        helperText="What your Idea Called"
                        value={idea_name}
                        autoFocus
                    />
                    <TextField
                        name="Description"
                        fullWidth
                        required
                        type="text"
                        label="Description"
                        onChange={(e) => detailChange(e)}
                        helperText="What is your idea"
                        value={idea_detail}
                    />

                    <Grid item xs={12} style={{ marginTop: 16 }}>
                        <Button
                            variant="contained"
                            id='submitIdea'
                            color="primary"
                            type="submit"
                            onClick={() => addIdea()}
                        >
                            Submit
                  </Button>
                    </Grid>
                </Grid>
            </Paper>
            {hasPreviousData ?
                <Paper id='userDataPrevious'>
                    {Userdata && Userdata.length > 0 && Userdata.map(i => {
                        return (
                            <Card className={classes.root} style={{margin:'0.5rem'}} key={`${new Date(i.date)}`}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {i.ideaName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Description : {i.detail}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" style={{fontSize:'0.5rem'}}>
                                            Date : {i.date}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )
                    })}
                </Paper> :
                <Paper style={{ padding: 16, marginTop: '2rem', textAlign: 'center' }}>
                    No Data Found
                </Paper>
            }
            {showError && <Error errMsg={errMsg} />}
        </div>
    );
}

export default IdeaDashbaord;
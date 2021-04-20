import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { updateVotePlus, updateVoteMinus, getDataAll } from '../store/action';
import Error from '../component/errorPopup';
import Upvote from '../assets/image/up.png';
import Downvote from '../assets/image/down.png';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Popup from '../component/popup';
import { Typography, Paper, Button, CardContent, CardActionArea, Card } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        width: '100%',
        maxWidth: '90%',
        margin: 'auto',
        marginTop: '1rem',
        marginBottom: '4rem',
        border: '1px solid rgb(224 224 224)',
        tableLayout: 'fixed'
    },
});

const Dashbaord = () => {
    const classes = useStyles();
    let history = useHistory();
    const [IdeaData, setIdeaData] = useState({})
    const [showLoader, setShowLoader] = useState(true);
    const [error, setError] = useState({ showError: false, errMsg: '' });
    const [user, setuser] = useState('')
    const [sortOrderOfVote, setSortOfVote] = useState(0);
    const [sortOrderOfDate, setSortOfDate] = useState(0);
    const [detailPopup , setShowDetailPopup] = useState({popupData : {},isShowDetailPopup:false})
    useEffect(() => {
        let data = sessionStorage.getItem('UserId');
        if (data) {
            setuser(data)
            getDataAll().then((snapshot) => {
                if (snapshot.exists()) {
                    let dataTodisplay = []
                    Object.keys(snapshot.val()).length > 0 && Object.entries(snapshot.val()).forEach(([key, val]) => {
                        val && val.ideas && val.ideas.length > 0 && val.ideas.map((i, index) => {
                            i.userId = key
                            i.position = index
                            dataTodisplay.push(i)
                        })
                    })
                    setTimeout(() => {
                        setShowLoader(false)
                    }, 5000)
                    setIdeaData(dataTodisplay);
                } else {
                    setError({ showError: true, errMsg: 'No data available' });
                    setTimeout(() => {
                        setError({ showError: false, errMsg: '' })
                    }, 1500)
                }
            }).catch((error) => {
                console.error(error);
            });
        } else {
            history.push('/')
        }
    }, [])

    const sortTableOnVote = () => {
        if (sortOrderOfVote === 0) {
            let elementsIndex = IdeaData.sort((a, b) => b.vote - a.vote)
            let newArray = [...elementsIndex]
            setIdeaData(newArray)
            setSortOfVote(1)
        } else if (sortOrderOfVote === 1) {
            let elementsIndex = IdeaData.sort((a, b) => a.vote - b.vote)
            let newArray = [...elementsIndex]
            setIdeaData(newArray)
            setSortOfVote(0)
        }
    };

    const sortTableOnDate = () => {
        if (sortOrderOfDate === 0) {
            let elementsIndex = IdeaData.sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime())
            let newArray = [...elementsIndex]
            setIdeaData(newArray)
            setSortOfDate(1)
        } else if (sortOrderOfDate === 1) {
            let elementsIndex = IdeaData.sort((a, b) => (new Date(a.date)).getTime() - (new Date(b.date)).getTime())
            let newArray = [...elementsIndex]
            setIdeaData(newArray)
            setSortOfDate(0)
        }
    };

    const upvote = (data) => {
        let key = data.userId;
        let vote = data.vote;
        let position = data.position;
        let elementsIndex = IdeaData.findIndex(element => element.userId == key)
        let newArray = [...IdeaData]
        newArray[elementsIndex + position] = { ...newArray[elementsIndex + position], vote: +vote + 1 }
        setIdeaData(newArray)
        updateVotePlus(key, vote, position)
    }

    const downVote = (data) => {
        let key = data.userId;
        let vote = data.vote;
        let position = data.position;
        let elementsIndex = IdeaData.findIndex(element => element.userId == key)
        let newArray = [...IdeaData]
        newArray[elementsIndex + position] = { ...newArray[elementsIndex + position], vote: +vote - 1 }
        setIdeaData(newArray)
        updateVoteMinus(key, vote, position)
    }

    let { showError, errMsg } = error
    let {popupData,isShowDetailPopup} = detailPopup
    return (
        <div>
            { showLoader ? <div className='loader' /> :
                <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                    <PowerSettingsNewIcon onClick={()=>history.push('/')} style={{cursor:'pointer'}}/>
                    <Button color="primary" variant="contained" id='create_idea' onClick={()=>history.push('/createNewIdea')}>Create Task</Button>
                    <h1>Hackathon Idea</h1>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                {window.innerWidth > 450 && <TableCell>Creator Id </TableCell>}
                                    <TableCell >Idea</TableCell>
                                    <TableCell onClick={sortTableOnDate} style={{ cursor: 'pointer' }} >Date {sortOrderOfDate == 1 ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}</TableCell>
                                    <TableCell >Detail</TableCell>
                                    <TableCell onClick={sortTableOnVote} style={{ cursor: 'pointer' }}>Vote {sortOrderOfVote == 1 ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {IdeaData && IdeaData.length > 0 && IdeaData.map((i, index) => {
                                    return (
                                        <TableRow key={`${new Date(i.date)}`} onClick={()=>setShowDetailPopup({popupData : i,isShowDetailPopup:true})}>
                                            {window.innerWidth > 450 && <TableCell component="th" scope="row">{i.userId}</TableCell>}
                                            <TableCell >{i.ideaName}</TableCell>
                                            <TableCell >{i.date.substring(0, 10)}</TableCell>
                                            <TableCell >{i.detail}</TableCell>
                                            <TableCell >
                                                {i.vote}<br />
                                                {i.userId !== user && <img src={Upvote} onClick={() => upvote(i)} alt='addvote' />}
                                                {i.userId !== user && <img src={Downvote} onClick={() => downVote(i)} alt='reducevote' />}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            }
            {showError && <Error errMsg={errMsg} />}
            {isShowDetailPopup && <Popup close={() => setShowDetailPopup({popupData : {},isShowDetailPopup:false})}>
                <Card>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {popupData.ideaName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Description : {popupData.detail}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Votes : {popupData.vote}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p" style={{fontSize:'0.5rem'}}>
                                            Date : {popupData.date}
                                        </Typography>
                                        
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                </Popup>}
        </div>

    )
}

export default Dashbaord;
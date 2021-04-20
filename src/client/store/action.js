import { firebase } from '../../initFb';
var database = firebase.database();

export function addData(userId, ideaName, details) {
    let previousdata = database.ref().child("users").child(userId).get()
    previousdata.then(response => {
        if (response.val() && response.val().ideas && response.val().ideas.length > 0) {
            database.ref('users/' + userId).set({
                username: userId,
                ideas: [...response.val().ideas, {
                    "ideaName": ideaName,
                    "date": `${new Date()}`,
                    "detail": details,
                    "vote": '1'
                }],
            });
        } else {
            database.ref('users/' + userId).set({
                username: userId,
                ideas: [{
                    "ideaName": ideaName,
                    "date": `${new Date()}`,
                    "detail": details,
                    "vote": '1'
                }],
            })
        }
    })
}

export function getDataAll() {
    return new Promise((resolve, reject) => {
        const dbRef = database.ref();
        dbRef.child("users").get().then(res => {
            resolve(res)
        })
    })
}

export function getUserData(userId) {
    return new Promise((resolve, reject) => {
        const dbRef = database.ref().child("users").child(userId);
        dbRef.get().then(res => {
            resolve(res)
        })
    })
}

export function updateVotePlus(userId, v, p) {
    return new Promise((resolve, reject) => {
        let updates = {};
        updates['/users/' + userId + '/ideas/' + p + '/vote'] = +v + 1;
        database.ref().update(updates).then(res => {
            resolve(res)
        })
    })
}

export function updateVoteMinus(userId, v, p) {
    return new Promise((resolve, reject) => {
        let updates = {};
        updates['/users/' + userId + '/ideas/' + p + '/vote'] = +v - 1;
        database.ref().update(updates).then(res => {
            resolve(res)
        })
    })
}
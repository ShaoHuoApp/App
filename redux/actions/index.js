import { USER_STATE_CHANGE } from '../constants/index'
import { auth, db, collection, doc, getDoc } from "../../firebase"

export function fetchUser() {
    return ((dispatch) => {
        const usersRef = collection(db, "users")
        getDoc(doc(usersRef, auth.currentUser.uid))
        .then((snapshot) => {
            if(snapshot.exists) {
                console.log(snapshot.data())
                dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
            }
            else {
                console.log('does not exist')
            }
        })
    })
}
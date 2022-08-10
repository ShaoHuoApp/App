import { USER_STATE_CHANGE } from '../constants/index'
import { auth, firestore, collection, doc, getDoc } from "../../firebase"

export function fetchUser() {
    return ((dispatch) => {
        const usersRef = collection(firestore, "users")
        getDoc(doc(usersRef, auth.currentUser.uid))
        .then((snapshot) => {
            if(snapshot.exists) {
                dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
            }
            else {
                console.log('does not exist')
            }
        })
    })
}
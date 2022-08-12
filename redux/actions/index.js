import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE } from "../constants/index";
import {
  auth,
  firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  firestoreQuery,
  orderBy,
} from "../../firebase";

export function fetchUser() {
  return (dispatch) => {
    const usersRef = collection(firestore, "users");
    getDoc(doc(usersRef, auth.currentUser.uid)).then((snapshot) => {
      if (snapshot.exists) {
        dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
      } else {
        console.log("does not exist");
      }
    });
  };
}

export function fetchUserPosts() {
  return (dispatch) => {
    const postsRef = collection(firestore, "posts");
    const userPostsRef = collection(
      doc(postsRef, auth.currentUser.uid),
      "userPosts"
    );
    getDocs(firestoreQuery(userPostsRef, orderBy("creation", "asc"))).then(
      (snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        console.log(posts);
        dispatch({ type: USER_POSTS_STATE_CHANGE, posts });
      }
    );
  };
}

export function fetchAllPosts() {
  return (dispatch) => {
    const postsRef = collection(firestore, "posts");
    // const userPostsRef = collection(
    //   doc(postsRef, auth.currentUser.uid),
    //   "userPosts"
    // );
    getDocs(firestoreQuery(postsRef, orderBy("creationTime", "asc"))).then(
      (snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        console.log("posts");
        console.log(posts);
        dispatch({ type: USER_POSTS_STATE_CHANGE, posts });
      }
    );
  };
}

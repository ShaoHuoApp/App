import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  CLEAR_DATA,
} from "../constants/index";
import {
  auth,
  firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  firestoreQuery,
  orderBy,
  onSnapshot,
} from "../../firebase";

export function clearData() {
  return ((dispatch) => {
      dispatch({type: CLEAR_DATA})
  })
}

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
        console.log({ uid: auth.currentUser.uid, posts: posts });
        dispatch({ type: USER_POSTS_STATE_CHANGE, posts });
      }
    );
  };
}

export function fetchUserFollowing() {
  return (dispatch) => {
    const followingRef = collection(firestore, "following");
    const userFollowingRef = collection(
      doc(followingRef, auth.currentUser.uid),
      "userFollowing"
    );
    onSnapshot(userFollowingRef, (snapshot) => {
      let following = snapshot.docs.map((doc) => {
        const id = doc.id;
        return id;
      });
      console.log("following", following);
      dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });
      for (let i = 0; i < following.length; i++) {
        dispatch(fetchUsersData(following[i], true));
      }
    });
  };
}

export function fetchUsersData(uid, getPosts) {
  return (dispatch, getState) => {
    const found = getState().usersState.users.some((el) => el.uid === uid);
    if (!found) {
      const usersRef = collection(firestore, "users");
      getDoc(doc(usersRef, uid)).then((snapshot) => {
        if (snapshot.exists) {
          let user = snapshot.data();
          user.uid = snapshot.id;
          dispatch({ type: USERS_DATA_STATE_CHANGE, user });
        } else {
          console.log("does not exist");
        }
      });
      if (getPosts) {
        dispatch(fetchUsersFollowingPosts(uid));
      }
    }
  };
}

export function fetchUsersFollowingPosts(uid) {
  return (dispatch, getState) => {
    const postsRef = collection(firestore, "posts");
    const userPostsRef = collection(doc(postsRef, uid), "userPosts");
    getDocs(firestoreQuery(userPostsRef, orderBy("creation", "asc"))).then(
      (snapshot) => {
        try {
          const uid = snapshot.docs[0].ref.path.split("/")[1];
          const user = getState().usersState.users.find((el) => el.uid === uid);
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data, user };
          });
          dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid });
        } catch (error) {
          console.log("user does not have post yet");
        }
        console.log("fetch user following", getState());
      }
    );
  };
}

import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
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
      dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });
      // TODO: fix unable to fetch last one
      for (let i = 0; i < following.length - 1; i++) {
        dispatch(fetchUsersData(following[i]));
      }
    });
  };
}

export function fetchUsersData(uid) {
  return (dispatch, getState) => {
    const found = getState().usersState.users.some((el) => el.uid === uid);
    if (!found) {
      const usersRef = collection(firestore, "users");
      getDoc(doc(usersRef, uid)).then((snapshot) => {
        if (snapshot.exists) {
          let user = snapshot.data();
          user.uid = snapshot.id;
          dispatch({ type: USERS_DATA_STATE_CHANGE, user });
          dispatch(fetchUsersFollowingPosts(user.uid));
        } else {
          console.log("does not exist");
        }
      });
    }
  };
}

export function fetchUsersFollowingPosts(uid) {
  return (dispatch, getState) => {
    const postsRef = collection(firestore, "posts");
    const userPostsRef = collection(doc(postsRef, uid), "userPosts");
    getDocs(firestoreQuery(userPostsRef, orderBy("creation", "asc"))).then(
      (snapshot) => {
        const uid = snapshot.docs[0].ref.path.split('/')[1];
        console.log({ snapshot, uid });
        const user = getState().usersState.users.find((el) => el.uid === uid);
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data, user };
        });
        // console.log(posts);
        dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid });
        console.log(getState());
      }
    );
  };
}

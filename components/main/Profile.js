import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Button } from "react-native";
import { connect } from "react-redux";
import {
  auth,
  collection,
  firestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  firestoreQuery,
  orderBy,
} from "../../firebase";

function Profile(props) {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const { currentUser, posts } = props;

    if (props.route.params.uid === auth.currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    } else {
      const usersRef = collection(firestore, "users");
      getDoc(doc(usersRef, props.route.params.uid)).then((snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data());
        } else {
          console.log("does not exist");
        }
      });
      const postsRef = collection(firestore, "posts");
      const userPostsRef = collection(
        doc(postsRef, props.route.params.uid),
        "userPosts"
      );
      getDocs(firestoreQuery(userPostsRef, orderBy("creation", "asc"))).then(
        (snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setUserPosts(posts);
        }
      );
    }

    if (props.following.indexOf(props.route.params.uid) > -1) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [props.route.params.uid, props.following]);

  const onFollow = () => {
    const followingRef = collection(firestore, "following");
    const userFollowingRef = collection(
      doc(followingRef, auth.currentUser.uid),
      "userFollowing"
    );
    setDoc(doc(userFollowingRef, props.route.params.uid), {});
  };
  const onUnfollow = () => {
    const followingRef = collection(firestore, "following");
    const userFollowingRef = collection(
      doc(followingRef, auth.currentUser.uid),
      "userFollowing"
    );
    deleteDoc(doc(userFollowingRef, props.route.params.uid));
  };

  if (user === null) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>

        {props.route.params.uid !== auth.currentUser.uid ? (
          <View>
            {following ? (
              <Button title="Following" onPress={() => onUnfollow()} />
            ) : (
              <Button title="Follow" onPress={() => onFollow()} />
            )}
          </View>
        ) : null}
      </View>

      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following,
});

export default connect(mapStateToProps, null)(Profile);

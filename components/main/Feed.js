import React from "react";
import { StyleSheet, View, Text, Image, FlatList, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import {
  auth,
  firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  firestoreQuery,
  orderBy,
  serverTimestamp,
} from "../../firebase";
import Comments from "./Comments";

function submitComment(item, comment) {
  const postsRef = collection(firestore, "posts");
  // console.log("attention")
  // console.log(item)
  const commentsRef = collection(doc(postsRef, item.id), "comments");
  addDoc(commentsRef, {
    downloadURL: "",
    caption: comment,
    creation: serverTimestamp(),
  });
  // .then(function () {
  //   props.navigation.popToTop();
  // });
}

function Feed(props) {
  const { posts } = props;
  const [comment, setComment] = React.useState("");

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Image style={styles.image} source={{ uri: item.downloadURL }} />
            <Text style={styles.text}> {item.caption} </Text>
            <Comments
              style={styles.comments}
              comments={item.comments}
              showNumber={3}
            />
            <TextInput
              style={styles.commentInput}
              placeholder="Comment here.."
              onChangeText={(text) => setComment(text)}
              value={comment}
            />
            <Button onCLick={submitComment(item, comment)}>Submit</Button>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  postContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  post: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  text: {
    flex: 1,
    alignContent: screenLeft,
  },
  comments: {
    flex: 1,
  },
});

const mapStateToProps = (store) => ({
  posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(Feed);

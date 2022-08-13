import React from "react";
import { StyleSheet, View, Text, Image, FlatList, Button } from "react-native";
import { TextInput } from "react-native-paper";

import Comment from "./Comment.js";

function showAllComments() {
  console.log("show all comments");
  // TODO
  // open a new tab and show all comments
}

function Comments(props) {
  const { comments, showNumber } = props;
  console.log({ comments, showNumber });

  return (
    <View style={styles.container}>
      <View style={styles.containerComments}>
        <FlatList
          data={comments}
          renderItem={({ item }) => <Comment post={item} />}
        />
      </View>
      {/* <Button onCLick={showAllComments}>Show All</Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  containerComments: {
    margin: 20,
    flex: 1 / 3,
  },
  commentInput: {
    flex: 1 / 3,
    width: 200,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 5,
  },
});

export default Comments;

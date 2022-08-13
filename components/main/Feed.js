import React from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { connect } from "react-redux";
//import Comments from "./Comments";

function Feed(props) {
  const { posts } = props;

  return (
    <View style={styles.container}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
              <Text style={styles.text}> {item.caption} </Text>
              
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
    justifyContent: "space-around"
  },
  post: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 3,
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
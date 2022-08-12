import React from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { connect } from "react-redux";
import Comments from "./Comments";

function Profile(props) {
  const { currentUser, posts } = props;
  console.log({ currentUser, posts });
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{currentUser.name}</Text>
        <Text>{currentUser.email}</Text>
      </View>

      <View style={styles.containerGallery}>
        {/* TODO */}
        {/* change to scrollview */}
        <FlatList
          numColumns={3}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerPost}>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
              <Text style={styles.text}> {item.caption} </Text>
              {/* Set this to visible after consulting with PM Hu about whether we need comments of posts in profile */}
              {/* <Comments style={style.comments} comments={item.comments} showNumber={3}> </Comments> */}
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
    marginTop: 40,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  containerPost: {
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
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(Profile);

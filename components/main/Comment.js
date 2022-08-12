import React from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { Button } from "react-native-paper";




function Comment({post}) {
  console.log({ post });
  console.log("here is post");

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{post.creator}</Text>
      </View>

      <View style={styles.containerGallery}>
       
        <View style={styles.containerPost}>
            <Image style={styles.image} source={{ uri: post.downloadURL }} />
            <Text style={styles.text}> {post.caption} </Text>
        </View>

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
      alignContent: screenLeft
    },
    comments: {
      flex: 1,
    }
  });
export default Comment;

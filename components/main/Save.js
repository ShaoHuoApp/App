import React, { useState } from "react";
import { View, TextInput, Image, Button } from "react-native";
import {
  auth,
  collection,
  firestore,
  doc,
  addDoc,
  storage,
  storageRef,
  uploadBytesResumable,
  getDownloadURL,
  serverTimestamp
} from "../../firebase";

export default function Save(props) {
  const [caption, setCaption] = useState("");

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const childPath = `post/${auth.currentUser.uid}/${Math.random().toString(
      36
    )}`;
    console.log(childPath);

    const response = await fetch(uri);
    const blob = await response.blob();

    const imageRef = storageRef(storage, childPath);
    const uploadTask = uploadBytesResumable(imageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          savePostData(downloadURL);
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const savePostData = (downloadURL) => {
    const postsRef = collection(firestore, "posts")
    const userPostsRef = collection(doc(postsRef, auth.currentUser.uid), "userPosts")
    addDoc(userPostsRef, {
        downloadURL,
        caption,
        creation: serverTimestamp(),
    }).then(function () {
        props.navigation.popToTop();
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: props.route.params.image }} />
      <TextInput
        placeholder="Write a Caption . . ."
        onChangeText={(caption) => setCaption(caption)}
      />

      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
}

import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native';
import { auth, createUserWithEmailAndPassword, firestore, collection, doc, setDoc } from '../../firebase';

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
         email: '',
         password: '',
         name: ''
    }

    this.onSignUp = this.onSignUp.bind(this)
  }

  onSignUp() {
    const { email, password, name } = this.state;
    createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
        const usersRef = collection(firestore, "users")
        setDoc(doc(usersRef, auth.currentUser.uid), {
            name,
            email
        }) 
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    })
  }

  render() {
    return (
      <View>
        <TextInput 
            placeholder='name'
            onChangeText={(name) => this.setState({name})}
        />
        <TextInput 
            placeholder='email'
            onChangeText={(email) => this.setState({email})}
        />
        <TextInput 
            placeholder='password'
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
        />

        <Button
            onPress={() => this.onSignUp( )}
            title="Sign Up"
        />
      </View> 
    )
  }
}

export default Register

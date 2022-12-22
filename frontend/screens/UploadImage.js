import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function UploadImage() {
  const [image, setImage] = useState(false);
  console.log(image)
  const addImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
    });
    console.log(JSON.stringify(_image));
  if (!_image.canceled) {
    console.log(_image.uri);
    setImage(_image.uri);
    }
  };

  let addPhoto;
  if (image === false) {
    addPhoto = (
        <View style={imageUploaderStyles.uploadBtnContainer}>
            <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                <Text>{image === false ? 'Edit' : 'Add'} Image </Text>
            </TouchableOpacity>
        </View>
    )
  } else {
    addPhoto = "";
  }

  return (
        <View style={imageUploaderStyles.container}>
            {
                image  && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
            } 
            {addPhoto}
        </View>
  );
}
const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:100,
        width:100,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:6,
        bottom:30,
        backgroundColor:'lightgrey',
        width:'80%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})
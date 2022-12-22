import * as React from "react";
import { useState, useCallback, useContext, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  TouchableOpacity,
  SafeAreaView, 
  Linking,
  Button,
  Dimensions,
  Share,
} from "react-native";
import { useSelector } from "react-redux";
// // import DocumentPicker, { types } from 'react-native-document-picker';
// import * as DocumentPicker from "expo-document-picker";
// import { SelectList } from "react-native-dropdown-select-list";
// import * as FileSystem from 'expo-file-system';
// import { WebView } from 'react-native-webview';
// import { Document } from 'react-pdf';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
// const { downloadAsync, documentDirectory } = FileSystem;
import * as MediaLibrary from 'expo-media-library';
import { StorageAccessFramework } from 'expo-file-system';

export default function InvoicesScreen() {
  

  /*const [fileResponse, setFileResponse] = useState([]);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf],
        allowMultiSelection: true,
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);*/

      /*const uri = FileSystem.documentDirectory+result.name;

await FileSystem.copyAsync({
   from: result.uri,
   to: uri
})*/

  /*let _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      multiple: true,
      copyToCacheDirectory: false,
    });

    console.log(result.uri);
  };*/

  //let pdfUrl = "https://www.orimi.com/pdf-test.pdf";
  //download pdf
  
const [pdfFile, setPdfFile] = useState([]);
const BACKEND_ADDRESS = "http://192.168.10.123";

useEffect(() => {
  fetch(`${BACKEND_ADDRESS}://localhost:3000/users`)
    .then(response => response.json())
    .then(data => {
      setPdfFile(data);
    });
}, []);

  const downloadPdf = () => {
    Linking.openURL(pdfUrl);
  };

  /*const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
if (!permissions.granted) {
    return;
}

try {
    await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'application/pdf')
    .then((r) => {
        console.log(r);
    })
    .catch((e) => {
        console.log(e);
    });
} 
catch((e) => {
    console.log(e);
});*/
  

  const [selected, setSelected] = React.useState("");

  const data = [
    { key: "1", value: "Janvier 2022" },
    { key: "2", value: "Février 2022" },
    { key: "3", value: "Mars 2022" },
    { key: "4", value: "Avril 2022" },
    { key: "5", value: "Mai 2022" },
    { key: "6", value: "Juin 2022" },
    { key: "7", value: "Juillet 2022" },
    { key: "8", value: "Août 2022" },
    { key: "9", value: "Septembre 2022" },
    { key: "10", value: "Octobre 2022" },
    { key: "11", value: "Novembre 2022" },
    { key: "12", value: "Décembre 2022" },
  ];

  /*const user = useSelector((state) => state.user.value);
if(pdfFile.length > 0){
  pdfFile = user.map(data, i)
  return<Linking key={i} ></Linking>
}*/

  return (
    <SafeAreaView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle={"dark-content"} />
      <Text>Votre dernière facture</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={downloadPdf}
      >
         <Text style={styles.textButton}>Télécharger la facture</Text>
      </TouchableOpacity>

      <Text>Historique des factures</Text>

      <Text>Période :</Text>
      <Text>De :</Text>
      {/* <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
      /> */}

      <Text>A :</Text>
      {/* <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "50%",
  },
  title: {
    width: "80%",
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    //width: "80%",
    //marginTop: 25,
    //borderBottomColor: "#ec6e5b",
    //borderBottomWidth: 1,
    //fontSize: 18,
    backgroundColor: "white",
    width: "50%",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
  },
  button: {
    alignItems: "center",
    paddingTop: 8,
    width: "70%",
    marginTop: 30,
    backgroundColor: "#008486",
    borderRadius: 10,
    marginBottom: 10,
  },
  textButton: {
    color: "#ffffff",
    height: 30,
    fontWeight: "900",
    fontSize: 17,
  },
  field: {
    width: "80%",
    fontSize: 25,
    fontWeight: "600",
  },
});

import { StyleSheet, Text, View } from 'react-native';
import UserProfile from './screens/UserProfile';
import DogProfile from './screens/DogProfile';

export default function ProfilScreen() {
  return (
    <View style={styles.container}>
      <Text>Profiles</Text>
      <DogProfile/>

      <UserProfile/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
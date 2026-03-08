import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from "expo-router";
import { useState } from "react";


type CityPickerProps = {
  cities: string[]
}

const Index = () => {

    return (
        <View style={styles.container}>
            <Text>Index page</Text>
            <Pressable style={styles.button} onPress={() => router.push("/weather")}>
                <Text style={{color: "white"}}>Go to the Weather page</Text>
            </Pressable>  
        </View>
    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  }
});

export default Index;



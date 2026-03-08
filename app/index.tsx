import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Dropdown from 'react-native-input-select';
import { setCity } from "@store/user/userSlice";
import { RootState, AppDispatch } from '@store/store';

const Index = () => {
  const { city } = useSelector((state: RootState) => state.user);
  const [cityName, setCityName] = useState(city);
  const dispatch = useDispatch<AppDispatch>();

  const handlePress = () => {
    dispatch(setCity(cityName));
    setCityName(cityName);
    
    router.push("/weather");
  };

    return (
        <View style={styles.container}>
            <Text>Choose your city</Text>
            <Text>city: {city}</Text>
            <Text>cityName: {cityName}</Text>

            <Dropdown
                label="City"
                placeholder="Select a city..."
                options={[
                  { label: 'Kyiv', value: 'Kyiv' },
                  { label: 'Lviv', value: 'Lviv' },
                  { label: 'Kharkiv', value: 'Kharkiv' },
                  { label: 'Odesa', value: 'Odesa' },
                  { label: 'Dnipro', value: 'Dnipro' },
                ]}
                isSearchable
                selectedValue={cityName}
                onValueChange={(value: any) => setCityName(value)}
                primaryColor={'green'}
                autoCloseOnSelect={true}
            />


            <Pressable style={styles.button} onPress={() => handlePress()}>
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

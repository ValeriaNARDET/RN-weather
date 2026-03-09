import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import Dropdown from 'react-native-input-select';
import { RootState, AppDispatch } from '@store/store';
import { setCity, setCoords } from "@store/user/userSlice";
import * as Location from 'expo-location';
import citiesData from '../cities.json';


const Index = () => {
  const { city } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const [selectedCityId, setSelectedCityId] = useState(Number);

  useEffect(() => {
    (async () => {
      const cityPlaceholder = "Kyiv";

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return cityPlaceholder;
      }

      let curLocation = await Location.getCurrentPositionAsync({});
      dispatch(setCoords({ lat: curLocation.coords.latitude, lon: curLocation.coords.longitude }));

      const rGeocode = await Location.reverseGeocodeAsync(curLocation.coords);
      const city =  (rGeocode.length > 0 && !!rGeocode[0].city) ? rGeocode[0].city : cityPlaceholder;
      
      dispatch(setCity(city));
    })();
  }, []);


  const handleSelect = (id: number) => {
    setSelectedCityId(id);
    const ind: number = citiesData.findIndex((city) => city.id === id);
    const { lat, lon } = citiesData[ind];

    dispatch(setCity(citiesData[ind].name));
    dispatch(setCoords({ lat, lon }));

  }

  const handlePress = () => {
    router.push("/weather");
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weather APP</Text>

      <View>
        <Text style={styles.text}>Check the weather at {city} or choose another city</Text>

        <View style={styles.dropdown}>
          <Dropdown
            label="Select a city"
            placeholder="Select a city..."
            options={citiesData}
            optionLabel={'name'}
            optionValue={"id"}
            isSearchable
            selectedValue={selectedCityId}
            onValueChange={(value: any) => handleSelect(value)}
            primaryColor={'green'}
            autoCloseOnSelect={true}
          />
        </View>

      </View>


      <Pressable style={styles.button} onPress={() => handlePress()}>
        <Text style={styles.buttonText}>Weather details</Text>
      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 70,
    backgroundColor: '#90c3ec',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0e1235',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0e1235',
  },
  dropdown: {
    marginTop: 20,
  },
  button: {
    backgroundColor: 'blue',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  }
});


export default Index;

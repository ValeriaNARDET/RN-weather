import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { AppDispatch } from "@store/store";
import { router } from "expo-router";
import Dropdown from 'react-native-input-select';
import { RootState } from '@store/store';
import citiesData from '../cities.json';
import { getLocalCoords, saveToStorage, saveUserGeo } from 'helpers/getGeo';
import loadCache from 'helpers/cache';


const Index = () => {
  const { city } = useSelector((state: RootState) => state.user);
  const [selectedCityId, setSelectedCityId] = useState(Number);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    loadCache(dispatch);
    getLocalCoords(dispatch);
  }, []);


  const handleSelect = (id: number) => {
    setSelectedCityId(id);
    const ind: number = citiesData.findIndex((city) => city.id === id);

    saveUserGeo(dispatch, citiesData[ind].name, citiesData[ind])
    saveToStorage(city, citiesData[ind]);
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

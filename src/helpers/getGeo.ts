import { useDispatch } from "react-redux";
import { AppDispatch } from '@store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setCity, setCoords } from "@store/user/userSlice";
import * as Location from 'expo-location';



const saveToStorage = async (city: string, coords: { lat: number; lon: number }) => {
    await AsyncStorage.setItem("city", city);
    await AsyncStorage.setItem("coords", JSON.stringify(coords));
};

const saveUserGeo = (dispatch: AppDispatch, city: string, coords: { lat: number; lon: number }) => {
    dispatch(setCity(city));
    dispatch(setCoords({ lat: coords.lat, lon: coords.lon }));
}

const getLocalCoords = async(dispatch: AppDispatch) => {
        const cityPlaceholder = "Kyiv";

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return cityPlaceholder;
        }

        let curLocation = await Location.getCurrentPositionAsync({});
        let coords = { lat: curLocation.coords.latitude, lon: curLocation.coords.longitude }
        dispatch(setCoords(coords));

        const rGeocode = await Location.reverseGeocodeAsync(curLocation.coords);
        const city = (rGeocode.length > 0 && !!rGeocode[0].city) ? rGeocode[0].city : cityPlaceholder;
        dispatch(setCity(city));

        saveToStorage(city, coords);
        saveUserGeo(dispatch, city, coords );
};

export { getLocalCoords, saveToStorage, saveUserGeo }
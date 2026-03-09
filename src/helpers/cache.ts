
import { AppDispatch } from "@store/store";
import { setCity, setCoords } from "@store/user/userSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';


const loadCache = async (dispatch: AppDispatch) => {
    const city = await AsyncStorage.getItem("city");
    if (city) dispatch(setCity(city));

    const coords = await AsyncStorage.getItem("coords");
    if (coords) dispatch(setCoords(JSON.parse(coords)));
};

export default loadCache;
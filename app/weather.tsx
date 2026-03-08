import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "@store/weather/weatherSlice";
import { AppDispatch, RootState } from "@store/store";


const WeatherPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { city } = useSelector((state: RootState) => state.user);
  const { temperature, condition, loading, error } = useSelector((state: RootState) => state.weather);
  const [qwe, setQwe] = useState();

  useEffect(() => {
    dispatch(fetchWeather(city));
  }, [city]);

  return (
      <View style={styles.container}>
          <Text>Weather Page</Text>
          <Text>city: {city}</Text>

          {loading && <Text>Loading...</Text>}
          {error && <Text>Error: {error}</Text>}

          {temperature && <Text>weather: {temperature}</Text>}
          {condition && <Text>weather: {condition}</Text>}

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WeatherPage;
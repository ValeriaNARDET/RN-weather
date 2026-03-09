import { View, Text, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@store/store";
import { fetchWeather } from "@store/weather/weatherSlice";


const WeatherPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { city, coords } = useSelector((state: RootState) => state.user);
  const { weather, temperature, condition, loading, error } = useSelector((state: RootState) => state.weather);
  

  useEffect(() => {
    dispatch(fetchWeather(coords));
  }, [])


  return (
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>{city}</Text>

          <View>
            {loading && <Text style={{ textAlign: "center" }} >Loading...</Text>}
            {error && <Text style={{ textAlign: "center" }} >Error: {error}</Text>}
          </View>
        </View>

        {weather && temperature && condition && 
          <View style={{ padding: 20 }}>
            <View style={{ alignItems: "center" }} >
              <Image
                style={styles.imageStyle}
                source={{ uri: `https:${weather?.condition?.icon}` }}
              />
            </View>
            <Text style={styles.temperature}>{temperature} C</Text>
            <Text style={styles.condition}>{condition}</Text>

            <View style={styles.wetherDetails}>
              <Text style={styles.wetherDetailsText}>{weather.wind_kph} kph</Text>
              <Text style={styles.wetherDetailsText}>{weather.humidity} %</Text>
            </View>
          </View>
        }
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingHorizontal: 20,
    paddingVertical: 70,
    backgroundColor: '#eeed99',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0e1235',
  },
  imageStyle: {
    width: 160,
    height: 160,
  },
  temperature: {
    marginVertical: 40,
    fontSize: 90,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#cacff8',
  },
  condition: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0e1235',
  },
  wetherDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 20,
  },
  wetherDetailsText: {
    fontSize: 18,
    color: '#0e1235',
  },
  forecastTitle: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0e1235',
  }
});

export default WeatherPage;
import { View, Text, StyleSheet } from "react-native";

const WeatherPage = () => {
    return (
        <View style={styles.container}>
            <Text>Weather Page</Text>
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
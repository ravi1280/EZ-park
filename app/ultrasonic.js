import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ultra(){
    const [distance, setDistance] = useState(null);

    const fetchDistance = async () => {
        try {
            const response = await axios.get('http://<ESP32-IP-ADDRESS>/distance');
            setDistance(response.data.distance);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(fetchDistance, 2000); // Fetch every 2 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Ultrasonic Sensor Distance: {distance ? `${distance} cm` : "Loading..."}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 18 },
});



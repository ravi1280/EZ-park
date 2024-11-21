// import { StatusBar } from "expo-status-bar";
// import { useEffect } from "react";
// import { StyleSheet, Text, View } from "react-native";

// export default function App() {
//   useEffect(() => {
//     console.log("hello")
//     const ws = new WebSocket("ws://ab08-112-134-225-12.ngrok-free.app/EZPark/Home_WebSocket");

//     const keepAlive = setInterval(() => {
//       if (ws.readyState === WebSocket.OPEN) {
//         ws.send("ping");
//       }
//     }, 29000);

//     ws.onopen = () => {
//       console.log("open");
//       ws.send("open connection (react-native)");
//       keepAlive;
//     };

//     ws.onmessage = (e) => {
//       console.log(e.data);
//     };

//     ws.onerror = (e) => {
//       console.log(e.message);
//     };

//     ws.onclose = (e) => {
//       console.log(e.code, e.reason);
//       clearInterval(keepAlive);
//     };
//   });
//   return (
//     <View style={styles.container}>
//       <Text>Now start to begin new Chatify Mobile chat Appliction </Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// const ws = new WebSocket(
//   "https://4f71-138-124-184-173.ngrok-free.app/EZPark/A"
// );

// const keepAlive = setInterval(() => {
//   if (ws.readyState === WebSocket.OPEN) {
//     ws.send("ping");
//   }
// }, 29000);

// ws.onopen = () => {
//   console.log("open");
//   ws.send("open connection (react-native)");
//   keepAlive;
// };

// ws.onmessage = (e) => {
//   console.log(e.data);
// };

// ws.onerror = (e) => {
//   console.log(e.message);
// };

// ws.onclose = (e) => {
//   console.log(e.code, e.reason);
//   clearInterval(keepAlive);
// };



import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DistanceApp  () {
    const [distance, setDistance] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const ws = new WebSocket('ws://c9d5-112-134-231-66.ngrok-free.app/EZPark/distance');

        ws.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setDistance(data.distance);
            } catch (err) {
                console.error('Error parsing message:', err);
            }
        };

        ws.onerror = (e) => {
            setError(e.message);
            console.error('WebSocket error:', e.message);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {distance !== null
                    ? `Latest Distance: ${distance} cm`
                    : 'Waiting for distance...'}
            </Text>
            {error && <Text style={styles.error}>Error: {error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
    },
    error: {
        color: 'red',
        marginTop: 20,
    },
});



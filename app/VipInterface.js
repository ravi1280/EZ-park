import * as SplashScreen from "expo-splash-screen";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function home() {
  // const [getmobile, setmobile] = useState("");
  // const [getvehhicalNumber, setvehicalNumber] = useState("");

  const logoPath1 = require("../assets/Images/parking.png");

  useEffect(() => {
    const ws = new WebSocket(
      "ws://special-lamprey-charmed.ngrok-free.app/EZPark/rfid"
    );

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // setDistance(data.distance);
        console.log(data.Uid);
        Alert.alert("message","User ID is"+data.Uid);
      } catch (err) {
        console.error("Error parsing message:", err);
      }
    };

    ws.onerror = (e) => {
      // setError(e.message);
      console.error("WebSocket error:", e.message);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <LinearGradient colors={["#FFF9B0", "#fff"]} style={styleSheet.Lview1}>
      <StatusBar backgroundColor={"#fff"} />

      <View style={styleSheet.header}>
        <View>
          <TouchableOpacity
            onPress={() => {
              router.push("/Home");
            }}
          >
            <Icon name="arrow-back" size={24} color="#555" />
          </TouchableOpacity>
        </View>
        <View style={styleSheet.profileInfo}>
          <Image
            source={require("../assets/Images/parking.png")}
            style={styleSheet.avatar}
          />
          <View style={styleSheet.userDetails}>
            <Text style={styleSheet.accountText}>VIP Members</Text>
          </View>
        </View>
      </View>
      <View style={styleSheet.View1}>
        <View style={styleSheet.inputView1}>
          <Text>Mobile Number</Text>
          <TextInput
            style={styleSheet.textInput}
            keyboardType={"number-pad"}
            onChangeText={(text) => {
              setmobile(text);
              // console.log(getpassword);
            }}
          />
        </View>
        <View style={styleSheet.inputView1}>
          <Text>Vehical Number</Text>
          <TextInput
            style={styleSheet.textInput}
            onChangeText={(text) => {
              setvehicalNumber(text);
            }}
          />
        </View>

        <TouchableOpacity
        onPress={async () => {
          let response = await fetch(process.env.EXPO_PUBLIC_URL+"/EZPark/CheckIn?mobile="+getmobile+"&vNumber="+getvehhicalNumber);
       

        if (response.ok) {
          //convert to js object
          let json = await response.json();
          if (json.success) {
            Alert.alert("Message",json.message);
          } else {
            Alert.alert("Message",json.message);
          }
        }
        }}
         
        >
          <View style={styleSheet.inputView2}>
            <Text>Parking Slot Reseved</Text>
          </View>
        </TouchableOpacity>

        <View style={styleSheet.gate}>
          <TouchableOpacity
            style={styleSheet.inputView3}
            onPress={async () => {
              let response = await fetch("http://192.168.1.4?status=90");
              Alert.alert("Message", " Success!");
            }}
          >
            <Text>Gate Open</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styleSheet.inputView3}
            onPress={async () => {
              let response = await fetch("http://192.168.1.4?status=80");
            }}
          >
            <Text>Gate Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
const styleSheet = StyleSheet.create({
  header: {
    flexDirection: "row",
    // justifyContent: 'space-between',
    columnGap: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 50,
    backgroundColor: "#fff",
    paddingVertical: 10,
    height: 80,
    elevation: 5,
    zIndex: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  alertView: {
    // marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 70,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userDetails: {
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  accountText: {
    fontSize: 20,
    // color: "#662d91",
  },

  textInput: {
    borderColor: "yellow",
    borderWidth: 2,
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  inputView1: {},
  inputView2: {
    // flex:1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFB84D",
    borderRadius: 20,
    marginVertical: 20,
  },
  inputView3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFB84D",
    borderRadius: 20,
    marginVertical: 20,
  },
  View1: {
    padding: 20,
  },
  gate: {
    // marginVertical: 10,
    flexDirection: "row",
    columnGap: 15,
    justifyContent: "center",
  },
});

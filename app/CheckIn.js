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
  const [getmodalVisible, setModalVisible] = useState(false);
  const [loaded, error] = useFonts({
    "Poppins-Bold": require("../assets/Fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/Fonts/Poppins-Regular.ttf"),
    "Oxygen-Bold": require("../assets/Fonts/Oxygen-Bold.ttf"),
    "Oxygen-Regular": require("../assets/Fonts/Oxygen-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const logoPath1 = require("../assets/Images/parking.png");

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
            <Text style={styleSheet.accountText}>Check In</Text>
          </View>
        </View>
      </View>
      <View style={styleSheet.View1}>
        <View style={styleSheet.inputView1}>
          <Text>Mobile Number</Text>
          <TextInput style={styleSheet.textInput} keyboardType={"number-pad"}/>
        </View>
        <View style={styleSheet.inputView1}>
          <Text>Vehical Number</Text>
          <TextInput style={styleSheet.textInput}  />
        </View>

        <TouchableOpacity onpress={()=>{Alert.alert("Message"," Success!");}}>
          <View style={styleSheet.inputView2}>
            <Text>Parking Slot Reseved</Text>
          </View>
        </TouchableOpacity>

        <View style={styleSheet.gate} >
          <View style={styleSheet.inputView3}>
            <Text>Gate Open</Text>
          </View>
          <View style={styleSheet.inputView3}>
            <Text>Gate Close</Text>
          </View>
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
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFB84D",
    borderRadius: 20,
    marginVertical: 20,
  },
  View1:{
    padding:20,
  },
  gate:{
    // marginVertical: 10,
    flexDirection: "row",
    columnGap: 15,
    justifyContent: "center",
  },
});

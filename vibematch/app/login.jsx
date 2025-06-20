import React from "react";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../assets/styles/default.styles.js";
import { COLORS } from "../constants/colors.js";

export default function LoginScreen() {
  return (
    <ImageBackground
      source={require("../assets/images/gradient-bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={localStyles.logoContainer}>
          <Image
            source={require("../assets/images/vibematch-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={localStyles.contentContainer}>
          <Text style={styles.title}>Sign up to continue</Text>
          <TouchableOpacity style={localStyles.spotifyButton}>
            <Image
              source={require("../assets/images/spotify-icon.png")}
              style={localStyles.smallLogo}
              resizeMode="contain"
            />
            <Text style={localStyles.spotifyButtonText}>Continue with Spotify</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    //paddingBottom: 40,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //paddingBottom: 60,
  },
  spotifyButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 16,
    flexDirection: "row",         // горизонтальное расположение
    alignItems: "center",         // вертикальное выравнивание
    justifyContent: "center",
  },
  spotifyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "ADLaM"
  },
  smallLogo: {
    width: 30,
    height: 30,
    marginRight: 12,
  },
});
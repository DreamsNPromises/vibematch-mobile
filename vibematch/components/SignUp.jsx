import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../assets/styles/create.styles";

export default function LoginScreen() {
  const handleSpotifyLogin = () => {
    // здесь будет логика авторизации через Spotify
    console.log("Continue with Spotify");
  };

  return (
    <View style={[styles.container, localStyles.centered]}>
      <Image
        source={require("../../assets/logo.png")}
        style={localStyles.logo}
        resizeMode="contain"
      />

      <Text style={localStyles.title, { fontFamily: "ADLaM" }}>Sign up to continue</Text>
      <TouchableOpacity style={localStyles.spotifyButton} onPress={handleSpotifyLogin}>
        <Text style={localStyles.spotifyButtonText}>Continue with Spotify</Text>
      </TouchableOpacity>
    </View>
  );
}

const localStyles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logo: { 
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  title: {
    fontSize: 180,
    color: COLORS.text,
    marginBottom: 30,
    fontWeight: "500",
  },
  spotifyButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  spotifyButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
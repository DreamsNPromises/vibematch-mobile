import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "../constants/colors.js";

export default function LabeledInput({ label, value, onChangeText, keyboardType = "default", ...props }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && { borderColor: COLORS.secondary }]}>
      <Text style={[styles.label, isFocused && { color: COLORS.secondary }]}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType={keyboardType}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderWidth: 1.5,
    borderColor: "#E8E6EA",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 6,
    marginBottom: 24,
  },
  label: {
    position: "absolute",
    top: -10,
    left: 10,
    backgroundColor: "white",
    paddingHorizontal: 12,
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "600",
    color: "#999",
    fontFamily: "ADLaM",
  },
  input: {
    marginLeft: 10,
    height: 40,
    fontSize: 16,
    color: "#2f2f2f",
    fontFamily: "ADLaM",
  },
});
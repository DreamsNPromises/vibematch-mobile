import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "../constants/colors.js";

export default function LabeledInput({ label, value, onChangeText, keyboardType = "default", multiline = false, ...props }) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputHeight, setInputHeight] = useState(40);

  return (
    <View style={[styles.container, isFocused && { borderColor: COLORS.secondary }, multiline && { paddingVertical: 12 }]}>
      <Text style={[styles.label, isFocused && { color: COLORS.secondary }]}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          if (multiline) setInputHeight(40); // сброс высоты
        }}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        style={[
          styles.input,
          multiline && { height: inputHeight, paddingTop: 8, paddingBottom: 8 },
        ]}
        onContentSizeChange={(e) => {
          if (multiline) {
            const height = e.nativeEvent.contentSize.height;
            if (height < 40) {
              setInputHeight(40);
            } else if (height !== inputHeight) {
              setInputHeight(height + 4); // немного форсируем рост
            }
          }
        }}
        style={[
          styles.input,
          multiline && { height: inputHeight, paddingTop: 8, paddingBottom: 8 },
        ]}
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
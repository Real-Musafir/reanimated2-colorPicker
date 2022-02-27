import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text } from "react-native";

function ColorPicker({ colors }) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ height: 50, width: "90%" }}
    />
  );
}

export default ColorPicker;

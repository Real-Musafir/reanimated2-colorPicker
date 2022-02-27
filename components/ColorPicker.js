import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text } from "react-native";

function ColorPicker({ colors, start, end, style }) {
  return (
    <LinearGradient colors={colors} start={start} end={end} style={style} />
  );
}

export default ColorPicker;

import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

function ColorPicker({ colors, start, end, style }) {
  return (
    <View style={{ justifyContent: "center" }}>
      <LinearGradient colors={colors} start={start} end={end} style={style} />
      <View style={styles.picker} />
    </View>
  );
}

const CIRCLE_PICKER_SIZE = 45;

const styles = StyleSheet.create({
  picker: {
    position: "absolute",
    backgroundColor: "white",
    width: CIRCLE_PICKER_SIZE,
    height: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE / 2,
  },
});

export default ColorPicker;

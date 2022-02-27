import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import ColorPicker from "./components/ColorPicker";

const COLORS = [
  "red",
  "purple",
  "blue",
  "cyan",
  "green",
  "yellow",
  "orange",
  "black",
  "white",
];

const BACKGROUND_COLOR = "rgba(0,0,0,0.9)";

const { width } = Dimensions.get("window");

const CIRCLE_SIZE = width * 0.8;
const PICKER_WIDTH = width * 0.9;

export default function App() {
  return (
    <>
      <View style={styles.topContainer} />

      <View style={styles.bottomContainer}>
        <ColorPicker colors={COLORS} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: "#fff",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
});

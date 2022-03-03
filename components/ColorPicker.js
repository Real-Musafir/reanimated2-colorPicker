import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  event,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

function ColorPicker({ colors, start, end, style, maxWidth }) {
  const translateX = useSharedValue(0);

  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(translateX.value, 0),
      maxWidth - CIRCLE_PICKER_SIZE
    );
  });

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = adjustedTranslateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: () => {},
  });

  const reStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: adjustedTranslateX.value }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View style={{ justifyContent: "center" }}>
        <LinearGradient colors={colors} start={start} end={end} style={style} />
        <Animated.View style={[styles.picker, reStyle]} />
      </Animated.View>
    </PanGestureHandler>
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

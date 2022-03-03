import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  event,
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

function ColorPicker({ colors, start, end, style, maxWidth }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(translateX.value, 0),
      maxWidth - CIRCLE_PICKER_SIZE
    );
  });

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = adjustedTranslateX.value;
      translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
      scale.value = withSpring(1.2);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: () => {
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
    },
  });

  const rInternalPickerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      [
        (1 / 9) * maxWidth,
        (2 / 9) * maxWidth,
        (3 / 9) * maxWidth,
        (4 / 9) * maxWidth,
        (5 / 9) * maxWidth,
        (6 / 9) * maxWidth,
        (7 / 9) * maxWidth,
        (8 / 9) * maxWidth,
        (9 / 9) * maxWidth,
      ],
      [
        "red",
        "purple",
        "blue",
        "cyan",
        "green",
        "yellow",
        "orange",
        "black",
        "white",
      ]
    );
    return {
      backgroundColor,
    };
  });

  const reStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: adjustedTranslateX.value },
        { scale: scale.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View style={{ justifyContent: "center" }}>
        <LinearGradient colors={colors} start={start} end={end} style={style} />
        <Animated.View style={[styles.picker, reStyle]}>
          <Animated.View
            style={[styles.internalPicker, rInternalPickerStyle]}
          />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}

const CIRCLE_PICKER_SIZE = 45;
const INTERNAL_PICKER_SIZE = CIRCLE_PICKER_SIZE / 2;

const styles = StyleSheet.create({
  picker: {
    position: "absolute",
    backgroundColor: "white",
    width: CIRCLE_PICKER_SIZE,
    height: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  internalPicker: {
    width: INTERNAL_PICKER_SIZE,
    height: INTERNAL_PICKER_SIZE,
    borderRadius: INTERNAL_PICKER_SIZE / 2,
    borderWidth: 1.0,
    borderColor: "rgba(0,0,0,0.2)",
  },
});

export default ColorPicker;

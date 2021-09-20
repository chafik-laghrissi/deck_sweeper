import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Animated,
  StyleSheet,
  PanResponder,
  Dimensions,
  UIManager,
  LayoutAnimation,
  Platform,
} from "react-native";
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const SCREEN_WIDTH = Dimensions.get("window").width;
const SWEEP_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWEEP_OUT_DURATION = 250;
const Deck = ({ RenderCard, data, sweepRight, sweepLeft, NoMoreCards }) => {
  const [itemIndex, setItemIndex] = useState(0);
  const animation = useRef(new Animated.ValueXY(0, 0));
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        animation.current.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWEEP_THRESHOLD) {
          return forceSweep("right");
        } else if (gesture.dx < -SWEEP_THRESHOLD) {
          return forceSweep("left");
        } else {
          resetPosition();
        }
      },
    })
  ).current;
  const resetPosition = () => {
    Animated.spring(animation.current, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };
  const onSweepComplete = (direction) => {
    const item = data[itemIndex];
    direction === "right" ? sweepRight(item) : sweepLeft(item);
    animation.current = new Animated.ValueXY({ x: 0, y: 0 });
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setItemIndex((preIndex) => preIndex + 1);
  };

  const forceSweep = (direction) => {
    const x = direction === "right" ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
    Animated.timing(animation.current, {
      toValue: {
        x,
        y: 0,
      },
      duration: SWEEP_OUT_DURATION,
      useNativeDriver: false,
    }).start(onSweepComplete(direction));
  };
  const getCardStyle = () => {
    const rotate = animation.current.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.4, 0, SCREEN_WIDTH * 1.4],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return { ...animation.current.getLayout(), transform: [{ rotate }] };
  };

  const RenderCards = () => {
    if (data.length <= itemIndex) {
      return <NoMoreCards />;
    }
    return data
      .map((item, index) => {
        if (index < itemIndex) return null;
        if (index === itemIndex) {
          return (
            <Animated.View
              key={item.photo}
              {...panResponder.panHandlers}
              style={[getCardStyle(), styles.cardStyle]}
            >
              <RenderCard index={index} title={item.title} photo={item.photo} />
            </Animated.View>
          );
        }
        return (
          <Animated.View
            key={item.photo}
            style={[
              styles.cardStyle,
              { top: (index - itemIndex) * 2 },
            ]}
          >
            <RenderCard index={index} title={item.title} photo={item.photo} />
          </Animated.View>
        );
      })
      .reverse();
  };
  return (
    <View style={styles.root}>
      <RenderCards />
    </View>
  );
};
const styles = StyleSheet.create({
  root: { marginVertical: 30 },
  cardStyle: { position: "absolute", width: SCREEN_WIDTH,elevation: 1 },
});
export default Deck;

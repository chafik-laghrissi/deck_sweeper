import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";
import CardContainer from "./CardContainer";
import Deck from "./Deck";
import NoMoreCards from "./NoMoreCards";
const CARDS = [
  {
    title: "Some title",
    photo:
      "https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg",
  },
  {
    title: "Some title",
    photo:
      "https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg",
  },
  {
    title: "Some title",
    photo:
      "https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg",
  },
  {
    title: "Some title",
    photo:
      "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg",
  },
  {
    title: "Some title",
    photo:
      "https://upload.wikimedia.org/wikipedia/en/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg",
  },
  {
    title: "Some title",
    photo:
      "https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg",
  },
];
const Main = () => {
  return (
    <View>
      <Deck
        data={CARDS}
        sweepLeft={() => {}}
        sweepRight={() => {}}
        RenderCard={CardContainer}
        NoMoreCards={NoMoreCards}
      />
    </View>
  );
};
export default Main;
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  ball: { borderRadius: 30, width: 50, height: 50, backgroundColor: "#000" },
});

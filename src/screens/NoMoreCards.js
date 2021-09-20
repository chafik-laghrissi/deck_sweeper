import React from "react";
import { Card, Button, Icon, Text } from "react-native-elements";
import { NativeModules } from "react-native";
const NoMoreCards = () => {
  return (
    <Card>
      <Card.Title>All done!</Card.Title>

      <Card.Divider />
      <Text>There's no more contents here!</Text>
      <Button
        icon={<Icon name="code" color="#ffffff" />}
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="Get More"
        onPress={() => {
          NativeModules.DevSettings.reload();
        }}
      />
    </Card>
  );
};
export default NoMoreCards;

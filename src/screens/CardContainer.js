import React, { useRef } from "react";
import { Card, Button, Icon } from "react-native-elements";
const CardContainer = ({ title, photo, index }) => {
  return (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Image source={{ uri: photo }} style={{ height: 200 }} />
      <Card.Divider />
      <Button
        icon={<Icon name="code" color="#ffffff" />}
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="VIEW NOW"
        onPress={() => {
          console.log(index);
        }}
      />
    </Card>
  );
};
export default CardContainer;

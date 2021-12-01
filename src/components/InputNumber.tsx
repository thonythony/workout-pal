import React from "react";
import {
  Button,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ViewStyle,
} from "react-native";

export type InputNumberProps = {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  style?: StyleProp<ViewStyle>;
};

const InputNumber = ({ label, value, onChange, style }: InputNumberProps) => {
  function decrement() {
    if (value - 1 < 0) {
      value = 0;
    } else {
      value--;
    }

    onChange(value);
  }

  function increment() {
    value++;
    onChange(value);
  }
  return (
    <View style={style}>
      {label && <Text style={styles.text}>{label}</Text>}
      <View style={styles.container}>
        <TouchableHighlight onPress={decrement}>
          <Text style={styles.button}>{"-"}</Text>
        </TouchableHighlight>
        <Text style={styles.number}>{value}</Text>
        <TouchableHighlight onPress={increment}>
          <Text style={styles.button}>{"+"}</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  button: {
    fontSize: 32,
    color: "#fff",
  },
  number: {
    color: "gray",
    fontSize: 48,
    marginLeft: 48,
    marginRight: 48,
  },
  text: {
    color: "#fff",
    fontSize: 48,
    textAlign: "left",
    alignSelf: "flex-start",
    marginTop: "auto",
    width: "100%",
  },
});

export default InputNumber;

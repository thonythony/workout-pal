import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";

export type InputTextProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

const InputText = ({ label, value, onChange, style }: InputTextProps) => {
  return (
    <View style={style}>
      {label && <Text style={styles.text}>{label}</Text>}
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={value}
        autoFocus={true}
        keyboardAppearance={"dark"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 32,
    paddingRight: 32,
  },
  text: {
    color: "#fff",
    fontSize: 48,
    textAlign: "left",
    alignSelf: "flex-start",
    marginTop: "auto",
  },
  input: {
    height: 80,
    fontSize: 32,
    width: "100%",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderColor: "gray",
    borderWidth: 1,
    color: "gray",
  },
});

export default InputText;

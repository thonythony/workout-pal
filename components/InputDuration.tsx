import { Picker } from "@react-native-community/picker";
import React, { useState } from "react";
import { View, Text, StyleProp, ViewStyle, StyleSheet } from "react-native";
import useFormatSecondsToMinSec from "../hooks/useFormatSecondsToMinSec";

export type InputDurationProps = {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  style?: StyleProp<ViewStyle>;
};

const InputDuration = ({
  label,
  value,
  onChange,
  style,
}: InputDurationProps) => {
  const { min, sec } = useFormatSecondsToMinSec(value);
  const [minutes, setMinutes] = useState(min.toString());
  const [seconds, setSeconds] = useState(sec.toString());
  const array = [...new Array(60)].map((it: any, idx: number) => idx);

  function updateValue(type: "min" | "sec", nb: string) {
    switch (type) {
      case "min":
        value = parseInt(nb, 10) * 60 + parseInt(seconds, 10);
        setMinutes(nb);
        break;
      case "sec":
        value = parseInt(minutes, 10) * 60 + parseInt(nb, 10);
        setSeconds(nb);
        break;
    }
    onChange(value);
  }

  return (
    <View style={style}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.container}>
        <Picker
          selectedValue={minutes}
          style={styles.picker}
          onValueChange={(itemValue) =>
            updateValue("min", itemValue.toString())
          }
        >
          {array.map((item: any, idx: number) => {
            return (
              <Picker.Item
                label={idx.toString()}
                value={idx.toString()}
                key={idx}
              />
            );
          })}
        </Picker>
        <Picker
          selectedValue={seconds}
          style={styles.picker}
          onValueChange={(itemValue) =>
            updateValue("sec", itemValue.toString())
          }
        >
          {array.map((item: any, idx: number) => {
            return (
              <Picker.Item
                label={idx.toString()}
                value={idx.toString()}
                key={idx}
              />
            );
          })}
        </Picker>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>minutes</Text>
        <Text style={styles.text}>seconds</Text>
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
  label: {
    color: "#fff",
    fontSize: 48,
    textAlign: "left",
    alignSelf: "flex-start",
    marginTop: "auto",
    width: "100%",
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 8,
    height: 150,
    width: 100,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    margin: 8,
    width: 100,
    textAlign: "center",
  },
});

export default InputDuration;

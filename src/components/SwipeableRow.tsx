import React from "react";
import { Animated, View, Text, StyleSheet } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialIcons } from "@expo/vector-icons";
import { RectButton, TouchableHighlight } from "react-native-gesture-handler";
import ITraining from "../interfaces/training";

type SwipeableRowRightActionProps = {
  action: string;
  color: string;
  backgroundColor: string;
  text?: string;
  icon?: string;
};

type SwipeableRowProps = {
  item: ITraining;
  onAction: (type: string) => void;
  renderRow: JSX.Element;
  rightActionList: SwipeableRowRightActionProps[];
};

const SwipeableRow = ({
  item,
  onAction,
  renderRow,
  rightActionList,
}: SwipeableRowProps) => {
  const renderRightAction = (
    params: SwipeableRowRightActionProps,
    x: number,
    progress: Animated.AnimatedInterpolation
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    return (
      <Animated.View
        style={{ flex: 1, transform: [{ translateX: trans }] }}
        key={x}
      >
        <RectButton
          style={[
            styles.rightAction,
            { backgroundColor: params.backgroundColor },
          ]}
          onPress={() => onAction(params.action)}
        >
          {params.icon && (
            <MaterialIcons name={params.icon} size={24} color={params.color} />
          )}
          {params.text && (
            <Text style={{ color: params.color, fontSize: 12 }}>
              {params.text}
            </Text>
          )}
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (progress: Animated.AnimatedInterpolation) => {
    const width = (rightActionList.length + 1) * 64;
    return (
      <View style={{ width, flexDirection: "row" }}>
        {rightActionList.map(
          (rightAction: SwipeableRowRightActionProps, idx: number) =>
            renderRightAction(rightAction, width - idx * 64, progress)
        )}
      </View>
    );
  };

  return (
    <Swipeable
      friction={2}
      rightThreshold={40}
      renderRightActions={renderRightActions}
    >
      <TouchableHighlight>
        <RectButton
          style={styles.rectButton}
          onPress={() => onAction("train")}
          activeOpacity={1}
        >
          {renderRow}
        </RectButton>
      </TouchableHighlight>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "black",
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default SwipeableRow;

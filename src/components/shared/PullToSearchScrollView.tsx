import React, { memo, ReactNode, ReactElement, useState } from "react";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { verticalPanGestureHandler, snapPoint } from "react-native-redash";
import { useMemoOne } from "use-memo-one";
import Animated from "react-native-reanimated";
import { View, StyleSheet } from "react-native";

const {
  block,
  Clock,
  Value,
  cond,
  eq,
  set,
  add,
  startClock,
  decay,
  and,
  lessOrEq,
  greaterOrEq,
  not,
  multiply,
  SpringUtils,
  spring,
  sub,
  pow,
  diff,
  min,
  divide,
  abs,
  useCode,
  neq,
  call
} = Animated;

const friction = (ratio: Animated.Node<number>) =>
  multiply(0.52, pow(sub(1, ratio), 2));

interface WithScrollParams {
  translationY: Animated.Value<number>;
  velocityY: Animated.Value<number>;
  state: Animated.Value<State>;
  containerHeight: number;
  contentHeight: number;
}

const withScroll = ({
  translationY,
  velocityY,
  state: gestureState,
  containerHeight,
  contentHeight
}: WithScrollParams) => {
  const clock = new Clock();
  const delta = new Value(0);
  const isSpringing = new Value(0);
  const state = {
    time: new Value(0),
    position: new Value(0),
    velocity: new Value(0),
    finished: new Value(0)
  };
  const upperBound = 0;
  const lowerBound = (contentHeight - containerHeight) * -1;
  const isInBound = and(
    lessOrEq(state.position, upperBound),
    greaterOrEq(state.position, lowerBound)
  );
  const config = {
    ...SpringUtils.makeDefaultConfig()
  };
  const overscroll = sub(
    state.position,
    cond(greaterOrEq(state.position, 0), upperBound, lowerBound)
  );
  return block([
    startClock(clock),
    set(delta, diff(translationY)),
    cond(
      eq(gestureState, State.ACTIVE),
      [
        set(isSpringing, 0),
        set(
          state.position,
          add(
            state.position,
            cond(
              isInBound,
              delta,
              multiply(
                delta,
                friction(min(divide(abs(overscroll), containerHeight), 1))
              )
            )
          )
        ),
        set(state.velocity, velocityY),
        set(state.time, 0)
      ],
      [
        set(translationY, 0),
        cond(
          and(isInBound, not(isSpringing)),
          [decay(clock, state, { deceleration: 0.997 })],
          [
            set(isSpringing, 1),
            set(
              config.toValue,
              snapPoint(state.position, state.velocity, [
                lowerBound,
                upperBound
              ])
            ),
            spring(clock, state, config)
          ]
        )
      ]
    ),
    state.position
  ]);
};

interface PullToSearchScrollViewProps {
  translateY?: Animated.Value<number>;
  children?: ReactElement[];
  onPull?: () => void;
  refs: [];
}

export const PullToSearchScrollView = memo(
  ({
    children,
    onPull,
    translateY,
    refs,
    viewRef,
    artistRef
  }: PullToSearchScrollViewProps) => {
    const [containerHeight, setContainerHeight] = useState(0);
    const [contentHeight, setContentHeight] = useState(0);
    const { gestureHandler, translationY, velocityY, state } = useMemoOne(
      () => verticalPanGestureHandler(),
      []
    );
    useCode(
      () =>
        block([
          set(
            translateY,
            withScroll({
              translationY,
              velocityY,
              state,
              containerHeight,
              contentHeight
            })
          ),
          cond(
            and(greaterOrEq(translateY, 100), neq(state, State.ACTIVE)),
            call([], onPull)
          )
        ]),
      [translationY, velocityY, state, containerHeight, contentHeight, onPull]
    );

    return (
      <View
        style={styles.container}
        onLayout={({ nativeEvent }) =>
          setContainerHeight(nativeEvent.layout.height)
        }
      >
        <PanGestureHandler
          ref={viewRef}
          waitFor={artistRef}
          {...gestureHandler}
        >
          <Animated.View
            onLayout={({ nativeEvent }) =>
              setContentHeight(nativeEvent.layout.height)
            }
            style={{ transform: [{ translateY }] }}
            pointerEvents="box-only"
          >
            {children}
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

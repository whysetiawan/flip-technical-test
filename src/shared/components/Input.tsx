import React from 'react';
import type { TextInputProps, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { TextInput, View, StyleSheet } from 'react-native';
import colors from 'tailwindcss/colors';

export interface OutlinedProps extends Omit<TextInputProps, 'style'> {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  tintColor?: ({ focused }: { focused: boolean }) => string;
}

const Outlined = React.forwardRef<TextInput, OutlinedProps>((props, ref) => {
  const { containerStyle, inputStyle, ...inputProps } = props;
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View
      style={StyleSheet.flatten([
        styles.outlinedContainer,
        containerStyle,
        {
          borderColor: props.tintColor?.({ focused: isFocused }) ?? '#d9d9d9',
        },
      ])}>
      {props.prefix}
      <TextInput
        {...inputProps}
        ref={ref}
        onFocus={(e) => {
          props.onFocus?.(e);
          setIsFocused(true);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        placeholderTextColor={inputProps.placeholderTextColor ?? colors.gray[400]}
        style={StyleSheet.flatten([styles.inputStyle, inputStyle])}
      />
      {props.suffix}
    </View>
  );
});

Outlined.displayName = 'Outlined';

export interface UnderlinedProps extends Omit<TextInputProps, 'style'> {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  tintColor?: ({ focused }: { focused: boolean }) => string;
}

const Underlined = React.forwardRef<TextInput, UnderlinedProps>((props, ref) => {
  const { containerStyle, inputStyle, ...inputProps } = props;
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View
      style={StyleSheet.flatten([
        styles.underlinedContainer,
        containerStyle,
        {
          borderColor: props.tintColor?.({ focused: isFocused }) ?? '#d9d9d9',
        },
      ])}>
      {props.prefix}
      <TextInput
        {...inputProps}
        ref={ref}
        onFocus={(e) => {
          props.onFocus?.(e);
          setIsFocused(true);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        placeholderTextColor={inputProps.placeholderTextColor ?? colors.gray[400]}
        style={StyleSheet.flatten([styles.inputStyle, inputStyle])}
      />
      {props.suffix}
    </View>
  );
});

Underlined.displayName = 'Underlined';

const styles = StyleSheet.create({
  outlinedContainer: {
    borderWidth: 1,
    borderColor: colors.gray[400],
    elevation: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
  },
  underlinedContainer: {
    borderBottomWidth: 1,
    borderColor: colors.gray[400],
    paddingHorizontal: 2,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default { Outlined, Underlined };

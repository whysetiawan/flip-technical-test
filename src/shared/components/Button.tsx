import React from 'react';
import type { StyleProp, TextStyle, TouchableOpacityProps } from 'react-native';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from 'tailwindcss/colors';

export interface ButtonProps extends TouchableOpacityProps {
  titleStyle?: StyleProp<TextStyle>;
  style?: StyleProp<TextStyle>;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  children?: React.ReactNode | string;
  tintColor?: string;
}

const Solid: React.FC<ButtonProps> = ({
  children,
  titleStyle,
  style,
  prefix,
  suffix,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={StyleSheet.flatten([styles.baseBtn, styles.solidBtn, style])}>
      {prefix ? <>{prefix}</> : <View />}
      {typeof children === 'string' ? (
        <Text style={StyleSheet.flatten([styles.solidTextStyle, titleStyle])}>{children}</Text>
      ) : (
        children
      )}
      {suffix ? <>{suffix}</> : <View />}
    </TouchableOpacity>
  );
};

const Outlined: React.FC<ButtonProps> = ({
  children,
  titleStyle,
  style,
  prefix,
  suffix,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={StyleSheet.flatten([styles.baseBtn, styles.outlinedBtn, style])}>
      {prefix ? <>{prefix}</> : <View />}
      {typeof children === 'string' ? (
        <Text style={StyleSheet.flatten([styles.outlinedTextStyle, titleStyle])}>{children}</Text>
      ) : (
        children
      )}
      {suffix ? <>{suffix}</> : <View />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseBtn: {
    borderRadius: 8,
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  solidBtn: {
    backgroundColor: colors.blue[400],
  },
  solidTextStyle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  outlinedBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.blue[400],
  },
  outlinedTextStyle: {
    color: colors.blue[400],
    fontSize: 16,
  },
});

export default { Solid, Outlined };

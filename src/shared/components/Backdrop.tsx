import { type PropsWithChildren } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

interface BackDropProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  visible?: boolean;
}

const BackDrop: React.FC<PropsWithChildren<BackDropProps>> = ({
  onPress,
  style,
  children,
  visible,
}) => {
  return (
    <>
      <Pressable
        onPress={onPress}
        style={[
          styles.container,
          styles.backdrop,
          styles.abs,
          {
            display: visible ? 'flex' : 'none',
            zIndex: 0,
          },
        ]}
      />
      <View
        style={[
          // styles.abs,
          style,
          {
            display: visible ? 'flex' : 'none',
            flex: 1,
            // zIndex: 1,
            // height: '100%',
            // width: '100%',
          },
        ]}>
        {children}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  abs: {
    position: 'absolute',
    overflow: 'hidden',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // cursor: 'auto',
  },
});

export default BackDrop;

import { type PropsWithChildren } from 'react';
import type { PressableProps } from 'react-native';
import { Pressable } from 'react-native';

import { cn } from '#/shared/utils';

interface BackDropProps extends PressableProps {
  onPress?: () => void;
  className?: string;
  visible?: boolean;
}

const BackDrop: React.FC<PropsWithChildren<BackDropProps>> = ({ onPress, children, ...props }) => {
  return (
    <>
      <Pressable
        {...props}
        onPress={onPress}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        className={cn('absolute top-0 bottom-0 left-0 right-0', props.className && props.className)}
      />
      {children}
    </>
  );
};

export default BackDrop;

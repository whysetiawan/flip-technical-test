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
          position: 'absolute',
        }}
        className={cn('h-full w-full', props.className && props.className)}
      />
      {children}
    </>
  );
};

export default BackDrop;

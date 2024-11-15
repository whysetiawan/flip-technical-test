import { StatusBar } from 'expo-status-bar';
import { cssInterop } from 'nativewind';
import React, { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import TransactionListPage from '#/modules/transaction/presentation/TransactionList/TransactionListPage';

cssInterop(SafeAreaView, {
  className: {
    target: 'style',
  },
});

const Index = () => {
  return (
    <SafeAreaView className="flex-1">
      <StatusBar translucent />
      <TransactionListPage />
    </SafeAreaView>
  );
};

// This component is memoized to prevent re-rendering on parent re-render
export default memo(Index);

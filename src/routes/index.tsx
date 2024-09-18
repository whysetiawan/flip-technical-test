import { StatusBar } from 'expo-status-bar';
import React from 'react';

import TransactionListPage from '#/modules/transaction/presentation/TransactionList/TransactionListPage';

const Index = () => {
  return (
    <>
      <StatusBar translucent={false} />
      <TransactionListPage />
    </>
  );
};

export default Index;

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';

import type { Transaction } from '#/modules/transaction/domain/entities/transaction';
import { testIds } from '#/shared/constants/testIds';
import { cn, parseAmount, parseDate } from '#/shared/utils';

interface TransactionListItemProps {
  transaction: Transaction;
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({ transaction }) => {
  const router = useRouter();
  return (
    <Pressable
      testID={testIds.trxListPage.trxItem(transaction.id)}
      onPress={() =>
        router.navigate({
          pathname: `/transaction/[id]`,
          params: transaction,
        })
      }
      className="bg-white flex-row rounded-md h-[103px]">
      <TransactionStatusMarker status={transaction.status} />
      <View className="w-full flex-row justify-between p-5 items-center">
        <View>
          <View className="justify-center">
            <View className="flex-row items-center gap-x-1">
              <Text className="text-base font-black">
                {transaction.senderBank} <Ionicons name="arrow-forward-sharp" size={14} />{' '}
                {transaction.beneficiaryBank}
              </Text>
            </View>
            <Text className="text-md font-semibold">{transaction.beneficiaryName}</Text>
            <Text className="text-md font-semibold">
              {parseAmount(transaction.amount)}
              <Text className="text-md font-bold"> • </Text>
              {parseDate(transaction.createdAt)}
            </Text>
          </View>
        </View>
        <TransactionListStatus status={transaction.status} />
      </View>
    </Pressable>
  );
};

const TransactionStatusMarker: React.FC<{
  status: Transaction['status'];
}> = ({ status }) => {
  const bgColor = cn(status === 'PENDING' ? 'bg-primary' : 'bg-green-500');

  return (
    <View
      testID={testIds.trxListPage.statusMarker}
      className={cn('w-2 rounded-l-md h-full', bgColor)}
    />
  );
};

const TransactionListStatus: React.FC<{
  status: Transaction['status'];
}> = ({ status }) => {
  if (status === 'SUCCESS') {
    return (
      <View className="bg-green-500 px-2 py-1 rounded-md">
        <Text className="text-md font-bold text-white">Berhasil</Text>
      </View>
    );
  }

  return (
    <View className="border-primary px-2 py-1 rounded-md border-2">
      <Text className="text-md font-bold">Pengecekan</Text>
    </View>
  );
};

export default memo(TransactionListItem);

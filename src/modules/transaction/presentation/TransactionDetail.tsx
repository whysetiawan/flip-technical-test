import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Platform, Pressable, Text, ToastAndroid, View } from 'react-native';

import type { Transaction } from '#/modules/transaction/domain/entities/transaction';
import { testIds } from '#/shared/constants/testIds';
import { parseAmount, parseDate } from '#/shared/utils';

const TransactionDetail: React.FC = () => {
  const router = useRouter();
  // @ts-expect-error - It's okay to ignore this error
  // Because Expo Router expect the params values to be a string
  const params = useLocalSearchParams<Transaction>();

  const copyTransactionId = async () => {
    await Clipboard.setStringAsync(params.id);
    if (Platform.OS === 'android') {
      return ToastAndroid.show('ID transaksi berhasil disalin', ToastAndroid.SHORT);
    }
    return Alert.alert('Pemberitahuan', 'ID transaksi berhasil disalin');
  };

  return (
    <View className="flex-1 mt-8">
      <View className="p-5 border-b border-gray-200 bg-white">
        <Text className="text-lg font-bold">
          ID TRANSAKSI: #{params.id}{' '}
          <MaterialIcons
            testID={testIds.trxDetailPage.copyTrxIdButton}
            onPress={copyTransactionId}
            name="content-copy"
            color="#e1734b"
            size={18}
          />
        </Text>
      </View>

      <View className="flex-row justify-between p-5 border-b border-gray-200 bg-white">
        <Text className="text-lg font-bold">DETAIL TRANSAKSI</Text>
        <Pressable testID={testIds.trxDetailPage.closeButton} onPress={router.back}>
          <Text className="text-lg text-primary">Tutup</Text>
        </Pressable>
      </View>

      <View className="p-5 bg-white gap-y-4">
        <Text className="text-2xl font-black">
          {params.senderBank} <Ionicons name="arrow-forward-sharp" size={20} />{' '}
          {params.beneficiaryBank}
        </Text>

        <View className="flex-row justify-between">
          <View className="w-1/2 gap-y-4">
            <View>
              <Text testID={testIds.trxDetailPage.beneficiaryName} className="text-lg font-bold">
                {params.beneficiaryName.toUpperCase()}
              </Text>
              <Text testID={testIds.trxDetailPage.accountNumber} className="text-lg">
                {params.accountNumber}
              </Text>
            </View>

            <View>
              <Text className="text-lg font-bold">BERITA TRANSFER</Text>
              <Text testID={testIds.trxDetailPage.remark} className="text-lg">
                {params.remark}
              </Text>
            </View>

            <View>
              <Text className="text-lg font-bold">WAKTU DIBUAT</Text>
              <Text testID={testIds.trxDetailPage.createdAt} className="text-lg">
                {parseDate(params.createdAt)}
              </Text>
            </View>
          </View>

          <View className="w-1/3 gap-y-4">
            <View>
              <Text className="text-lg font-bold">NOMINAL</Text>
              <Text testID={testIds.trxDetailPage.amount} className="text-lg">
                {parseAmount(params.amount)}
              </Text>
            </View>

            <View>
              <Text className="text-lg font-bold">KODE UNIK</Text>
              <Text testID={testIds.trxDetailPage.uniqueCode} className="text-lg">
                {params.uniqueCode}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TransactionDetail;

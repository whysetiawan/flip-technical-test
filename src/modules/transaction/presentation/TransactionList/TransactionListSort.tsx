import { MaterialIcons } from '@expo/vector-icons';
import { Modal, Pressable, Text, View } from 'react-native';

import type { ITransactionSort } from '#/modules/transaction/presentation/TransactionList/TransactionListPage';
import BackDrop from '#/shared/components/Backdrop';
import { testIds } from '#/shared/constants/testIds';

const SORT_OPTIONS: ITransactionSort[] = [
  {
    label: 'URUTKAN',
    value: 'none-asc',
  },
  {
    label: 'Nama A-Z',
    value: 'name-asc',
  },
  {
    label: 'Nama Z-A',
    value: 'name-desc',
  },
  {
    label: 'Tanggal Terbaru',
    value: 'date-desc',
  },
  {
    label: 'Tanggal Terlama',
    value: 'date-asc',
  },
];

export interface TransactionListSortProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSort?: ITransactionSort;
  onSelectSort?: (sort: ITransactionSort) => void;
}

const TransactionListSort: React.FC<TransactionListSortProps> = ({
  isOpen,
  onClose,
  onSelectSort,
  selectedSort,
}) => {
  return (
    <Modal transparent visible={isOpen} onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center">
        <BackDrop testID={testIds.trxListPage.backdrop} onPress={onClose}>
          <View className="bg-white w-[90%] rounded-md px-5 py-10 shadow-sm gap-y-8">
            {SORT_OPTIONS.map((option) => {
              const isSelected = option.value === selectedSort?.value;
              return (
                <Pressable
                  key={option.label}
                  onPress={() => {
                    onSelectSort?.(option);
                    onClose();
                  }}
                  className="flex-row items-center gap-x-2">
                  <MaterialIcons
                    name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                    size={24}
                    color="#e1734b"
                  />
                  <Text className="text-lg font-semibold">{option.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </BackDrop>
      </View>
    </Modal>
  );
};

export default TransactionListSort;

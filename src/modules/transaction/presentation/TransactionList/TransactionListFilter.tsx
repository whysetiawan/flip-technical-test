import { MaterialIcons } from '@expo/vector-icons';
import { Modal, Pressable, Text, View } from 'react-native';

import type { ITransactionFilter } from '#/modules/transaction/presentation/TransactionList/TransactionList';
import BackDrop from '#/shared/components/Backdrop';

const FILTER_OPTIONS: ITransactionFilter[] = [
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

interface TransactionListFilterProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilter?: ITransactionFilter;
  onSelectFilter?: (filter: ITransactionFilter) => void;
}

const TransactionListFilter: React.FC<TransactionListFilterProps> = ({
  isOpen,
  onClose,
  onSelectFilter,
  selectedFilter,
}) => {
  return (
    <Modal transparent visible={isOpen} onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center">
        <BackDrop onPress={onClose}>
          <View className="bg-white w-[90%] rounded-md px-5 py-10 shadow-sm gap-y-8">
            {FILTER_OPTIONS.map((option) => {
              const isSelected = option.value === selectedFilter?.value;
              return (
                <Pressable
                  key={option.label}
                  onPress={() => {
                    onSelectFilter?.(option);
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

export default TransactionListFilter;

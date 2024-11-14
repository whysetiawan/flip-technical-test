import { MaterialIcons } from '@expo/vector-icons';
import { Modal, Pressable, Text, View } from 'react-native';

import BackDrop from '#/shared/components/Backdrop';

const FILTER_OPTIONS = [
  {
    label: 'URUTKAN',
    value: {
      sortBy: 'none',
      order: 'asc',
    },
  },
  {
    label: 'Nama A-Z',
    value: {
      sortBy: 'name',
      order: 'asc',
    },
  },
  {
    label: 'Nama Z-A',
    value: {
      sortBy: 'name',
      order: 'desc',
    },
  },
  {
    label: 'Tanggal Terbaru',
    value: {
      sortBy: 'date',
      order: 'asc',
    },
  },
  {
    label: 'Tanggal Terlama',
    value: {
      sortBy: 'date',
      order: 'desc',
    },
  },
];

interface TransactionListFilterProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilter?: (typeof FILTER_OPTIONS)[number]['value'];
  onSelectFilter?: (filter: (typeof FILTER_OPTIONS)[number]['value']) => void;
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
              const isSelected =
                option.value.sortBy === selectedFilter?.sortBy &&
                option.value.order === selectedFilter?.order;
              return (
                <Pressable
                  key={option.label}
                  onPress={() => {
                    onSelectFilter?.(option.value);
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

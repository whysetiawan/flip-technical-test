import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';
import colors from 'tailwindcss/colors';

import Input from '#/shared/components/Input';

interface TransactionListHeaderProps {
  onSearchChange: (search: string) => void;
  onFilterPress: () => void;
}

const TransactionListHeader: React.FC<TransactionListHeaderProps> = ({
  onSearchChange,
  onFilterPress,
}) => {
  return (
    <Input.Outlined
      onChangeText={onSearchChange}
      className="mb-4"
      placeholder="Cari nama, bank, atau nominal"
      suffix={
        <Pressable onPress={onFilterPress} className="flex-row items-center">
          <Text className="text-primary font-bold">URUTKAN</Text>
          <Ionicons name="chevron-down" size={18} color="#e1734b" />
        </Pressable>
      }
      prefix={<Ionicons name="search" size={20} className="mr-2" color={colors.gray[400]} />}
    />
  );
};

export default TransactionListHeader;

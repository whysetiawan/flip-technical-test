import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';
import colors from 'tailwindcss/colors';

import Input from '#/shared/components/Input';
import { testIds } from '#/shared/constants/testIds';

export interface TransactionListHeaderProps {
  onSearchChange: (search: string) => void;
  onFilterPress: () => void;
  labelFilter?: string;
}

const TransactionListHeader: React.FC<TransactionListHeaderProps> = ({
  onSearchChange,
  onFilterPress,
  labelFilter,
}) => {
  return (
    <Input.Outlined
      testID={testIds.trxListPage.searchInput}
      onChangeText={onSearchChange}
      className="mb-4"
      placeholder="Cari nama, bank, atau nominal"
      suffix={
        <Pressable
          testID={testIds.trxListPage.filterButton}
          onPress={onFilterPress}
          className="flex-row items-center">
          <Text className="text-primary font-bold">{labelFilter}</Text>
          <Ionicons name="chevron-down" size={18} color="#e1734b" />
        </Pressable>
      }
      prefix={<Ionicons name="search" size={20} className="mr-2" color={colors.gray[400]} />}
    />
  );
};

export default TransactionListHeader;

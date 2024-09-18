import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';
import colors from 'tailwindcss/colors';

import Input from '#/shared/components/Input';

interface TransactionListHeaderProps {
  onSearchChange: (search: string) => void;
}

const TransactionListHeader: React.FC<TransactionListHeaderProps> = ({ onSearchChange }) => {
  return (
    <Input.Outlined
      onChangeText={onSearchChange}
      placeholder="Cari nama, bank, atau nominal"
      containerStyle={styles.container}
      suffix={
        <Pressable className="flex-row items-center">
          <Text className="text-primary font-bold">URUTKAN</Text>
          <Ionicons name="chevron-down" size={18} color="#e1734b" />
        </Pressable>
      }
      prefix={<Ionicons name="search" size={20} className="mr-2" color={colors.gray[400]} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    elevation: 0,
    marginBottom: 16,
  },
});

export default TransactionListHeader;

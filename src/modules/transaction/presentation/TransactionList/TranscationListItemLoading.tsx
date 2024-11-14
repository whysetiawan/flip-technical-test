import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const Shimmer = createShimmerPlaceholder(LinearGradient);

export interface TransactionListItemLoadingProps {
  testID?: string;
}

const TransactionListItemLoading: React.FC<TransactionListItemLoadingProps> = ({ testID }) => {
  return (
    <View testID={testID} className="w-full bg-white rounded-md p-4 pl-6 h-[103px]">
      <View className="flex-row justify-between items-center">
        <View className="gap-y-2 ">
          <Shimmer shimmerStyle={{ width: 100, height: 20 }} />
          <Shimmer shimmerStyle={{ width: 90, height: 20 }} />
          <Shimmer shimmerStyle={{ width: 120, height: 20 }} />
        </View>
        <Shimmer shimmerStyle={{ width: 80, height: 20 }} />
      </View>
    </View>
  );
};

export default TransactionListItemLoading;

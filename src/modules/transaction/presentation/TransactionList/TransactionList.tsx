import { useState } from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList, RefreshControl, View } from 'react-native';

import { useTransactionsQuery } from '#/modules/transaction/application/hooks/useTransactionsQuery';
import type { Transaction } from '#/modules/transaction/domain/entities/transaction';
import TransactionListHeader from '#/modules/transaction/presentation/TransactionList/TransactionListHeader';
import TransactionListItem from '#/modules/transaction/presentation/TransactionList/TransactionListItem';
import TransactionListItemLoading from '#/modules/transaction/presentation/TransactionList/TranscationListItemLoading';
import { debounce } from '#/shared/utils';

// The indices of the sticky headers.
// Place this outside the component to prevent re-creating the array on each render.
// const stickyHeaderIndices = [0];

const dummy = Array.from({ length: 10 }, (_, i) => ({ id: i.toString() }) as Transaction);

const TransactionList = () => {
  const { data, refetch, isFetching } = useTransactionsQuery();
  const [searchQuery, setSearchQuery] = useState('');

  const trx = data?.pages.flat().filter((item) => {
    return (
      item.beneficiaryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.senderBank.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.beneficiaryBank.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.amount.toString().includes(searchQuery)
    );
  });

  const _renderItem: ListRenderItem<Transaction> = ({ item }) => {
    if (isFetching) {
      return <TransactionListItemLoading />;
    }
    return <TransactionListItem transaction={item} />;
  };

  const _renderSeparator = () => {
    return <View className="h-2" />;
  };

  const _keyExtractor = (item: Transaction) => item.id.toString();

  return (
    <FlatList
      contentContainerClassName="pt-8 pb-4 px-4 flex-grow"
      refreshControl={<RefreshControl refreshing={false} onRefresh={refetch} />}
      ListHeaderComponent={<TransactionListHeader onSearchChange={debounce(setSearchQuery, 500)} />}
      data={isFetching ? dummy : trx}
      keyExtractor={_keyExtractor}
      renderItem={_renderItem}
      ItemSeparatorComponent={_renderSeparator}
      // onEndReached={throttle(fetchNextPage, 500)}
      // Since the height of each item is fixed, we can use `getItemLayout` to optimize the performance.
      getItemLayout={(_, index) => ({ length: trx?.length ?? 0, offset: 103 * index, index })}
      // windowSize is set to 17 to improve the performance of the FlatList.
      // This value should be adjusted based on the number of items in the list.
      windowSize={15}
      initialNumToRender={10}
      maxToRenderPerBatch={7}
    />
  );
};

export default TransactionList;

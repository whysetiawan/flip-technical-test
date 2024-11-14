import { useState } from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList, RefreshControl, View } from 'react-native';

import type { SortBy } from '#/modules/transaction/application/hooks/useTransactionsQuery';
import { useTransactionsQuery } from '#/modules/transaction/application/hooks/useTransactionsQuery';
import type { Transaction } from '#/modules/transaction/domain/entities/transaction';
import TransactionListFilter from '#/modules/transaction/presentation/TransactionList/TransactionListFilter';
import TransactionListHeader from '#/modules/transaction/presentation/TransactionList/TransactionListHeader';
import TransactionListItem from '#/modules/transaction/presentation/TransactionList/TransactionListItem';
import TransactionListItemLoading from '#/modules/transaction/presentation/TransactionList/TranscationListItemLoading';
import { debounce } from '#/shared/utils';

const memoizedSearch = new Map<string, Transaction[]>();

// The indices of the sticky headers.
// Place this outside the component to prevent re-creating the array on each render.
// const stickyHeaderIndices = [0];

const dummy = Array.from({ length: 10 }, (_, i) => ({ id: i.toString() }) as Transaction);

export interface ITransactionFilter {
  label: string;
  value: SortBy;
}

const TransactionList = () => {
  const [selectedFilter, setSelectedFilter] = useState<ITransactionFilter>({
    label: 'URUTKAN',
    value: 'none-asc',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const { data, refetch, isFetching } = useTransactionsQuery(searchQuery, selectedFilter.value);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const trx = data?.pages.flat() ?? [];

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

  const _onRefresh = () => {
    refetch();
    memoizedSearch.clear();
  };

  const _openFilter = () => {
    setIsFilterVisible(true);
  };

  const _closeFilter = () => {
    setIsFilterVisible(false);
  };

  return (
    <>
      <FlatList
        contentContainerClassName="pt-8 pb-4 px-4 flex-grow"
        refreshControl={<RefreshControl refreshing={false} onRefresh={_onRefresh} />}
        ListHeaderComponent={
          <TransactionListHeader
            onFilterPress={_openFilter}
            onSearchChange={debounce(setSearchQuery, 500)}
            labelFilter={selectedFilter.label}
          />
        }
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
      <TransactionListFilter
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
        isOpen={isFilterVisible}
        onClose={_closeFilter}
      />
    </>
  );
};

export default TransactionList;

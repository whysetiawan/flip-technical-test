import type { ListRenderItem } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import { cssInterop } from 'nativewind';
import { memo, useCallback, useMemo, useState } from 'react';
import { RefreshControl, View } from 'react-native';

import type { SortBy } from '#/modules/transaction/application/hooks/useTransactionsQuery';
import { useTransactionsQuery } from '#/modules/transaction/application/hooks/useTransactionsQuery';
import type { Transaction } from '#/modules/transaction/domain/entities/transaction';
import TransactionListHeader from '#/modules/transaction/presentation/TransactionList/TransactionListHeader';
import TransactionListItem from '#/modules/transaction/presentation/TransactionList/TransactionListItem';
import TransactionListSort from '#/modules/transaction/presentation/TransactionList/TransactionListSort';
import TransactionListItemLoading from '#/modules/transaction/presentation/TransactionList/TranscationListItemLoading';
import { testIds } from '#/shared/constants/testIds';
import { debounce } from '#/shared/utils';

// const memoizedSearch = new Map<string, Transaction[]>();

// The indices of the sticky headers.
// Place this outside the component to prevent re-creating the array on each render.
// const stickyHeaderIndices = [0];

cssInterop(FlashList, {
  contentContainerClassName: {
    target: 'contentContainerStyle',
  },
});

const dummy = Array.from({ length: 10 }, (_, i) => ({ id: i.toString() }) as Transaction);

export interface ITransactionSort {
  label: string;
  value: SortBy;
}

const TransactionList = () => {
  const [selectedSort, setSelectedSort] = useState<ITransactionSort>({
    label: 'URUTKAN',
    value: 'none-asc',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const { data, refetch, isFetching } = useTransactionsQuery(searchQuery, selectedSort.value);
  const [isSortVisible, setIsSortVisible] = useState(false);

  const _renderItem: ListRenderItem<Transaction> = useCallback(
    ({ item, index }) => {
      if (isFetching) {
        return <TransactionListItemLoading testID={testIds.trxListPage.shimmer(index)} />;
      }
      return <TransactionListItem transaction={item} />;
    },
    [isFetching],
  );

  // this will prevent re-creation of the function on each render
  // we actually can lift up to global scope, but it's better to keep it here
  // so when the component is removed, the function will be removed as well
  const _renderSeparator = useCallback(() => {
    return <View className="h-2" />;
  }, []);

  // const _keyExtractor = (item: Transaction) => item.id.toString();

  // Since react query does not rely on the component's state, we can use the same function for each render.
  const _onRefresh = useCallback(() => {
    refetch();
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // this will prevent re-creation of the function on each render
  const _openSortModal = useCallback(() => {
    setIsSortVisible(true);
  }, []);

  // this will prevent re-creation of the function on each render
  const _closeSortModal = useCallback(() => {
    setIsSortVisible(false);
  }, []);

  /**
   * debounce is re-rcreated on each render, so we need to memoize it to prevent re-creation.
   */
  const debouncedSearch = useMemo(() => debounce(setSearchQuery, 500), []);

  return (
    <>
      <View className="px-4 pt-4 z-50">
        <TransactionListHeader
          onSortPress={_openSortModal}
          onSearchChange={debouncedSearch}
          sortByLabel={selectedSort.label}
        />
      </View>

      <FlashList
        testID={testIds.trxListPage.list}
        contentContainerClassName="pt-4 pb-4 px-4"
        refreshControl={<RefreshControl refreshing={false} onRefresh={_onRefresh} />}
        data={isFetching ? dummy : data}
        renderItem={_renderItem}
        estimatedItemSize={102}
        ItemSeparatorComponent={_renderSeparator}
      />
      {/* <FlatList
        testID={testIds.trxListPage.list}
        contentContainerClassName="pt-8 pb-4 px-4 flex-grow"
        refreshControl={<RefreshControl refreshing={false} onRefresh={_onRefresh} />}
        ListHeaderComponent={
          <TransactionListHeader
            onSortPress={_openSortModal}
            onSearchChange={debounce(setSearchQuery, 500)}
            sortByLabel={selectedSort.label}
          />
        }
        data={isFetching ? dummy : data}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        ItemSeparatorComponent={_renderSeparator}
        // onEndReached={throttle(fetchNextPage, 500)}
        // Since the height of each item is fixed, we can use `getItemLayout` to optimize the performance.
        getItemLayout={(_, index) => ({ length: data?.length ?? 0, offset: 103 * index, index })}
        // windowSize is set to 17 to improve the performance of the FlatList.
        // This value should be adjusted based on the number of items in the list.
        windowSize={15}
        initialNumToRender={10}
        maxToRenderPerBatch={7}
      /> */}
      <TransactionListSort
        selectedSort={selectedSort}
        onSelectSort={setSelectedSort}
        isOpen={isSortVisible}
        onClose={_closeSortModal}
      />
    </>
  );
};

// This will prevent the component from re-rendering if the parent component re-renders.
export default memo(TransactionList);

import { useRef, useCallback } from 'react';

const useInfiniteScroll = (fetchNextPage: () => void, hasNextPage: boolean, isFetchingNextPage: boolean) => {
  const observer = useRef<IntersectionObserver | null>(null);;

  const lastElementRef = useCallback(
    (node: any) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  return lastElementRef;
};

export default useInfiniteScroll;

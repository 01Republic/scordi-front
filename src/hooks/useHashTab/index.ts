import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface UseHashTabProps {
  tabs: string[];
  defaultIndex?: number;
}

export const useHashTab = ({tabs, defaultIndex = 0}: UseHashTabProps) => {

  const router = useRouter();
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex);

  useEffect(() => {
    const hash = router.asPath.split('#')[1];
    if (hash) {
      const index = tabs.findIndex(tab => tab === decodeURIComponent(hash));
      if (index !== -1) setActiveTabIndex(index);
    }
  }, [router.asPath, tabs]);

  const setTab: Dispatch<SetStateAction<number>> = (indexOrUpdater) => {
    // SetStateAction<T> = T | ((prevState: T) => T)
    // 직접 값(숫자)이면 바로 사용, 함수면 실행해서 결과값 사용
    const newIndex = typeof indexOrUpdater === 'function'
      ? indexOrUpdater(activeTabIndex)  // 함수형 업데이트: prev => prev + 1
      : indexOrUpdater;                 // 직접 값: setTab(2)

    setActiveTabIndex(newIndex);
    const newUrl = router.asPath.split('#')[0] + '#' + encodeURIComponent(tabs[newIndex]);
    router.replace(newUrl, undefined, { shallow: true });
  };

  return { activeTabIndex, setActiveTabIndex: setTab };
};
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export interface TabConfig {
  id: string;        // 'member'
  label: string;     // '멤버'
  component?: React.ComponentType;
}

interface UseQueryTabConfig {
  tabs: TabConfig[];
  paramKey?: string;      // 기본값: 'tab'
  defaultTab?: string;    // 기본값: 첫 번째 탭 ID
}

export const useQueryTab = ({
  tabs,
  paramKey = 'tab',
  defaultTab
}: UseQueryTabConfig) => {
  const router = useRouter();
  const defaultTabId = defaultTab || tabs[0]?.id || '';

  // URL에서 직접 현재 활성 탭 계산 (상태 없이)
  const queryTabId = router.query[paramKey] as string;
  const validTabId = tabs.find(tab => tab.id === queryTabId)?.id;
  const activeTabId = validTabId || defaultTabId;

  // 현재 활성 탭의 인덱스
  const activeTabIndex = tabs.findIndex(tab => tab.id === activeTabId);
  
  // 현재 활성 탭 객체
  const activeTab = tabs.find(tab => tab.id === activeTabId) || tabs[0];

  // 탭 변경 함수 - URL 쿼리 파라미터 업데이트
  const setActiveTab = (tabIdOrIndex: string | number) => {
    const targetTab = typeof tabIdOrIndex === 'string' 
      ? tabs.find(tab => tab.id === tabIdOrIndex)
      : tabs[tabIdOrIndex];
    
    if (!targetTab) return;

    const newQuery = { ...router.query, [paramKey]: targetTab.id };
    router.replace(
      { pathname: router.pathname, query: newQuery },
      undefined,
      { shallow: true }
    );
  };

  // MainTabButtons 호환을 위한 Dispatch 타입 함수
  const setActiveTabIndex: Dispatch<SetStateAction<number>> = (indexOrUpdater) => {
    // SetStateAction<T> = T | ((prevState: T) => T)
    // 직접 값(숫자)이면 바로 사용, 함수면 실행해서 결과값 사용
    const newIndex = typeof indexOrUpdater === 'function'
      ? indexOrUpdater(activeTabIndex)  // 함수형 업데이트: prev => prev + 1
      : indexOrUpdater;                 // 직접 값: setTab(2)

    setActiveTab(newIndex);
  };

  return {
    activeTab,
    activeTabId,
    activeTabIndex,
    setActiveTab,
    setActiveTabIndex,
  };
};
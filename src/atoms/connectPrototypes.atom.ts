import {atom} from 'recoil';
import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';
import {LoginDto, OrgItemDto} from '^types/crawler';

// 연동 모달의 활성화 여부
export const connectPrototypeModalState = atom({
    key: 'connectPrototypeModalState',
    default: false,
});

// 연동 모달의 연동대상 SaaS 앱
export const currentPrototypeState = atom<ApplicationPrototypeDto | null>({
    key: 'currentPrototypeState',
    default: null,
});

// 연동 모달의 진행 단계
export const connectModalStageState = atom({
    key: 'connectModalStageState',
    default: 1,
});

// 연동 모달의 로딩 상태
export const connectModalIsLoadingState = atom<boolean>({
    key: 'connectModalIsLoadingState',
    default: false,
});

// 연동 모달에 입력한 계정정보
export const connectModalAuthInfoState = atom<LoginDto | null>({
    key: 'connectModalAuthInfoState',
    default: null,
});

// 연동 모달로 불러온 연동가능한 조직 후보 목록
export const connectModalConnectableOrgListState = atom<OrgItemDto[]>({
    key: 'connectModalConnectableOrgListState',
    default: [],
});

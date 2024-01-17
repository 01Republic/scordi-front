import {memo} from 'react';

interface SkipButtonProps {
    onClick: () => any;
    disabled: boolean;
}

export const SkipButton = memo(function SkipButton(props: SkipButtonProps) {
    const {onClick, disabled} = props;

    return (
        <div className="absolute top-0 right-0 mt-[40px] mr-[40px]">
            <button
                onClick={onClick}
                className={`${
                    disabled && 'opacity-0'
                } btn-link flex flex-col gap-2 items-center text-gray-400 no-underline hover:text-gray-600 hover:underline underline-offset-2`}
            >
                <span className="leading-none">나중에 할래요</span>
            </button>
        </div>
    );
});

export enum SkippedStoreStatus {
    WorkspaceSkip = 'workspace-skipped',
    InvoiceSkip = 'invoice-skipped',
}

export class OnboardingSkippedStore {
    storeKey: SkippedStoreStatus;
    expireDayDuration = 1; // 온보딩 "스킵" 상태가 지속되는 시간 (일 단위)
    store: Record<number, number> = {}; // 의도한 구조 => Record<organizationId, timestamp>;

    constructor(storeKey: SkippedStoreStatus) {
        this.init(storeKey);
    }

    init(storeKey: SkippedStoreStatus) {
        const storeStr = window.localStorage.getItem(storeKey);
        if (storeStr) {
            this.store = JSON.parse(storeStr);
        } else {
            window.localStorage.setItem(storeKey, JSON.stringify({}));
        }
    }

    checkSkip(organizationId: number) {
        const date = this.show(organizationId);
        if (!date) return false;
        const expireAt = new Date(date);
        expireAt.setDate(expireAt.getDate() + this.expireDayDuration);
        return new Date().getTime() <= expireAt.getTime();
    }

    show(organizationId: number) {
        const timestamp = this.store[organizationId];
        return timestamp ? new Date(timestamp) : null;
    }

    add(organizationId: number, storeKey: SkippedStoreStatus) {
        this.store[organizationId] = new Date().getTime();
        this.save(storeKey);
    }

    remove(organizationId: number, storeKey: SkippedStoreStatus) {
        delete this.store[organizationId];
        this.save(storeKey);
    }

    private save(storeKey: SkippedStoreStatus) {
        window.localStorage.setItem(storeKey, JSON.stringify(this.store));
    }
}

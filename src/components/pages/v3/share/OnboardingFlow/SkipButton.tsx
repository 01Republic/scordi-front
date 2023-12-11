import {memo} from 'react';

interface SkipButtonProps {
    onClick: () => any;
}

export const SkipButton = memo(function SkipButton(props: SkipButtonProps) {
    const {onClick} = props;

    return (
        <div className="absolute top-0 right-0 mt-[40px] mr-[40px]">
            <button
                onClick={onClick}
                className="btn-link flex flex-col gap-2 items-center text-gray-400 no-underline hover:text-gray-600 hover:underline underline-offset-2"
            >
                <span className="leading-none">나중에 할래요</span>
            </button>
        </div>
    );
});

export class OnboardingSkippedStore {
    storeKey = 'onboarding-skipped';
    expireDayDuration = 1; // 온보딩 "스킵" 상태가 지속되는 시간 (일 단위)
    store: Record<number, number> = {}; // 의도한 구조 => Record<organizationId, timestamp>;

    constructor() {
        this.init();
    }

    init() {
        const storeStr = window.localStorage.getItem(this.storeKey);
        if (storeStr) {
            this.store = JSON.parse(storeStr);
        } else {
            window.localStorage.setItem(this.storeKey, JSON.stringify({}));
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

    add(organizationId: number) {
        this.store[organizationId] = new Date().getTime();
        this.save();
    }

    remove(organizationId: number) {
        delete this.store[organizationId];
        this.save();
    }

    private save() {
        window.localStorage.setItem(this.storeKey, JSON.stringify(this.store));
    }
}

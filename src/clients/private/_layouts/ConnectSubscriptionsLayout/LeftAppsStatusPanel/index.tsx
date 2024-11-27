import {memo} from 'react';
import {LogoHeader} from './LogoHeader';
import {SelectedAppsSection} from './SelectedAppsSection';
import {Inquiry} from './Inquiry';
import {LinkTo} from '^components/util/LinkTo';
import {FaAngleLeft} from 'react-icons/fa6';
import {useRouter} from 'next/router';

export const LeftAppsStatusPanel = memo(function LeftAppsStatusPanel() {
    const router = useRouter();
    return (
        <aside className="w-full max-w-[400px] min-w-[250px] bg-gray-50 relative min-h-screen">
            <div className="pt-10 pb-14 px-10">
                <div className="mb-2 text-14">
                    <LinkTo
                        onClick={() => router.back()}
                        className="flex items-center gap-2 transition-all hover:gap-3 cursor-pointer"
                        displayLoading={false}
                    >
                        <FaAngleLeft />
                        <span>돌아가기</span>
                    </LinkTo>
                </div>
                <LogoHeader />
            </div>
            <div
                className="px-10 py-2 flex-auto overflow-scroll no-scrollbar"
                style={{
                    height: 'calc(100vh - 114px - 178px)',
                }}
            >
                <SelectedAppsSection />
            </div>
            <div className="py-4 px-10 sticky bottom-0 bg-gray-50">
                <Inquiry />
            </div>
        </aside>
    );
});

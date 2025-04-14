import {NewLandingPageLayout} from '^clients/public/home/LandingPages/NewLandingPageLayout';
import {Check} from 'lucide-react';

export const ReviewResponseCompletePage = () => {
    return (
        <NewLandingPageLayout pageName="AdditionalInfoPage" hideNav>
            <article className="flex flex-col items-center justify-center gap-10">
                <section className="flex flex-col items-center justify-center gap-5 w-full">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primaryColor-900">
                        <Check className="text-white text-32 font-semibold" />
                    </div>
                    <span className="text-36 font-bold text-neutral-900">응답이 정상적으로 제출되었어요!</span>
                </section>
            </article>
        </NewLandingPageLayout>
    );
};

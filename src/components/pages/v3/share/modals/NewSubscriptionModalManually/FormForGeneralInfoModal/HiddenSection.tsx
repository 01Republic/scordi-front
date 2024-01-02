import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {WithChildren} from '^types/global.type';
import {newSubscriptionManualFormData} from '^v3/share/modals/NewSubscriptionModalManually/atom';

export const HiddenSection = memo(function HiddenSection(props: WithChildren) {
    const formData = useRecoilValue(newSubscriptionManualFormData);
    const {children} = props;

    return (
        <section
            className={`transition-all flex flex-col gap-4 ${
                formData.productId ? 'visible opacity-100' : 'invisible opacity-0'
            }`}
        >
            {children}
        </section>
    );
});

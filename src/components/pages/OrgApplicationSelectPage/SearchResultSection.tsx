import {memo} from 'react';
import {MobileSection} from '^components/v2/MobileSection';
import {useApplicationPrototypes} from '^hooks/useApplicationPrototypes';
import {PreLoader} from '^components/PreLoader';
import {SearchResultPreLoader} from '^components/pages/OrgApplicationSelectPage/SearchResultPreLoader';
import {SearchResultItem} from '^components/pages/OrgApplicationSelectPage/SearchResultItem';
import {MobileEntityListSection} from '^components/v2/MobileEntityListSection';

interface SearchResultSectionProps {}

export const SearchResultSection = memo((props: SearchResultSectionProps) => {
    const {data: prototypes, isLoading} = useApplicationPrototypes([]);

    return (
        <MobileEntityListSection
            listOfData={prototypes}
            preloader={isLoading && <SearchResultPreLoader />}
            itemCustomRender={(proto, i) => <SearchResultItem data={proto} key={i} />}
        />
    );
});

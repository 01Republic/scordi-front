import {memo} from 'react';
import {useProducts} from '^hooks/useProducts';
import {SearchResultPreLoader} from '^components/pages/OrgApplicationSelectPage/SearchResultPreLoader';
import {SearchResultItem} from '^components/pages/OrgApplicationSelectPage/SearchResultItem';
import {MobileEntityListSection} from '^components/v2/MobileEntityListSection';

interface SearchResultSectionProps {}

export const SearchResultSection = memo((props: SearchResultSectionProps) => {
    const {items: prototypes} = useProducts();

    return (
        <MobileEntityListSection
            listOfData={prototypes || []}
            preloader={!prototypes && <SearchResultPreLoader />}
            itemCustomRender={(proto, i) => <SearchResultItem data={proto} key={i} />}
        />
    );
});

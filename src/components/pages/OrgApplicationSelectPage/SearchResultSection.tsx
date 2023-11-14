import {memo} from 'react';
import {useProducts} from '^models/Product/hook';
import {SearchResultPreLoader} from '^components/pages/OrgApplicationSelectPage/SearchResultPreLoader';
import {SearchResultItem} from '^components/pages/OrgApplicationSelectPage/SearchResultItem';
import {MobileEntityListSection} from '^components/v2/MobileEntityListSection';

interface SearchResultSectionProps {}

export const SearchResultSection = memo((props: SearchResultSectionProps) => {
    const {items: products} = useProducts();

    return (
        <MobileEntityListSection
            listOfData={products || []}
            preloader={!products && <SearchResultPreLoader />}
            itemCustomRender={(proto, i) => <SearchResultItem data={proto} key={i} />}
        />
    );
});

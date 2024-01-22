import {memo} from 'react';
import {useProductsV2} from '^models/Product/hook';
import {SearchResultPreLoader} from '^components/pages/OrgApplicationSelectPage/SearchResultPreLoader';
import {SearchResultItem} from '^components/pages/OrgApplicationSelectPage/SearchResultItem';
import {MobileEntityListSection} from '^components/v2/MobileEntityListSection';

interface SearchResultSectionProps {}

export const SearchResultSection = memo((props: SearchResultSectionProps) => {
    const {result} = useProductsV2();
    const products = result.items;

    return (
        <MobileEntityListSection
            listOfData={products || []}
            preloader={!products && <SearchResultPreLoader />}
            itemCustomRender={(proto, i) => <SearchResultItem data={proto} key={i} />}
        />
    );
});

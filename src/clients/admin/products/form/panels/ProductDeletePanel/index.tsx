import {ProductDto} from '^models/Product/type';
import {ContentPanel, ContentPanelList} from '^layouts/ContentLayout';
import {TransferProduct} from './TransferProduct';
import {RemoveProduct} from './RemoveProduct';

interface PrototypeDeletePanelProps {
    product: ProductDto;
}

export const ProductDeletePanel = (props: PrototypeDeletePanelProps) => {
    const {product} = props;

    return (
        <ContentPanel title="위험 구역!">
            <ContentPanelList>
                <TransferProduct product={product} />
                <RemoveProduct product={product} />
            </ContentPanelList>
        </ContentPanel>
    );
};

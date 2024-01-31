import {ProductSimilarNameDto} from '^models/ProductSimilarName/type';
import {ContentPanel, ContentPanelItem, ContentPanelItemTitle, ContentPanelList} from '^layouts/ContentLayout';
import React, {memo, useEffect, useState} from 'react';
import {ProductDto} from '^models/Product/type';
import {productSimilarNameApi} from '^models/ProductSimilarName/api';
import {toast} from 'react-toastify';

interface MergedProductNameListProps {
    product: ProductDto;
}

export const MergedProductNameList = memo((props: MergedProductNameListProps) => {
    const {product} = props;

    const [isLoaded, setIsLoaded] = useState(false);
    const [similarNames, setSimilarNames] = useState<ProductSimilarNameDto[]>([]);
    const load = () => {
        const request = productSimilarNameApi.index({where: {productId: product.id}, itemsPerPage: 100});

        request.then((res) => {
            if (res.status !== 200) return;

            setSimilarNames(res.data.items);
            setIsLoaded(true);
        });

        request.catch((err) => {
            const message = err.response?.data?.message;
            toast.error(message);
        });
    };

    useEffect(() => {
        !isLoaded && load();
    }, [isLoaded]);

    const onRemove = (id: number) => {
        const request = productSimilarNameApi.destroy(id);
        request.then((res) => {
            if (res.status === 200) {
                toast.success('삭제 완료');
                load();
            }
        });

        request.catch((err) => {
            const message = err.response?.data?.message;
            toast.error(message);
        });
    };

    return (
        <ContentPanel title="병합된 서비스 목록">
            <ContentPanelList>
                <ContentPanelItem>
                    <div className="flex-1">
                        {similarNames.map((similarName) => (
                            <div className="flex flex-2" key={similarName.id}>
                                <ContentPanelItemTitle text={similarName.name} />
                                <button onClick={() => onRemove(similarName.id)}> 삭제 </button>
                            </div>
                        ))}
                    </div>
                </ContentPanelItem>
            </ContentPanelList>
        </ContentPanel>
    );
});

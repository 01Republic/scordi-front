import React, {memo} from 'react';
import {GoogleWorkspaceOauthTokenActivityDto} from '^models/integration/IntegrationGoogleWorkspaceOauthTokenActivity/type';
import Tippy from '@tippyjs/react';
import {ProductDto} from '^models/Product/type';
import {X} from 'lucide-react';
import {LinkTo} from '^components/util/LinkTo';
import {AdminProductPageRoute} from '^pages/admin/products/[id]';
import {productSimilarNameApi} from '^models/ProductSimilarName/api';
import {errorToast} from '^api/api';
import {UpdateProductSimilarNameRequestDto} from '^models/ProductSimilarName/type';
import {swalHTML} from '^components/util/dialog';
import {ConnectProductForm} from '^admin/orgs/AdminOrgDetailPage/tabContents/connects/ConnectedWorkspaceListTabContent/GoogleWorkspaceActivityListTabContent/ConnectProductForm';

interface ParserStatusColumnProps {
    activity: GoogleWorkspaceOauthTokenActivityDto;
    reload: () => any;
}

// 파서 설정여부
export const ParserStatusColumn = memo((props: ParserStatusColumnProps) => {
    const {activity, reload} = props;

    const {productSimilarName} = activity;
    const product = productSimilarName?.product;

    return (
        <div>
            {product ? (
                <ParserConnected activity={activity} product={product} reload={reload} />
            ) : (
                <ParserNotConnected activity={activity} reload={reload} />
            )}
        </div>
    );
});
ParserStatusColumn.displayName = 'ParserStatusColumn';

function ParserConnected(props: {
    activity: GoogleWorkspaceOauthTokenActivityDto;
    product: ProductDto;
    reload: () => any;
}) {
    const {activity, product, reload} = props;
    const {productSimilarName} = activity;

    const disconnect = () => {
        if (
            productSimilarName &&
            confirm(
                `[로그인한 앱이름 "${productSimilarName.name}"] 과\n[앱 (id: #${
                    product.id
                }) ${product.name()}] 의 연결을 해제할까요?`,
            )
        ) {
            if (activity.subscriptionId) return alert('이미 구독과 연결된 앱이름은 연결을 해제할 수 없습니다.');

            productSimilarNameApi
                .update(productSimilarName.id, {productId: null})
                .then(() => reload())
                .catch(errorToast);
        }
    };

    return (
        <div className="flex items-center">
            <div>
                <Tippy
                    interactive
                    content={
                        <LinkTo
                            href={AdminProductPageRoute.path(product.id)}
                            target="_blank"
                            displayLoading={false}
                            className="cursor-pointer hover:text-scordi-200 text-12"
                        >
                            (id: #{product.id}) {product.name()}
                        </LinkTo>
                    }
                >
                    <div>
                        <div className="flex items-center gap-2">
                            <LinkTo
                                href={AdminProductPageRoute.path(product.id)}
                                target="_blank"
                                displayLoading={false}
                                className="cursor-pointer hover:text-scordi"
                            >
                                ✅ 설정됨
                            </LinkTo>
                            <X
                                size={20}
                                onClick={disconnect}
                                className="cursor-pointer text-gray-400 hover:text-gray-800 transition-all"
                            />
                        </div>
                    </div>
                </Tippy>
            </div>
        </div>
    );
}

function ParserNotConnected(props: {activity: GoogleWorkspaceOauthTokenActivityDto; reload: () => any}) {
    const {activity, reload} = props;
    const {productSimilarName} = activity;

    const update = (data: UpdateProductSimilarNameRequestDto) => {
        if (!productSimilarName) return;
        productSimilarNameApi
            .update(productSimilarName.id, data)
            .then(() => reload())
            .catch(errorToast);
    };

    if (productSimilarName && productSimilarName.isBlock) {
        return (
            <div className="flex items-center gap-2">
                <div
                    className="cursor-pointer text-gray-400 hover:text-gray-900 transition-all"
                    onClick={() => {
                        if (
                            productSimilarName &&
                            confirm(`[로그인한 앱이름 "${productSimilarName.name}"] 을 블락 해제 할까요?`)
                        ) {
                            update({isBlock: false});
                        }
                    }}
                >
                    블락 해제
                </div>
            </div>
        );
    }

    const connectProduct = () => {
        if (!productSimilarName) return;
        return swalHTML(
            <ConnectProductForm activity={activity} productSimilarName={productSimilarName} onSave={() => reload()} />,
        );
    };

    return (
        <div className="flex items-center">
            <div className="group">
                <div className="group-hover:hidden">❌ 설정안됨</div>
                <div className="hidden group-hover:flex items-center gap-1">
                    <button
                        className="badge badge-xs rounded-sm bg-red-500/50 text-white hover:bg-red-500 transition-all"
                        onClick={() => {
                            if (
                                productSimilarName &&
                                confirm(`[로그인한 앱이름 "${productSimilarName.name}"] 을 블락처리 할까요?`)
                            ) {
                                update({isBlock: true});
                            }
                        }}
                    >
                        블락
                    </button>

                    <button
                        onClick={connectProduct}
                        className="badge badge-xs rounded-sm bg-indigo-500/50 text-white hover:bg-indigo-500 transition-all"
                    >
                        설정
                    </button>
                </div>
            </div>
        </div>
    );
}

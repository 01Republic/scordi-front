import {memo} from 'react';
import {ColumnProps} from '^components/pages/admin/products/AdminProductListPage/columns/props';
import {DefaultColumn} from '^components/pages/admin/products/AdminProductListPage/columns/DefaultColumn';
import {ActionColumn} from '^components/pages/admin/products/AdminProductListPage/columns/ActionColumn';

export const MobileItem = memo((props: ColumnProps) => {
    const {product, fetchData} = props;

    return (
        <div>
            <div className="card card-side">
                <figure>
                    {product.image ? (
                        <img src={product.image} alt="" loading="lazy" className="w-[190px] rounded-box" />
                    ) : (
                        <div className="w-[190px] flex items-center justify-center bg-gray-200 rounded-box">
                            <span className="text-gray-400 italic">no image</span>
                        </div>
                    )}
                </figure>
                <div className="card-body !pl-4 !py-2 !pr-0">
                    <h2 className="card-title text-sm mb-2">{product.name}</h2>

                    <div>
                        <p className="text-xs flex items-center justify-between whitespace-nowrap gap-3">
                            <b>summary</b>
                            <DefaultColumn value={product.tagline} />
                        </p>
                        <p className="text-xs flex items-center justify-between whitespace-nowrap gap-3">
                            <b>homepage</b>
                            <DefaultColumn value={product.homepageUrl} />
                        </p>
                        <p className="text-xs flex items-center justify-between whitespace-nowrap gap-3">
                            <b>pricing page</b>
                            <DefaultColumn value={product.pricingPageUrl} />
                        </p>
                    </div>

                    <div className="card-actions justify-end">
                        <ActionColumn product={product} fetchData={fetchData} />
                    </div>
                </div>
            </div>
        </div>
    );
});

import {memo} from 'react';
import {ColumnProps} from '^components/pages/admin/prototypes/AdminPrototypeListPage/columns/props';
import {DefaultColumn} from '^components/pages/admin/prototypes/AdminPrototypeListPage/columns/DefaultColumn';
import {ActionColumn} from '^components/pages/admin/prototypes/AdminPrototypeListPage/columns/ActionColumn';

export const MobileItem = memo((props: ColumnProps) => {
    const {prototype, fetchData} = props;

    return (
        <div>
            <div className="card card-side">
                <figure>
                    {prototype.image ? (
                        <img src={prototype.image} alt="" loading="lazy" className="w-[190px] rounded-box" />
                    ) : (
                        <div className="w-[190px] flex items-center justify-center bg-gray-200 rounded-box">
                            <span className="text-gray-400 italic">no image</span>
                        </div>
                    )}
                </figure>
                <div className="card-body !pl-4 !py-2 !pr-0">
                    <h2 className="card-title text-sm mb-2">{prototype.name}</h2>

                    <div>
                        <p className="text-xs flex items-center justify-between whitespace-nowrap gap-3">
                            <b>summary</b>
                            <DefaultColumn value={prototype.tagline} />
                        </p>
                        <p className="text-xs flex items-center justify-between whitespace-nowrap gap-3">
                            <b>homepage</b>
                            <DefaultColumn value={prototype.homepageUrl} />
                        </p>
                        <p className="text-xs flex items-center justify-between whitespace-nowrap gap-3">
                            <b>pricing page</b>
                            <DefaultColumn value={prototype.pricingPageUrl} />
                        </p>
                    </div>

                    <div className="card-actions justify-end">
                        <ActionColumn prototype={prototype} fetchData={fetchData} />
                    </div>
                </div>
            </div>
        </div>
    );
});

import React, {memo} from 'react';
import {FcLeave} from 'react-icons/fc';

export const PayError = memo(function PayError() {
    return (
        <div className="stat bg-white shadow rounded-box">
            <div className="stat-figure">
                <FcLeave size={40} />
            </div>
            <div className="stat-title">결제실패</div>
            <div className="stat-value text-3xl text-error">
                0 <small>건</small>
            </div>
            {/*<div className="stat-desc text-secondary">31 tasks remaining</div>*/}
        </div>
    );
});

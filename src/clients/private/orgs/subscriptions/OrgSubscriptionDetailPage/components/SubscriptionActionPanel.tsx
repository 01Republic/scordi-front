import React, {memo} from 'react';
import {CgTrash} from 'react-icons/cg';
import {MdRefresh} from 'react-icons/md';
import {RiShareBoxLine} from 'react-icons/ri';

export const SubscriptionActionPanel = memo(function SubscriptionActionPanel() {
    return (
        <div className="flex justify-end gap-4">
            <button
                tabIndex={0}
                className={`btn btn-square !bg-white border border-slate-300 rounded-md hover:border-slate-400 hover:shadow transition-all mb-1`}
            >
                <RiShareBoxLine fontSize={20} />
            </button>
            <button
                tabIndex={0}
                className={`btn btn-square !bg-white border border-slate-300 rounded-md hover:border-slate-400 hover:shadow transition-all mb-1`}
            >
                <MdRefresh fontSize={20} />
            </button>
            <button
                tabIndex={0}
                className={`btn btn-square !bg-white border border-slate-300 rounded-md hover:border-slate-400 hover:shadow transition-all mb-1`}
            >
                <CgTrash fontSize={20} color={'red'} />
            </button>
        </div>
    );
});

import React, {memo} from 'react';
import {Tip} from '^admin/share/Tip';
import {BsCodeSlash} from '@react-icons/all-files/bs/BsCodeSlash';

interface GmailContentTopbarProps {
    viewMode: 'parsed' | 'rawData';
    changeViewMode: () => any;
}

export const GmailContentTopbar = memo((props: GmailContentTopbarProps) => {
    const {viewMode, changeViewMode} = props;

    return (
        <section className="absolute left-0 right-0 top-0 flex items-center p-1.5 z-10">
            <div className="ml-auto">
                <Tip text={viewMode === 'parsed' ? '이메일 보기' : `데이터 보기`}>
                    <button
                        className={`btn btn-xs btn-square transition-all no-animation btn-animation ${
                            viewMode === 'parsed' ? 'btn-white' : 'btn-scordi'
                        }`}
                        onClick={() => changeViewMode()}
                    >
                        <BsCodeSlash />
                    </button>
                </Tip>
            </div>
        </section>
    );
});
GmailContentTopbar.displayName = 'GmailContentTopbar';

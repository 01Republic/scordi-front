import React, {memo, useEffect} from 'react';
import {BorderedTabs} from './BorderedTabs';
import {useRouter} from 'next/router';

export const ConnectsPageHeader = memo(() => {
    return (
        <header className="sticky mb-6 shadow z-10" style={{top: 'var(--topnav-min-height)', background: '#f9fafb'}}>
            <section className="py-10 px-12 flex justify-between flex-col md:flex-row">
                <h1>어떤 정보를 연결할까요?</h1>
            </section>

            <BorderedTabs />
        </header>
    );
});

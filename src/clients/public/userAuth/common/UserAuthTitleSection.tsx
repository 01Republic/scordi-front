import React, {memo} from 'react';

interface TitleSectionProps {
    text: string;
}

export const UserAuthTitleSection = memo((props: TitleSectionProps) => {
    const {text} = props;
    return (
        <section className="flex flex-col items-center justify-center gap-1">
            <h1 className="text-gradient-color" style={{background: 'linear-gradient(to right, #5c5fee, #a5a6f5)'}}>
                SaaS 관리는 스코디
            </h1>
            <p className="text-14 font-semibold text-gray-500">팀 생산성을 높이는 소프트웨어 구독 비용 관리</p>
        </section>
    );
});

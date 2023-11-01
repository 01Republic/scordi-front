import {memo} from 'react';

interface CollectAppSectionProps {
    //
}

export const CollectAppSection = memo((props: CollectAppSectionProps) => {
    const {} = props;

    return (
        <section id="CollectAppSection" className="bg-white">
            <div className="logo-container">
                <div id="Jandi" className="logo">
                    <div style={{backgroundImage: 'url(/images/landing/collect-apps/1.jandi.png)'}} />
                </div>
                <div id="Slack" className="logo">
                    <div style={{backgroundImage: 'url(/images/landing/collect-apps/2.slack.png)'}} />
                </div>
                <div id="Amazon Web Service" className="logo">
                    <div style={{backgroundImage: 'url(/images/landing/collect-apps/3.aws.png)'}} />
                </div>
                <div id="Github" className="logo">
                    <div style={{backgroundImage: 'url(/images/landing/collect-apps/4.github.png)'}} />
                </div>
                <div id="Figma" className="logo">
                    <div style={{backgroundImage: 'url(/images/landing/collect-apps/5.figma.png)'}} />
                </div>
                <div id="Notion" className="logo">
                    <div style={{backgroundImage: 'url(/images/landing/collect-apps/6.notion.png)'}} />
                </div>
            </div>

            <div className="title-container">
                <div style={{transform: 'translateY(-3rem)'}}>
                    <p>점점 늘어나는 SaaS</p>
                    <p>몇 개나 쓰고 계세요?</p>
                </div>
            </div>

            <div className="bg-container">
                <div className="background" style={{backgroundImage: 'url(/images/landing/collect-apps/bg.png)'}}>
                    <div style={{backgroundImage: 'url(/images/landing/collect-apps/scordi.png)'}} />
                </div>
            </div>
        </section>
    );
});
CollectAppSection.displayName = 'CollectAppSection';

import {memo} from 'react';

interface CollectAppSectionProps {
    //
}

export const CollectAppSection = memo((props: CollectAppSectionProps) => {
    const {} = props;

    return (
        <>
            <section id="CollectAppSection" className="bg-white safari-hidden naver-hidden">
                <div className="logo-container animation-layer">
                    <div id="Jira" className="logo">
                        <div
                            style={{
                                backgroundImage: 'url(/images/landing/collect-apps/1.jira.png)',
                                transform: 'scale(0.85)',
                            }}
                        />
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

                <div className="title-container animation-layer">
                    <div style={{transform: 'translateY(-3rem)'}}>
                        <p>
                            쓰다보니 계속 <span className="block sm:inline">늘어나는 SaaS</span>
                        </p>
                        <p>
                            과연 우리 회사는 <span className="block sm:inline">몇 개나 쓸까?</span>
                        </p>
                    </div>
                </div>

                <div className="bg-container animation-layer"></div>
            </section>
            <div
                className="background logo-background-blurred !hidden sm:!flex safari-hidden naver-hidden"
                style={{backgroundImage: 'url(/images/landing/collect-apps/bg.png)'}}
            >
                <div
                    className="logo-background-scordi"
                    style={{backgroundImage: 'url(/images/landing/collect-apps/scordi.png)'}}
                />
            </div>
        </>
    );
});
CollectAppSection.displayName = 'CollectAppSection';

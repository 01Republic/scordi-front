const LOGO_DATA = [
    {src: '/images/logo/external/figma.png', alt: 'Figma'},
    {src: '/images/logo/external/notion.png', alt: 'Notion'},
    {src: '/images/logo/external/slack.png', alt: 'Slack'},
    {src: '/images/logo/external/adobe.png', alt: 'Adobe'},
    {src: '/images/logo/external/github.png', alt: 'Github'},
    {src: '/images/logo/external/zoom.png', alt: 'Zoom'},
];

export const RotatingLogoCarousel = () => {
    return (
        <div className="w-full overflow-hidden relative py-28">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-[290px] h-[290px] rounded-full overflow-hidden bg-scordi-100 flex items-center justify-center">
                    <div className="w-[220px] h-[220px] rounded-full overflow-hidden bg-scordi-300 flex items-center justify-center">
                        <div className="w-[150px] h-[150px] rounded-full overflow-hidden bg-scordi-500 flex items-center justify-center">
                            <img
                                src="/images/renewallogo/scordi-symbol-logo.png"
                                alt="Scordi Logo"
                                className="w-[60px] h-[60px] brightness-0 invert"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex animate-infinite-scroll">
                    {LOGO_DATA.map((logo, i) => (
                        <div key={i} className="px-5">
                            <div className="w-[130px] h-[130px] rounded-full bg-white flex items-center justify-center">
                                <img src={logo.src} alt={logo.alt} className="w-[52px] h-[52px] rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex animate-infinite-scroll">
                    {LOGO_DATA.map((logo, i) => (
                        <div key={i} className="px-5">
                            <div className="w-[130px] h-[130px] rounded-full bg-white flex items-center justify-center">
                                <img src={logo.src} alt={logo.alt} className="w-[52px] h-[52px] rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

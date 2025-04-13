import { memo } from "react";

interface OnboadingLayoutProps {
    step: number;
    title: string;
    description: string;
    button: React.ReactNode;
    image: string;
}

export const OnboadingLayout = memo<OnboadingLayoutProps>(({ step, title, description, button, image }) => {
    return (
        <div className=""
            style={{
                background: 'linear-gradient(to right, #5C5FEE, #2E3077)'
            }}
        >
            <div className="max-w-[1920px] mx-auto flex justify-between py-24 h-lvh">
                <div className="flex flex-col justify-between items-start gap-4 px-16 w-1/">
                    <img
                        src="/images/renewallogo/scordi-symbol-logo.png"
                        alt="scordi symbol logo"
                        draggable={false}
                        loading="lazy"
                        className="w-9 p-[2px] brightness-0 invert"
                    />
                    <div className="flex flex-col gap-10 min-w-[326px]">
                        <div className="text-sm text-white">
                            {step}/4
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="text-[40px] font-bold text-white leading-[140%] whitespace-pre-line">
                                {title}
                            </div>
                            <div className="text-16 text-white whitespace-pre-line">
                                {description}
                            </div>
                        </div>
                        {button}
                    </div>
                    <div></div>
                </div>
                <div className="pl-[100px] flex flex-col justify-center items-end">
                    <img src={image} alt="subscription" draggable={false} loading="lazy" className="w-full" />
                </div>
            </div>
        </div>
    );
});
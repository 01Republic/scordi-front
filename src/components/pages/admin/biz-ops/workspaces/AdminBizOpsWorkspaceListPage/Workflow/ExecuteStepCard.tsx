import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface ExecuteStepCardProps extends WithChildren {
    logoImg: string;
    title: string;
}

export const ExecuteStepCard = memo((props: ExecuteStepCardProps) => {
    const {title, logoImg, children} = props;

    return (
        <div>
            <p className="px-4 -mb-[10px] z-10 block relative">
                <span className="bg-white font-semibold">&nbsp;{title}&nbsp;</span>
            </p>
            <div className="card card-side card-bordered card-compact">
                <figure className="p-4 !items-start">
                    <img src={logoImg} alt="Shoes" className="rounded-box w-[30px] h-[30px]" loading="lazy" />
                </figure>
                <div className="card-body">{children}</div>
            </div>
        </div>
    );
});

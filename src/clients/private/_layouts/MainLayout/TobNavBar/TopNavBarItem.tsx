import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {Dropdown} from '^v3/share/Dropdown';
import {LinkTo} from '^components/util/LinkTo';
import {FaChevronDown} from 'react-icons/fa6';

interface TopNavBarItemProps extends WithChildren {
    name: string;
    active?: boolean;
    href?: string;
}

export const TopNavBarItem = memo((props: TopNavBarItemProps) => {
    const {name, active = false, href, children} = props;

    if (!children) {
        return (
            <div className="flex items-stretch">
                <LinkTo
                    href={href}
                    text={name}
                    className={`px-6 flex items-center cursor-pointer transition-all font-medium ${
                        active ? 'text-scordi' : 'hover:text-scordi'
                    }`}
                />
            </div>
        );
    } else {
        return (
            <Dropdown
                placement="bottom-start"
                className="flex items-stretch"
                backdrop={false}
                Trigger={() => (
                    <div className="flex items-stretch h-full">
                        <a
                            className={`px-6 flex items-center gap-2 cursor-pointer transition-all font-medium ${
                                active ? 'text-scordi' : 'hover:text-scordi'
                            }`}
                        >
                            <span>{name}</span>
                            <FaChevronDown size={10} strokeWidth={20} />
                        </a>
                    </div>
                )}
                Content={() => {
                    return <>{children}</>;
                }}
            />
        );
    }
});
TopNavBarItem.displayName = 'TopNavBarItem';

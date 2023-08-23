import {memo} from 'react';
import {ProductPostListSidePanelItem} from '^components/pages/products/ProductPostListPage/ProductPostListSidePanelItem';
import {atom, useRecoilState} from 'recoil';
import {PiCaretDownBold} from 'react-icons/pi';

export const currentProductPostCategoryAtom = atom({
    key: 'currentProductPostCategory',
    default: `☁️ All`,
});

const categoryTextList = [
    `☁️ All`,
    `💡 Productivity`,
    `🤖 AI`,
    `🔄 Automations`,
    `🤝 Collaboration`,
    `🗣️ Communication`,
    `🎨 Design`,
    `🖥️ Engineering`,
    `📢 Marketing`,
    `💵️ Sales`,
    `✨ Customer Experience`,
    `💼️ Finance`,
    `👥 HR`,
    `🔒 Identity`,
    `🗂️ File Management`,
    `📋️ Forms`,
    `📲 Product Add-ons`,
    `📈️ Analytics`,
];

export const ProductPostListSidePanel = memo(() => {
    const [currentCategory, setCurrentCategory] = useRecoilState(currentProductPostCategoryAtom);
    const isActive = (category: string) => category === currentCategory;

    return (
        <>
            <div className="sm:hidden dropdown dropdown-bottom dropdown-end w-full mb-[2rem]">
                <label tabIndex={0} className="btn btn-block rounded-full normal-case justify-between text-[1rem]">
                    <span className="flex gap-3">
                        <span>{currentCategory.split(' ')[0]}</span>
                        <span>{currentCategory.split(' ').slice(1).join(' ')}</span>
                    </span>

                    <span>
                        <PiCaretDownBold />
                    </span>
                </label>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full overflow-y-auto max-h-[46vh] block"
                >
                    {categoryTextList.map((text, i) => (
                        <ProductPostListSidePanelItem
                            key={i}
                            text={text}
                            isActive={isActive}
                            onClick={() => setCurrentCategory(text)}
                        />
                    ))}
                </ul>
            </div>

            <ul className="hidden sm:flex menu bg-base-100 py-0">
                {categoryTextList.map((text, i) => (
                    <ProductPostListSidePanelItem
                        key={i}
                        text={text}
                        isActive={isActive}
                        onClick={() => setCurrentCategory(text)}
                    />
                ))}
            </ul>
        </>
    );
});

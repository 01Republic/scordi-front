import {memo} from 'react';
import {ProductPostListSidePanelItem} from '^components/pages/products/ProductPostListPage/ProductPostListSidePanelItem';
import {atom, useRecoilState} from 'recoil';

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
        <ul className="menu bg-base-100 py-0">
            {categoryTextList.map((text) => (
                <ProductPostListSidePanelItem
                    text={text}
                    isActive={isActive}
                    onClick={() => setCurrentCategory(text)}
                />
            ))}
        </ul>
    );
});

import {atom, useRecoilState} from 'recoil';

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

export const currentProductCategoryAtom = atom({
    key: 'currentProductPostCategory',
    default: `☁️ All`,
});

export const useProductCategoryFeature = () => {
    const [currentCategoryName, setCurrentCategoryName] = useRecoilState(currentProductCategoryAtom);
    const toParam = (cate: string) => cate.slice(3).toLowerCase();
    const currentCategory =
        categoryTextList.find((cate) => toParam(cate) === currentCategoryName) || categoryTextList[0];

    return {
        categoryTextList,
        currentCategoryName,
        setCurrentCategoryName,
        toParam,
        currentCategory,
    };
};

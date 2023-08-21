import {memo} from 'react';
import {BsSearch} from 'react-icons/bs';

export const ProductPostListContentPanelSearchInput = memo(() => {
    return (
        <div className="relative">
            <form>
                <input type="text" className="input input-bordered min-w-[300px] pl-[48px]" placeholder="Search ..." />
                <div className="absolute top-0 bottom-0 m-auto w-[48px] h-[48px] flex items-center justify-center text-gray-400">
                    <BsSearch />
                </div>
            </form>
        </div>
    );
});

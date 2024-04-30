import {memo} from 'react';
import {FiLifeBuoy} from 'react-icons/fi';

export const Inquiry = memo(function Inquiry() {
    return (
        <div>
            <FiLifeBuoy size={20} className="text-gray-500 mb-3 relative -left-[1px]" />

            <h4 className="text-13 mb-3">Having trouble?</h4>
            <p className="text-12 font-medium text-gray-500 leading-[1.5] mb-4">
                Feel free to contact us and we will always <br /> help you through the process.
            </p>

            <button className="btn btn-sm normal-case !bg-white !border-gray-300 !text-gray-500 !rounded-md shadow hover:shadow-lg">
                Contact us
            </button>
        </div>
    );
});

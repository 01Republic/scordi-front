import {memo} from 'react';
import {FcOk} from 'react-icons/fc';

export const JoinOrgPage = memo(() => {
    return (
        <div className="flex w-full items-center justify-center" style={{height: '100vh'}}>
            <div className="flex flex-col items-center w-[100%] sm:w-[60%] md:w-[50%] lg:w-[40%] gap-y-10">
                <FcOk size="80px" />
                <div className="hero-content text-center">
                    <div className="flex flex-col gap-y-10 max-w-md">
                        <h1 className="text-4xl md:text-7xl font-bold">Your request has been submitted!</h1>
                        <p className="text-2xl py-6">Please wait for approval</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

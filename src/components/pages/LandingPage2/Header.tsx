import React, {memo} from 'react';
import Image from 'next/image';

export const Header = memo(() => {
    return (
        <header className="navbar px-10 py-4">
            <div className="navbar-start">
                <a className="btn btn-ghost btn-hover-init normal-case text-2xl md:text-3xl h-20" href="/">
                    <Image
                        src="/logo-transparent.png"
                        alt="Scordi logo"
                        width={36}
                        height={36}
                        className="relative top-1 mr-1"
                    />
                    <span>Scordi</span>
                </a>
            </div>
        </header>
    );
});

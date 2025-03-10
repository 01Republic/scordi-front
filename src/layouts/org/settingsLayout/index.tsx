import React from 'react';
import styles from './index.module.css';

const OrgSettingsLayout = ({children}: any) => {
    return <div>{children}</div>;
};

function Header({className, children, ...otherProps}: any) {
    return (
        <section {...otherProps} className={`${styles.headingSection} bg-base-200`}>
            <Container>{children}</Container>
        </section>
    );
}

function Body({children, ...otherProps}: any) {
    return (
        <section className="py-14" {...otherProps}>
            {children}
        </section>
    );
}

function Container({children, ...props}: any) {
    return (
        <div className="container">
            <div className="flex px-6 md:px-10 lg:px-14">
                <div className="flex-1" />
                <div className="w-full md:w-5/6 lg:w-4/6 xl:w-3/6">{children}</div>
                <div className="flex-1" />
            </div>
        </div>
    );
}

OrgSettingsLayout.Header = Header;
OrgSettingsLayout.Body = Body;
OrgSettingsLayout.Container = Container;

export {OrgSettingsLayout};

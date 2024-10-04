import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {MainPageRoute} from '.';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {publicPageRequires} from '^types/utils/18n.type';
import {Error404Page} from '^clients/errors/Error404';

export const Custom404Route = pathRoute({
    pathname: '/404',
    path: () => pathReplace(MainPageRoute.pathname),
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [...publicPageRequires])),
        // Will be passed to the page component as props
    },
});

export default function Custom404() {
    return <Error404Page />;
}

import React from 'react';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {CodefParserEditPage} from '^admin/factories/codef-parser-factories/CodefParserEditPage';

export const CodefParserEditPageRoute = pathRoute({
    pathname: '/admin/factories/codef-parsers/[serviceName]/edit',
    path: (serviceName: string) => pathReplace(CodefParserEditPageRoute.pathname, {serviceName}),
});

// export const getStaticPaths = async () => ({
//     paths: [{params: {serviceName: 'Scordi'}}],
//     fallback: true,
// });
//
// export const getStaticProps = async ({locale}: any) => ({
//     props: {},
// });

export default function Page() {
    return <CodefParserEditPage />;
}

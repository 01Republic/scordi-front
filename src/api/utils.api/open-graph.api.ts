import {api} from '^api/api';

export interface OpenGraphData {
    hybridGraph: {
        title: string;
        description: string;
        type: string;
        image: string;
        url: string;
        favicon: string;
        site_name: string;
        articlePublishedTime: string;
        articleAuthor: string;
    };
    openGraph: {
        title: string;
        description: string;
        type: string;
        image: {
            url: string;
        };
        url: string;
        site_name: string;
        articlePublishedTime: string;
        articleAuthor: string;
    };
    htmlInferred: {
        title: string;
        description: string;
        type: string;
        image: string;
        url: string;
        favicon: string;
        site_name: string;
        images: string[];
    };
    requestInfo: {
        redirects: number;
        host: string;
        responseCode: number;
        cache_ok: boolean;
        max_cache_age: number;
        accept_lang: string;
        url: string;
        full_render: boolean;
        use_proxy: boolean;
        use_superior: boolean;
        responseContentType: string;
    };
    accept_lang?: string;
    is_cache?: boolean;
    url?: string;
}

export async function getOgImageUrl(siteUrl: string) {
    const apiKey = 'd2a23c47-e020-44ca-bac7-959d3661f68e';
    const encodedSiteUrl = encodeURIComponent(siteUrl);
    const url = `https://opengraph.io/api/1.1/site/${encodedSiteUrl}?app_id=${apiKey}`;
    const openGraph = await api.get<OpenGraphData>(url).then((res) => res.data.openGraph);

    return openGraph.image.url;
}

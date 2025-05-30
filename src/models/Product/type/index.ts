import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {SubscriptionPaymentPlanDto} from '^models/Subscription/types/paymentPlanType';
import {SubscriptionBillingCycleDto} from '^models/Subscription/types/billingCycleType';
import {PostDto} from '^models/Post/type';
import {TagDto} from '^models/Tag/type';
import {TypeCast} from '^types/utils/class-transformer';
import {SubscriptionDto} from '^models/Subscription/types';

export enum ProductConnectMethod {
    AUTO = 'AUTO',
    MANUAL = 'MANUAL',
    PREPARE = 'PREPARE',
}

export class ProductDto {
    id: number;
    nameKo: string;
    nameEn: string;
    searchText: string; // 검색키워드
    desc: string;
    image: string;
    tagline: string; // Tagline
    ogImageUrl?: string | null; // OpenGraph 이미지 URL
    homepageUrl: string; // Homepage url
    pricingPageUrl: string; // Pricing Page url
    companyName: string; // 운영사명
    isAutoTrackable: boolean;
    isFreeTierAvailable: boolean;
    connectedOrgCount: number; // 연결한 조직 수
    orgPageUrlScheme: string; // 조직 메인 페이지 URL Scheme
    billingInfoPageUrlScheme: string; // 결제정보 페이지 URL Scheme
    planComparePageUrlScheme: string; // 결제플랜 비교 페이지 URL Scheme
    upgradePlanPageUrlScheme: string; // 결제플랜 변경 페이지 URL Scheme
    updatePayMethodUrlScheme: string; // 결제수단 변경 페이지 URL Scheme
    saasCollectionExposePriority?: number;

    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    paymentPlans: SubscriptionPaymentPlanDto[];
    billingCycles: SubscriptionBillingCycleDto[];
    connectMethod: ProductConnectMethod | string;
    tags: TagDto[];
    posts: PostDto[];

    @TypeCast(() => SubscriptionDto)
    subscriptions?: SubscriptionDto[];

    name() {
        return this.nameEn || this.nameKo;
    }
}

export type StaticProductDto = {
    id: number;
    nameKo: string;
    nameEn: string;
    tagline: string;
    desc: string;
    image: string;
    ogImageUrl?: string | null;
    homepageUrl: string;
    pricingPageUrl: string;
    companyName: string;
    isAutoTrackable: boolean;
    isFreeTierAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
    connectMethod: ProductConnectMethod | string;
    tags: TagDto[];
    posts: PostDto[];
};

export type CreateProductRequestDto = {
    nameKo: string; // 한글 서비스명
    nameEn: string; // 영문 서비스명
    tagline: string; // 요약
    tagIds: number[]; // tag ID 목록
    desc?: string; // 설명
    searchText?: string; // 검색키워드
    image?: string; // 이미지 url
    imageFile?: File; // 이미지 file
    ogImageUrl?: string; // OpenGraph image url
    homepageUrl: string; // Homepage url
    pricingPageUrl: string; // Pricing Page url
    companyName: string; // 운영사명
    isAutoTrackable: boolean; // API 지원 여부
    isFreeTierAvailable: boolean; // 프리티어 지원 여부
    connectMethod?: ProductConnectMethod; // 연동 방법
    saasCollectionExposePriority?: number; // SaaS 컬렉션 노출 우선순위
};

export type UpdateProductRequestDto = Partial<CreateProductRequestDto>;

export function safeImageSrc(product: ProductDto, w: number, h: number): string {
    return (
        product.image ||
        `https://via.placeholder.com/${w}x${h}.png?text=${(product.nameEn || '').replace(/\s/g, '+')[0] || ''}`
    );
}

export class FindAllProductQuery extends FindAllQueryDto<ProductDto> {
    isLive?: boolean;
    keyword?: string;
    tagIds?: number[];
    tagName?: string;
    organizationId?: number;
    isOrderByPriority?: boolean; // 노출 우선순위 정렬 적용 여부
}

export type ApplyToAddDto = {
    name: string;
    url?: string;
};

// export const productMockDataList: ProductDto[] = [
//   {
//     id: 1,
//     name: 'Google',
//     desc: 'Enable your organization to sign in with Google (OAuth).',
//     image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCA4MCI+PHBhdGggZD0iTTc4LjUyIDMyLjc2QzgxIDQ5LjQyIDc2LjE1IDYyLjMgNjcuMjQgNzAuMzlsLTEyLjYyLTkuODNhMjAuNzQgMjAuNzQgMCAwIDAgOC4xOS0xMi4zN0g0MC45MlYzMi43NnoiIGZpbGw9IiM0Mjg2ZjUiLz48cGF0aCBkPSJtNjcuNjggMTAuMzMtMTEuNSAxMS4zNmEyMi4wNSAyMi4wNSAwIDAgMC0xNS4zMy02IDI0IDI0IDAgMCAwLTIyLjcgMTYuNThMNS4wOCAyMi4wOWE0MCA0MCAwIDAgMSA2Mi42LTExLjc2eiIgZmlsbD0iI2VhNDIzNSIvPjxwYXRoIGQ9Im01NC42MiA2MC41NiAxMi42MiA5LjgzQzYwLjM2IDc2LjY0IDUxLjA1IDgwIDQwLjg1IDgwQTQwIDQwIDAgMCAxIDUuMDggNTcuOTFsMTMuMDctMTAuMTRhMjQgMjQgMCAwIDAgMjIuNyAxNi41N2M1LjcxIDAgMTAuMjctMS4zNCAxMy43Ny0zLjc4eiIgZmlsbD0iIzM0YTg1MyIvPjxwYXRoIGQ9Im01LjA4IDIyLjA5IDEzLjA3IDEwLjE1YTI0Ljc0IDI0Ljc0IDAgMCAwIDAgMTUuNTNMNS4wOCA1Ny45MWE0MCA0MCAwIDAgMSAwLTM1LjgyeiIgZmlsbD0iI2ZiYmMwNSIvPjwvc3ZnPg==',
//     isAutoTrackable: true,
//     isFreeTierAvailable: false,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 2,
//     name: 'Github',
//     desc: 'Enable your organization to sign in with GitHub.',
//     image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCA4MCI+PHBhdGggZD0iTTc0LjYzIDIwQTM5Ljc2IDM5Ljc2IDAgMCAwIDYwLjA4IDUuNDYgMzkuMDkgMzkuMDkgMCAwIDAgNDAgLjFhMzkuMDkgMzkuMDkgMCAwIDAtMjAuMDggNS4zNkEzOS44NyAzOS44NyAwIDAgMCA1LjM2IDIwIDM5LjE4IDM5LjE4IDAgMCAwIDAgNDAuMDlhMzguODYgMzguODYgMCAwIDAgNy42MyAyMy41MiAzOS4xOSAzOS4xOSAwIDAgMCAxOS43MSAxNC40NSAyLjM1IDIuMzUgMCAwIDAgMi4wOS0uMzYgMiAyIDAgMCAwIC42Ny0xLjU2VjY4LjY5bC0xLjIuMjFhMTUuODEgMTUuODEgMCAwIDEtMi44OS4xOCAyMi4xMiAyMi4xMiAwIDAgMS0zLjYyLS4zNyA4IDggMCAwIDEtMy40OS0xLjU2QTYuNTkgNi41OSAwIDAgMSAxNi41NiA2NEwxNiA2Mi43NWExMi44NyAxMi44NyAwIDAgMC0xLjYtMi42NSA2LjE0IDYuMTQgMCAwIDAtMi4yNy0ybC0uMzYtLjI2YTQuNDYgNC40NiAwIDAgMS0uNjgtLjYzIDMgMyAwIDAgMS0uNDctLjczcS0uMTUtLjM2LjI3LS42YTMuMzEgMy4zMSAwIDAgMSAxLjUxLS4yM2wxIC4xNWE3LjY5IDcuNjkgMCAwIDEgMi42IDEuMjcgOC40MyA4LjQzIDAgMCAxIDIuNTMgMi43MSA5LjI2IDkuMjYgMCAwIDAgMi45IDMuMjIgNi4yIDYuMiAwIDAgMCAzLjQxIDEuMTIgMTUgMTUgMCAwIDAgMy0uMjYgMTAuMzkgMTAuMzkgMCAwIDAgMi4zNC0uNzkgOC40OCA4LjQ4IDAgMCAxIDIuNTYtNS4zNiAzNS40NSAzNS40NSAwIDAgMS01LjM0LS45NCAyMS40NCAyMS40NCAwIDAgMS00LjktMiAxNC4wOCAxNC4wOCAwIDAgMS00LjE5LTMuNDkgMTYuNzQgMTYuNzQgMCAwIDEtMi43My01LjQ3IDI1Ljc0IDI1Ljc0IDAgMCAxLTEuMS03LjgxIDE1LjIgMTUuMiAwIDAgMSA0LjExLTEwLjczcS0xLjkyLTQuNzQuMzctMTAuNjJjMS0uMzIgMi41LS4wOCA0LjQ4LjdhMzEuODIgMzEuODIgMCAwIDEgNC4zNSAyYy45Mi41NiAxLjY1IDEgMi4yMSAxLjQxYTM3LjcxIDM3LjcxIDAgMCAxIDIwIDBsMi0xLjI1YTI3LjgxIDI3LjgxIDAgMCAxIDQuNzktMi4yOSA2LjczIDYuNzMgMCAwIDEgNC4yMS0uNTZxMi4zNCA1Ljg4LjQyIDEwLjYyQTE1LjIgMTUuMiAwIDAgMSA2NS41MiAzOGEyNi4zNiAyNi4zNiAwIDAgMS0xLjA3IDcuODQgMTYuMTkgMTYuMTkgMCAwIDEtMi43NiA1LjQ3IDE0LjU2IDE0LjU2IDAgMCAxLTQuMjIgMy40NiAyMS4xOSAyMS4xOSAwIDAgMS00Ljg5IDIgMzUuNDUgMzUuNDUgMCAwIDEtNS4zNC45NFE1MCA2MC4wOSA1MCA2NS4xNXYxMWEyLjA3IDIuMDcgMCAwIDAgLjY1IDEuNTcgMi4yOSAyLjI5IDAgMCAwIDIuMDYuMzYgMzkuMTkgMzkuMTkgMCAwIDAgMTkuNjYtMTQuNDdBMzguODYgMzguODYgMCAwIDAgODAgNDAuMDkgMzkuMDkgMzkuMDkgMCAwIDAgNzQuNjMgMjB6Ii8+PC9zdmc+',
//     isAutoTrackable: true,
//     isFreeTierAvailable: true,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   }
// ];

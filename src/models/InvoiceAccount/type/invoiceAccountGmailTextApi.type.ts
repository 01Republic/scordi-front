import {GmailContentDto, GmailContentReadableDto} from '^models/InvoiceAccount/type/gmail.type';
import {plainToInstance, Transform} from 'class-transformer';
import {TypeCast} from '^types/utils/class-transformer';

export class GmailMessageListFetchParamQueryDto {
    // 반환할 최대 메시지 수입니다.
    // 이 필드의 기본값은 100입니다.
    // 이 필드에 허용되는 최댓값은 500입니다.
    maxResults?: number;

    // 페이지 Token
    // 목록에서 특정 결과 페이지를 검색하는 페이지 토큰입니다.
    pageToken?: string;

    // 지정된 쿼리와 일치하는 메시지만 반환합니다.
    // Gmail 검색창과 동일한 검색어 형식을 지원합니다.
    // 예를 들면 "from:someuser@example.com rfc822msgid:<somemsgid@example.com> is:unread"입니다.
    // gmail.metadata 범위를 사용하여 API에 액세스할 때는
    // 매개변수를 사용할 수 없습니다.
    q?: string; // 지메일 쿼리

    // 지정된 모든 라벨 ID와 일치하는 라벨이 있는 메일만 반환합니다.
    // 대화목록의 메일에는 같은 대화목록의 다른 메일에는 없는 라벨이 있을 수 있습니다.
    // 자세한 내용은 메일 및 대화목록 라벨 관리하기를 참고하세요.
    labelIds?: string[];

    // 스팸,휴지통 포함 여부 (결과에 SPAM 및 TRASH 의 메시지를 포함합니다.)
    includeSpamTrash?: boolean;

    readable?: boolean; // 읽기 편한 형태로 간추린 형태로 출력할지 여부
}

export class GetEmailOfInvoiceAccountQueryDto {
    readable?: boolean; // 읽기 편한 형태로 간추린 형태로 출력할지 여부
}

export class GmailMessageListFetchResultDto {
    @TypeCast(() => GmailContentReadableDto)
    messages: GmailContentReadableDto[];
    nextPageToken?: string;
    resultSizeEstimate: number;
}

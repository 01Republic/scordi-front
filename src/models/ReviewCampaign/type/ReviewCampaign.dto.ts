import {MembershipDto} from '^models/Membership/types';
import {OrganizationDto} from '^models/Organization/type';
import {TypeCast} from '^types/utils/class-transformer';
import {ReviewCampaignSubscriptionDto} from './ReviewCampaignSubscription.dto';

/**
 * 요청 캠페인
 */
export class ReviewCampaignDto {
    id: number;
    organizationId: number; // 조직 ID
    authorId: number | null; // 작성자 FK
    title: string; // 요청 제목
    description: string; // 요청 내용
    totalResponseCount: number; // 총 대상 응답 수
    submittedResponseCount: number; // 총 제출된 대상 응답 수
    notSubmittedResponseCount: number; // 총 미제출된 대상 응답 수
    @TypeCast(() => Date) startAt: Date; // 시작일시
    @TypeCast(() => Date) finishAt: Date; // 마감일시
    @TypeCast(() => Date) approvedAt: Date | null; // 승인완료일시
    @TypeCast(() => Date) closedAt: Date | null; // 종료된 시각
    @TypeCast(() => ReviewCampaignSubscriptionDto) subscriptions: ReviewCampaignSubscriptionDto[]; // 대상 구독
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    @TypeCast(() => OrganizationDto) organization?: OrganizationDto; // 조직
    @TypeCast(() => MembershipDto) author?: MembershipDto; // 작성자

    get currentStatusText() {
        const now = new Date();
        if (this.finishAt && this.finishAt < now) return 'status.overdue.text';
        if (this.closedAt && now >= this.closedAt) return 'status.closed.text';
        return 'status.inProgress.text';
    }

    get currentStatus() {
        const now = new Date();
        if (this.closedAt) return statusList.closed;
        if (now.getTime() < this.startAt.getTime()) return statusList.beforeStart;
        if (this.finishAt && this.finishAt.getTime() < now.getTime()) return statusList.overdue;
        return statusList.inProgress;
    }

    get progressValue() {
        if (!this.submittedResponseCount) return 0;
        return Math.round((this.submittedResponseCount / this.totalResponseCount) * 100);
    }

    get progressColors(): [string, string] {
        const progress = this.progressValue;
        if (progress < 20) return ['bg-red-500', 'text-red-500'];
        if (progress < 80) return ['bg-orange-500', 'text-red-500'];
        return ['bg-green-500', 'text-green-500'];
    }

    // 마감여부
    isOverdue() {
        return this.finishAt && this.finishAt < new Date();
    }

    // 종료여부
    isClosed() {
        return !!this.closedAt;
    }
}

const statusList = {
    beforeStart: {
        text: 'status.beforeStart.text',
        longText: 'status.beforeStart.longText',
        bgColor: 'bg-gray-200',
        textColor: '',
    },
    inProgress: {
        text: 'status.inProgress.text',
        longText: 'status.inProgress.longText',
        bgColor: 'bg-orange-200',
        textColor: '',
    },
    overdue: {
        text: 'status.overdue.text',
        longText: 'status.overdue.longText',
        bgColor: 'bg-red-200',
        textColor: '',
    },
    closed: {
        text: 'status.closed.text',
        longText: 'status.closed.longText',
        bgColor: 'bg-green-200',
        textColor: '',
    },
};

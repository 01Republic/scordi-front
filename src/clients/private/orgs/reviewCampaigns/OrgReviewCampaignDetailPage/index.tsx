import {Badge} from '^public/components/ui/badge';
import {Card} from '^public/components/ui/card';
import {Avatar, AvatarFallback} from '^public/components/ui/avatar';

import OrgReviewCampaignDetailLayout from './layout';

export default function OrgReviewCampaignDetailPage() {
    return (
        <OrgReviewCampaignDetailLayout>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Main Content */}
                <div className="md:col-span-2">
                    <h2 className="text-lg font-medium mb-4">본문 내용</h2>
                    <Card className="p-6 bg-white">
                        <div className="space-y-4">
                            <p>
                                자산 조사와 관련된 정보를 수집하고 있습니다. 이에 따라 귀하의 자산에 대한 관련 자료를
                                요청드리고자 합니다.
                            </p>
                            <p>
                                귀하께서 제공하실 수 있는 자료는 큰 도움이 될 것입니다. 만약 제공 가능한 정보나 자료에
                                제한이 있다면, 그에 대한 설명도 함께 부탁드립니다.
                            </p>
                            <p>이 요청에 대한 답변을 [요청 답변 기한]까지 주시면 감사하겠습니다.</p>
                            <p>혹시 이와 관련하여 궁금한 점이나 추가 사항이 있으시면 언제든지 연락해 주십시오.</p>
                            <p>감사합니다.</p>
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div>
                    <h2 className="text-base font-medium mb-4">세부 정보</h2>
                    <Card className="p-6 text-sm bg-white">
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">생성자</span>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6 bg-orange-500">
                                        <AvatarFallback className="text-xs text-white">김</AvatarFallback>
                                    </Avatar>
                                    <span>김보람</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">상태</span>
                                <Badge variant="outline" className="bg-neutral-800 text-white px-2 py-1">
                                    진행 중
                                </Badge>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">시작 날짜</span>
                                <span>2025년 1월 24일</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">종료 날짜</span>
                                <span>미정</span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">제출 현황</span>
                                    <div>
                                        <span>5명 / 10명 </span>
                                        <span className="text-orange-500">(50%)</span>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-orange-500 h-2 rounded-full w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </OrgReviewCampaignDetailLayout>
    );
}

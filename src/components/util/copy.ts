// 단순 텍스트 복사 (Promise)
export const copyText = (link: string): Promise<void> => window.navigator.clipboard.writeText(link);

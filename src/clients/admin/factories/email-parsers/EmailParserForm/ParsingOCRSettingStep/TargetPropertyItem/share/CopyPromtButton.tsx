import React from 'react';
import {minify} from 'html-minifier-next';
import {toast} from 'react-hot-toast';
import {querySelectorXPath} from '^utils/dom-parser';
import {copyText} from '^components/util/copy';
import {MoreDropdown} from '^_components/MoreDropdown';

export const CopyPromptButton = (props: {content: string; question: string; engine?: 'xpath' | 'css'}) => {
    const {question, content, engine = 'xpath'} = props;
    const copy = async () => {
        return getPromptText(question, content, engine)
            .then(copyText)
            .then(() => {
                toast.success('이메일 본문을 복사했어요.\n\n이용하시는 AI 서비스를 열고,\n붙여넣기만 하면 돼요!');
            });
    };

    const copyQuestion = async () => {
        const text = `본문으로 부터 "${question}" 값을 추출하는 "${engine.toUpperCase()} Selector" 는?`;
        return copyText(text).then(() => toast.success('질문을 복사했어요.'));
    };

    return (
        <MoreDropdown
            placement="bottom-end"
            Trigger={() => (
                <button type="button" className="btn btn-xs btn-white no-animation btn-animation">
                    프롬프트 복사
                </button>
            )}
            offset={[0, 0]}
        >
            {() => (
                <div className="card card-bordered card-compact rounded-md shadow-lg bg-white text-13 min-w-[100px]">
                    <div className="cursor-pointer px-2 py-1 hover:bg-slate-100" onClick={() => copy()}>
                        이메일 본문 포함
                    </div>
                    <div className="cursor-pointer px-2 py-1 hover:bg-slate-100" onClick={() => copyQuestion()}>
                        질문만 간단하게
                    </div>
                </div>
            )}
        </MoreDropdown>
    );
};

const getPromptText = async (question: string, html: string, engine: 'xpath' | 'css' = 'xpath') => `
# 지침
## 역할
- 마지막에 주어지는 임의의 형식으로 된 본문을 읽고, 질문에 답하라.

## 생각 과정 (답변에 작성하지 말것)
1. 먼저 임의의 형식으로 주어지는 본문이 어떤 형식(ex. text/html)으로 작성되어있는 본문인지 도출한다.
2. 도출된 형식으로 주어진 본문이 어떤 내용인지 먼저 요약한다.
3. 요약이 완료되면 주어진 본문과 맥락을 고려하여 "질문"에 답을 구한다.
4. 정확한 답변인지 스스로 한 번 더 검산한다.

## 답변 지침
- 답변은 앞 뒤에 의견이나 서술 문장을 붙이지 말고, 군더더기 없이 깔끔하게 답만 응답할것.
- 가능한한 '본문'의 구조적 변경에 유연하게 대응할 수 있는 결과로 응답.
- 재고해본 결과 만약 답변이 정확하지 않을 때의 행동: 절대로 함부로 추측하지 말고, "알수없음" 을 응답.

# 질문
- 본문으로 부터 "${question}" 값을 추출하기 위한 "${engine.toUpperCase()} Selector" 는 무엇인가.

# Given TEXT Content

\`\`\`
${await minifyIfHTML(html)}
\`\`\``;

async function minifyIfHTML(content: string) {
    const checkHTML = (text: string) => !!querySelectorXPath(text, '//div');

    if (checkHTML(content)) {
        return minify(content, {
            collapseWhitespace: true,
            removeComments: true,
            removeEmptyAttributes: true,
            // removeRedundantAttributes: true,
            // removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
            minifyCSS: true,
        });
    }
    return content;
}

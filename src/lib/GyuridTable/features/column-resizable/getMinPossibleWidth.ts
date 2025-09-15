/**
 * 단일 텍스트 노드를 가진 div에서 줄바꿈을 계속 줄였을 때의 최소 가능 너비(픽셀)를 측정한다.
 *
 * 복제된 요소를 문서 외부에 렌더링해 실제 브라우저의 줄바꿈 규칙을 반영한 상태에서 너비를 측정한다.
 *
 * @param div - 최소 너비를 측정할 대상 DOM Element (단일 텍스트 노드 포함된 div를 예상)
 * @param includeBox - true이면 padding/border를 포함한 border-box 기준으로 측정, false면 content-box 기준(패딩/테두리 제거)
 * @throws Error('Element required') - div가 DOM Element가 아닌 경우
 * @returns 측정된 최소 너비를 픽셀 단위로 반올림한 정수
 */
export function getMinPossibleWidth(div: Element, {includeBox = true} = {includeBox: true}): number {
    if (!(div instanceof Element)) throw new Error('Element required');

    const computedStyle = getComputedStyle(div);

    // 원본 렌더링과 동일한 조건으로 측정하기 위해 오프스크린 클론 생성
    const clone = div.cloneNode(true) as HTMLElement;
    const holder = document.createElement('div');

    // 측정 컨테이너: 문서 흐름에 영향 X
    Object.assign(holder.style, {
        position: 'absolute',
        left: '-99999px',
        top: '0',
        width: 'auto',
        height: 'auto',
        overflow: 'visible',
        visibility: 'hidden',
        pointerEvents: 'none',
        contain: 'layout style size', // 성능/격리
    });

    // 클론 스타일: 실제 줄바꿈 규칙을 그대로 두되 "min-content"로 수축
    Object.assign(clone.style, {
        width: 'min-content',
        // 파이어폭스 호환
        MozWidth: 'min-content',
        // 레이아웃에 영향 줄 속성들 명시적 초기화
        maxWidth: 'none',
        minWidth: 'auto',
    });

    // box 사이즈 기준 조정: content-box만 보고 싶으면 padding/border 제거
    if (!includeBox) {
        clone.style.boxSizing = 'content-box';
        clone.style.padding = '0';
        clone.style.border = '0';
    } else {
        // 원본의 boxSizing을 그대로 유지 (padding/border 포함 측정)
        clone.style.boxSizing = computedStyle.boxSizing;
    }

    holder.appendChild(clone);
    document.body.appendChild(holder);

    // 실제 최소 너비 측정
    const contentWidth = Math.ceil(clone.getBoundingClientRect().width);

    holder.remove();

    return contentWidth;
}

/**
 * 주어진 열 인덱스에 대해 적용해야 할 최소 너비(px)를 계산하여 반환합니다.
 *
 * 열의 모든 셀에서 `data-min-width` 값을 읽어 그 최댓값을 기본 최소 너비로 사용합니다.
 * mousePosX가 제공되면(드래깅 중) triggerElem의 왼쪽 경계부터 mousePosX까지의 거리로 계산한 너비와 기본 최소 너비 중 큰 값을 반환하여 드래그로 인한 크기 변경이 최소값 아래로 내려가지 않도록 합니다.
 *
 * @param xIndex - 대상 열의 0 기반 인덱스
 * @param triggerElem - 드래그 핸들(또는 너비 기준이 될 요소). 이 요소의 left 경계를 기준으로 마우스 위치를 계산합니다.
 * @param mousePosX - (옵션) 드래깅 중인 마우스의 clientX. 제공되지 않으면 드래그가 아닌 상태로 간주하고 컬럼에 정의된 최소 너비만 반환합니다.
 * @returns 계산된 최소 너비(px)
 */
export function getNewMinWidth(
    xIndex: number,
    triggerElem: HTMLElement,

    // (e.clientX) 드래그 하고 있는 동안의 마우스의 X 좌표 : 인자가 주어지지 않으면, 드래그 상황이 아님을 가정하여 가용한 최소길이를 계산하여 반환
    mousePosX?: number,
) {
    const table = triggerElem.closest('ul');
    const cols = Array.from(
        table?.querySelectorAll(`li > div:nth-child(${xIndex + 1}) div[data-min-width]`) || [],
    ) as HTMLElement[];
    const minWidth = Math.max(...cols.map((div) => Number(div.dataset.minWidth)));

    if (typeof mousePosX === 'undefined') return minWidth;

    const rect = triggerElem.getBoundingClientRect();
    const width = mousePosX - rect.left;

    return Math.max(minWidth, width);
}

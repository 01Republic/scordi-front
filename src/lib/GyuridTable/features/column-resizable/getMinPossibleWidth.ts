/**
 * div(텍스트 노드 1개)에서 줄을 계속 줄였을 때의 최소 가능 너비(px)를 측정 (컬럼에 ref.current 가 생길때 (= 컬럼이 랜더링 될 때) 실행)
 * - includeBox: true 면 padding/border 포함한 border-box 기준
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

// 업데이트 해야할 min-width 를 계산하여 반환합니다.
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

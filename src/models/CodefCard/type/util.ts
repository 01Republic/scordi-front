type CardNo = string;

/** 마스킹(*) 규칙을 고려해 두 카드번호가 중복인지 판정 */
function isDuplicateCard(a: CardNo, b: CardNo): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        const ca = a[i],
            cb = b[i];
        if (ca === '*' || cb === '*') continue; // 마스킹 위치는 비교 제외
        if (ca !== cb) return false;
    }
    return true;
}

/**
 * 중복(마스킹 규칙 기준)인 카드번호들만 그룹으로 묶어 반환
 * - 결과는 항상 2차원 배열 구조(CardNo[][])
 * - 서로 다른 값끼리 중복이면 같은 그룹으로 묶음
 * - 완전히 동일한 값이 2회 이상 존재하면, 다른 것과 연결이 없어도 [ [그 값] ] 그룹 포함
 * - 어떤 중복도 없으면 [] 반환
 * - 그룹/원소의 순서는 입력 최초 등장 순서를 보존
 */
export function groupDuplicateCards(cards: CardNo[]): CardNo[][] {
    // 빈 입력 빠른 반환
    if (cards.length === 0) return [];

    // 원소 빈도수(동일 문자열 중복 감지용) 및 최초 등장 순서 관리
    const freq = new Map<CardNo, number>();
    const uniq: CardNo[] = [];
    const seen = new Set<CardNo>();
    for (const c of cards) {
        freq.set(c, (freq.get(c) ?? 0) + 1);
        if (!seen.has(c)) {
            seen.add(c);
            uniq.push(c);
        }
    }

    // 무향 그래프 구성 (유일 값들 사이에 '중복' 간선 연결)
    const n = uniq.length;
    const adj: number[][] = Array.from({length: n}, () => []);
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (isDuplicateCard(uniq[i], uniq[j])) {
                adj[i].push(j);
                adj[j].push(i);
            }
        }
    }

    // 연결요소 탐색
    const visited = Array<boolean>(n).fill(false);
    const groups: CardNo[][] = [];

    for (let i = 0; i < n; i++) {
        if (visited[i]) continue;

        // BFS
        const q = [i];
        visited[i] = true;
        const compIdx: number[] = [i];
        while (q.length) {
            const v = q.shift()!;
            for (const w of adj[v]) {
                if (!visited[w]) {
                    visited[w] = true;
                    q.push(w);
                    compIdx.push(w);
                }
            }
        }

        // 컴포넌트가 실제 "중복 그룹"인지 판단
        // 1) 서로 다른 값끼리 중복 → compIdx 길이 >= 2
        // 2) compIdx 길이 == 1이어도 동일 문자열이 2회 이상 등장 → 중복 그룹 인정
        if (compIdx.length >= 2 || (compIdx.length === 1 && (freq.get(uniq[compIdx[0]]) ?? 0) >= 2)) {
            // 입력 최초 등장 순서 보존
            compIdx.sort((a, b) => a - b);
            groups.push(compIdx.map((idx) => uniq[idx]));
        }
    }

    // 그룹들의 정렬: 각 그룹의 첫 등장 인덱스 기준
    groups.sort((g1, g2) => {
        const i1 = uniq.indexOf(g1[0]);
        const i2 = uniq.indexOf(g2[0]);
        return i1 - i2;
    });

    return groups;
}

// /* ===== 사용 예시 ===== */
//
// // 1) 중복 없음 → 빈 배열
// console.log(groupDuplicateCards(["8888****1111", "1234****5678"]));
// // []
//
// // 2) 동일 문자열만 2회 이상 → 단일 원소 그룹 포함
// console.log(groupDuplicateCards(["1234****5678", "1234****5678"]));
// // [ [ '1234****5678' ] ]
//
// // 3) 서로 다른 값끼리 마스킹 기준 중복 → 하나의 그룹으로 묶임
// console.log(groupDuplicateCards(["1234****5678", "123456785678", "12**384456*8"]));
// // [ [ '1234****5678', '123456785678', '12**384456*8' ] ]
//
// // 4) 혼합 케이스
// console.log(groupDuplicateCards([
//     "1234****5678",
//     "123456785678",
//     "9999****0000",
//     "8888****1111",
//     "1234****5678", // 동일 문자열(그룹 조건 충족)
//     "12**384456*8"  // 위 두 개와 마스킹 중복
// ]));
// // [ [ '1234****5678', '123456785678', '12**384456*8' ] ]

const colors = [
    'bg-green-400',
    'bg-red-400',
    'bg-orange-400',
    'bg-sky-400',
    'bg-emerald-400',
    'bg-cyan-400',
    'bg-pink-400',
];

/**
 * 랜덤하게? 컬러를 뽑아줍니다.
 * ---
 * * 그런데 진짜 랜덤은 아니기 때문에,
 * 입력 n 이 동일하면, 출력 컬러도 동일합니다.
 *
 * * n 은 뭐 그냥 어떻게든 아무 값이나 넣어주세요.
 *  ```
 *    // 예를들어 TeamMemberAvatar 컴포넌트에서는 아래와 같이 n 을 만들어 넣습니다.
 *    n = teamMember.email.length + teamMember.id
 *  ```
 *
 * * 기본적으로 사용되는 팔레트가 있지만, 원한다면 팔레트를 주입 할 수도 있습니다.
 * * 팔레트는 `string[]` 타입이면 모두 동작합니다.
 * * 기본값은 tailwind 에서 제공하는 CSS Class 목록을 사용하고 있습니다.
 */
export function getColor(n: number, palette?: string[]) {
    const list = palette || colors;
    return list[n % list.length];
}

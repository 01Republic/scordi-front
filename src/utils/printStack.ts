export function printStack() {
    const [_1, _2, ...stacks] = new Error().stack?.split('\n') || [];

    const validStacks: string[] = ['Debug'];
    stacks.forEach((stack) => {
        // src 폴더 즉, 우리의 애플리케이션 코드만 취급합니다. (webpack-internal:///./node_modules 등 제거)
        if (!stack.includes('webpack-internal:///./src')) return;

        const [webpackLink = '', filePath] = stack.match(/\(webpack-internal:\/\/\/(\..+)\)/) || [];
        // const devtoolLink = webpackLink.replace('-internal:///.', '://_N_E');
        // const localFsLink = webpackLink.replace('webpack-internal:///.', 'file:///.');

        // stack.replace(/at .+ \(/, `at ${filePath.replace(':///', '://_N_E/')} (`);
        validStacks.push(stack.replace(/at .+ \(.*/, `at ${filePath}`));
    });

    console.log(validStacks.join('\n'));
}

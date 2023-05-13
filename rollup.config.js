import legacy from '@rollup/plugin-legacy';

export default {
    entry: 'src/main.js',
    output: {
        dir: 'output',
        format: 'cjs'
    },
    plugins: [legacy({ 'vendor/some-library.js': 'someLibrary' }),
    legacy({ 'node_modules/leader-line/leader-line.min.js': 'LeaderLine' }),
    ]
};
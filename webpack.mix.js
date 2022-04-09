let mix = require('laravel-mix')
let path = require('path')
const tailwindcss = require('tailwindcss')

mix.alias({
    'laravel-nova': path.join(__dirname, '../../vendor/laravel/nova/resources/js/mixins/packages.js'),
})

mix.js('resources/js/tool.js', 'js').vue({ version: 3 })
    .webpackConfig({
        externals: {
            vue: 'Vue',
        },
        output: {
            uniqueName: 'vendor/auditable-log',
        }
    })
    .setPublicPath('dist')
    .sass('resources/sass/tool.scss', 'css')
    .options({
        processCssUrls: false,
        postCss: [ tailwindcss('tailwind.config.js') ],
    })

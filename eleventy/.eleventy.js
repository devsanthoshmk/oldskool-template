// import path from 'path';



export default function(eleventyConfig) {
    // Add a passthrough copy for static files
    // CSS files
    eleventyConfig.addPassthroughCopy('static/assets/css/libs.bundle.css');
    eleventyConfig.addPassthroughCopy('static/assets/css/libs.bundle.css.map');
    eleventyConfig.addPassthroughCopy('static/assets/css/theme.bundle.css');
    eleventyConfig.addPassthroughCopy('static/assets/css/theme.bundle.css.map');

    // Fonts
    eleventyConfig.addPassthroughCopy('static/assets/fonts/remixicon.woff');

    // Images
    eleventyConfig.addPassthroughCopy('static/assets/images/banners');
    eleventyConfig.addPassthroughCopy('static/assets/images/categories');
    eleventyConfig.addPassthroughCopy('static/assets/images/favicon');
    eleventyConfig.addPassthroughCopy('static/assets/images/logos');
    eleventyConfig.addPassthroughCopy('static/assets/images/products');

    // JS files
    eleventyConfig.addWatchTarget('static/assets/js/route.js');
    eleventyConfig.addPassthroughCopy('static/assets/js/route.js');
    eleventyConfig.addPassthroughCopy('static/assets/js/theme.bundle.js');
    eleventyConfig.addPassthroughCopy('static/assets/js/vendor.bundle.js');
   
    // SVGs folder
    eleventyConfig.addPassthroughCopy('static/assets/svgs');

    //for datas
    eleventyConfig.addPassthroughCopy('templates/data/products.json')

    //for jsons in data folder
    // eleventyConfig.addWatchTarget('./data'); // Add your new data directory

    // Define a custom shortcode for static files
    eleventyConfig.addNunjucksShortcode('static', (filePath) => {
        if ("http"===filePath.substring(0, 4))
            return filePath;
        // console.log(filePath);
        return `/static/${filePath}`;
    });

    eleventyConfig.addPairedShortcode('comment', (content) => {
        // Simply ignore the content inside the "comment" tag
        return '';
    });


    // Customize input and output directories
    return {
        dir: {
            input: 'templates',     // Templates folder
            includes: 'includes',    // Includes folder within templates
            output: 'dist',        // Output folder for the generated site
            data: 'data'
        },
        htmlTemplateEngine: 'njk', // Use Nunjucks for HTML files
    };
}

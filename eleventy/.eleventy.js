import path from 'path';



export default function(eleventyConfig) {
    // Add a passthrough copy for static files
    // eleventyConfig.addPassthroughCopy('static');

    // Define a custom shortcode for static files
    eleventyConfig.addNunjucksShortcode('static', (filePath) => {
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
            output: 'dist',         // Output folder for the generated site
        },
        htmlTemplateEngine: 'njk', // Use Nunjucks for HTML files
    };
}

module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Add a shortcode for responsive images
  eleventyConfig.addShortcode("respImage", function(src, alt, sizes) {
    return `<img src="/assets/images/${src}" alt="${alt}" ${sizes ? `sizes="${sizes}"` : ''} class="img-fluid">`;
  });
  
  // Add filter to format dates
  eleventyConfig.addFilter("readableDate", dateObj => {
    return new Date(dateObj).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  });
  
  // Create a "latest" collection for blog posts
  eleventyConfig.addCollection("latestPosts", function(collectionApi) {
    return collectionApi.getFilteredByTag("post").reverse().slice(0, 3);
  });
  
  eleventyConfig.addGlobalData("now", () => new Date());
  
  // Base config
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");
    const folderLayoutMap = {
      "pages": "pages_layout.html",
      "wiki": "wiki_layout.html"
    };
    
    eleventyConfig.addGlobalData("eleventyComputed", {
      layout: (data) => {
        if (data.page && data.page.inputPath) {
          const inputPath = data.page.inputPath;
          const matchingFolder = Object.keys(folderLayoutMap).find(folder =>
            inputPath.startsWith(`./${folder}/`)
          );
          if (matchingFolder) {
            return data.layout || folderLayoutMap[matchingFolder];
          }
        }
        return data.layout;
      }
    });
  };
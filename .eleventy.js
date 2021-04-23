const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')

function extractExcerpt(article) {
  if (!article.hasOwnProperty('templateContent')) {
    console.warn(
      'Failed to extract excerpt: Document has no property "templateContent".'
    )
    return null
  }

  let excerpt = null
  const content = article.templateContent

  // The start and end separators to try and match to extract the excerpt
  const separatorsList = [
    { start: '<!-- Excerpt Start -->', end: '<!-- Excerpt End -->' },
    { start: '<p>', end: '</p>' },
  ]

  separatorsList.some((separators) => {
    const startPosition = content.indexOf(separators.start)
    const endPosition = content.indexOf(separators.end)

    if (startPosition !== -1 && endPosition !== -1) {
      excerpt = content
        .substring(startPosition + separators.start.length, endPosition)
        .trim()
      return true // Exit out of array loop on first match
    }
  })

  return excerpt
}

module.exports = (config) => {
  config.addPlugin(eleventyNavigationPlugin)
  config.addPlugin(pluginSyntaxHighlight)

  config.addPassthroughCopy('styles')
  config.addPassthroughCopy('img')

  config.addShortcode('excerpt', (article) => extractExcerpt(article))
  config.setBrowserSyncConfig({
    files: ['dist/**/*'],
    open: true,
    // Tweak for Turbolinks & Browserstack Compatibility
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn: function (snippet, match) {
          return snippet + match
        },
      },
    },
  })
  config.setDataDeepMerge(true)

  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: 'direct-link',
    permalinkSymbol: '#',
  })
  config.setLibrary('md', markdownLibrary)

  return {
    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: 'njk',

    // Opt-out of pre-processing global data JSON files: (default: `liquid`)
    dataTemplateEngine: false,
    dir: {
      input: 'src',
      output: 'dist',
    },
  }
}

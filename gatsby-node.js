const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const locales = require('./src/i18n/locales')
const defaultLocale = Object.keys(locales).map(key => locales[key]).find(l => l.default)


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type !== `MarkdownRemark`) {
    return
  }

  const { sourceInstanceName } = getNode(node.parent)
  const pathWithoutTrailingSlash = createFilePath({ node, getNode, trailingSlash: false }) // to make easy to deal with extension
  const { localizedSlug, defaultSlug, locale } = extractLocalAndSlug(pathWithoutTrailingSlash, node.frontmatter.path)

  createNodeField({ name: 'collection',     node,   value: sourceInstanceName })
  createNodeField({ name: `slug`,           node,   value: localizedSlug      })
  createNodeField({ name: `defaultSlug`,    node,   value: defaultSlug        })
  createNodeField({ name: `localePath`,     node,   value: locale.path        })
}


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                localePath
                slug
                defaultSlug
              }
              frontmatter {
                title
                cover {
                  childImageSharp {
                    fluid(
                      maxWidth: 640
                      maxHeight: 384
                      quality: 50
                    ) {
                      base64
                      tracedSVG
                      aspectRatio
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
                      sizes
                      originalImg
                      originalName
                      presentationWidth
                      presentationHeight
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  const supportedLangsByPost = posts.reduce((result, post) => {
    const { defaultSlug, localePath } = post.node.fields

    if (result.hasOwnProperty(defaultSlug)) {
      if (!result[defaultSlug].includes(localePath)) {
        result[defaultSlug].push(localePath)
      }
      return result
    }

    result[defaultSlug] = [ localePath ]
    return result
  }, {})

  const postsByLocal = posts.reduce((result, post) => {

    const { localePath } = post.node.fields

    if (result.hasOwnProperty(localePath)) {
      result[localePath].push(post)
      return result
    }

    result[localePath] = [ post ]
    return result
  }, {})


  for (const [locale, _posts] of Object.entries(postsByLocal)) {
    _posts.forEach((post, index) => {
      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          locale,
          supportedLangs: supportedLangsByPost[post.node.fields.defaultSlug],
          ...previousAndNext(_posts, index)
        },
      })
    })
  }
}


// for i18n
// generate pages for each language
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  deletePage(page)

  const supportedLangs = Object.keys(locales).map(key => locales[key].path)

  Object.keys(locales).map(localeKey => {
    const locale = locales[localeKey]
    const localizedPath = locale.default
      ? page.path
      : locale.path + page.path

    return createPage({
      ...page,
      path: localizedPath,
      context: {
        locale: locale.path,
        supportedLangs,
      }
    })
  })
}



function extractLocalAndSlug(pathWithoutTrailingSlash, slug) {
  const i = pathWithoutTrailingSlash.lastIndexOf('.')

  if(i === -1) {
    // default lang
    return  {
      locale: defaultLocale,
      localizedSlug: slug,
      defaultSlug: slug,
    }
  }

  const localeKey = pathWithoutTrailingSlash.substr(i + 1)

  const locale = locales[localeKey]

  return {
    locale,
    localizedSlug: locale.path + slug,
    defaultSlug: slug,
  }
}

/**
 * 指定したインデックスの記事の前後の記事を取得する.
 *
 * @param {Array} posts 記事一覧
 * @param {int} index 対象記事のインデックス
 */
function previousAndNext(posts, index) {
  return {
    previous: index === posts.length - 1 ? null : posts[index + 1].node,
    next: index === 0 ? null : posts[index - 1].node
  }
}
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const locales = require('./src/constants/locales')
const defaultLocale = Object.keys(locales).map(key => locales[key]).find(l => l.default)


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type !== `MarkdownRemark`) {
    return
  }

  const pathWithoutTrailingSlash = createFilePath({ node, getNode, trailingSlash: false }) // to make easy to deal with extension
  const { locale, localizedSlug } = extractLocalAndSlug(pathWithoutTrailingSlash, node.frontmatter.slug)

  console.log(locale, localizedSlug)
  createNodeField({ name: `slug`,           node,   value: localizedSlug  })
  createNodeField({ name: `localePath`,      node,   value: locale.path    })
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
              }
              frontmatter {
                title
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

  const postsByLocal = posts.reduce((result, post) => {

    const { localePath } = post.node.fields

    if (result.hasOwnProperty(localePath)) {
      result[localePath].push(post)
      return result
    }

    result[localePath] = [ post ]
    return result
  }, {})

  console.log(postsByLocal)


  for (const [_, _posts] of Object.entries(postsByLocal)) {
    _posts.forEach((post, index) => {
      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
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

  Object.keys(locales).map(localeKey => {
    const locale = locales[localeKey]
    const localizedPath = locale.default
      ? page.path
      : locale.path + page.path

    return createPage({
      ...page,
      path: localizedPath,
      context: {
        locale: locale.path
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
      localizedSlug: slug
    }
  }

  const localeKey = pathWithoutTrailingSlash.substr(i + 1)

  const locale = locales[localeKey]

  return {
    locale,
    localizedSlug: locale.path + slug
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
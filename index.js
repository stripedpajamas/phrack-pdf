const PDF = require('pdfkit')
const fs = require('fs')
const { readFile } = fs.promises

// node index.js <issue> <article> <article> <article> ...
main(...process.argv.slice(2))

async function main (issueNo, ...articlePaths) {
  console.error('Processing issue #%d with %d articles', issueNo, articlePaths.length)

  const issue = new PDF()
  issue.pipe(fs.createWriteStream(`${issueNo}.pdf`))

  issue
    .fontSize(10)
    .font('Courier')

  const articles = await Promise.all(articlePaths.map((path => readFile(path, 'utf8'))))
  articles.forEach((article, idx) => {
    if (idx > 0) issue.addPage()
    issue.text(article)
  })

  issue.end()
  console.error('Done with issue #%d', issueNo)
}

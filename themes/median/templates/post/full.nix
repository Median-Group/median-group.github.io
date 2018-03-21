{templates, ...}:
page: ''
${templates.header}
<article>
  <header class="article-header">
  <h1>${page.title}</h1>
  </header>
  <div class="article-body">
  ${page.content}
  </div>
</article>
${templates.footer}
''

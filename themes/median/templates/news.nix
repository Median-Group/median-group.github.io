{ templates, lib, pages, ... }:
with lib;
page: ''
${templates.header}
<div class="container">
  <div class="container article-archives">
  ${mapTemplate templates.post.list pages.news_posts.list}
  </div>
</div>
${templates.footer}
''

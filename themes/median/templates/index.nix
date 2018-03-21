{lib, templates, pages, ... }:
with lib;
page: ''
${templates.header}
<div class="content">
  ${page.content}
</div>
${templates.footer}
''
    

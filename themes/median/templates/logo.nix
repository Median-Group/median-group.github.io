{templates, pages, ...}: 
''
<div class="logo">
  ${templates.tag.ilink {
    to=pages.index; 
    content=''<img alt="logo" src=/logo.svg>'';
    }}
</div>
''

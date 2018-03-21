{templates, lib, pages, ...}:
with lib;
''
<ul>
  <li>${templates.tag.ilink {to = pages.about; content="About";}}</li>
  <li>${templates.tag.ilink {to = pages.news; content="News";}}</li>
  <li>${templates.tag.ilink {to = pages.publications; content="Publications";}}</li>
  <li>${templates.tag.ilink {to = pages.team; content="Team";}}</li>
</ul>
''

{lib, pages, ...}:
with lib;
''
  <ul>
    <li><a href=${pages.about.path}>About</a></li>
    <li><a href=${pages.news.path}>News</a></li>
    <li><a href=${pages.publications.path}>Publications</a></li>
    <li><a href=${pages.team.path}>Team</a></li>
  </ul>
''

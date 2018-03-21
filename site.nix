/*-----------------------------------------------------------------------------
   Init

   Initialization of Styx, should not be edited
-----------------------------------------------------------------------------*/
{ styx
, stdenv
, extraConf ? {}
}:

rec {

  /* Importing styx library
  */
  styxLib = import styx.lib styx;


/*-----------------------------------------------------------------------------
   Themes setup

-----------------------------------------------------------------------------*/

  /* Importing styx themes from styx
  */
  styx-themes = import styx.themes;

  /* list the themes to load, paths or packages can be used
     items at the end of the list have higher priority
  */
  themes = [
    ./themes/median
  ];

  /* Loading the themes data
  */
  themesData = styxLib.themes.load {
    inherit styxLib themes;
    extraEnv = { inherit data pages; };
    extraConf = [ ./conf.nix extraConf ];
  };

  /* Bringing the themes data to the scope
  */
  inherit (themesData) conf lib files templates env;

/*-----------------------------------------------------------------------------
   Data

   This section declares the data used by the site
-----------------------------------------------------------------------------*/

  data = {
    news_posts = lib.loadDir {
      dir = ./data/news_posts;
      inherit env;
    };
  };


/*-----------------------------------------------------------------------------
   Pages

   This section declares the pages that will be generated
-----------------------------------------------------------------------------*/

  lipsum = builtins.readFile ./lipsum.txt;

  make_lipsum_page = title: {
    layout = templates.layout; 
    template = templates.index;
    content = ''
      <h1>${title}</h1>
      <p>${lipsum}</p>
      '';
    path = "/${stdenv.lib.toLower title}.html";
  };

  pages = rec {
    index = { 
      layout   = templates.layout;
      template = templates.index;
      content = ''
        <h1>The Median Foundation</h1>
        <p>${lipsum}</p>
        '';
      path    = "/index.html"; 
    };
    about = make_lipsum_page "About";
    news = make_lipsum_page "News";
    publications = make_lipsum_page "Publications";
    team = make_lipsum_page "Team";
    news_posts = lib.mkPageList {
      data = data.news_posts;
      pathPrefix = "/news/";
      template = templates.post;
      layout = templates.layout;
    };

  };


/*-----------------------------------------------------------------------------
   Site

-----------------------------------------------------------------------------*/

  /* Converting the pages attribute set to a list
  */
  pageList = lib.pagesToList { inherit pages; };

  /* Generating the site
  */
  site = lib.mkSite { inherit files pageList; };

}

{ lib }:
{
  /* URL of the site, must be set to the url of the domain the site will be deployed.
     Should not end with a '/'.
  */
  siteUrl = "http://median.foundation";

  /* Theme specific settings
     it is possible to override any of the used themes configuration in this set.
  */
  theme = {
    site.title = "The Median Foundation";
  };
}

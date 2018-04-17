# Building the site
If you've already got Python and Pelican installed, you should be able to run
`make html` to build the website. You can also serve a live preview of the site
at http://localhost:8000 by running `make serve`.

If for some reason that doesn't work, there's also a nix file.
If you run `nix-shell`, that will automatically load any dependencies we end up
using, which should allow you to run `make serve` without issue.


# Setting up styx

First you'll have to install Nix.
The easiest way to do that is to run
```sh
curl https://nixos.org/nix/install | sh
```
At which point you'll probably need to restart your terminal so you can access nix commands.
You might also want to `nix-env -iA nixpkgs.styx` so that you can access Styx commands without having to open a Nix shell.

# Building the site
Once you have Nix installed, you can build the site by running
```sh
nix-shell --run 'styx live'
```
This will fetch all the dependencies, build the site, host it on `http://127.0.0.1:8080`, and rebuild whenever you change something.

I've also found that `styx live` works outside of Nix shell, but it's less robust (if we add dependencies, it might stop working).

# Other notes
You can find the Styx documentation by running `styx doc`



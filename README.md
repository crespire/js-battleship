# Battleship

An implementation of Battleship using Javascript for 1 player and a computer.

This project is an opportunity for to:
* Get comfortable with Javascript objects
* Flex my object oriented design muscles again
* Learn Jest and write a test suite in Javascript
* Get comfortable with ES6 modules

I've completed the Javascript objects for the Ship and Gameboard, which I think is most of the way there to completing the app. Having ventured down the React road a little bit, I think it makes more sense to finish this project as a vanilla JS project, so that's what I'll be doing.

# Deployment Notes
For the future self trying to update the deploy. I just spent a good 30min trying to figure this out after not touching the project for a while...

**This gh-pages deploy uses a subtree.** To update the gh-pages deploy:
1. Delete the pages-deploy branch (local and remote)
1. Rebuild the project (`npm run build` on `main`)
1. Re-push via subtree to remote: `git subtree push --prefix dist origin pages-deploy`
1. Update repository's github page deploy info to pull from the new branch.

## Opportunities
* Add a button to restart the game.
* Add the ability for the player to manually place their ships.
* Add more advanced CSS/visuals
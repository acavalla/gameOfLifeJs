![language-Javascript](https://img.shields.io/badge/language-javascript-red) ![build](https://img.shields.io/badge/build-passing-brightgreen)


# Conway's Game of Life
![game of life example](./assets/Gospers_glider_gun.gif)
How to run
1) Clone this repo: `git clone https://github.com/acavalla/gameOfLifeJs.git`
2) To run the test suite, run `yarn` followed by `yarn test`
3) To play the game, run `open index.html` and play the game in the browser.


The Game of Life is a zero-player game developed in the 70s by John Horton Conway. Check out the [Wikipedia article](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) for a full description. The evolving state of the game is determined by the initial configuration — some configurations become infinitely evolving constellations, others eventually evolve into a stable patterns, whilst others die off completely.

## The Brief
The rules are as follows:
- The game evolves in turns, commonly known as 'ticks'.
- All changes occur at the same time.</br>
- Any live cell with 2 or 3 live neighbours survives until next tick.
- Any live cell with less than 2 live neighbours dies (underpopulation).
- Any live cell with more than 3 live neighbours dies (overpopulation).
- Any dead cell with exactly 3 neighbours becomes a live cell (reproduction).

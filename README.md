How to run
1) Clone this repo: git clone https://github.com/acavalla/gameOfLifeJs.git
2) To run the test suite, run `yarn test`
3) To play the game, run `open index.html` and play the game in the browser.


The Game of life is a zero player game developed in the 70's by John Horton Conway. Check out the Wikipedia article for a full description. The evolving state of the game is determined by the initial configuration - some configurations become infinitely evolving constellations, others eventually evolve into a stable patterns, whilst others die off completely. It is commonly used as a tech test as it can be solved in many different ways that clearly show the level of the programmer.

The Brief
The rules are as follows:

The game evolves in turns, commonly known as 'ticks'.
All changes occur at the same time.
Any live cell with 2 or 3 live neighbours survives until next tick.
Any live cell with less than 2 live neighbours dies (underpopulation).
Any live cell with more than 3 live neighbours dies (overpopulation).
Any dead cell with exactly 3 neighbours becomes a live cell (reproduction).

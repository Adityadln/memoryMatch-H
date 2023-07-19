![catch_the_match (1)](https://github.com/Adityadln/Databyte-Task1-web-dev/assets/131245508/a9e78ca5-0851-4a35-891d-5ae928ee70dd)
# Description
+ The project made is a web game which essentially is about matching a pair of cards with similar images.
+ The project is made using HTML,CSS and Vanilla JavaScript only.
+ This game is a first player game.
+ Players can chose between two modes ,normal and hacker from the home screen of the game.
# How to use the project
+ The project has 3 files each(HTML,CSS,JS) for normal,hacker,and the home page.
+ So to start off the project it is advised to start from [gamestart.html](https://github.com/Adityadln/Databyte-Task1-web-dev/blob/main/databyte%20game/gamestart.html) which serves as a bridge into the hacker and normal mode
# Details
### Normal mode
+ This game has set of 16 cards arranged backface randomly with every pair of cards having same binary number(from 1 to 7)
+ I came up with the concepts of binary number as images as it was instructed to use 8 cards and i thought it would be creative to use binary numbers and make it slightly challenging.
+ For the game to start, the difficulty is to be selected on the dropdown menu.
+ The difficulty will dictate the time and also the time each card is face up.
+ Once all cards are selected within the time limit ,'victory' popup is displayed.
+ Failure to do so will display 'Defeat' popup.
+ Leaderboard feature is also included and any player who manages to win the game in the min possible **flips** make their score into the leaderboard
+ There is also pause button included which allows flexibilty while playing the game.
+ Finally there is a restart button which gets the player back to the home page.
+ Coming to the code itself,each pair of cards have been given the same data property and the cards are random arranged through order property for a flexbox.
+ CSS properties were used to create animation effect like ** perspective,transform etc..**.
+ Also considerable effort and time was put into creating popup's ,making overlay which prevents pointer activity.
### Hacker mode
+ This game the player has the choice to choose the number of cards dynamically through a prompt.
+ Each card has a emoji on its frontface and the goal is the same,to match cards having same emoji.
+ Initially,a big challenge was creating the cards dynamically which seemed like an uphill task but after learning advanced segments of Js it was a cakewalk.
+ Special cards were also created by me exclusively thorugh Figma to make it more appealing.
+ Special cards will only come into play once the player has decided to select more than or equal to 24 cards.
+ I have made upto 64 cards with images on them beyond which there will be presence of dummy cards.
+ The header of the game for (both normal and hacker) has a timer ,flipcounter and a total score.
+ Sound effects are added on selecting a card,on wins and losses.
## Extra features
+ The game has an exclusive home page thats can get the user to normal and hacker version of the game.
+ The home page has a instruction drop down which helps the first time players gaming experience very smooth.
+ The front,back side of cards are exclusively designed by me through figma to give it a more custom feel.
## Challenges faced
+ Creation of card animation was a very difficult and i have learned a lot of theory to make it possible.
+ Creation of cards dynamically seemed hard initially but seemed easy once i worked my way through.
+ The logic for special cards were slightly time consuming as i have introduced a constraint were special cards were not displayed on having having lesser than 24 cards.

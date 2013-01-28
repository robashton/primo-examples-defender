module.exports = function(config) {
  config
  .font('50px sans-serif')
  .defaultColour('#FFF')
  .viewport(640, 480)
  .defineScreen("root", function(screen) {
    screen
      .displayText('Tiny Defender', 100, 140, '32px comic-sans', '#555')
      .addOption('Play', 100, 200, function() {
         menu.hide()
         game.start()
      })
      .addOption('Instructions', 100, 260, 'instructions')
  })
  .defineScreen("instructions", function(screen) {
    screen
      .addOption("Back", 100, 260, "root")
      .displayText("You are defending the world, go you", 50, 50, '16px sans-serif')
      .displayText("Use the arrow keys to move the defender", 50, 70, '16px sans-serif')
      .displayText("Use the ctrl key to fire", 50, 90, '16px sans-serif')
      .displayText("Mind you don't run out of energy though!", 50, 110, '16px sans-serif')
  })
 .defineScreen('gameover', function(screen) {
    screen
     .displayText("Game over", 50, 50, '50px sans-serif', '#F00')
     .displayText("Thanks for playing", 50, 110, '16px sans-serif', '#FF0')
     .addOption('Play again', 100, 200, function() {
       game.start()
       menu.hide()
    })
 })
}

# sierpinski-generator

Simple chaos game written in JavaScript using Pixi JS.

## Sierpiński triangle
### What is the chaos game?

    Take three points in a plane to form a triangle.
    Randomly select any point inside the triangle and consider that your current position.
    Randomly select any one of the three vertex points.
    Move half the distance from your current position to the selected vertex.
    Plot the current position.
    Repeat from step 3.

The algorithm above is what the triangle selection uses within this appliction. You can read more about the chaos game [here](https://en.wikipedia.org/wiki/Sierpi%C5%84ski_triangle#Chaos_game).

## Restricted Chaos Game
If the chaos game is run with a four points instead of three, no fractal appears and the interior of the square fills evenly with points. However, if the current vertex cannot be chosen in the next iteration, fractals will appear in the square. 
The above is what occurs when you use the square selection within this application.

## To Do

 * Fix responsiveness of canvas for mobile view
 * Fix bluriness of canvas drawing when it is resized

 

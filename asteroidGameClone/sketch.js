//Further development: added score to show how many asteroids has been hit and changed the look of the game
var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);

}
//////////////////////////////////////////////////
function draw() {
  background(48, 76, 137);//--> change background color
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();

  checkCollisions(spaceship, asteroids); // -->function that checks collision between various elements

  points();//--> calling the function to display points
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 80);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(143, 184, 237);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){

    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (1-2 lines approx)
    for(var i=0;i<asteroids.locations.length;i++){
      var asteriodLoc=asteroids.locations[i];
      var asteroidDiam=asteroids.diams[i];
      var collided=isInside(asteriodLoc,asteroidDiam,spaceship.location, spaceship.size);
      if(collided){
         gameOver();//game end
      }
    }
      
    //asteroid-2-earth collisions
    //YOUR CODE HERE (1-2 lines approx)
    for(var i=0;i<asteroids.locations.length;i++){
      var asteriodLoc=asteroids.locations[i];
      var asteroidDiam=asteroids.diams[i];
      var collided=isInside(asteriodLoc,asteroidDiam,earthLoc, earthSize.y);
      if(collided){
        gameOver();//game end
      }
    }
    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
    var collided=isInside(spaceship.location,spaceship.size,earthLoc, earthSize.y+spaceship.size);
      if(collided){
        gameOver();//game end
      }
    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
    var collided=isInside(spaceship.location,spaceship.size, atmosphereLoc,atmosphereSize.y);
    if(collided){
      spaceship.setNearEarth();//pull to the earth
    }
    //bullet collisions
    var bulletSys=spaceship.bulletSys;
    var bullets=bulletSys.bullets;
    for(var i=0;i<bullets.length;i++){
        for(var j=0;j<asteroids.locations.length;j++){
          var asteriodLoc=asteroids.locations[j];
          var asteroidDiam=asteroids.diams[j];
          var collided=isInside(asteriodLoc,asteroidDiam,bullets[i],bulletSys.diam);

          if(collided){
            print("destroy");
            asteroids.destroy(j);
          }

        }
    }
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
  var d=dist(locA.x, locA.y,locB.x,locB.y);
  var maxDist=sizeA/2+sizeB/2;
    if(maxDist<d){
      return false;
    }
    else{
      return true;
    }
    
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
//--> displaying the points 
function points(){
  fill(255);
	strokeWeight(3);
	stroke(135);
	rect(20, 10, 120, 50, 8);
	textSize(25);
  noStroke();
  fill(135);
  textAlign(LEFT);
  text('score: '+asteroids.count, 30, 45);
}
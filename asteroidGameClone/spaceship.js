class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 40;//--> setting size for spaceship
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){
  //--> drawing spaceship of different design 
  fill(159, 237, 224);
  rect(this.location.x-this.size/2,this.location.y,this.size,this.size+5);

  fill(248, 225, 108);
  //--> top of the spacehsip 
  triangle(this.location.x-this.size/2, this.location.y,
        this.location.x + this.size/2, this.location.y,
        this.location.x, this.location.y - this.size/2);

 //--> spaceship's left arm 
  fill(119, 166, 182);
  triangle(this.location.x-this.size/2, this.location.y +this.size+5,
        this.location.x-this.size, this.location.y+this.size+15,
        this.location.x-this.size/2, this.location.y);

  //--> spaceship's right arm        
  fill(157, 195, 194);
  triangle(this.location.x+this.size/2, this.location.y,
    this.location.x+this.size, this.location.y+this.size+15,
    this.location.x+this.size/2, this.location.y+this.size+5);

    strokeWeight(4);
    stroke(255, 204, 100);
    
  //--> spaceship's window
  ellipse(this.location.x,this.location.y+20, 20, 20);

  //--> thruster effect to show the keys are pressed to make the spaceship move
  if(keyIsPressed){		
    fill(300, 125, 60);
    triangle(this.location.x-this.size/2, this.location.y+this.size+5,
      this.location.x+this.size/2, this.location.y+this.size+5,
      this.location.x, this.location.y+this.size+random(30,50));
   }
}

  move(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);//--> limit the velocity 
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
    //--> spaceship move to the left
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.1, 0));
      }
    //--> spaceship move to the right
      if (keyIsDown(RIGHT_ARROW)){
        this.applyForce(createVector(0.1, 0));
      }
    //--> spaceship move up
      if (keyIsDown(UP_ARROW)){
        this.applyForce(createVector(0, -0.1));
      }
    //--> spaceship move down
      if (keyIsDown(DOWN_ARROW)){
        this.applyForce(createVector(0, 0.1));
      }
  }

  fire(){
    this.bulletSys.fire(this.location.x+this.size/2, this.location.y-this.size/2 );
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
    //--> to make the spaceship to feel gravity when coming near to earth 
    print("pull to earth");
    this.applyForce(createVector(0, 0.05));
    var friction=this.velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(1/30);
    this.applyForce(friction);

  }
}

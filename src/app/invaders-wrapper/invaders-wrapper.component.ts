// import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

// @Component({
//   selector: 'invaders-wrapper',
//   templateUrl: './invaders-wrapper.component.html',
//   styleUrls: ['./invaders-wrapper.component.scss']
// })
// export class InvadersWrapperComponent implements OnInit {
//   public h: number;
//   public w: number;

//   private baseColor: string;
//   private bgColor: string;

//   private baseSize: number;
//   private baseSpeed: number;

//   private ctx: CanvasRenderingContext2D;
//   private gamePlay: Interval;

//   private invaders: Invaders[];
//   private defensiveBlocks: DefensiveBlock[];
//   private userBullets: Bullet[];
//   private invadersBullets: Bullet[];
//   private player: Player;

//   @ViewChild('myCanvas') canvasRef: ElementRef;

//   @HostListener('document:keydown', ['$event'])
//   handleKeyboardEvent(e: KeyboardEvent) {
//     let nextMoveDirection: number;
//     switch (e.which) {
//       case ArrowKeys.LEFT:
//         nextMoveDirection = Direction.LEFT;
//         break;
//       case ArrowKeys.RIGHT:
//         nextMoveDirection = Direction.RIGHT;
//         break;
//       case ArrowKeys.SPACE:
//         nextMoveDirection = Direction.SPACE;
//         break;
//       default:
//         return; // exit this handler for other keys
//     }
//     e.preventDefault(); // prevent the default action (scroll / move caret)
//   }

//   constructor(gameSettings: GameSettings) {
//     const { boardHeight, boardWidth, baseColor, bgColor, baseSize, baseSpeed } = gameSettings;

//     this.h = boardHeight || 400;
//     this.w = boardWidth || 400;
//     this.baseColor = baseColor || '#fff';
//     this.bgColor = bgColor || '#333';
//     this.baseSize = baseSize || 10;
//     this.baseSpeed = baseSpeed || 100;
//   }

//   ngOnInit() {
//     this.ctx = this.canvasRef.nativeElement.getContext('2d');
//     this.initGame();
//     this.setGameInterval();
//   }

//   initGame() {
//     // setup variables
//     // generate invader
//     // generate blocks
//     // generate player
//   }

//   setGameInterval() {
//     this.gamePlay = setInterval(() => {
//       this.updateState();
//       this.checkForCollisions();
//       this.drawBoard();
//     }, this.baseSpeed);
//   }

//   updateState() {
//     this.moveInvaders();
//     this.moveInvaderBullets();
//     this.movePlayerBullets();
//     this.movePlayer();
//   }

//   initSnake(x: number, y: number): Snake {
//     const snake = new Snake(x, y);
//     snake.addNode(x + this.size, y);
//     snake.addNode(x + this.size * 2, y);
//     return snake;
//   }

//   drawSnake(snake: Snake): void {
//     const head = snake.head;
//     while (snake.head !== null) {
//       this.ctx.fillStyle = this.snakeColor;
//       this.ctx.fillRect(snake.head.x, snake.head.y, this.size, this.size);
//       // move to next node;
//       snake.head = snake.head.prev;
//     }
//     snake.head = head;
//   }

//   clearRect() {
//     this.ctx.fillStyle = this.bgColor;
//     this.ctx.rect(0, 0, this.w, this.h);
//     this.ctx.fill();
//   }

//   makeFood(numOfFood) {
//     const arr = [];
//     for (let i = 0; i < numOfFood; i++) {
//       // random location within the canvas rounded to the nearest tenth.
//       arr.push(new Food(this.getRandFoodLocation(this.w - this.size), this.getRandFoodLocation(this.h - this.size)));
//     }
//     return arr;
//   }

//   drawFood() {
//     for (let i = 0; i < this.allFood.length; i++) {
//       if (this.allFood[i].visible) {
//         this.ctx.fillStyle = this.foodColor;
//         this.ctx.fillRect(this.allFood[i].x, this.allFood[i].y, this.size, this.size);
//       }
//     }
//   }

//   getRandFoodLocation(max) {
//     let temp;
//     temp = Math.floor(Math.random() * max);
//     temp = temp - temp % 10;

//     return temp;
//   }

//   testAndMoveSnake() {
//     this.testMoveDirection();
//     this.mySnake.move(this.allFood);
//     if (this.testForFood() && this.noMoreFood()) {
//       this.levelUp();
//     } else {
//       this.mySnake.removeNode();
//     }
//     if (this.testForWall() || this.testForSelf()) {
//       this.gameOver();
//     }
//   }

//   testMoveDirection() {
//     switch (this.nextMoveDirection) {
//       case Direction.UP:
//         if (this.mySnake.direction === Direction.DOWN) {
//           return;
//         }
//         break;
//       case Direction.RIGHT:
//         if (this.mySnake.direction === Direction.LEFT) {
//           return;
//         }
//         break;
//       case Direction.LEFT:
//         if (this.mySnake.direction === Direction.RIGHT) {
//           return;
//         }
//         break;
//       case Direction.DOWN:
//         if (this.mySnake.direction === Direction.UP) {
//           return;
//         }
//         break;
//     }
//     this.mySnake.direction = this.nextMoveDirection;
//   }

//   testForFood() {
//     const foodToEat = this.allFood.find(foodItem => this.cellOverlap(foodItem, this.mySnake.head));
//     if (foodToEat !== undefined) {
//       foodToEat.eat();
//       return true;
//     }
//     return status;
//   }

//   cellOverlap(item1, item2) {
//     return item1.x === item2.x && item1.y === item2.y;
//   }

//   noMoreFood() {
//     const removedFood = this.allFood.reduce((acc, curr) => acc - curr.visible, this.allFood.length);
//     if (removedFood === this.allFood.length) {
//       return true;
//     }
//     return false;
//   }

//   testForWall() {
//     if (
//       this.mySnake.head.x >= this.w ||
//       this.mySnake.head.x < 0 ||
//       this.mySnake.head.y >= this.h ||
//       this.mySnake.head.y < 0
//     ) {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   testForSelf() {
//     const head = this.mySnake.head;
//     this.mySnake.head = this.mySnake.head.prev;
//     while (this.mySnake.head !== null) {
//       if (this.cellOverlap(head, this.mySnake.head)) {
//         return true;
//       }
//       // move to next node;
//       this.mySnake.head = this.mySnake.head.prev;
//     }
//     this.mySnake.head = head;
//     return false;
//   }

//   gameOver() {
//     setTimeout(() => {
//       this.clearRect();
//     }, this.intervalSpeed);
//     clearInterval(this.gamePlay);
//     // TODO - reveal game over modal
//   }

//   levelUp() {
//     this.round++;
//     this.allFood = this.makeFood(this.round);
//     this.intervalSpeed *= 0.6;
//   }
// }

// /** Snake and SnakeNode Interfaces */
// // TODO - move

// class SnakeNode {
//   next;
//   prev;
//   x;
//   y;

//   constructor(posX, posY) {
//     this.next = null;
//     this.prev = null;
//     this.x = posX;
//     this.y = posY;
//   }
// }

// class Snake {
//   // vars
//   head;
//   tail;
//   direction;
//   length;

//   constructor(x, y) {
//     const node = new SnakeNode(x, y);
//     this.head = node;
//     this.tail = node;
//     this.direction = Direction.RIGHT;
//     this.length = 1;
//   }

//   // funcs
//   addNode(posX, posY) {
//     const tempNode = new SnakeNode(posX, posY);
//     this.head.next = tempNode;
//     tempNode.prev = this.head;
//     this.head = tempNode;

//     this.length++;
//   }

//   removeNode() {
//     this.tail = this.tail.next;
//     this.tail.prev = null;

//     this.length--;
//   }

//   move(increment) {
//     let newX, newY;
//     const size = 10; // TODO abstract from class
//     switch (this.direction) {
//       case Direction.UP:
//         newX = this.head.x;
//         newY = this.head.y - size;
//         break;
//       case Direction.RIGHT:
//         newX = this.head.x + size;
//         newY = this.head.y;
//         break;
//       case Direction.DOWN:
//         newX = this.head.x;
//         newY = this.head.y + size;
//         break;
//       case Direction.LEFT:
//       default:
//         newX = this.head.x - size;
//         newY = this.head.y;
//         break;
//     }
//     this.addNode(newX, newY);
//   }
// }

// class Food {
//   x;
//   y;
//   visible;

//   constructor(posX, posY) {
//     this.x = posX;
//     this.y = posY;
//     this.visible = true;
//   }

//   eat() {
//     this.visible = false;
//   }
// }

// const Direction = {
//   RIGHT: 0,
//   LEFT: 1,
//   SPACE: 3
// };

// const ArrowKeys = {
//   RIGHT: 39,
//   LEFT: 37,
//   SPACE: 32
// };

// export interface GameSettings {
//   boardHeight: number;
//   boardWidth: number;
//   baseColor: string;
//   bgColor: string;
//   baseSize: number;
//   baseSpeed: number;
// }

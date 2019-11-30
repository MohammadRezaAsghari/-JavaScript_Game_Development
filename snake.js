        //get canvas-------------------------------------------------------------------------------------
        var ctx = document.getElementById('ctx').getContext('2d');
        var WIDTH = 500;
        var HEIGHT = 500;
        var snakeList, foodList, direction, eaten;
        var rate = -1;
        //objects-------------------------------------------------------------------------------------
        //----food
        var food = {
                width: 20,
                height: 20,
                color: 'orange'
            }
            //---snakeBody
        var snakeBody = {
                width: 20,
                height: 20,
                color: 'orangered'
            }
            //functions-------------------------------------------------------------------------------------

        //test whether food and snake collided or not?

        function testCollision(rect1, rect2) {
            return ((rect1.x < rect2.x + food.width) &&
                (rect2.x < rect1.x + snakeBody.width) &&
                (rect1.y < rect2.y + food.height) &&
                (rect2.y < rect1.y + snakeBody.height));
        }
        //drawSnake_fucntion
        function drawFood(f, i) {
            ctx.save();
            ctx.fillStyle = food.color;
            ctx.fillRect(f.x, f.y, food.width, food.height);
            ctx.restore();
        }

        function drawSnake(sb, i) {
            ctx.save();
            if (i == 0)
                ctx.fillStyle = 'gray';
            else
                ctx.fillStyle = snakeBody.color;
            ctx.fillRect(sb.x, sb.y, snakeBody.width, snakeBody.height);
            ctx.restore();
        }
        //changeDirection: change direction of snake based on arrowkeys
        function changeDirection(e) {
            if (e.keyCode == 37) {
                direction = 0;
                console.log("direction is left:" + direction);
                updateSnakeList();
            } else if (e.keyCode == 38) {
                direction = 1;
                console.log("direction is up:" + direction)
            } else if (e.keyCode == 39) {
                direction = 2;
                console.log("direction is right :" + direction)
            } else if (e.keyCode == 40) {
                direction = 3;
                console.log("direction is down :" + direction)
            }
        }

        function updateSnakeList() {
            if (direction == 0) {
                for (var i = snakeList.length - 1; i >= 0; i--) {
                    if (i == 0) {
                        snakeList[i].x = snakeList[i].x - 5;
                    } else {
                        snakeList[i].x = snakeList[i - 1].x;
                        snakeList[i].y = snakeList[i - 1].y;
                    }
                }
            } else if (direction == 1) {
                for (var i = snakeList.length - 1; i >= 0; i--) {
                    if (i == 0) {
                        snakeList[i].y = snakeList[i].y - 5;
                    } else {
                        snakeList[i].x = snakeList[i - 1].x;
                        snakeList[i].y = snakeList[i - 1].y;
                    }
                }
            } else if (direction == 2) {
                for (var i = snakeList.length - 1; i >= 0; i--) {
                    if (i == 0) {
                        snakeList[i].x = snakeList[i].x + 5;
                    } else {
                        snakeList[i].x = snakeList[i - 1].x;
                        snakeList[i].y = snakeList[i - 1].y;
                    }
                }
            } else if (direction == 3) {
                for (var i = snakeList.length - 1; i >= 0; i--) {
                    if (i == 0) {
                        snakeList[i].y = snakeList[i].y + 5;
                    } else {
                        snakeList[i].x = snakeList[i - 1].x;
                        snakeList[i].y = snakeList[i - 1].y;
                    }
                }
            }
        }

        function changeSnakePosition() {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            ctx.font = '30px Calibri';
            ctx.fillText('your score: ' + rate, 20, 30);
            while (eaten) {
                var food_x = Math.floor(Math.random() * 475 + 5);
                console.log(food_x);
                var food_y = Math.floor(Math.random() * 475 + 5);
                console.log(food_y);
                foodList[0] = {
                    x: food_x,
                    y: food_y
                };
                eaten = false;
                rate++;
            }
            snakeList.forEach(drawSnake);
            foodList.forEach(drawFood);
            if (testCollision(snakeList[0], foodList[0])) {
                foodList = [];
                eaten = true;
                var new_x, new_y;

                if (direction == 0) {
                    new_x = snakeList[0].x - 10;
                    new_y = snakeList[0].y;
                } else if (direction == 1) {
                    new_x = snakeList[0].x;
                    new_y = snakeList[0].y - 10;
                } else if (direction == 2) {
                    new_x = snakeList[0].x + 10;
                    new_y = snakeList[0].y;
                } else if (direction == 3) {
                    new_x = snakeList[0].x;
                    new_y = snakeList[0].y + 10;
                }

                snakeList.unshift({
                    x: new_x,
                    y: new_y
                });

            }

            checkSnakePostion();
            updateSnakeList();
        }

        function checkSnakePostion() {
            if (snakeList[0].x > 500) {
                snakeList[0].x = 0;
            } else if (snakeList[0].x < 0) {
                snakeList[0].x = 500;
            } else if (snakeList[0].y < 0) {
                snakeList[0].y = 500;
            } else if (snakeList[0].y > 500) {
                snakeList[0].y = 0;
            }
        }


        //Event_Handlers-------------------------------------------------------------------------------------
        document.addEventListener('keydown', changeDirection);
        //startGame-------------------------------------------------------------------------------------
        function startGame() {
            snakeList = [{
                x: 220,
                y: 200
            }, {
                x: 210,
                y: 200
            }, {
                x: 200,
                y: 200
            }];
            foodList = [];
            direction = 5;
            eaten = true;
            setInterval(changeSnakePosition, 30);
        }
        startGame();
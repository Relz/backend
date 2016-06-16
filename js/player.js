
function Player(color, posX, posY)
{
    this.color = color;
    this.posX = posX;
    this.posY = posY;
    this.canvasX = posX * CELL_WIDTH;
    this.canvasY = posY * CELL_HEIGHT;
    this.direction = PLAYER_DIRECTION_DOWN;
    this.draw = function() 
    {
        var self = this;
        var playerImage = new Image();
        switch(self.direction){
            case PLAYER_DIRECTION_UP:
                playerImage.src = "img/players/stand_top.png";
            break;
            case PLAYER_DIRECTION_RIGHT:
                playerImage.src = "img/players/stand_right.png";
            break;
            case PLAYER_DIRECTION_DOWN:
                playerImage.src = "img/players/stand_bottom.png";
            break;
            case PLAYER_DIRECTION_LEFT:
                playerImage.src = "img/players/stand_left.png";
            break;
        }
        playerImage.onload = function()
        {
            g_ctx.drawImage(playerImage, self.canvasX + CANVAS_MARGIN_LEFT_PX, self.canvasY + CANVAS_MARGIN_TOP_PX - playerImage.height / 2);
        };
    };
    this.die = function()
    {
        console.log("Я умер");
    }
}

function handleKey(event, state)
{
    switch (event.keyCode)
    {
        case 37: case 65: // left
            g_leftKeyDown = state;
        break;

        case 38: case 87: // up
            g_upKeyDown = state;
        break;

        case 39: case 68: // right
            g_rightKeyDown = state;
        break;

        case 40: case 83: // down
            g_downKeyDown = state;
        break;

        case 16: // shift
            addBombToPlayerPos(g_player);
        break;

        default: return;
    }
}


function addBombToPlayerPos(player)
{
    var allowToPlantBomb = true;
    for (var i = 0; i < g_bombs.length; i++)
    {
        if (g_bombs[i].posX == player.posX &&  g_bombs[i].posY == player.posY)
        {
            allowToPlantBomb = false;
        }
    }
    if (allowToPlantBomb)
    {
        g_bombs.unshift(new bomb("green", player.posX, player.posY, 3));
    }
}
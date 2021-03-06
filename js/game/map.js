CELLS_COUNT_HORIZONTAL = 15;
CELLS_COUNT_VERTICAL = 11;

SPRITE_MAP_URL = "img/game/map/sprite_map.png";

var g_mapIndex = null;
var g_map = [];

function drawBase(baseImage)
{
    g_ctx.drawImage(baseImage, 0, 0);
}

function drawMap(spriteMapImage)
{
    for (var j = 0; j < CELLS_COUNT_HORIZONTAL; j ++)
    {
        for (var i = 0; i < CELLS_COUNT_VERTICAL; i ++)
        {
            var xWhereToStartClipping = g_map[i][j].x * CELL_WIDTH;
            var yWhereToStartClipping = g_map[i][j].y * CELL_HEIGHT;
            var xWhereToPlaceImage = j * CELL_WIDTH + CANVAS_MARGIN_LEFT_PX;
            var yWhereToPlaceImage = i * CELL_HEIGHT + CANVAS_MARGIN_TOP_PX;

            g_ctx.drawImage(
                spriteMapImage,
                xWhereToStartClipping,
                yWhereToStartClipping,
                CELL_WIDTH,
                CELL_HEIGHT,
                xWhereToPlaceImage,
                yWhereToPlaceImage,
                CELL_WIDTH,
                CELL_HEIGHT
            );
        }
    }
}

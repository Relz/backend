CELL_WIDTH = 40;
CELL_HEIGHT = 36;

CANVAS_MARGIN_TOP_PX = 68;
CANVAS_MARGIN_LEFT_PX = 20;

KEYCODE_ENTER = 13;

var g_ctx = null;
var g_playerColor = null;
var g_playerRoomName = getCookie("room_name");
var g_playerName = getCookie("player_name");
var g_roomOwner = getCookie("room_owner");
var g_gameStarted = false;

function setUpGame()
{
    var onPlayerModelsClick = function()
    {
        g_playerColor = this.getAttribute("data-color");
        for (var i = 0; i < playerModels.length; i++)
        {
            if (playerModels[i] != this)
            {
                playerModels[i].style.display = "none";
            }
        }
        g_gameSocket.emit("playerChoosedColor", g_playerRoomName, g_playerId, g_playerColor);
    };

    var playerModels = document.getElementsByClassName("player_model");

    for (var i = 0; i < playerModels.length; i++)
    {
        playerModels[i].addEventListener("click", onPlayerModelsClick);
    }
    if (g_roomOwner == "true")
    {
        var onMapPreviewsClick = function()
        {
            g_mapIndex = this.getAttribute("data-index");
            g_gameSocket.emit("setMapIndex", g_playerRoomName, g_mapIndex);
        };

        var mapPreviews = document.getElementsByClassName("previews");

        for (var i = 0; i < mapPreviews.length; i++)
        {
            mapPreviews[i].addEventListener("click", onMapPreviewsClick);
        }
    }
    g_gameSocket.emit("getMapIndex", g_playerRoomName);

    var exitRoom = document.getElementById("roomExit");
    exitRoom.addEventListener("click", leaveRoom);

    var btnLogout = document.getElementById("logout");
    btnLogout.addEventListener("click", leaveRoom);

    var startRoom = document.getElementById("roomStart");

    if (startRoom !== null)
    {
        startRoom.addEventListener("click", function()
        {
            if (g_mapIndex !== null && g_playerColor !== null)
            {
                this.style.display = "none";
                g_gameSocket.emit("startRoom", g_playerRoomName);
            }
        });
    }

    var inputSendChatMessage = document.getElementById("chatInputMessage");
    inputSendChatMessage.addEventListener("keypress", function()
    {
        if (event.keyCode == KEYCODE_ENTER && this.value !== "")
        {
            var message = removeExtraSpaces(this.value);
            if (message != " ")
            {
                g_gameSocket.emit("sendMessage", g_playerRoomName, g_playerName, message);
            }
            this.value = "";
        }
    });

    function removeExtraSpaces(value)
    {
        return value.replace(/\s+/g,' ');
    }
}

function leaveRoom()
{
    g_websiteSocket.emit("playerLeftRoom", g_playerRoomName);
    deleteCookie("room_name");
    deleteCookie("room_owner");
    location.reload();
}

function initGame()
{
    g_gameStarted = true;
    var canvas = document.getElementById("canvas");
    g_ctx = canvas.getContext("2d");
    var baseImage = new Image();
    baseImage.src = "img/game/map/field" + g_mapIndex + ".png";
    var spriteMapImage = new Image();
    spriteMapImage.src = SPRITE_MAP;
    play(baseImage, spriteMapImage);
}

function play(baseImage, spriteMapImage)
{
    drawBase(baseImage);
    drawMap(spriteMapImage);
    drawBonuses();
    drawBombs();
    drawFlames();
    drawPlayers();
    window.requestAnimationFrame(function()
    {
        play(baseImage, spriteMapImage);
    });
}

initGameSocket();
initWebsiteSocket();
setUpGame();


<?php
    require_once("php/include/common.inc.php");
    require_once("php/strings.php");

    $smarty = new Smarty();
    $smarty->template_dir = ROOT_DIR . "template/";
    $smarty->compile_dir = ROOT_DIR . "template_c/";
    $smarty->config_dir = ROOT_DIR . "config/";
    $smarty->cache_dir = ROOT_DIR . "cache/";

    $action = getGetParam("action");
    switch ($action)
    {
        case "":
            processPostRequest();
            initSmartyVariables($smarty);
            if (isUserAuthorized())
            {
                session_start();
                loginUser($_SESSION["username"]);
                $smarty->assign("username", $_SESSION["username"]);
                if (isUserInGame())
                {
                    $smarty->assign("inGameRoom", true);
                    $smarty->assign("isRoomOwner", ($_COOKIE["room_owner"] == "true") ? true : false);
                    $smarty->display("game.tpl");
                }
                else
                {
                    $smarty->display("mainpage.tpl");
                }
            }
            else
            {
                unsetSessionAndCookies();
                $isLoginError = getGetParam("error");
                if ($isLoginError === "1")
                {
                    $smarty->assign("isLoginError", true);
                }
                $smarty->display("login.tpl");
            }
            break;
        case "logout":
            logoutUser();
            break;
        default:
            header("HTTP/1.1 404 Not Found");
            echo "404 NOT FOUND!";
            break;
    }

    function initSmartyVariables($smarty)
    {
        global $lang;
        $BACKGROUND_IMAGES_COUNT = 2;
        $smarty->assign("rootDir", ROOT_DIR);
        $smarty->assign("lang", $lang);
        $smarty->assign("title", "Atomic Bomberman");
        $smarty->assign("symbolRequired", t("SYMBOL_REQUIRED"));
        $smarty->assign("btnLoginText", t("BTN_LOGIN_TEXT"));
        $smarty->assign("logoutText", t("LOGOUT_TEXT"));
        $smarty->assign("bodyClass", "background-image" . rand(0, $BACKGROUND_IMAGES_COUNT - 1));
        $smarty->assign("inputNamePlaceholder", t("INPUT_NAME_PLACEHOLDER"));
        $smarty->assign("inGameRoom", false);
        $smarty->assign("headerCreateRoom", t("HEADER_CREATE_ROOM"));
        $smarty->assign("labelRoomName", t("LABEL_ROOM_NAME"));
        $smarty->assign("labelRoomPassword", t("LABEL_ROOM_PASSWORD"));
        $smarty->assign("labelPlayerCount", t("LABEL_PLAYER_COUNT"));
        $smarty->assign("btnCreateRoomText", t("BTN_CREATE_ROOM_TEXT"));
        $smarty->assign("username", "");
        $smarty->assign("infoEmptyRoomList", t("INFO_EMPTY_ROOM_LIST"));
        $smarty->assign("headerGameRooms", t("HEADER_GAME_ROOMS"));
        $smarty->assign("errorCanvasNotSupported", t("ERROR_CANVAS_NOT_SUPPORTED"));
        $smarty->assign("headerPlayers", t("HEADER_PLAYERS"));
        $smarty->assign("infoWaitRoomMaker", t("INFO_WAIT_ROOM_MAKER"));
        $smarty->assign("headerChat", t("HEADER_CHAT"));
        $smarty->assign("btnLeaveGameRoom", t("BTN_LEAVE_GAME_ROOM"));
        $smarty->assign("btnStartGame", t("BTN_START_GAME"));
        $smarty->assign("isLoginError", false);
        $smarty->assign("errorUsernameNotFree", t("ERROR_USERNAME_NOT_FREE"));
    }

    function processPostRequest()
    {
        global $lang;
        if (isset($_POST["username"]) && !empty($_POST["username"]))
        {
            $username = $_POST["username"];
            dbInitialConnect();
            if (dbIsEmptyResult(dbQueryGetResult("SELECT * FROM user WHERE BINARY name='" . dbQuote($username) . "'")))
            {
                registerNewUser($username);
            }
            elseif (isUsernameFree($username))
            {
                loginUser($username);
            }
            else
            {
                header("Location: ?lang=" . $lang . "&error=1");
            }
        }
    }

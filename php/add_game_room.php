<?php
    require_once("include/common.inc.php");

    $roomName = getPostParam("room_name");
    $roomPassword = getPostParam("room_password");

    session_start();
    if (!empty($roomName) && isUserAuthorized())
    {
        dbInitialConnect();
        $result = dbQueryGetResult("SELECT * FROM room WHERE BINARY title='$roomName'");
        if (mysqli_num_rows($result) != 0)
        {
            die("error 0");
        }
        mysqli_free_result($result);
        if (!dbQuery("INSERT INTO room SET title='$roomName', password='$roomPassword', owner_id='" . $_SESSION["id"] . "'"))
        {
            die("error 1");
        }
        $_SESSION["room_name"] = $roomName;
        $_SESSION["room_owner"] = true;
        die($roomName);
    }
    else
    {
        die("error 2");
    }

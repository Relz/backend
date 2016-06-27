{extends file="layout.tpl"}
{block name="main_content"}
{block name="room_list"}{/block}
{/block}

{block name="room_list"}
    <div class="content">
      <form class="login-form" action="index.php?lang={$lang}" method="post">
        <input type="text" name="username" class="input_name" placeholder="{$inputNamePlaceholder}"/>
        <input type="submit" id="btnLogin" class="btn_login" href="#" title="Войти" value="{$btnLoginText}"/>
      </form>
    </div>
{/block}
{block name="scripts"}
    <script type="text/javascript" src="js/website/index.js"></script>
{/block}

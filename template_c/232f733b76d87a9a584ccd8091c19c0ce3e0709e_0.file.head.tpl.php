<?php
/* Smarty version 3.1.29, created on 2016-06-26 17:01:01
  from "/home/relz/public_html/clone/Atomic-Bomberman/template/head.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_57700a4d19d265_17617251',
  'file_dependency' => 
  array (
    '232f733b76d87a9a584ccd8091c19c0ce3e0709e' => 
    array (
      0 => '/home/relz/public_html/clone/Atomic-Bomberman/template/head.tpl',
      1 => 1466960200,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_57700a4d19d265_17617251 ($_smarty_tpl) {
$_smarty_tpl->ext->_inheritance->init($_smarty_tpl, false);
$_smarty_tpl->ext->_inheritance->processBlock($_smarty_tpl, 0, 'head', array (
  0 => 'block_59049051957700a4d19a893_81335083',
  1 => false,
  3 => 0,
  2 => 0,
));
?>

<?php }
/* {block 'head'}  file:head.tpl */
function block_59049051957700a4d19a893_81335083($_smarty_tpl, $_blockParentStack) {
?>

  <head>
    <title><?php echo $_smarty_tpl->tpl_vars['title']->value;?>
</title>
    <meta charset="utf-8" />
    <link rel="icon" href="<?php echo $_smarty_tpl->tpl_vars['rootDir']->value;?>
favicon.ico">
    <link rel="stylesheet" href="<?php echo $_smarty_tpl->tpl_vars['rootDir']->value;?>
css/style.css">
  </head>
<?php
}
/* {/block 'head'} */
}
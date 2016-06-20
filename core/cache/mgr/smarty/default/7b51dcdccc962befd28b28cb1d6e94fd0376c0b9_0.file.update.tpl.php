<?php /* Smarty version 3.1.27, created on 2016-06-19 22:53:02
         compiled from "C:\OpenServer\domains\newsite.rus\sm\templates\default\resource\update.tpl" */ ?>
<?php
/*%%SmartyHeaderCode:290325766f81e5749b4_32441319%%*/
if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '7b51dcdccc962befd28b28cb1d6e94fd0376c0b9' => 
    array (
      0 => 'C:\\OpenServer\\domains\\newsite.rus\\sm\\templates\\default\\resource\\update.tpl',
      1 => 1465449798,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '290325766f81e5749b4_32441319',
  'variables' => 
  array (
    'tvOutput' => 0,
    'hidden' => 0,
    'tv' => 0,
    'onDocFormPrerender' => 0,
    'resource' => 0,
    '_config' => 0,
    'onRichTextEditorInit' => 0,
  ),
  'has_nocache_code' => false,
  'version' => '3.1.27',
  'unifunc' => 'content_5766f81e5ab4c5_77711902',
),false);
/*/%%SmartyHeaderCode%%*/
if ($_valid && !is_callable('content_5766f81e5ab4c5_77711902')) {
function content_5766f81e5ab4c5_77711902 ($_smarty_tpl) {

$_smarty_tpl->properties['nocache_hash'] = '290325766f81e5749b4_32441319';
?>
<div id="modx-panel-resource-div"></div>
<div id="modx-resource-tvs-div"><?php echo (($tmp = @$_smarty_tpl->tpl_vars['tvOutput']->value)===null||$tmp==='' ? '' : $tmp);?>
</div>
<?php
$_from = $_smarty_tpl->tpl_vars['hidden']->value;
if (!is_array($_from) && !is_object($_from)) {
settype($_from, 'array');
}
$_smarty_tpl->tpl_vars['tv'] = new Smarty_Variable;
$_smarty_tpl->tpl_vars['tv']->_loop = false;
foreach ($_from as $_smarty_tpl->tpl_vars['tv']->value) {
$_smarty_tpl->tpl_vars['tv']->_loop = true;
$foreach_tv_Sav = $_smarty_tpl->tpl_vars['tv'];
?>
    <input type="hidden" id="tvdef<?php echo $_smarty_tpl->tpl_vars['tv']->value->id;?>
" value="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['tv']->value->default_text, ENT_QUOTES, 'UTF-8', true);?>
" />
    <?php echo $_smarty_tpl->tpl_vars['tv']->value->get('formElement');?>

<?php
$_smarty_tpl->tpl_vars['tv'] = $foreach_tv_Sav;
}
?>

<?php echo $_smarty_tpl->tpl_vars['onDocFormPrerender']->value;?>

<?php if ($_smarty_tpl->tpl_vars['resource']->value->richtext && $_smarty_tpl->tpl_vars['_config']->value['use_editor']) {?>
    <?php echo $_smarty_tpl->tpl_vars['onRichTextEditorInit']->value;?>

<?php }

}
}
?>
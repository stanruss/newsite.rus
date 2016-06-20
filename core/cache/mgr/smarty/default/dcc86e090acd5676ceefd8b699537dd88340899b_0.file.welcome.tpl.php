<?php /* Smarty version 3.1.27, created on 2016-06-16 06:23:45
         compiled from "C:\OpenServer\domains\newsite.rus\sm\templates\default\welcome.tpl" */ ?>
<?php
/*%%SmartyHeaderCode:2363257621bc18011b8_28371656%%*/
if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'dcc86e090acd5676ceefd8b699537dd88340899b' => 
    array (
      0 => 'C:\\OpenServer\\domains\\newsite.rus\\sm\\templates\\default\\welcome.tpl',
      1 => 1465449798,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '2363257621bc18011b8_28371656',
  'variables' => 
  array (
    'dashboard' => 0,
  ),
  'has_nocache_code' => false,
  'version' => '3.1.27',
  'unifunc' => 'content_57621bc1810bb0_65430379',
),false);
/*/%%SmartyHeaderCode%%*/
if ($_valid && !is_callable('content_57621bc1810bb0_65430379')) {
function content_57621bc1810bb0_65430379 ($_smarty_tpl) {

$_smarty_tpl->properties['nocache_hash'] = '2363257621bc18011b8_28371656';
?>
<div id="modx-panel-welcome-div"></div>

<div id="modx-dashboard" class="dashboard">
<?php echo $_smarty_tpl->tpl_vars['dashboard']->value;?>

</div><?php }
}
?>
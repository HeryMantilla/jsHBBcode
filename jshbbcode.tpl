$ bbCode template by HACKPRO TM
<!-- BEGIN ulist_open --><ul class="bbHCode"><!-- END ulist_open -->
<!-- BEGIN ulist_close --></ul><!-- END ulist_close -->

<!-- BEGIN olist_open --><ol class="bbHCode" type="{LIST_TYPE}"><!-- END olist_open -->
<!-- BEGIN olist_close --></ol><!-- END olist_close -->

<!-- BEGIN listitem --><li class="bbHCode"><!-- END listitem -->

<!-- BEGIN b_open --><span class="bbHCode bbTextB"><!-- END b_open -->
<!-- BEGIN b_close --></span><!-- END b_close -->

<!-- BEGIN s_open --><span class="bbHCode bbTextS"><!-- END s_open -->
<!-- BEGIN s_close --></span><!-- END s_close -->

<!-- BEGIN pre_open --><pre><!-- END pre_open -->
<!-- BEGIN pre_close --></pre><!-- END pre_close -->

<!-- BEGIN u_open --><span class="bbHCode bbTextU"><!-- END u_open -->
<!-- BEGIN u_close --></span><!-- END u_close -->

<!-- BEGIN i_open --><span class="bbHCode bbTextI"><!-- END i_open -->
<!-- BEGIN i_close --></span><!-- END i_close -->

<!-- BEGIN color_open --><span class="bbHCode" style="color:{COLOR}"><!-- END color_open -->
<!-- BEGIN color_close --></span><!-- END color_close -->

<!-- BEGIN size_open --><span class="bbHCode" style="font-size:{SIZE}px;"><!-- END size_open -->
<!-- BEGIN size_close --></span><!-- END size_close -->

<!-- BEGIN img --><img class="bbHCode bbImg" src="{URL}" /><!-- END img -->
<!-- BEGIN img_wh --><img style="width:{WIDTH}px;height:{HEIGHT}px;" class="bbHCode bbImg" src="{URL}" /><!-- END img_wh -->

<!-- BEGIN url --><a href="{URL}" target="_blank" class="bbHCode bbLink">{DESCRIPTION}</a><!-- END url -->

<!-- BEGIN email --><a href="mailto:{EMAIL}" target="_blank" class="bbHCode bbLink">{EMAIL}</a><!-- END email -->

<!-- BEGIN wiki --><a href="http://es.wikipedia.org/wiki/{QUERY}" target="_blank" class="bbHCode bbLink">{STRING}</a><!-- END wiki -->

<!-- BEGIN hr --></span><hr class="bbHCode bbRule" /><span><!-- END hr -->

<!-- BEGIN center_open --><div class="bbHCode bbCenter"><!-- END center_open -->
<!-- BEGIN center_close --></div><!-- END center_close -->

<!-- BEGIN scroll_open -->
<span><marquee>
<!-- END scroll_open -->
<!-- BEGIN scroll_close -->
</marquee></span>
<!-- END scroll_close -->

<!-- BEGIN fade_open -->
<span class="bbHCode bbFade">
<!-- END fade_open -->
<!-- BEGIN fade_close -->
</span>
<!-- END fade_close -->

$ === Begin Code Template ===
<!-- BEGIN code_open -->
<div class="bbHCode bbFrame">
	<div style="background-image:url('./images/code.png');" class="bbHCode bbFrame bbHeader">
		<img src="./images/nolines_plus.png" onclick="javascript:quoteState('__#@MBBQ#__', '__#@IMG#__')" id="__#@IMG#__" />
		<span>&nbsp;{L_CODE}:</span>
	</div>
	<div class="bbHCode bbFrame bbContent" id="__#@MBBQ#__">
		<pre>
<!-- END code_open -->
<!-- BEGIN code_close -->
		</pre>
	</div>
</div>
<!-- END code_close -->
$ === End Code Template ===

$ === Begin Spoiler Template ===
<!-- BEGIN spoiler_open -->
<div class="bbHCode bbFrame">
	<div class="bbHCode bbFrame bbHeader">
		<img src="./images/nolines_plus.png" onclick="javascript:quoteState('__#@MBBQ#__', '__#@IMG#__')" id="__#@IMG#__" />
		<span>&nbsp;{L_SPOILER}:</span>
	</div>
	<div class="bbHCode bbFrame bbContent" id="__#@MBBQ#__">
<!-- END spoiler_open -->
<!-- BEGIN spoiler_close -->
	</div>
</div>
<!-- END spoiler_close -->
$ === End Spoiler Template ===

$ === Begin Quote Template ===
<!-- BEGIN quote_username_open -->
<div class="bbHCode bbFrame">
	<div style="background-image:url('./images/quote.png');" class="bbHCode bbFrame bbHeader">
		<img src="./images/nolines_plus.png" onclick="javascript:quoteState('__#@MBBQ#__', '__#@IMG#__')" id="__#@IMG#__" />
		<span>&nbsp;{USERNAME} {L_WROTE}:</span>
	</div>
	<div class="bbHCode bbFrame bbContent" id="__#@MBBQ#__">
		<div class="bbHCode bbFrame bbContent bbQ1"></div>
		<div class="bbHCode bbFrame bbContent bbQ2"></div>
		<div class="bbHCode bbFrame bbContent bbText">
<!-- END quote_username_open -->

<!-- BEGIN quote_open -->
<div class="bbHCode bbFrame">
	<div style="background-image:url('./images/quote.png');" class="bbHCode bbFrame bbHeader">
		<img src="./images/nolines_plus.png" onclick="javascript:quoteState('__#@MBBQ#__', '__#@IMG#__')" id="__#@IMG#__" />
		<span>&nbsp;{L_QUOTE}:</span>
	</div>
	<div class="bbHCode bbFrame bbContent" id="__#@MBBQ#__">
		<div class="bbHCode bbFrame bbContent bbQ1"></div>
		<div class="bbHCode bbFrame bbContent bbQ2"></div>
		<div class="bbHCode bbFrame bbContent bbText">
<!-- END quote_open -->

<!-- BEGIN quote_close -->
		</div>
	</div>
</div>
<!-- END quote_close -->
$ === End Quote Template ===

$ === Begin Free TXT Open Template ===
<!-- BEGIN free_txt_open -->
<div class="bbHCode bbFrame">
	<div class="bbHCode bbFrame bbHeader">
		<img src="./images/nolines_plus.png" onclick="javascript:quoteState('__#@MBBQ#__', '__#@IMG#__')" id="__#@IMG#__" />
		<span>&nbsp;<strong>{USERNAME}{L_FREE}:</strong></span>
	</div>
	<div class="bbHCode bbFrame bbContent" id="__#@MBBQ#__">
<!-- END free_txt_open -->
<!-- BEGIN free_txt_close -->
	</div>
</div>
<!-- END free_txt_close -->
$ === End Free TXT Open Template ===

<!-- BEGIN tip_open -->
<div class="bbHCode bbTooltip">
<img title="{TOOLTIP}" class="bbHCode bbImg bbVA bbTip" src="./images/tooltip.png" border="0" />&nbsp;
<!-- END tip_open -->
<!-- BEGIN tip_close --></div><!-- END tip_close -->

$ === Begin Mod Template ===
<!-- BEGIN mod_username_open -->
<div class="bbHCode bbFrame">
	<div class="bbHCode bbWarn">!</div>
	<div class="bbHCode bbFrame bbModUserText"><b>{USERNAME}:</b> 
<!-- END mod_open -->
<!-- BEGIN mod_close --></div>
</div><!-- END mod_username_close -->

<!-- BEGIN mod_open -->
<div class="bbHCode bbFrame">
	<div class="bbHCode bbWarn">!</div>
	<div class="bbHCode bbFrame bbModUserText">
<!-- END mod_open -->
<!-- BEGIN mod_close --></div>
</div><!-- END mod_close -->
$ === End Mod Template ===

<!-- BEGIN page -->
<div>
	<a href="{LINK}" target="_blank" class="postlink">{OPENEXTLINK}</a>
	<iframe marginWidth=0 marginHeight=0 src="{LINK}" width="100%" height=200></iframe>
</div>
<!-- END page -->

<!-- BEGIN ytube -->
<object width="425" height="350">
	<param name="movie" value="http://www.youtube.com/v/{YOUTUBEID}"></param>
	<embed src="http://www.youtube.com/v/{YOUTUBEID}" type="application/x-shockwave-flash" width="425" height="350"></embed>
</object><br />
<a href="http://youtube.com/watch?v={YOUTUBEID}" target="_blank">{YOUTUBELINK}</a><br />
<!-- END ytube -->

<!-- BEGIN wmplayer -->
<object id="wmp" width=300 height=300 classid="CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,0,0,0" standby="Loading Microsoft Windows Media Player components..." type="application/x-oleobject">
	<param name="FileName" value="{URL}"> 
	<param name="ShowControls" value="1"> 
	<param name="ShowDisplay" value="0"> 
	<param name="ShowStatusBar" value="1"> 
	<param name="AutoSize" value="1"> 
	<param name="autoplay" value="0"> 
	<embed type="application/x-mplayer2" pluginspage="http://www.microsoft.com/windows95/downloads/contents/wurecommended/s_wufeatured/mediaplayer/default.asp" src="{URL}" name=MediaPlayer2 showcontrols=1 showdisplay=0 showstatusbar=1 autosize=1 autoplay=0 visible=1 animationatstart=0 transparentatstart=1 loop=0 height=300 width=300></embed> 
</object>
<!-- END wmplayer -->

$ === Begin Table Template ===
<!-- BEGIN table_open --><table align="top" cellpadding="2" cellspacing="0" class="postbody" border="1" bgcolor="#FFFFFF"><!-- END table_open -->
<!-- BEGIN table_close --></td></tr></table><!-- END table_close -->
<!-- BEGIN table_color --><table align="top" cellpadding="2" cellspacing="0" class="postbody" bgcolor="{TABCOLOR}" border="1"><!-- END table_color -->
<!-- BEGIN table_size --><table align="top" cellpadding="2" cellspacing="0" bgcolor="#FFFFFF" style="font-size: {TABSIZE}px" border="1"><!-- END table_size -->
<!-- BEGIN table_cs --><table align="top" cellpadding="2" cellspacing="0" bgcolor="{TABCSCOLOR}" style="font-size: {TABCSSIZE}px" border="1"><!-- END table_cs -->
<!-- BEGIN table_mainrow --></td></tr><tr><td style="font-weight: bold; text-align: center;"><!-- END table_mainrow -->
<!-- BEGIN table_mainrow_color --></td></tr><tr bgcolor="{TABMRCOLOR}"><td style="font-weight: bold; text-align: center;"><!-- END table_mainrow_color -->
<!-- BEGIN table_mainrow_size --></td></tr><tr style="font-size: {TABMRSIZE}px;"><td style="font-weight: bold; text-align: center;"><!-- END table_mainrow_size -->
<!-- BEGIN table_mainrow_cs --></td></tr><tr bgcolor="{TABMRCSCOLOR}" style="font-size: {TABMRCSSIZE}px"><td style="font-weight: bold; text-align: center;"><!-- END table_mainrow_cs -->
<!-- BEGIN table_maincol --></td><td style="font-weight: bold; text-align: center;"><!-- END table_maincol -->
<!-- BEGIN table_maincol_color --></td><td bgcolor="{TABMCCOLOR}" style="font-weight: bold; text-align: center;"><!-- END table_maincol_color -->
<!-- BEGIN table_maincol_size --></td><td style="font-size: {TABMCSIZE}px; font-weight: bold; text-align: center;"><!-- END table_maincol_size -->
<!-- BEGIN table_maincol_cs --></td><td bgcolor="{TABMCCSCOLOR}" style="font-size: {TABMCCSSIZE}px; font-weight: bold; text-align: center;"><!-- END table_maincol_cs -->
<!-- BEGIN table_row --></td></tr><tr><td><!-- END table_row -->
<!-- BEGIN table_row_color --></td></tr><tr bgcolor="{TABRCOLOR}"><td><!-- END table_row_color -->
<!-- BEGIN table_row_size --></td></tr><tr style="font-size: {TABRSIZE}px"><td><!-- END table_row_size -->
<!-- BEGIN table_row_cs --></td></tr><tr bgcolor="{TABRCSCOLOR}" style="font-size: {TABRCSSIZE}px"><td><!-- END table_row_cs -->
<!-- BEGIN table_col --></td><td><!-- END table_col -->
<!-- BEGIN table_col_color --></td><td style="bgcolor="{TABCCOLOR}"><!-- END table_col_color -->
<!-- BEGIN table_col_size --></td><td style="font-size: {TABCSIZE}px"><!-- END table_col_size -->
<!-- BEGIN table_col_cs --></td><td style="bgcolor="{TABCCSCOLOR}" style="font-size: {TABCCSSIZE}px"><!-- END table_col_cs -->
$ === End Table Template ===
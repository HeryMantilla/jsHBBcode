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
<!-- BEGIN img_w --><img style="width:{WIDTH}px;height:{WIDTH}px;" class="bbHCode bbImg" src="{URL}" /><!-- END img_w -->

<!-- BEGIN url --><a href="{URL}" target="_blank" class="bbHCode bbLink">{DESCRIPTION}</a><!-- END url -->

<!-- BEGIN email --><a href="mailto:{EMAIL}" target="_blank" class="bbHCode bbLink">{EMAIL}</a><!-- END email -->

<!-- BEGIN wiki_open --><a href="http://es.wikipedia.org/wiki/{QUERY}" target="_blank" class="bbHCode bbLink"><!-- END wiki_open -->
<!-- BEGIN wiki_close --></a><!-- END wiki_close -->

<!-- BEGIN hr --><div class="bbHCode bbRule"></div><!-- END hr -->

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
	<div style="background-image:url('{TPL_IMG_PATH}code.png');" class="bbHCode bbFrame bbHeader">
		<img src="{TPL_IMG_PATH}nolines_plus.png" onclick="javascript:quoteState('__#@MBBQ#__', '__#@IMG#__')" id="__#@IMG#__" />
		<span>&nbsp;{L_CODE}: {L_LANG}</span>
	</div>
	<div class="bbHCode bbFrame bbContent" id="__#@MBBQ#__">
		<pre class="bbHCode bbLang">
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
		<img src="{TPL_IMG_PATH}nolines_plus.png" onclick="javascript:quoteState('__#@MBBQ#__', '__#@IMG#__')" id="__#@IMG#__" />
		<span>&nbsp;{L_SPOILER}:</span>
	</div>
	<div class="bbHCode bbFrame bbContent" id="__#@MBBQ#__">
<!-- END spoiler_open -->
<!-- BEGIN spoiler_close -->
	</div>
</div>
<!-- END spoiler_close -->

<!-- BEGIN spoiler_username_open -->
<div class="bbHCode bbFrame">
	<div class="bbHCode bbFrame bbHeader">
		<img src="{TPL_IMG_PATH}nolines_plus.png" onclick="javascript:quoteState('__#@MBBQ#__', '__#@IMG#__')" id="__#@IMG#__" />
		<span>&nbsp;{L_SPOILER}: <span class="bbSpoiler">{USERNAME}</span></span>
	</div>
	<div class="bbHCode bbFrame bbContent" id="__#@MBBQ#__">
<!-- END spoiler_open -->
<!-- BEGIN spoiler_username_close -->
	</div>
</div>
<!-- END spoiler_close -->

$ === End Spoiler Template ===

$ === Begin Quote Template ===
<!-- BEGIN quote_username_open -->
<div class="bbHCode bbFrame">
	<div style="background-image:url('{TPL_IMG_PATH}quote.png');" class="bbHCode bbFrame bbHeader">
		<img src="{TPL_IMG_PATH}nolines_plus.png" onclick="javascript:quoteState('__#@MBBQ#__', '__#@IMG#__')" id="__#@IMG#__" />
		<span>&nbsp;{USERNAME} {L_WROTE}:</span>
	</div>
	<div class="bbHCode bbFrame bbContent" id="__#@MBBQ#__">
		<div class="bbHCode bbFrame bbContent bbQ1"></div>
		<div class="bbHCode bbFrame bbContent bbQ2"></div>
		<div class="bbHCode bbFrame bbContent bbText">
<!-- END quote_username_open -->

<!-- BEGIN quote_open -->
<div class="bbHCode bbFrame">
	<div style="background-image:url('{TPL_IMG_PATH}quote.png');" class="bbHCode bbFrame bbHeader">
		<img src="{TPL_IMG_PATH}nolines_plus.png" onclick="javascript:quoteState('__#@MBBQ#__', '__#@IMG#__')" id="__#@IMG#__" />
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
		<img src="{TPL_IMG_PATH}nolines_plus.png" onclick="javascript:quoteState('__#@MBBQ#__', '__#@IMG#__')" id="__#@IMG#__" />
		<span>&nbsp;{L_FREE}</span>
	</div>
	<div class="bbHCode bbFrame bbContent" id="__#@MBBQ#__">
<!-- END free_txt_open -->
<!-- BEGIN free_txt_close -->
	</div>
</div>
<!-- END free_txt_close -->

<!-- BEGIN free_txt_username_open -->
<div class="bbHCode bbFrame">
	<div class="bbHCode bbFrame bbHeader">
		<img src="{TPL_IMG_PATH}nolines_plus.png" onclick="javascript:quoteState('__#@MBBQ#__', '__#@IMG#__')" id="__#@IMG#__" />
		<span>&nbsp;{L_SPOILER}: <span class="bbSpoiler">{USERNAME}{L_FREE}</span></span>
	</div>
	<div class="bbHCode bbFrame bbContent" id="__#@MBBQ#__">
<!-- END free_txt_open -->
<!-- BEGIN free_txt_username_close -->
	</div>
</div>
<!-- END free_txt_close -->

$ === End Free TXT Open Template ===

<!-- BEGIN tip_open -->
<div class="bbHCode bbTooltip">
<img title="{TOOLTIP}" class="bbHCode bbImg bbVA bbTip" src="{TPL_IMG_PATH}tooltip.png" />&nbsp;
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
<div class="bbHCode bbIFrame">
	<a href="{LINK}" target="_blank" class="bbHCode bbLink">{OPENEXTLINK}</a>
	<iframe class="bbHCode" src="{LINK}"></iframe>
</div>
<!-- END page -->

<!-- BEGIN ytube -->
<object width="425" height="350">
	<param name="movie" value="https://www.youtube.com/v/{YOUTUBEID}"></param>
	<embed src="https://www.youtube.com/v/{YOUTUBEID}" type="application/x-shockwave-flash" width="425" height="350"></embed>
</object><br /><br />
<a class="bbHCode bbLink" href="https://youtube.com/watch?v={YOUTUBEID}" target="_blank">YouTube {L_LINK}: {YOUTUBELINK}</a><br />
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

$ === Begin Table Template (https://www.phpbb.com/community/viewtopic.php?t=219269) ===
<!-- BEGIN table_open --><table class="bbHCode bbTable"><!-- END table_open -->
<!-- BEGIN table_close --></td></tr></table><!-- END table_close -->
<!-- BEGIN table_color --><table class="bbHCode bbTable" style="background-color:{TABCOLOR};"><!-- END table_color -->
<!-- BEGIN table_size --><table class="bbHCode bbTable" style="font-size:{TABSIZE}px"><!-- END table_size -->
<!-- BEGIN table_cs --><table class="bbHCode bbTable" style="font-size:{TABCSSIZE}px;background-color:{TABCSCOLOR};"><!-- END table_cs -->
<!-- BEGIN table_mainrow --></td></tr><tr style="background-color:#eeeeee;"><td style="font-weight:bold;text-align:center;"><!-- END table_mainrow -->
<!-- BEGIN table_mainrow_color --></td></tr><tr style="background-color:{TABMRCOLOR};"><td style="font-weight:bold;text-align:center;"><!-- END table_mainrow_color -->
<!-- BEGIN table_mainrow_size --></td></tr><tr style="font-size:{TABMRSIZE}px;"><td style="font-weight:bold;text-align:center;"><!-- END table_mainrow_size -->
<!-- BEGIN table_mainrow_cs --></td></tr><tr style="background-color:{TABMRCSCOLOR}" style="font-size: {TABMRCSSIZE}px"><td style="font-weight: bold; text-align: center;"><!-- END table_mainrow_cs -->
<!-- BEGIN table_maincol --></td><td style="font-weight:bold;text-align:center;"><!-- END table_maincol -->
<!-- BEGIN table_maincol_color --></td><td style="font-weight:bold;text-align:center;background-color:{TABMCCOLOR};"><!-- END table_maincol_color -->
<!-- BEGIN table_maincol_size --></td><td style="font-size:{TABMCSIZE}px;font-weight:bold;text-align:center;"><!-- END table_maincol_size -->
<!-- BEGIN table_maincol_cs --></td><td style="font-size:{TABMCCSSIZE}px;font-weight:bold;text-align:center;background-color:{TABMRCOLOR};"><!-- END table_maincol_cs -->
<!-- BEGIN table_row --></td></tr><tr><td><!-- END table_row -->
<!-- BEGIN table_row_color --></td></tr><tr style="background-color:{TABRCOLOR};"><td><!-- END table_row_color -->
<!-- BEGIN table_row_size --></td></tr><tr style="font-size:{TABRSIZE}px"><td><!-- END table_row_size -->
<!-- BEGIN table_row_cs --></td></tr><tr style="font-size:{TABRCSSIZE}px;background-color:{TABRCSCOLOR};"><td><!-- END table_row_cs -->
<!-- BEGIN table_col --></td><td><!-- END table_col -->
<!-- BEGIN table_col_color --></td><td style="background-color:{TABCCOLOR};"><!-- END table_col_color -->
<!-- BEGIN table_col_size --></td><td style="font-size:{TABCSIZE}px;"><!-- END table_col_size -->
<!-- BEGIN table_col_cs --></td><td style="font-size:{TABCCSSIZE}px;background-color:{TABCCSCOLOR};"><!-- END table_col_cs -->
$ === End Table Template ===

$ === Begin Did you know Template ===
<!-- BEGIN dyk_open -->
<div class="bbHCode bbdyk bbLeft">
	<span class="bbHCode bbdykText">
		<span class="bbHCode bbdyk dyk">{L_DYK}</span>
<!-- END dyk_open -->
<!-- BEGIN dyk_close -->
	</span>
</div><!-- END dyk_close -->
$ === End Did you know Template ===


$ === Begin Alerts Template ===
<!-- BEGIN info_open -->
<div class="bbHCode bbHAlert bbAlertInfo">
	<div class="bbAlertBorder bbAlertInfo"></div>
	<div class="bbAlertContainer bbAlertInfo">
		<div class="bbAlertTitle bbAlertInfo">{TITLE}</div>
		<div class="bbAlertContent">
<!-- END info_open -->
<!-- BEGIN info_close -->
		</div>
	</div>
</div>
<!-- END info_close -->

<!-- BEGIN warn_open -->
<div class="bbHCode bbHAlert bbAlertWarn">
	<div class="bbAlertBorder bbAlertWarn"></div>
	<div class="bbAlertContainer bbAlertWarn">
		<div class="bbAlertTitle bbAlertWarn">{TITLE}</div>
		<div class="bbAlertContent">
<!-- END warn_open -->
<!-- BEGIN warn_close -->
		</div>
	</div>
</div>
<!-- END warn_close -->

<!-- BEGIN success_open -->
<div class="bbHCode bbHAlert bbAlertSuccess">
	<div class="bbAlertBorder bbAlertSuccess"></div>
	<div class="bbAlertContainer bbAlertSuccess">
		<div class="bbAlertTitle bbAlertSuccess">{TITLE}</div>
		<div class="bbAlertContent">
<!-- END success_open -->
<!-- BEGIN success_close -->
		</div>
	</div>
</div>
<!-- END success_close -->

<!-- BEGIN error_open -->
<div class="bbHCode bbHAlert bbAlertError">
	<div class="bbAlertBorder bbAlertError"></div>
	<div class="bbAlertContainer bbAlertError">
		<div class="bbAlertTitle bbAlertError">{TITLE}</div>
		<div class="bbAlertContent">
<!-- END error_open -->
<!-- BEGIN error_close -->
		</div>
	</div>
</div>
<!-- END error_close -->

$ === End Alerts Template ===

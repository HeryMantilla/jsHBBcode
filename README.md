# jsHBBcode

<html>
	<head>
		<title>jsHbbcode</title>
		<link rel="icon" href="./favicon.png" type="image/x-icon"/>
        <link rel="shortcut icon" href="./favicon.png" type="image/x-icon"/>
		<link href="./css/jshbbcode.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="./js/jshbbcode.js"></script>
		<script type="text/javascript" src="./js/jshlang.js"></script>

		<link href="./js/highlight/styles/xcode.min.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="./js/highlight/highlight.min.js"></script>
		<script type="text/javascript">

			var xhttp = new XMLHttpRequest(),
				render = null,
				str = '',
				examples = '',
				codejs = '';

			codejs = 'jsHBBcode.extends({\n\trate_text: function(text) {\n\n\t\t/* Based on: https://stackoverflow.com/a/35615984 by Yogi */\n\n\t\tvar cw = 92,\n\t\t\trate = text;\n\n\t\ttext = Math.round(cw * (parseFloat(text) / 5)) + \'px\';\n\n\t\treturn \'&lt;div class="stars"&gt;&lt;div class="rating" style="width:{0}"&gt;\'\.f(text) + \'\&lt;/div&gt; &lt;div class="text"&gt;\' + rate + \'&lt;/div&gt;&lt;/div&gt;\';\n\n\t}\n\n});\n\njsHBBcode.addbbencode_first_pass = function(text, uid) {\n\n\ttext = this.bbencode_first_pass_pda(text, uid, \'[rate]\', "[/rate]", "[/rate]", false, "rate_text");\n\n\treturn text;\n\n}\n\njsHBBcode.addbbencode_second_pass = function(text, uid, logged, poster_posts) {\n\n\t/* [rate] and [/rate] rate text. */\n\n\ttext = this.str_replace("[rate:${uid}]".f({ uid }), \'\', text);\n\ttext = this.str_replace("[/rate:${uid}]".f({ uid }), \'\', text);\n\n\treturn text;\n\n}\n';
			examples = `<h4>Bold/strong text</h4>I would like to [b]emphasize[/b] this<br>
				<h4>Making italic text</h4>Making text [i]italic[/i] italic is kind of easy<br>
				<h4>Underlining text</h4>u is used for the [u]underline[/u] tag<br>
				<h4>Making Crossed out text</h4>I [s]had been[/s] was born in Denmark<br>
				<h4>Changing the font-size</h4>It [size=14]g[/size][size=18]r[/size][size=22]o[/size][size=26]o[/size][size=28]w[/size][size=32]s[/size]!!!<br>
				<h4>Changing the text color</h4>It is possible to color the text [color=red]red[/color] [color=green]green[/color] [color=blue]blue[/color] -
				or [color=#DB7900]whatever[/color]<br>
				<h4>Centering text</h4>This is some text[center]This is some centered text[/center]<br>
				<h4>Posting a quote</h4>Quoting no-one in particular<br><br>
				[quote]'Tis be a bad day[/quote]<br>
				Quoting someone in particular<br><br>
				[quote="Bjarne"]This be the day of days![/quote]
				<h4>Title</h4>
				[title]Title[/title]<br>
				<h4>Creating links</h4>Linking with no link title
				[url]https://www.bbcode.org/[/url]
				Linking to a named site
				[url=https://www.bbcode.org/]This is bbcode.org![/url]<br>
				<h4>Posting images</h4>[img]https://www.bbcode.org/images/lubeck_small.jpg[/img]<br>
				<h4>Resizing the image (widthxheight)</h4>[img=250x150]https://www.bbcode.org/images/lubeck_small.jpg[/img]<br>
				<h4>Making the image clickable (in this case linking to the original image)</h4>
				[url=https://www.bbcode.org/images/lubeck.jpg][img]https://www.bbcode.org/images/lubeck_small.jpg[/img][/url]<br>
				<h4>Including a youtube video</h4>
				[ytube]E7d-3-uXlZM[/ytube]<br>
				[code]~php~$b = "hello world";\necho $b;[/code]<br>
				[spoiler]The hero dies at the end![/spoiler]<br>
				[spoiler=What happens to the hero?]The hero dies at the end![/spoiler]
				<h4>Listing items</h4>
				[list]
					[*]Here's an item\n
					[*]Other item!
				[/list]
				<h4>Making a table</h4>
				[table][mrow]Header 1[mcol]Header 2[mcol]Header 3[row]a1[col]b1[col]c1[row]a2[col]b2[col]c2[/table]
				<h4>Emoticons Example (Add your own)</h4>
				[table]
				[mrow]Code[mcol]Emoticon
				[row][raw]:-D[/raw][col] :-D
				[row][raw]8-)[/raw][col] 8-)
				[row][raw]:grin:[/raw][col] :grin:
				[row][raw]:)[/raw][col] :)
				[row][raw]:-)[/raw][col] :-)
				[row][raw]:smile:[/raw][col] :smile:
				[row][raw]:([/raw][col] :(
				[row][raw]:-([/raw][col] :-(
				[row][raw]:sad:[/raw][col] :sad:
				[row][raw]:-o[/raw][col] :-o
				[row][raw]:eek:[/raw][col] :eek:
				[row][raw]:shock:[/raw][col] :shock:
				[row][raw]:?[/raw][col] :?
				[row][raw]:-?[/raw][col] :-?
				[row][raw]8)[/raw][col] 8)
				[row][raw]8-)[/raw][col] 8-)
				[row][raw]:cool:[/raw][col] :cool:
				[row][raw]:lol:[/raw][col] :lol:
				[row][raw]:x[/raw][col] :x
				[row][raw]:-x[/raw][col] :-x
				[row][raw]:mad:[/raw][col] :mad:
				[row][raw]:-P[/raw][col] :-P
				[row][raw]:razz:[/raw][col] :razz:
				[row][raw]:oops:[/raw][col] :oops:
				[row][raw]:cry:[/raw][col] :cry:
				[row][raw]:evil:[/raw][col] :evil:
				[row][raw]:twisted:[/raw][col] :twisted:
				[row][raw]:wink:[/raw][col] :wink:
				[row][raw];)[/raw][col] ;)
				[row][raw];-)[/raw][col] ;-)
				[row][raw]:!:[/raw][col] :!:
				[row][raw]:idea:[/raw][col] :idea:
				[row][raw]:arrow:[/raw][col] :arrow:
				[row][raw]:|[/raw][col] :|
				[row][raw]:-|[/raw][col] :-|
				[row][raw]:mrgreen:[/raw][col] :mrgreen:
				[/table]
				<h4>Tooltip</h4>
				[tip="I'm tip"]Example tooltip[/tip]<br>
				<h4>Wiki Link</h4>
				[wiki=BBCode]Wiki BBCode[/wiki]<br>
				<h4>Add Page (Use with caution)</h4>
				[page]https://es.wikipedia.org/wiki/BBCode[/page]
				<h4>Did you know</h4>
				\t\t[dyk]Millions of people use phpBB on a daily basis.[/dyk]
				<h4>Scroll Text</h4>
				[scroll]Scroll Text[/scroll]
				<h4>H{Number} Text</h4>
				[h1]H1[/h1]
				[h2]H2[/h2]
				[h3]H3[/h3]
				[h4]H4[/h4]
				[h5]H5[/h5]
				[h6]H6[/h6]<br>
				<h4>Subscript and Superscript Text</h4>
				Subscript[sub]1[/sub] ~ Superscript[sup]2[/sup]<br>
				<h4>Pre Text</h4>
				[pre]Anytext here...[/pre]
				<h4>Horizontal Rule</h4>
				[hr]
				<h4>Email</h4>
				[email]hackprotm@gmail.com[/email]
				<h4>Rainbow</h4>
				[rainbow]hackprotm@gmail.com[/rainbow]
				<h4>Fade text</h4>
				[fade]Fading text...[/fade]
				<h4>Show Post</h4>
				[myPost]<br>
				<h4>Extending...</h4>
				[code]~javascript~${codejs}[/code]
				[code]~css~.stars {\n\tposition: relative;\n\tdisplay: inline-block;\n\theight: 22px;\n\tline-height: 22px;\n}\n\n.stars .rating {\n\tfont-size: 22px;\n\tcolor: #0091cd;\n\tdisplay: inline-block;\n\toverflow: hidden;\n\tvertical-align: middle;\n}\n.stars .rating::before {\n\tcolor: #0091cd;\n\tcontent: "\u2605 \u2605 \u2605 \u2605 \u2605"\n}\n\n.stars .text {\n\tposition: relative;\n\tdisplay: inline-block;\n\tcolor: #0091cd;\n\ttop: 3px;\n\tleft: 4px;\n}
				[/code]
				[success=Result]
				[rate]3.48[/rate]
				[/success]
				<h4>Alerts</h4>
				[info=Information]Vestibulum ullamcorper mauris at ligula. Nam pretium turpis et arcu.[/info]
				[warn=Warning]Vestibulum ullamcorper mauris at ligula. Nam pretium turpis et arcu.[/warn]
				[success=Success]Vestibulum ullamcorper mauris at ligula. Nam pretium turpis et arcu.[/success]
				[error=Error]Vestibulum ullamcorper mauris at ligula. Nam pretium turpis et arcu.[/error]
				<h4>Just for fun</h4>
				Reverse: [reverse]Reverse example[/reverse]<br>
				md5: [md5]md5 Text[/md5]<br>
				asc2hex: [asc2hex]Ascii Text[/asc2hex]<br>
				asc2bin: [asc2bin]Binary Text[/asc2bin]<br>
				hex2asc: [hex2asc]41 73 63 69 69 20 54 65 78 74[/hex2asc]<br>
				bin2asc: [bin2asc]01000010 01101001 01101110 01100001 01110010 01111001 00100000 01010100 01100101 01111000 01110100[/bin2asc]<br>
				base64enc: [base64enc]Encoded Text[/base64enc]<br>
				base64dec: [base64dec]RW5jb2RlZCBUZXh0[/base64dec]<br>
				sha1: [sha1]md5 Text[/sha1]<br>
				crc: [crc]crc Text[/crc]<br>
				`;

			//examples = `[info=Information]Vestibulum ullamcorper mauris at ligula. Nam pretium turpis et arcu.[/info]`;

			xhttp.onreadystatechange = function() {

				if (this.readyState == 4 && this.status == 200) {

					jsHBBcode.extends({
						rate_text: function(text) {

							/* Based on: https://stackoverflow.com/a/35615984 by Yogi */

							var cw = 92,
								rate = text;

							text = Math.round(cw * (parseFloat(text) / 5)) + 'px';

							return '<div class="stars"><div class="rating" style="width:{0}">'.f(text) + '</div> <div class="text">' + rate + '</div></div>';

						}

					});

					jsHBBcode.addbbencode_first_pass = function(text, uid) {

						text = this.bbencode_first_pass_pda(text, uid, '[rate]', "[/rate]", "[/rate]", false, "rate_text");

						return text;

					}

					jsHBBcode.addbbencode_second_pass = function(text, uid, logged, poster_posts) {

						/* [rate] and [/rate] rate text. */

						text = this.str_replace("[rate:${uid}]".f({ uid }), '', text);
        				text = this.str_replace("[/rate:${uid}]".f({ uid }), '', text);

						return text;

					}

					jsHBBcode.syntaxHighlight = function(text) {

						var findlang1 = text.indexOf('~'),
							findlang2 = text.indexOf('~', findlang1 + 1),
							mLang = 'plaintext';

						if (findlang1 > -1 && findlang2 > -1) {
							mLang = text.substring(findlang1 + 1, findlang1 + findlang2);
							text = text.substring(findlang2 + 1);
						}

						text = hljs.highlight(text.replace(/<\/n>/g, '<br>'), {language: mLang, useBR: true}).value;

						return text;

					};

					str = jsHBBcode.parser(examples, this.responseText);
					render = document.getElementById('render');
					if (render) { render.innerHTML = str; }
				}

			};
			xhttp.open('GET', './tpl/jshbbcode.tpl');
			xhttp.send();

		</script>
		<style type="text/css">

			/* General page style. */
			@font-face {
				font-family: 'Ubuntu';
				font-display: block;
				src: url('./fonts/Ubuntu/Ubuntu-Regular.eot'); /* IE9 Compat Modes */
				src: url('./fonts/Ubuntu/Ubuntu-Regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
					url('./fonts/Ubuntu/Ubuntu-Regular.woff') format('woff'), /* Modern Browsers */
					url('./fonts/Ubuntu/Ubuntu-Regular.ttf')  format('truetype')
			}
			@font-face {
				font-family: 'JetBrainsMono';
				font-display: block;
				src: url('./fonts/JetBrainsMono/JetBrainsMono-Regular.eot'); /* IE9 Compat Modes */
				src: url('./fonts/JetBrainsMono/JetBrainsMono-Regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
					url('./fonts/JetBrainsMono/JetBrainsMono-Regular.woff') format('woff'), /* Modern Browsers */
					url('./fonts/JetBrainsMono/JetBrainsMono-Regular.ttf')  format('truetype')
			}

			::-webkit-scrollbar {
				height: 14px;
				width: 14px;
				overflow: visible;
			}

			::-webkit-scrollbar-button {
				height: 0;
				width: 0;
			}

			::-webkit-scrollbar-corner {
				background: transparent;
			}

			::-webkit-scrollbar-thumb, ::-webkit-scrollbar-track {
				background-clip: padding-box;
				border: 3px solid transparent;
			}

			::-webkit-scrollbar-thumb, ::-webkit-scrollbar-track {
				background-clip: padding-box;
				border: 3px solid transparent;
			}

			::-webkit-scrollbar-thumb {
				background-color: #d4c99e;
			}

			::-webkit-scrollbar-track {
				background-color: #e9e4ce;
			}

			html, body {
				background-color: #ffffff;
				font-family: 'Ubuntu', sans-serif;
				padding: 0;
				margin: 0;
				font-size: 12px;
				overflow: hidden;
				height: 100%;
			}

			h4 {
				color: #f85a40;
			}

			.container {
				display: flex;
				padding: 0;
				margin: 0;
				height: 100%;
			}

			.menu {
				position: relative;
				display: block;
				border-right: 1px solid #cccccc;
				width: 30%;
				padding: 8px;
				margin: 0;
				overflow: auto;
				overflow-x: hidden;
			}

			.content {
				position: relative;
				display: block;
				width: 70%;
				padding: 8px;
				overflow: auto;
				overflow-x: hidden;
			}

			hr {
				border: 1px dashed #cccccc;
				border-top: 0;
			}

			.link {
				text-decoration: none;
				color: #0091cd;
			}

			.link:hover {
				text-decoration: underline;
			}

			.menu-li {
				margin-top: 4px;
			}

			.menu-list-d {
				padding: 8px;
				border: 1px solid #dff0d8;
			}

			.menu-list {
				padding: 2px;
				padding-left: 4px;
				background-color:#dff0d8;
				border: 1px solid #dff0d8;
				color: #000000;
				font-size: 11px;
				font-weight: bold;
			}

			.menu-text {
				color: #be0027;
			}

			.stars {
				position: relative;
				display: inline-block;
				height: 22px;
				line-height: 22px;
			}

			.stars .rating {
				font-size: 22px;
				color: #0091cd;
				display: inline-block;
				overflow: hidden;
				vertical-align: middle;
			}
			.stars .rating::before {
				color: #0091cd;
				content: "\2605 \2605 \2605 \2605 \2605"
			}

			.stars .text {
				position: relative;
				display: inline-block;
				color: #0091cd;
				top: 3px;
				left: 4px;
			}

			.bbHCode.bbLang {
				font-family: 'JetBrainsMono' !important;
			}

		</style>
	</head>
	<body>
		<div class="container">
			<div class="menu">
				<div style="padding:4px;border:1px solid #d4c99e;background-color:#d4c99e;"><b>Menu</b></div>
				<div style="padding:4px;border:1px solid #d4c99e;border-top:0;">
					<ul style="list-style:none;padding:2px;">
						<li class="menu-li" style="margin:0;">
							<div class="menu-list">Bold Syntax</div>
							<div class="menu-list-d"><span class="menu-text">[b]</span>{TEXT}<span class="menu-text">[/b]</span></div>
						</li>
						<li class="menu-li">
							<div class="menu-list">Italy Syntax</div>
							<div class="menu-list-d"><span class="menu-text">[i]</span>{TEXT}<span class="menu-text">[/i]</span></div>
						</li>
						<li class="menu-li">
							<div class="menu-list">Underline Syntax</div>
							<div class="menu-list-d"><span class="menu-text">[u]</span>{TEXT}<span class="menu-text">[/u]</span></div>
						</li>
						<li class="menu-li">
							<div class="menu-list">Crossed out Syntax</div>
							<div class="menu-list-d"><span class="menu-text">[s]</span>{TEXT}<span class="menu-text">[/s]</span></div>
						</li>
						<li class="menu-li">
							<div class="menu-list">Font Size</div>
							<div class="menu-list-d"><span class="menu-text">[size=</span>{SIZE}<span class="menu-text">]</span>{TEXT}<span class="menu-text">[/size]</span></div>
						</li>
						<li class="menu-li">
							<div class="menu-list">Text Color</div>
							<div class="menu-list-d"><span class="menu-text">[color=</span>{COLOR}<span class="menu-text">]</span>{TEXT}<span class="menu-text">[/color]</span></div>
						</li>
						<li class="menu-li">
							<div class="menu-list">Text Center</div>
							<div class="menu-list-d"><span class="menu-text">[center]</span>{TEXT}<span class="menu-text">[/center]</span></div>
						</li>
						<li class="menu-li">
							<div class="menu-list">Quote Text</div>
							<div class="menu-list-d">
								<span class="menu-text">[quote]</span>{TEXT}<span class="menu-text">[/quote]</span><br>
								<span class="menu-text">[quote=</span>"{QUOTE}"<span class="menu-text">]</span>{TEXT}<span class="menu-text">[/quote]</span><br>
								<span class="menu-text">[quote=</span>{QUOTE}<span class="menu-text">]</span>{TEXT}<span class="menu-text">[/quote]</span>
							</div>
						</li>
						<li class="menu-li">
							<div class="menu-list">Title Text</div>
							<div class="menu-list-d">
								<span class="menu-text">[title]</span>{TEXT}<span class="menu-text">[/title]</span><br>
								<span class="menu-text">[title=</span>"{TITLE}"<span class="menu-text">]</span>{TEXT}<span class="menu-text">[/title]</span><br>
								<span class="menu-text">[title=</span>{TITLE}<span class="menu-text">]</span>{TEXT}<span class="menu-text">[/title]</span>
							</div>
						</li>
						<li class="menu-li">
							<div class="menu-list">Links Text</div>
							<div class="menu-list-d">
								<span class="menu-text">[url]</span>{URL}<span class="menu-text">[/url]</span><br>
								<span class="menu-text">[url=</span>{URL}<span class="menu-text">]</span>{TEXT}<span class="menu-text">[/url]</span>
							</div>
						</li>
						<li class="menu-li">
							<div class="menu-list">Images</div>
							<div class="menu-list-d">
								<span class="menu-text">[img]</span>{URL}<span class="menu-text">[/img]</span><br>
								<span class="menu-text">[img=</span>{DIMENSION}<span class="menu-text">]</span>{URL}<span class="menu-text">[/img]</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="content">
				<img style="vertical-align:middle;padding-right:8px;" src="./favicon.png" />jsHBBcode is a Javascript adaptation of php version <a href="https://www.phpbb.com" target="_blank">BBCode</a>.<br>
				<h5>Examples from: <a class="link" target="_blank" href="https://www.bbcode.org/">https://www.bbcode.org/</a></h5>
				<h5>Fonts used: <a class="link" target="_blank" href="https://www.jetbrains.com/es-es/lp/mono/">JetBrainsMono</a>, <a class="link" target="_blank" href="https://fonts.google.com/specimen/Ubuntu">Ubuntu</a></h5>
				<h5>Highlight text used: <a class="link" target="_blank" href="https://highlightjs.org">highlightjs</a></h5>
				<hr>
				<div id="render"></div>
			</div>
		</div>
	</body>
</html>

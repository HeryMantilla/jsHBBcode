# jsHBBcode

Examples in: https://anyrequest.com.co/jsHbbcode/

```js
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
```

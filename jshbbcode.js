/***************************************************************************
 *                              bbcode.php
 *                            -------------------
 *   begin                : Saturday, Feb 13, 2001
 *   copyright            : (C) 2001 The phpBB Group
 *   email                : support@phpbb.com
 *
 *   $Id: bbcode.php,v 1.36.2.41 2006/02/26 17:34:50 grahamje Exp $
 *
 ***************************************************************************/

/***************************************************************************
 *
 *   This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 2 of the License, or
 *   (at your option) any later version.
 *
 ***************************************************************************/

/********* JS Version by Heriberto Mantilla (HACKPRO TM) (c) 2022 based on original code ********/

 if (!String.prototype.f) {
    String.prototype.f = function() {

        var s = this,
            i = arguments.length;

        if (typeof arguments[0] === 'object') {
            for (var prop in arguments[0]) {
                s = s.replace(new RegExp('\\${' + prop + '\\}', 'gm'), arguments[0][prop]);
            }

            return s;
        }

        while (i--) {
            s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
        }

        return s;

    };

 }

 if (!String.prototype.addSlashes) {
    String.prototype.addSlashes = function() {

        return this.replaceAll(/[\\"']/g, '\\$&').replaceAll(/\u0000/g, '\\0');

    }

 }

var BBCODE_UID_LEN = 10,
    BBCODE_TPL_READY = false,
    BBCODE_IMGPATH = './images/',
    mLang = [],
    bbcode_tpl = [],
    rand_seed = 0,
    smilies = [],
    smilies_path = './images/smilies/',
    stack = [],
    tplFile = '';

smilies = [{
    "smilies_id": 1,
    "code": ":grin:",
    "smile_url": "icon_biggrin.gif",
    "emoticon": "Very Happy"
}, {
    "smilies_id": 2,
    "code": ":smile:",
    "smile_url": "icon_smile.gif",
    "emoticon": "Smile"
}, {
    "smilies_id": 3,
    "code": ":sad:",
    "smile_url": "icon_sad.gif",
    "emoticon": "Sad"
}, {
    "smilies_id": 4,
    "code": ":eek:",
    "smile_url": "icon_surprised.gif",
    "emoticon": "Surprised"
}, {
    "smilies_id": 5,
    "code": ":shock:",
    "smile_url": "icon_eek.gif",
    "emoticon": "Shocked"
}, {
    "smilies_id": 6,
    "code": ":cool:",
    "smile_url": "icon_cool.gif",
    "emoticon": "Cool"
}, {
    "smilies_id": 7,
    "code": ":lol:",
    "smile_url": "icon_lol.gif",
    "emoticon": "Laughing"
}, {
    "smilies_id": 8,
    "code": ":mad:",
    "smile_url": "icon_mad.gif",
    "emoticon": "Mad"
}, {
    "smilies_id": 9,
    "code": ":razz:",
    "smile_url": "icon_razz.gif",
    "emoticon": "Razz"
}, {
    "smilies_id": 10,
    "code": ":oops:",
    "smile_url": "icon_redface.gif",
    "emoticon": "Embarassed"
}, {
    "smilies_id": 11,
    "code": ":cry:",
    "smile_url": "icon_cry.gif",
    "emoticon": "Crying or Very sad"
}, {
    "smilies_id": 12,
    "code": ":evil:",
    "smile_url": "icon_evil.gif",
    "emoticon": "Evil or Very Mad"
}, {
    "smilies_id": 13,
    "code": ":twisted:",
    "smile_url": "icon_twisted.gif",
    "emoticon": "Twisted Evil"
}, {
    "smilies_id": 14,
    "code": ":roll:",
    "smile_url": "icon_rolleyes.gif",
    "emoticon": "Rolling Eyes"
}, {
    "smilies_id": 15,
    "code": ":idea:",
    "smile_url": "icon_idea.gif",
    "emoticon": "Idea"
}, {
    "smilies_id": 16,
    "code": ":arrow:",
    "smile_url": "icon_arrow.gif",
    "emoticon": "Arrow"
}, {
    "smilies_id": 17,
    "code": ":neutral:",
    "smile_url": "icon_neutral.gif",
    "emoticon": "Neutral"
}, {
    "smilies_id": 18,
    "code": ":mrgreen:",
    "smile_url": "icon_mrgreen.gif",
    "emoticon": "Mr. Green"
}, {
    "smilies_id": 19,
    "code": ":wink:",
    "smile_url": "icon_wink.gif",
    "emoticon": "Wink"
}, {
    "smilies_id": 20,
    "code": ":-D",
    "smile_url": "icon_biggrin.gif",
    "emoticon": "Very Happy"
}, {
    "smilies_id": 21,
    "code": ":)",
    "smile_url": "icon_smile.gif",
    "emoticon": "Smile"
}, {
    "smilies_id": 22,
    "code": ":-)",
    "smile_url": "icon_smile.gif",
    "emoticon": "Smile"
}, {
    "smilies_id": 23,
    "code": ":(",
    "smile_url": "icon_sad.gif",
    "emoticon": "Sad"
}, {
    "smilies_id": 24,
    "code": ":-(",
    "smile_url": "icon_sad.gif",
    "emoticon": "Sad"
}, {
    "smilies_id": 25,
    "code": ":o",
    "smile_url": "icon_surprised.gif",
    "emoticon": "Surprised"
}, {
    "smilies_id": 26,
    "code": ":-o",
    "smile_url": "icon_surprised.gif",
    "emoticon": "Surprised"
}, {
    "smilies_id": 27,
    "code": ":?",
    "smile_url": "icon_confused.gif",
    "emoticon": "Confused"
}, {
    "smilies_id": 28,
    "code": ":-?",
    "smile_url": "icon_confused.gif",
    "emoticon": "Confused"
}, {
    "smilies_id": 29,
    "code": "8)",
    "smile_url": "icon_cool.gif",
    "emoticon": "Cool"
}, {
    "smilies_id": 30,
    "code": "8-)",
    "smile_url": "icon_cool.gif",
    "emoticon": "Cool"
}, {
    "smilies_id": 31,
    "code": ":x",
    "smile_url": "icon_mad.gif",
    "emoticon": "Mad"
}, {
    "smilies_id": 32,
    "code": ":-x",
    "smile_url": "icon_mad.gif",
    "emoticon": "Mad"
}, {
    "smilies_id": 33,
    "code": ":P",
    "smile_url": "icon_razz.gif",
    "emoticon": "Razz"
}, {
    "smilies_id": 34,
    "code": ":-P",
    "smile_url": "icon_razz.gif",
    "emoticon": "Razz"
}, {
    "smilies_id": 35,
    "code": ";)",
    "smile_url": "icon_wink.gif",
    "emoticon": "Wink"
}, {
    "smilies_id": 36,
    "code": ";-)",
    "smile_url": "icon_wink.gif",
    "emoticon": "Wink"
}, {
    "smilies_id": 37,
    "code": ":!:",
    "smile_url": "icon_exclaim.gif",
    "emoticon": "Exclamation"
}, {
    "smilies_id": 38,
    "code": ":|",
    "smile_url": "icon_neutral.gif",
    "emoticon": "Neutral"
}, {
    "smilies_id": 39,
    "code": ":-|",
    "smile_url": "icon_neutral.gif",
    "emoticon": "Neutral"
}];

var jsHBBcode = {

    addbbencode_first_pass: function(text, uid) {

        /*** Extent with your own bbencode_first_pass ***/

        return text;

    },

    addbbencode_second_pass: function(text, uid, logged, poster_posts) {

        /*** Extent with your own bbencode_second_pass ***/

        return text;

    },

    addbbcode_template: function(tpl) {

        if (BBCODE_TPL_READY === true) {
            tpl = this.removeComments(tpl, '$');

            // replace \ with \\ and then ' with \'.
            tpl = this.str_replace('\\', '\\\\', tpl);
            tpl = this.str_replace('\'', '\\\'', tpl);

            // strip newlines.
            tpl = this.str_replace('\n\r', '', tpl);
            tpl = this.str_replace('\r', '', tpl);
            tpl = this.str_replace('\n', '', tpl);
            tpl = this.str_replace('\t', '', tpl);

            // Turn template blocks into PHP assignment statements for the values of $bbcode_tpls..
            tpl = this.preg_replace('#<!-- BEGIN (.*?) -->(.*?)<!-- END (.*?) -->#', '\n\\1 = \\2', tpl);
            tpl = tpl.split('\n');

            for (var tplIx = 0; tplIx < tpl.length; tplIx += 1) {
                if (tpl[tplIx] !== '') {
                    var eq = tpl[tplIx].indexOf('=');

                    window[bbcode_tpls[tpl[tplIx]].substring(0, eq - 1)] = this.ltrim(tpl[tplIx].substring(eq + 1));
                }

            }

        }

    },

    addSmilies: function(smilies_id, code, smile_url, emoticon) {

        smilies.push({
            smilies_id: smilies_id,
            code: code,
            smile_url: smile_url,
            emoticon: emoticon
        });

    },

    array_pop: function(inputArr) {

        //  discuss at: http://phpjs.org/functions/array_pop/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //    input by: Brett Zamir (http://brett-zamir.me)
        //    input by: Theriault
        // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfixed by: Brett Zamir (http://brett-zamir.me)
        //        note: While IE (and other browsers) support iterating an object's
        //        note: own properties in order, if one attempts to add back properties
        //        note: in IE, they may end up in their former position due to their position
        //        note: being retained. So use of this function with "associative arrays"
        //        note: (objects) may lead to unexpected behavior in an IE environment if
        //        note: you add back properties with the same keys that you removed
        //   example 1: array_pop([0,1,2]);
        //   returns 1: 2
        //   example 2: data = {firstName: 'Kevin', surName: 'van Zonneveld'};
        //   example 2: lastElem = array_pop(data);
        //   example 2: $result = data
        //   returns 2: {firstName: 'Kevin'}

        var key = '',
        lastKey = '';

        if (inputArr.hasOwnProperty('length')) {
            // Indexed
            if (!inputArr.length) {
                // Done popping, are we?
                return null;
            }

            return inputArr.pop();
        } else {
            // Associative
            for (key in inputArr) {
                if (inputArr.hasOwnProperty(key)) { lastKey = key; }
            }

            if (lastKey) {
                var tmp = inputArr[lastKey];
                delete(inputArr[lastKey]);
                return tmp;
            } else {
                return null;
            }

        }

    },

    array_push: function(inputArr) {

        //  discuss at: http://phpjs.org/functions/array_push/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: Brett Zamir (http://brett-zamir.me)
        //        note: Note also that IE retains information about property position even
        //        note: after being supposedly deleted, so if you delete properties and then
        //        note: add back properties with the same keys (including numeric) that had
        //        note: been deleted, the order will be as before; thus, this function is not
        //        note: really recommended with associative arrays (objects) in IE environments
        //   example 1: array_push(['kevin','van'], 'zonneveld');
        //   returns 1: 3

        var i = 0, pr = '', argv = arguments, argc = argv.length,
            allDigits = /^\d$/, size = 0, highestIdx = 0, len = 0;

        if (inputArr.hasOwnProperty('length')) {
            for (i = 1; i < argc; i++) {
                inputArr[inputArr.length] = argv[i];
            }

            return inputArr.length;
        }

        // Associative (object)
        for (pr in inputArr) {
            if (inputArr.hasOwnProperty(pr)) {
                ++len;
                if (pr.search(allDigits) !== -1) {
                    size = parseInt(pr, 10);
                    highestIdx = size > highestIdx ? size : highestIdx;
                }

            }

        }

        for (i = 1; i < argc; i++) {
            inputArr[++highestIdx] = argv[i];
        }

        return len + i - 1;

    },

    asc2bin: function(text) {

        var i = 0, enc = '', binary = [], len = 0, self = null;

        if (arguments.length >= 3) {
            self = arguments[2];
        } else {
            self = this;
        }

        for (i = 0; i < 255; i += 1)  {
		    binary[self.chr(i)] = self.str_pad(self.base_convert(i, 10, 2), 8, '0', 'STR_PAD_LEFT');
        }

        len = self.strlen(text);
        for (i = 0; i < len; i += 1) {
            enc += binary[text[i]];
        }

        enc = self.substr(self.chunk_split(enc, 8, ' '), 0, -1);
        return enc;

    },

    asc2hex: function(text) {

        var i = 0, enc = '', hexadecimal = [], len = 0, self = null;

        if (arguments.length >= 3) {
            self = arguments[2];
        } else {
            self = this;
        }

        for (i = 0; i < 255; i += 1) {
            hexadecimal[self.chr(i)] = self.str_pad(self.base_convert(i, 10, 16), 2, '0', 'STR_PAD_LEFT');
	    }

        len = self.strlen(text);
	    for (i = 0; i < len; i += 1) {
            enc += hexadecimal[text[i]];
	    }

        enc = self.substr(self.chunk_split(enc, 2, ' '), 0, -1);
        return enc;

    },

    base_convert: function(number, frombase, tobase) {

        //  discuss at: http://phpjs.org/functions/base_convert/
        // original by: Philippe Baumann
        // improved by: Rafał Kukawski (http://blog.kukawski.pl)
        //   example 1: base_convert('A37334', 16, 2);
        //   returns 1: '101000110111001100110100'

        return parseInt(number + '', frombase | 0).toString(tobase | 0);

    },

    base64_decode: function(str) {

        // https://stackoverflow.com/a/64752311
        var text = atob(str),
            length = text.length,
            bytes = new Uint8Array(length);

        for (var i = 0; i < length; i++) {
            bytes[i] = text.charCodeAt(i);
        }

        var decoder = new TextDecoder(); // default is utf-8

        return decoder.decode(bytes);

    },

    base64_encode: function(str) {

        // https://developer.mozilla.org/en-US/docs/Glossary/Base64
        return window.btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {

            return String.fromCharCode('0x' + p1);

        }));

    },

    bbencode_first_pass: function(text, uid) {

        var self = this;

        // pad it with a space so we can distinguish between FALSE and matching the 1st char (index 0).
        // This is important; bbencode_quote(), bbencode_list(), and bbencode_code() all depend on it.
        text = " " + text;

        // [CODE] and [/CODE] for posting code (HTML, PHP, C etc etc) in your posts.
        text = self.bbencode_first_pass_pda(text, uid, '[code]', '[/code]', '', true, 'syntaxHighlight');

        // [tip] and [/tip] for tooltip text.
        text = self.bbencode_first_pass_pda(text, uid, '[tip]', '[/tip]', '', false, '');
        text = self.bbencode_first_pass_pda(text, uid, '/\\[tip="(.*?)"\\]/g', '[/tip]', '', false, '', "[tip:${uid}=\\\"\\1\\\"]".f({ uid }));
        text = self.bbencode_first_pass_pda(text, uid, '/\\[tip=(.*?)\\]/g', '[/tip]', '', false, '', "[tip:${uid}=\\1]".f({ uid }));

        // [warn] and [/warn] for Warning text.
        text = self.bbencode_first_pass_pda(text, uid, '/\\[warn="(.*?)"\\]/g', '[/warn]', '', false, '', "[warn:${uid}=\\\"\\1\\\"]".f({ uid }));
        text = self.bbencode_first_pass_pda(text, uid, '/\\[warn=(.*?)\\]/g', '[/warn]', '', false, '', "[warn:${uid}=\\1]".f({ uid }));

        // [info] and [/info] for Info text.
        text = self.bbencode_first_pass_pda(text, uid, '/\\[info="(.*?)"\\]/g', '[/info]', '', false, '', "[info:${uid}=\\\"\\1\\\"]".f({ uid }));
        text = self.bbencode_first_pass_pda(text, uid, '/\\[info=(.*?)\\]/g', '[/info]', '', false, '', "[info:${uid}=\\1]".f({ uid }));

        // [success] and [/success] for Success text.
        text = self.bbencode_first_pass_pda(text, uid, '/\\[success="(.*?)"\\]/g', '[/success]', '', false, '', "[success:${uid}=\\\"\\1\\\"]".f({ uid }));
        text = self.bbencode_first_pass_pda(text, uid, '/\\[success=(.*?)\\]/g', '[/success]', '', false, '', "[success:${uid}=\\1]".f({ uid }));

        // [error] and [/error] for Error text.
        text = self.bbencode_first_pass_pda(text, uid, '/\\[error="(.*?)"\\]/g', '[/error]', '', false, '', "[error:${uid}=\\\"\\1\\\"]".f({ uid }));
        text = self.bbencode_first_pass_pda(text, uid, '/\\[error=(.*?)\\]/g', '[/error]', '', false, '', "[error:${uid}=\\1]".f({ uid }));

        // [QUOTE] and [/QUOTE] for posting replies with quote, or just for quoting stuff.
        text = self.bbencode_first_pass_pda(text, uid, '[quote]', '[/quote]', '', false, '');
        text = self.bbencode_first_pass_pda(text, uid, '/\\[quote="(.*?)"\\]/g', '[/quote]', '', false, '', "[quote:${uid}=\\\"\\1\\\"]".f({ uid }));
        text = self.bbencode_first_pass_pda(text, uid, '/\\[quote=(.*?)\\]/g', '[/quote]', '', false, '', "[quote:${uid}=\\1]".f({ uid }));

        // [TITLE] and [/TITLE] for entering a custom title for quote-like boxes
        text = self.bbencode_first_pass_pda(text, uid, '[title]', '[/title]', '', false, '');
        text = self.bbencode_first_pass_pda(text, uid, '/\\[title="(.*?)"\\]/g', '[/title]', '', false, '', "[title:${uid}=\\\"\\1\\\"]".f({ uid }));
        text = self.bbencode_first_pass_pda(text, uid, '/\\[title=(.*?)\\]/g', '[/title]', '', false, '', "[title:${uid}=\\1]".f({ uid }));

        // BEGIN Moderator Tags
        text = self.bbencode_first_pass_pda(text, uid, '[mod]', '[/mod]', '', false, '');
        text = self.bbencode_first_pass_pda(text, uid, '/\\[mod="(.*?)"\\]/g', '[/mod]', '', false, '', "[mod:${uid}=\\\"\\1\\\"".f({ uid }));
        text = self.bbencode_first_pass_pda(text, uid, '/\\[mod=(.*?)\\]/g', '[/mod]', '', false, '', "[mod:${uid}=\\1]".f({ uid }));
        // END Moderator Tags

        // [wiki=] and [/wiki].
        text = self.bbencode_first_pass_pda(text, uid, '/\\[wiki=(.*?)\\]/g', '[/wiki]', '', false, '', "[wiki:${uid}=\\1]".f({ uid }));

        // [list] and [list=x] for (un)ordered lists.
        open_tag = new Array();
        open_tag[0] = "[list]";

        // unordered..
        text = self.bbencode_first_pass_pda(text, uid, open_tag, "[/list]", "[/list:u]", false, "replace_listitems");

        open_tag[0] = "[list=1]";
        open_tag[1] = "[list=a]";

        // ordered.
        text = self.bbencode_first_pass_pda(text, uid, open_tag, "[/list]", "[/list:o]",  false, "replace_listitems");

        // [color] and [/color] for setting text color
        text = self.preg_replace("#\\[color=(\\#[0-9A-F-a-f]{6}|[a-z\\-]+)\\](.*?)\\[\\/color\\]#gm", "[color=\\1:${uid}]\\2[/color:${uid}]".f({ uid }), text);

        // [size] and [/size] for setting text size
        text = self.preg_replace("#\\[size=([1-9]?[0-9])\\](.*?)\\[\/size\\]#gm", "[size=\\1:${uid}]\\2[/size:${uid}]".f({ uid }), text);

        // [raw] and [/raw] for raw text.
        text = self.bbencode_first_pass_pda(text, uid, '[raw]', "[/raw]", "[/raw]", false, "raw_text");

        // [b] and [/b] for bolding text.
        text = self.preg_replace("#\\[b\](.*?)\\[\/b\]#gm", "[b:${uid}]\\1[/b:${uid}]".f({ uid }), text);

        // [s] and [/s] for Strikethrough text.
        text = self.preg_replace("#\\[s\](.*?)\\[\/s\]#gm", "[s:${uid}]\\1[/s:${uid}]".f({ uid }), text);

        // [pre] and [/pre] for Preformatted text.
        text = self.preg_replace("#\\[pre\](.*?)\\[\/pre\]#gm", "[pre:${uid}]\\1[/pre:${uid}]".f({ uid }), text);

        // [scroll] and [/scroll] for scrolling text.
        text = self.preg_replace("#\\[scroll\](.*?)\\[\/scroll\]#gm", "[scroll:${uid}]\\1[/scroll:${uid}]".f({ uid }), text);

        // [fade] and [/fade] for faded text.
        text = self.preg_replace("#\\[fade\](.*?)\\[\/fade\]#gm", "[fade:${uid}]\\1[/fade:${uid}]".f({ uid }), text);

        text = self.preg_replace("#\\[dyk\](.*?)\\[\/dyk\]#gm", "[dyk:${uid}]\\1[/dyk:${uid}]".f({ uid }), text);

        // [center] and [/center] for centered text.
        text = self.preg_replace("#\\[center\](.*?)\\[\/center\]#gm", "[center:${uid}]\\1[/center:${uid}]".f({ uid }), text);

        // [spoiler] and [/spoiler].
        text = self.preg_replace("#\\[spoiler\](.*?)\\[\/spoiler\]#gm", "[spoiler:${uid}]\\1[/spoiler:${uid}]".f({ uid }), text);
        // [spoiler=""] and [/spoiler].
        text = self.bbencode_first_pass_pda(text, uid, '/\\[spoiler="(.*?)"\\]/g', '[/spoiler]', '', false, '', "[spoiler:${uid}=\\\"\\1\\\"]".f({ uid }));
        // [spoiler=] and [/spoiler].
        text = self.bbencode_first_pass_pda(text, uid, '/\\[spoiler=(.*?)\\]/g', '[/spoiler]', '', false, '', "[spoiler:${uid}=\\\"\\1\\\"]".f({ uid }));

        //[wmplayer]url_here[/wmplayer] code.
        text = self.preg_replace("#\\[wmplayer\](([a-z]+?)://([^, \n\r]+))\\[\/wmplayer\]#gm", "[wmplayer:${uid}]\\1[/wmplayer:${uid}]".f({ uid }), text);

        // [hX] for adding titles
        text = self.preg_replace("#\\[h1\](.*?)\\[\/h1\]#gm", "[h1:${uid}]\\1[/h1:${uid}]".f({ uid }), text);
        text = self.preg_replace("#\\[h2\](.*?)\\[\/h2\]#gm", "[h2:${uid}]\\1[/h2:${uid}]".f({ uid }), text);
        text = self.preg_replace("#\\[h3\](.*?)\\[\/h3\]#gm", "[h3:${uid}]\\1[/h3:${uid}]".f({ uid }), text);
        text = self.preg_replace("#\\[h4\](.*?)\\[\/h4\]#gm", "[h4:${uid}]\\1[/h4:${uid}]".f({ uid }), text);
        text = self.preg_replace("#\\[h5\](.*?)\\[\/h5\]#gm", "[h5:${uid}]\\1[/h5:${uid}]".f({ uid }), text);
        text = self.preg_replace("#\\[h6\](.*?)\\[\/h6\]#gm", "[h6:${uid}]\\1[/h6:${uid}]".f({ uid }), text);

        // [table] and [/table] for making tables.
        // beginning code [table], along with attributes
        text = self.preg_replace("#\\[table\](.*?)\\[\/table\]#gm", "[table:${uid}]\\1[/table:${uid}]".f({ uid }), text);
        text = self.preg_replace("#\\[table color=(\#[0-9A-F]{6}|[a-z\-]+)\](.*?)\[\/table\]#gm", "[table color=\\1:${uid}]\\2[/table:${uid}]".f({ uid }), text);
        text = self.preg_replace("#\\[table fontsize=([1-2]?[0-9])\](.*?)\[\/table\]#gm", "[table fontsize=\\1:${uid}]\\2[/table:${uid}]".f({ uid }), text);
        text = self.preg_replace("#\\[table color=(\#[0-9A-F]{6}|[a-z\-]+) fontsize=([1-2]?[0-9])\](.*?)\[\/table\]#gm", "[table color=\\1 fontsize=\\2:${uid}]\\3[/table:${uid}]".f({ uid }), text);
        text = self.preg_replace("#\\[table fontsize=([1-2]?[0-9]) color=(\#[0-9A-F]{6}|[a-z\-]+)\](.*?)\[\/table\]#gm", "[table color=\\2 fontsize=\\1:${uid}]\\3[/table:${uid}]".f({ uid }), text);
        // mainrow tag [mrow], along with attributes
        text = self.preg_replace("#\\[mrow\](.*?)#gm", "[mrow:${uid}]\\1".f({ uid }), text);
        text = self.preg_replace("#\\[mrow color=(\#[0-9A-F]{6}|[a-z\-]+)\](.*?)#gm", "[mrow color=\\1:${uid}]\\2".f({ uid }), text);
        text = self.preg_replace("#\\[mrow fontsize=([1-2]?[0-9])\](.*?)#gm", "[mrow fontsize=\\1:${uid}]\\2".f({ uid }), text);
        text = self.preg_replace("#\\[mrow color=(\#[0-9A-F]{6}|[a-z\-]+) fontsize=([1-2]?[0-9])\](.*?)#gm", "[mrow color=\\1 fontsize=\\2:${uid}]\\3".f({ uid }), text);
        text = self.preg_replace("#\\[mrow fontsize=([1-2]?[0-9]) color=(\#[0-9A-F]{6}|[a-z\-]+)\](.*?)#gm", "[mrow color=\\2 fontsize=\\1:${uid}]\\3".f({ uid }), text);
        // maincol tag [mcol], along with attributes
        text = self.preg_replace("#\\[mcol\](.*?)#gm", "[mcol:${uid}]\\1".f({ uid }), text);
        text = self.preg_replace("#\\[mcol color=(\#[0-9A-F]{6}|[a-z\-]+)\](.*?)#gm", "[mcol color=\\1:${uid}]\\2".f({ uid }), text);
        text = self.preg_replace("#\\[mcol fontsize=([1-2]?[0-9])\](.*?)#gm", "[mcol fontsize=\\1:${uid}]\\2".f({ uid }), text);
        text = self.preg_replace("#\\[mcol color=(\#[0-9A-F]{6}|[a-z\-]+) fontsize=([1-2]?[0-9])\](.*?)#gm", "[mcol color=\\1 fontsize=\\2:${uid}]\\3".f({ uid }), text);
        text = self.preg_replace("#\\[mcol fontsize=([1-2]?[0-9]) color=(\#[0-9A-F]{6}|[a-z\-]+)\](.*?)#gm", "[mcol color=\\2 fontsize=\\1:${uid}]\\3".f({ uid }), text);
        // row tag [row], along with attributes
        text = self.preg_replace("#\\[row\](.*?)#gm", "[row:${uid}]\\1".f({ uid }), text);
        text = self.preg_replace("#\\[row color=(\#[0-9A-F]{6}|[a-z\-]+)\](.*?)#gm", "[row color=\\1:${uid}]\\2".f({ uid }), text);
        text = self.preg_replace("#\\[row fontsize=([1-2]?[0-9])\](.*?)#gm", "[row fontsize=\\1:${uid}]\\2".f({ uid }), text);
        text = self.preg_replace("#\\[row color=(\#[0-9A-F]{6}|[a-z\-]+) fontsize=([1-2]?[0-9])\](.*?)#gm", "[row color=\\1 fontsize=\\2:${uid}]\\3".f({ uid }), text);
        text = self.preg_replace("#\\[row fontsize=([1-2]?[0-9]) color=(\#[0-9A-F]{6}|[a-z\-]+)\](.*?)#gm", "[row color=\\2 fontsize=\\1:${uid}]\\3".f({ uid }), text);
        // column tag [col], along with attributes
        text = self.preg_replace("#\\[col\](.*?)#gm", "[col:${uid}]\\1".f({ uid }), text);
        text = self.preg_replace("#\\[col color=(\#[0-9A-F]{6}|[a-z\-]+)\](.*?)#gm", "[col color=\\1:${uid}]\\2".f({ uid }), text);
        text = self.preg_replace("#\\[col fontsize=([1-2]?[0-9])\](.*?)#gm", "[col fontsize=\\1:${uid}]\\2".f({ uid }), text);
        text = self.preg_replace("#\\[col color=(\#[0-9A-F]{6}|[a-z\-]+) fontsize=([1-2]?[0-9])\](.*?)#gm", "[col color=\\1 fontsize=\\2:${uid}]\\3".f({ uid }), text);
        text = self.preg_replace("#\\[col fontsize=([1-2]?[0-9]) color=(\#[0-9A-F]{6}|[a-z\-]+)\](.*?)#gm", "[col color=\\2 fontsize=\\1:${uid}]\\3".f({ uid }), text);

        // [sub] for subscript text
        text = self.preg_replace("#\\[sub\](.*?)\\[\/sub\]#gm", "[sub:${uid}]\\1[/sub:${uid}]".f({ uid }), text);

        // [sup] for superscript text
        text = self.preg_replace("#\\[sup\](.*?)\\[\/sup\]#gm", "[sup:${uid}]\\1[/sup:${uid}]".f({ uid }), text);

        // [reverse] for reverse text
        text = self.preg_replace("#\\[reverse\](.*?)\\[\/reverse\]#gm", "[reverse:${uid}]\\1[/reverse:${uid}]".f({ uid }), text);

        // [rainbow] for rainbow-highlighting text
        text = self.preg_replace("#\\[rainbow\](.*?)\\[\/rainbow\]#gm", "[rainbow:${uid}]\\1[/rainbow:${uid}]".f({ uid }), text);

        //
        // BEGIN Programmer's Code mod
        //

        // [crc] for getting checksums
        text = self.preg_replace("#\\[crc\](.*?)\\[\/crc\]#gm", "[crc:${uid}]\\1[/crc:${uid}]".f({ uid }), text);

        // [sha1] for secure hashing
        text = self.preg_replace("#\\[sha1\](.*?)\\[\/sha1\]#gm", "[sha1:${uid}]\\1[/sha1:${uid}]".f({ uid }), text);

        // [md5] for hashing
        text = self.preg_replace("#\\[md5\](.*?)\\[\/md5\]#gm", "[md5:${uid}]\\1[/md5:${uid}]".f({ uid }), text);

        // [base64enc] for encoding data
        text = self.preg_replace("#\\[base64enc\](.*?)\\[\/base64enc\]#gm", "[base64enc:${uid}]\\1[/base64enc:${uid}]".f({ uid }), text);

        // [base64dec] for decoding data
        text = self.preg_replace("#\\[base64dec\](.*?)\\[\/base64dec\]#gm", "[base64dec:${uid}]\\1[/base64dec:${uid}]".f({ uid }), text);

        // [bin2asc] for decoding 8-bit binary data
        text = self.preg_replace("#\\[bin2asc\](.*?)\\[\/bin2asc\]#gm", "[bin2asc:${uid}]\\1[/bin2asc:${uid}]".f({ uid }), text);

        // [hex2asc] for decoding hexadecimal data
        text = self.preg_replace("#\\[hex2asc\](.*?)\\[\/hex2asc\]#gm", "[hex2asc:${uid}]\\1[/hex2asc:${uid}]".f({ uid }), text);

        // [asc2bin] for encoding text into 8-bit binary data
        text = self.preg_replace("#\\[asc2bin\](.*?)\\[\/asc2bin\]#gm", "[asc2bin:${uid}]\\1[/asc2bin:${uid}]".f({ uid }), text);

        // [asc2hex] for encoding tect into hexadecimal data
        text = self.preg_replace("#\\[asc2hex\](.*?)\\[\/asc2hex\]#gm", "[asc2hex:${uid}]\\1[/asc2hex:${uid}]".f({ uid }), text);

        //
        // END Programmer's BBCode mod
        //

        // [u] and [/u] for underlining text.
        text = self.preg_replace("#\\[u\](.*?)\\[\/u\]#gm", "[u:${uid}]\\1[/u:${uid}]".f({ uid }), text);

        // [i] and [/i] for italicizing text.
        text = self.preg_replace("#\\[i\](.*?)\\[\/i\]#gm", "[i:${uid}]\\1[/i:${uid}]".f({ uid }), text);

        // [hr] for inserting a horizontal rule.
        text = self.preg_replace("#\\[hr\]#gm", "[hr:${uid}]".f({ uid }), text);

        text = self.preg_replace("#\\[myPost\]#gm", "[myPost:${uid}]".f({ uid }), text);

        // [br] for breaklines.
        text = self.preg_replace("#\\[br\]#gm", "[br:${uid}]".f({ uid }), text);

        // [img]image_url_here[/img] code..
        text = self.preg_replace("#\\[img\]((http|ftp|https|ftps)://)([^ \?&=\#\"\n\r\t<]*?(\.(jpg|jpeg|gif|png)))\\[\/img\]#gm", "[img:${uid}]\\1".f({ uid }) + self.str_replace(' ', '%20', '\\3') + "[/img:${uid}]".f({ uid }), text);
        // [img=WDimxHDim]image_url_here[/img] code..
        text = self.preg_replace("#\\[img=(\\d+)x(\\d+)\]((http|ftp|https|ftps)://)([^ \?&=\#\"\n\r\t<]*?(\.(jpg|jpeg|gif|png)))\\[\/img\]#gm", "[img:${uid}=\\1x\\2]\\3".f({ uid }) + self.str_replace(' ', '%20', '\\5') + "[/img:${uid}]".f({ uid }), text);
        // [img=WDim]image_url_here[/img] code..
        text = self.preg_replace("#\\[img=(\\d+)\]((http|ftp|https|ftps)://)([^ \?&=\#\"\n\r\t<]*?(\.(jpg|jpeg|gif|png)))\\[\/img\]#gm", "[img:${uid}=\\1]\\2".f({ uid }) + self.str_replace(' ', '%20', '\\4') + "[/img:${uid}]".f({ uid }), text);

        text = self.addbbencode_first_pass(text, uid);

        // Remove our padding from the string..
        return self.substr(text, 1);

    },

    bbencode_first_pass_pda: function(text, uid, open_tag, close_tag, close_tag_new, mark_lowest_level, func, open_regexp_replace) {

        /**
         * $text - The text to operate on.
         * $uid - The UID to add to matching tags.
         * $open_tag - The opening tag to match. Can be an array of opening tags.
         * $close_tag - The closing tag to match.
         * $close_tag_new - The closing tag to replace with.
         * $mark_lowest_level - boolean - should we specially mark the tags that occur
         * 					at the lowest level of nesting? (useful for [code], because
         *						we need to match these tags first and transform HTML tags
        *						in their contents..
        * $func - This variable should contain a string that is the name of a function.
        *				That function will be called when a match is found, and passed 2
        *				parameters: ($text, $uid). The function should return a string.
        *				This is used when some transformation needs to be applied to the
        *				text INSIDE a pair of matching tags. If this variable is FALSE or the
        *				empty string, it will not be executed.
        * If open_tag is an array, then the pda will try to match pairs consisting of
        * any element of open_tag followed by close_tag. This allows us to match things
        * like [list=A]...[/list] and [list=1]...[/list] in one pass of the PDA.
        *
        * NOTES:	- this function assumes the first character of $text is a space.
        *			- every opening tag and closing tag must be of the [...] format.
        */

        var q = -1,
            self = this,
            findlang1 = '',
            findlang2 = '';

        open_tag_count = 0;
        match = [];
        if (typeof open_regexp_replace === 'undefined') { open_regexp_replace = false; }

        if (!close_tag_new || (close_tag_new == '')) { close_tag_new = close_tag; }

        close_tag_length = this.strlen(close_tag);
        close_tag_new_length = this.strlen(close_tag_new);
        uid_length = this.strlen(uid);
        if (func !== '') { func = new Function(' var args = Array.prototype.slice.call(arguments); return {0}.apply({0}, args);'.f('jsHBBcode.' + func)); };
        use_function_pointer = (func && func != '') && (Object.prototype.toString.call(func) == '[object Function]');
        stack = new Array();
        after_end_tag = '';

        if (this.is_array(open_tag)) {
            if (0 == this.count(open_tag)) {
                // No opening tags to match, so return.
                return text;
            }

            open_tag_count = this.count(open_tag);
        } else {
            // only one opening tag. make it into a 1-element array.
            open_tag_temp = open_tag;
            open_tag = new Array();
            open_tag[0] = open_tag_temp;
            open_tag_count = 1;
        }

        open_is_regexp = false;
        if (open_regexp_replace === true || (open_regexp_replace !== '' && open_regexp_replace !== false)) {
            open_is_regexp = true;
            if (!this.is_array(open_regexp_replace)) {
                open_regexp_temp = open_regexp_replace;
                open_regexp_replace = new Array();
                open_regexp_replace[0] = open_regexp_temp;
            }

        }

        if (mark_lowest_level && open_is_regexp) { return text; }

        // Start at the 2nd char of the string, looking for opening tags.
        curr_pos = 1;
        while (curr_pos && (curr_pos < this.strlen(text))) {
            curr_pos = this.strpos(text, "[", curr_pos);

            // If not found, $curr_pos will be 0, and the loop will end.
            if (curr_pos) {
                // We found a [. It starts at $curr_pos.
                // check if it's a starting or ending tag.
                found_start = false;
                which_start_tag = "";
                start_tag_index = -1;
                for (i = 0; i < open_tag_count; i += 1) {
                    // Grab everything until the first "]"...
                    possible_start = this.substr(text, curr_pos, this.strpos(text, ']', curr_pos + 1) - curr_pos + 1);

                    //
                    // We're going to try and catch usernames with "[' characters.
                    //
                    if ((this.preg_match('#\\[quote="#g', possible_start, 'match') && !this.preg_match('/\\[quote="(.*?)"\\]/g', possible_start)) ||
                        (this.preg_match('#\\[title="#g', possible_start, 'match') && !this.preg_match('/\\[title="(.*?)"\\]/g', possible_start)) ||
                        (this.preg_match('#\\[mod="#g', possible_start, 'match') && !this.preg_match('/\\[mod="(.*?)"\\]/g', possible_start)) ||
                        (this.preg_match('#\\[tip="#g', possible_start, 'match') && !this.preg_match('/\\[tip="(.*?)"\\]/gg', possible_start))
                    ) {
                        // OK we are in a quote tag that probably contains a ] bracket.
                        // Grab a bit more of the string to hopefully get all of it..
                        if (close_pos = this.strpos(text, '"]', curr_pos + 9)) {
                            var pos = this.substr(text, curr_pos + 9, close_pos - (curr_pos + 9));

                            if ((this.strpos(pos, '[quote') === false) &&
                                (this.strpos(pos, '[title') === false) &&
                                (this.strpos(pos, '[mod') === false) &&
                                (this.strpos(pos, '[tip') === false)
                            ) {
                                possible_start = this.substr(text, curr_pos, close_pos - curr_pos + 2);
                            }

                        }

                    }

                    // Now compare, either using regexp or not.
                    if (open_is_regexp) {
                        match_result = new Array();
                        if (this.preg_match(open_tag[i], possible_start, 'match_result')) {
                            found_start = true;
                            which_start_tag = match_result[0];
                            start_tag_index = i;
                            break;
                        }

                    } else {
                        // straightforward string comparison.
                        if (0 == this.strcasecmp(open_tag[i], possible_start)) {
                            found_start = true;
                            which_start_tag = open_tag[i];
                            start_tag_index = i;
                            break;
                        }

                    }

                }

                if (found_start) {
                    // We have an opening tag.
                    // Push its position, the text we matched, and its index in the open_tag array on to the stack, and then keep going to the right.
                    match = {
                        pos: curr_pos,
                        tag: which_start_tag,
                        index: start_tag_index
                    };

                    this.array_push(stack, match);
                    //
                    // Rather than just increment $curr_pos
                    // Set it to the ending of the tag we just found
                    // Keeps error in nested tag from breaking out
                    // of table structure..
                    //
                    curr_pos += this.strlen(possible_start);
                } else {
                    // check for a closing tag..
                    possible_end = this.substr(text, curr_pos, close_tag_length);
                    if (0 == this.strcasecmp(close_tag, possible_end)) {
                        // We have an ending tag.
                        // Check if we've already found a matching starting tag.
                        if (this.sizeof(stack) > 0) {
                            // There exists a starting tag.
                            curr_nesting_depth = this.sizeof(stack);
                            // We need to do 2 replacements now.
                            match = this.array_pop(stack);
                            start_index = match['pos'];
                            start_tag = match['tag'];
                            start_length = (open_is_regexp === true) ? this.strlen(start_tag[0]) : this.strlen(start_tag);
                            start_tag_index = match['index'];

                            if (open_is_regexp === true) { start_tag = this.preg_replace(open_tag[start_tag_index], open_regexp_replace[start_tag_index], start_tag); }

                            // everything before the opening tag.
                            before_start_tag = this.substr(text, 0, start_index);

                            // everything after the opening tag, but before the closing tag.
                            between_tags = this.substr(text, start_index + start_length, curr_pos - start_index - start_length);

                            // Run the given function on the text between the tags.
                            if (use_function_pointer === true) {
                                if (open_tag[0] === '[code]') {
                                    var pLang = 'plaintext';

                                    findlang1 = between_tags.indexOf('~');
                                    findlang2 = between_tags.indexOf('~', findlang1 + 1);

                                    if (findlang1 > -1 && findlang2 > -1) {
                                        pLang = between_tags.substring(findlang1 + 1, findlang1 + findlang2);
                                        mLang.push(pLang);
                                    }
                                }

                                between_tags = func(between_tags, uid, self, start_tag);
                            }

                            // everything after the closing tag.
                            after_end_tag = this.substr(text, curr_pos + close_tag_length);

                            // Mark the lowest nesting level if needed.
                            if (mark_lowest_level === true && curr_nesting_depth === 1) {
                                if (open_tag[0] === '[code]') {
                                    code_entities_match = ['#<#', '#>#', '#"#', '#:#', '#\[#', '#\]#', '#\(#', '#\)#', '#\{#', '#\}#'];
                                    code_entities_replace = ['&lt;', '&gt;', '&quot;', '&#58;', '&#91;', '&#93;', '&#40;', '&#41;', '&#123;', '&#125;'];
                                    for (var iCode = 0; iCode < code_entities_match.length; iCode += 1) {
                                        between_tags = this.preg_replace(code_entities_match[iCode], code_entities_replace[iCode], between_tags);
                                    }

                                }

                                text = before_start_tag + this.substr(start_tag, 0, start_length - 1) + ":${curr_nesting_depth}:${uid}]".f({ curr_nesting_depth, uid });
                                text += between_tags + this.substr(close_tag_new, 0, close_tag_new_length - 1) + ":${curr_nesting_depth}:${uid}]".f({ curr_nesting_depth, uid });
                            } else {
                                if (open_tag[0] === '[code]') {
                                    text = before_start_tag + '&#91;code&#93;';
                                    text += between_tags + '&#91;/code&#93;';
                                } else {
                                    if (open_is_regexp === true) {
                                        start_tag = start_tag[0];
                                        q = this.strpos(start_tag, '=');

                                        text = before_start_tag + this.substr(start_tag, 0, q) + ":${uid}".f({ uid }) + this.substr(start_tag, q);
                                    } else {
                                        text = before_start_tag + this.substr(start_tag, 0, start_length - 1) + ":${uid}]".f({ uid });
                                    }

                                    text += between_tags + this.substr(close_tag_new, 0, close_tag_new_length - 1) + ":${uid}]".f({ uid });
                                }

                            }

                            text += (after_end_tag === false) ? '' : after_end_tag;

                            // Now.. we've screwed up the indices by changing the length of the string.
                            // So, if there's anything in the stack, we want to resume searching just after it.
                            // otherwise, we go back to the start.
                            if (this.sizeof(stack) > 0) {
                                match = this.array_pop(stack);
                                curr_pos = match['pos'];
                            } else {
                                curr_pos = 1;
                            }

                        } else {
                            // No matching start tag found. Increment pos, keep going.
                            ++curr_pos;
                        }

                    } else {
                        // No starting tag or ending tag.. Increment pos, keep looping.,
                        ++curr_pos;
                    }

                }

            }

        } // while

        return text;

    },

    bbencode_second_pass: function(text, uid, logged, poster_posts) {

        /**
         * Does second-pass bbencoding. This should be used before displaying the message in
         * a thread. Assumes the message is already first-pass encoded, and we are given the
         * correct UID as used in first-pass encoding.
         */

        text = this.preg_replace('#(script|about|applet|activex|chrome):#is', "\\1&#058;", text);

        // pad it with a space so we can distinguish between FALSE and matching the 1st char (index 0).
        // This is important; bbencode_quote(), bbencode_list(), and bbencode_code() all depend on it.
        text = ' ' + text;

        // First: If there isn't a "[" and a "]" in the message, don't bother.
        if (! (this.strpos(text, "[") && this.strpos(text, "]")) ) {
            // Remove padding, return.
            text = this.substr(text, 1);
            return text;
        }

        // Only load the templates ONCE..
        if (BBCODE_TPL_READY === false) {
            // load templates from file into array.
            bbcode_tpl = this.load_bbcode_template(tplFile);

            // prepare array for use in regexps.
            bbcode_tpl = this.prepare_bbcode_template(bbcode_tpl);
        }

        // [CODE] and [/CODE] for posting code (HTML, PHP, C etc etc) in your posts.
        text = this.bbencode_second_pass_code(text, uid, bbcode_tpl);

        lQuoteB = 1;
        lQuoteC = 1;
        lQuoteB1 = 1;
        lQuoteC1 = 1;
        lQuoteB2 = 1;
        lQuoteC2 = 1;

        posicion = this.strpos(text, "[quote:${uid}".f({ uid }));
        if (posicion === false) { lQuoteB = 0; }

        posicion = this.strpos(text, "[/quote:${uid}]".f({ uid }));
        if (posicion === false) { $lQuoteC = 0; }

        posicion = this.strpos(text, "[spoiler:${uid}]".f({ uid }));
        if (posicion === false) { lQuoteB1 = 0; }

        posicion = this.strpos(text, "[/spoiler:${uid}]".f({ uid }));
        if (posicion === false) { lQuoteC1 = 0; }

        posicion = this.strpos(text, "[title:${uid}]".f({ uid }));
        if (posicion === false) { lQuoteB1 = 0; }

        posicion = this.strpos(text, "[/title:${uid}]".f({ uid }));
        if (posicion === false) { lQuoteC1 = 0; }

        // [tip] and [/tip]
        text = this.str_replace("[tip:${uid}]".f({ uid }), bbcode_tpl['tip_open'], text);
        text = this.str_replace("[/tip:${uid}]".f({ uid }), bbcode_tpl['tip_close'], text);

        text = this.preg_replace('/\\[tip:${uid}="(.*?)"\]/gm'.f({ uid }), bbcode_tpl['tip_open'], text);
        text = this.preg_replace('/\\[tip:${uid}=(.*?)\]/gm'.f({ uid }), bbcode_tpl['tip_open'], text);

        // [warn] and [/warn] for Warning text.
        text = this.preg_replace('/\\[warn:${uid}="(.*?)"\]/gm'.f({ uid }), bbcode_tpl['warn_open'], text);
        text = this.preg_replace('/\\[warn:${uid}=(.*?)\]/gm'.f({ uid }), bbcode_tpl['warn_open'], text);
        text = this.str_replace("[/warn:${uid}]".f({ uid }), bbcode_tpl['warn_close'], text);

        // [info] and [/info] for Info text.
        text = this.preg_replace('/\\[info:${uid}="(.*?)"\]/gm'.f({ uid }), bbcode_tpl['info_open'], text);
        text = this.preg_replace('/\\[info:${uid}=(.*?)\]/gm'.f({ uid }), bbcode_tpl['info_open'], text);
        text = this.str_replace("[/info:${uid}]".f({ uid }), bbcode_tpl['info_close'], text);

        // [success] and [/success] for Success text.
        text = this.preg_replace('/\\[success:${uid}="(.*?)"\]/gm'.f({ uid }), bbcode_tpl['success_open'], text);
        text = this.preg_replace('/\\[success:${uid}=(.*?)\]/gm'.f({ uid }), bbcode_tpl['success_open'], text);
        text = this.str_replace("[/success:${uid}]".f({ uid }), bbcode_tpl['success_close'], text);

        // [error] and [/error] for Error text.
        text = this.preg_replace('/\\[error:${uid}="(.*?)"\]/gm'.f({ uid }), bbcode_tpl['error_open'], text);
        text = this.preg_replace('/\\[error:${uid}=(.*?)\]/gm'.f({ uid }), bbcode_tpl['error_open'], text);
        text = this.str_replace("[/error:${uid}]".f({ uid }), bbcode_tpl['error_close'], text);

        // [chat] and [/chat].
        text = this.str_replace("[chat:${uid}]".f({ uid }), bbcode_tpl['chat_open'], text);
        text = this.str_replace("[/chat:${uid}]".f({ uid }), bbcode_tpl['chat_close'], text);

        // [chatdate] and [/chatdate].
        text = this.str_replace("[chatdate:${uid}]".f({ uid }), bbcode_tpl['chatedate_open'], text);
        text = this.str_replace("[/chatdate:${uid}]".f({ uid }), bbcode_tpl['chatedate_close'], text);

        // [chattext] and [/chattext].
        text = this.str_replace("[chattext:${uid}]".f({ uid }), bbcode_tpl['chattext_open'], text);
        text = this.str_replace("[/chattext:${uid}]".f({ uid }), bbcode_tpl['chattext_close'], text);

        // [QUOTE] and [/QUOTE] for posting replies with quote, or just for quoting stuff.
        text = this.str_replace("[quote:${uid}]".f({ uid }), bbcode_tpl['quote_open'], text);
        text = this.str_replace("[/quote:${uid}]".f({ uid }), bbcode_tpl['quote_close'], text);

        // New one liner to deal with opening quotes with usernames...
        // replaces the two line version that I had here before..
        text = this.preg_replace('/\\[quote:${uid}="(.*?)"\]/gm'.f({ uid }), bbcode_tpl['quote_username_open'], text);
        text = this.preg_replace('/\\[quote:${uid}=(.*?)\]/gm'.f({ uid }), bbcode_tpl['quote_username_open'], text);

        // [DYK] and [/DYK] for posting "Did You Know..." facts (by John Zwaan).
        text = this.str_replace("[dyk:${uid}]".f({ uid }), bbcode_tpl['dyk_open'], text);
        text = this.str_replace("[/dyk:${uid}]".f({ uid }), bbcode_tpl['dyk_close'], text);

        // BEGIN List Tags

        // [list] and [list=x] for (un)ordered lists.
        // unordered lists
        text = this.str_replace("[list:${uid}]".f({ uid }), bbcode_tpl['ulist_open'], text);
        // li tags
        text = this.str_replace("[*:${uid}]".f({ uid }), bbcode_tpl['listitem'], text);
        // ending tags
        text = this.str_replace("[/list:u:${uid}]".f({ uid }), bbcode_tpl['ulist_close'], text);
        text = this.str_replace("[/list:o:${uid}]".f({ uid }), bbcode_tpl['olist_close'], text);
        // Ordered lists
        text = this.preg_replace('/\\[list=([a1]):${uid}\\]/gm'.f({ uid }), bbcode_tpl['olist_open'], text);

        // END List Tags

        // BEGIN Moderator Tags
        // [mod] Moderator code [/mod]
        text = this.str_replace("[mod:${uid}]".f({ uid }), bbcode_tpl['mod_open'], text);
        text = this.str_replace("[/mod:${uid}]".f({ uid }), bbcode_tpl['mod_close'], text);
        text = this.preg_replace('/\\[mod:${uid}="(.*?)"\]/gm'.f({ uid }), bbcode_tpl['mod_username_open'], text);
        text = this.preg_replace('/\\[mod:${uid}=(.*?)\]/gm'.f({ uid }), bbcode_tpl['mod_username_open'], text);
        // END Moderator Tags

        // colours
        text = this.preg_replace("/\\[color=(\\#[0-9A-F-a-f]{6}|[a-z]+):${uid}\\]/gm".f({ uid }), bbcode_tpl['color_open'], text);
        text = this.str_replace("[/color:${uid}]".f({ uid }), bbcode_tpl['color_close'], text);

        // size
        text = this.preg_replace("/\\[size=([1-9]?[0-9]):${uid}\\]/gm".f({ uid }), bbcode_tpl['size_open'], text);
        text = this.str_replace("[/size:${uid}]".f({ uid }), bbcode_tpl['size_close'], text);

        // [scroll] and [/scroll] for scrolling text.
        text = this.str_replace("[scroll:${uid}]".f({ uid }), bbcode_tpl['scroll_open'], text);
        text = this.str_replace("[/scroll:${uid}]".f({ uid }), bbcode_tpl['scroll_close'], text);

        // [fade] and [/fade] for faded text.
        text = this.str_replace("[fade:${uid}]".f({ uid }), bbcode_tpl['fade_open'], text);
        text = this.str_replace("[/fade:${uid}]".f({ uid }), bbcode_tpl['fade_close'], text);

        // [center] and [/center] for centered text.
        text = this.str_replace("[center:${uid}]".f({ uid }), bbcode_tpl['center_open'], text);
        text = this.str_replace("[/center:${uid}]".f({ uid }), bbcode_tpl['center_close'], text);

        // [hX] for adding headers
        text = this.str_replace("[h1:${uid}]".f({ uid }), '<span class="bbHRule bbH1" style="font-size: 24px; font-weight: bold;">', text);
        text = this.str_replace("[h2:${uid}]".f({ uid }), '<span class="bbHRule bbH2" style="font-size: 22px; font-weight: bold;">', text);
        text = this.str_replace("[h3:${uid}]".f({ uid }), '<span class="bbHRule bbH3" style="font-size: 20px; font-weight: bold;">', text);
        text = this.str_replace("[h4:${uid}]".f({ uid }), '<span class="bbHRule bbH4" style="font-size: 18px; font-weight: bold;">', text);
        text = this.str_replace("[h5:${uid}]".f({ uid }), '<span class="bbHRule bbH5" style="font-size: 16px; font-weight: bold;">', text);
        text = this.str_replace("[h6:${uid}]".f({ uid }), '<span class="bbHRule bbH6" style="font-size: 14px; font-weight: bold;">', text);
        text = this.preg_replace("#\\[/h[1-6]:${uid}\\]#g".f({ uid }), '</span>', text);

        // [table] and [/table] for making tables.
        // beginning code [table], along with attributes
        text = this.str_replace("[table:${uid}]".f({ uid }), bbcode_tpl['table_open'], text);
        text = this.preg_replace("/\\[table color=(\#[0-9A-F]{6}|[a-z]+):${uid}\]/gm".f({ uid }), bbcode_tpl['table_color'], text);
        text = this.preg_replace("/\\[table fontsize=([1-2]?[0-9]):${uid}\]/gm".f({ uid }), bbcode_tpl['table_size'], text);
        text = this.preg_replace("/\\[table color=(\#[0-9A-F]{6}|[a-z]+) fontsize=([1-2]?[0-9]):${uid}\]/gm".f({ uid }), bbcode_tpl['table_cs1'], text);

        // mainrow tag [mrow], along with attributes
        text = this.str_replace("[mrow:${uid}]".f({ uid }), bbcode_tpl['table_mainrow'], text);
        text = this.preg_replace("/\\[mrow color=(\#[0-9A-F]{6}|[a-z]+):${uid}\]/gm".f({ uid }), bbcode_tpl['table_mainrow_color'], text);
        text = this.preg_replace("/\\[mrow fontsize=([1-2]?[0-9]):${uid}\]/gm".f({ uid }), bbcode_tpl['table_mainrow_size'], text);
        text = this.preg_replace("/\\[mrow color=(\#[0-9A-F]{6}|[a-z]+) fontsize=([1-2]?[0-9]):${uid}\]/gm".f({ uid }), bbcode_tpl['table_mainrow_cs1'], text);

        // maincol tag [mcol], along with attributes
        text = this.str_replace("[mcol:${uid}]".f({ uid }), bbcode_tpl['table_maincol'], text);
        text = this.preg_replace("/\\[mcol color=(\#[0-9A-F]{6}|[a-z]+):${uid}\]/gm".f({ uid }), bbcode_tpl['table_maincol_color'], text);
        text = this.preg_replace("/\\[mcol fontsize=([1-2]?[0-9]):${uid}\]/gm".f({ uid }), bbcode_tpl['table_maincol_size'], text);
        text = this.preg_replace("/\\[mcol color=(\#[0-9A-F]{6}|[a-z]+) fontsize=([1-2]?[0-9]):${uid}\]/gm".f({ uid }), bbcode_tpl['table_maincol_cs1'], text);

        // row tag [row], along with attributes
        text = this.str_replace("[row:${uid}]".f({ uid }), bbcode_tpl['table_row'], text);
        text = this.preg_replace("/\\[row color=(\#[0-9A-F]{6}|[a-z]+):${uid}\]/gm".f({ uid }), bbcode_tpl['table_row_color'], text);
        text = this.preg_replace("/\\[row fontsize=([1-2]?[0-9]):${uid}\]/gm".f({ uid }), bbcode_tpl['table_row_size'], text);
        text = this.preg_replace("/\\[row color=(\#[0-9A-F]{6}|[a-z]+) fontsize=([1-2]?[0-9]):${uid}\]/gm".f({ uid }), bbcode_tpl['table_row_cs1'], text);

        // column tag [col], along with attributes
        text = this.str_replace("[col:${uid}]".f({ uid }), bbcode_tpl['table_col'], text);
        text = this.preg_replace("/\\[col color=(\#[0-9A-F]{6}|[a-z]+):${uid}\]/gm".f({ uid }), bbcode_tpl['table_col_color'], text);
        text = this.preg_replace("/\\[col fontsize=([1-2]?[0-9]):${uid}\]/gm".f({ uid }), bbcode_tpl['table_col_size'], text);
        text = this.preg_replace("/\\[col color=(\#[0-9A-F]{6}|[a-z]+) fontsize=([1-2]?[0-9]):${uid}\]/gm".f({ uid }), bbcode_tpl['table_col_cs1'], text);

        // ending tag [/table]
        text = this.str_replace("[/table:${uid}]".f({ uid }), bbcode_tpl['table_close'], text);

        // [sub] for subscript text
        text = this.str_replace("[sub:${uid}]".f({ uid }), '<sub>', text);
        text = this.str_replace("[/sub:${uid}]".f({ uid }), '</sub>', text);

        // [sup] for superscript text
        text = this.str_replace("[sup:${uid}]".f({ uid }), '<sup>', text);
        text = this.str_replace("[/sup:${uid}]".f({ uid }), '</sup>', text);

        //www.nguontrithuc.com
        bbcode_tpl['wmplayer'] = this.str_replace('{URL}', '\\1', bbcode_tpl['wmplayer']);

        //
        // BEGIN Programmers jsHBBcode mod
        //

        // [asc2hex] for asc to hexadecimal text
        text = this.preg_replace("#\\[asc2hex:${uid}\](.*?)\\[\/asc2hex:${uid}\]#gm".f({ uid }), "return jsHBBcode.asc2hex('\\1');", text, -1, true);

        // [asc2bin] for asc to binary text
        text = this.preg_replace("#\\[asc2bin:${uid}\](.*?)\\[\/asc2bin:${uid}\]#gm".f({ uid }), "return jsHBBcode.asc2bin('\\1');", text, -1, true);

        // [hex2asc] for hexadecimal text to asc
        text = this.preg_replace("#\\[hex2asc:${uid}\](.*?)\\[\/hex2asc:${uid}\]#gm".f({ uid }), "return jsHBBcode.hex2asc('\\1');", text, -1, true);

        // [bin2asc] for binary text to asc
        text = this.preg_replace("#\\[bin2asc:${uid}\](.*?)\\[\/bin2asc:${uid}\]#gm".f({ uid }), "return jsHBBcode.bin2asc('\\1');", text, -1, true);

        // [base64enc] for base64 encoding
        text = this.preg_replace("#\\[base64enc:${uid}\](.*?)\\[\/base64enc:${uid}\]#gm".f({ uid }), "return jsHBBcode.base64_encode('\\1');", text, -1, true);

        // [base64dec] for base64 decoding
        text = this.preg_replace("#\\[base64dec:${uid}\](.*?)\\[\/base64dec:${uid}\]#gm".f({ uid }), "return jsHBBcode.base64_decode('\\1');", text, -1, true);

        // [sha1] for hashing text
        text = this.preg_replace("#\\[sha1:${uid}\](.*?)\\[\/sha1:${uid}\]#gm".f({ uid }), "return jsHBBcode.sha1('\\1');", text, -1, true);

        // [crc] for getting a checksum
        text = this.preg_replace("#\\[crc:${uid}\](.*?)\\[\/crc:${uid}\]#gm".f({ uid }), "return jsHBBcode.crc32('\\1');", text, -1, true);

        // [md5] for hashing
        text = this.preg_replace("#\\[md5:${uid}\](.*?)\\[\/md5:${uid}\]#gm".f({ uid }), "return jsHBBcode.md5('\\1');", text, -1, true);

        //
        // END Programmers jsHBBcode mod
        //

        // [pre] and [/pre] for Preformatted text.
        text = this.str_replace("[pre:${uid}]".f({ uid }), bbcode_tpl['pre_open'], text);
        text = this.str_replace("[/pre:${uid}]".f({ uid }), bbcode_tpl['pre_close'], text);

        // [b] and [/b] for bolding text.
        text = this.str_replace("[b:${uid}]".f({ uid }), bbcode_tpl['b_open'], text);
        text = this.str_replace("[/b:${uid}]".f({ uid }), bbcode_tpl['b_close'], text);

        // [s] and [/s] for Strikethrough text.
        text = this.str_replace("[s:${uid}]".f({ uid }), bbcode_tpl['s_open'], text);
        text = this.str_replace("[/s:${uid}]".f({ uid }), bbcode_tpl['s_close'], text);

        // [u] and [/u] for underlining text.
        text = this.str_replace("[u:${uid}]".f({ uid }), bbcode_tpl['u_open'], text);
        text = this.str_replace("[/u:${uid}]".f({ uid }), bbcode_tpl['u_close'], text);

        // [i] and [/i] for italicizing text.
        text = this.str_replace("[i:${uid}]".f({ uid }), bbcode_tpl['i_open'], text);
        text = this.str_replace("[/i:${uid}]".f({ uid }), bbcode_tpl['i_close'], text);

        // [hr] for inserting a horizontal rule.
        text = this.str_replace("[hr:${uid}]".f({ uid }), bbcode_tpl['hr'], text);

        // [br] for breaklines.
        text = this.str_replace("[br:${uid}]".f({ uid }), '<br>', text);

        text = this.str_replace("[myPost:${uid}]".f({ uid }), poster_posts, text);

        // Patterns and replacements for URL and email tags..
        patterns = new Array();
        replacements = new Array();

        // [img]image_url_here[/img] code..
        // This one gets first-passed..
        patterns.push("#\\[img:${uid}\\]([^?](?:[^\\[]+|\\[(?!url))*?)\\[\\/img:${uid}\\]#gm".f({ uid }));
        replacements.push(bbcode_tpl['img']);
        // [img=WDimxHDim]image_url_here[/img] code..
        patterns.push("#\\[img:${uid}=(\\d+)x(\\d+)\\]([^?](?:[^\\[]+|\\[(?!url))*?)\\[\\/img:${uid}\\]#gm".f({ uid }));
        replacements.push(bbcode_tpl['img_wh']);
        // [img=WDim]image_url_here[/img] code..
        patterns.push("#\\[img:${uid}=(\\d+)\\]([^?](?:[^\\[]+|\\[(?!url))*?)\\[\\/img:${uid}\\]#gm".f({ uid }));
        replacements.push(bbcode_tpl['img_w']);

        // [ytube]youtube_id_here[/ytube] code..
        patterns.push("#\\[ytube\\](.*?)\\[\\/ytube\\]#gm");
        replacements.push(bbcode_tpl['ytube']);

        // [page]url[/page] code..
        patterns.push("#\\[page\\]([\\w]+?:\\/\\/([\\w\\#$%&~/.\\-;:=,?@\\]+]+|\\[(?!url=))*?)\\[\\/page\\]#gm");
        replacements.push(bbcode_tpl['page']);

        // [page]url[/page] code.. (no xxxx:// prefix).
        patterns.push("#\\[page\\]((www|ftp)\\.([\\w\\#$%&~/.\\-;:=,?@\\]+]+|\\[(?!url=))*?)\\[\\/page\\]#gm");
        replacements.push(bbcode_tpl['page']);

        // matches a [url]xxxx://www.phpbb.com[/url] code..
        patterns.push("#\\[url\\]([\\w]+?:\\/\\/([\\w\\#$%&~\\/.\\-;:=,?@\\]+]+|\\[(?!url=))*?)\\[\\/url\\]#gm");
        replacements.push(bbcode_tpl['url1']);

        // [url]www.phpbb.com[/url] code.. (no xxxx:// prefix).
        patterns.push("#\\[url\\]((www|ftp)\\.([\\w\\#$%&~/.\\-;:=,?@\\]+]+|\\[(?!url=))*?)\\[\\/url\\]#gm");
        replacements.push(bbcode_tpl['url2']);

        // [url=xxxx://www.phpbb.com]phpBB[/url] code..
        patterns.push("#\\[url=([\\w]+?:\\/\\/[\\w\\#$%&~\\/.\\-;:=,?@\\[\\]+]*?)\\]([^?\\n\\r\\t].*?)\\[\\/url\\]#gm");
        replacements.push(bbcode_tpl['url3']);

        // [url=www.phpbb.com]phpBB[/url] code.. (no xxxx:// prefix).
        patterns.push("#\\[url=((www|ftp)\\.[\\w\\#$%&~\\/.\\-;:=,?@\\[\\]+]*?)\\]([^?\\n\\r\\t].*?)\\[\\/url\\]#gm");
        replacements.push(bbcode_tpl['url4']);

        // [email]user@domain.tld[/email] code..
        patterns.push("#\\[email\\]([a-z0-9&\\-_.]+?@[\\w\\-]+\\.([\\w\\-\\.]+\\.)?[\\w]+)\\[\\/email\\]#gm");
        replacements.push(bbcode_tpl['email']);

        // [wiki=search]label[/wiki] code..
        text = this.preg_replace('/\\[wiki:${uid}=(.*?)\\]/gm'.f({ uid }), bbcode_tpl['wiki_open'], text);
        text = this.str_replace("[/wiki:${uid}]".f({ uid }), bbcode_tpl['wiki_close'], text);

        // [wmplayer][/wmplayer] for video/audio.
        patterns.push("#\\[wmplayer:${uid}\\](.*?)\\[\\/wmplayer:${uid}\\]#gm".f({ uid }));
        replacements.push(bbcode_tpl['wmplayer']);

        // [spoiler][/spoiler] or [title][/title].
        if (logged === false) {
            patterns.push("#\\[spoiler:${uid\}\\](.*?)\\[\\/spoiler:${uid}\\]#gm".f({ uid }));
            replacements.push("[spoiler:${uid}]".f({ uid }) + lang['UserOnlineOK'] + "[/spoiler:${uid}]".f({ uid }));
            patterns.push("#\\[title:${uid\}\\](.*?)\\[\\/title:${uid}\\]#gm".f({ uid }));
            replacements.push("[title:${uid}]".f({ uid }) + lang['UserOnlineOK'] + "[/title:${uid}]".f({ uid }));
        }

        // [reverse][/reverse] for reversing text
        text = this.preg_replace("#\\[reverse:${uid}\](.*?)\\[\/reverse:${uid}\]#gm".f({ uid }), "return jsHBBcode.reverse('\\1');", text, -1, true);

        // [rainbow][/rainbow] for rainbow-highlighting text
        text = this.preg_replace("#\\[rainbow:${uid}\\](.*?)\\[\\/rainbow:${uid}\\]#gm".f({ uid }), "return jsHBBcode.rainbow('\\1');", text, -1, true);

        for (var p = 0; p < patterns.length; p += 1) {
            text = this.preg_replace(patterns[p], replacements[p], text);
        }

        // Remove our padding from the string..
        text = this.substr(text, 1);

        text = this.str_replace("[spoiler:${uid}]".f({ uid }), bbcode_tpl['spoiler_open'], text);
        text = this.preg_replace('/\\[spoiler:${uid}="(.*?)"\]/gm'.f({ uid }), bbcode_tpl['spoiler_username_open'], text);
        text = this.preg_replace('/\\[spoiler:${uid}=(.*?)\]/gm'.f({ uid }), bbcode_tpl['spoiler_username_open'], text);
        text = this.str_replace("[/spoiler:${uid}]".f({ uid }), bbcode_tpl['spoiler_close'], text);

        // [TITLE] and [/TITLE] for entering a custom title for quote-like boxes
        text = this.str_replace("[title:${uid}]".f({ uid }), bbcode_tpl['free_txt_open'], text);
        text = this.str_replace("[/title:${uid}]".f({ uid }), bbcode_tpl['free_txt_close'], text);

        // Custom Title for Quote Boxes BBcode
        text = this.preg_replace('/\\[title:${uid}="(.*?)"\]/gm'.f({ uid }), bbcode_tpl['free_txt_username_open'], text);
        text = this.preg_replace('/\\[title:${uid}=(.*?)\]/gm'.f({ uid }), bbcode_tpl['free_txt_username_close'], text);

        if ( (lQuoteB === 1 && lQuoteC === 1) || (lQuoteB1 === 1 && lQuoteC1 === 1) || (lQuoteB2 === 1 && lQuoteC2 === 1) ) {
            trozos = this.explode('__#@MBBQ#__', text);
            text = '';
            for (lCount = 0; lCount <= (this.count(trozos) - 1); lCount++) {
                if (lCount % 2 == 0 && lCount < (this.count(trozos) - 1)) {
                    lRandom = this.rand();
                    text += trozos[lCount] + 'q' + lRandom + lCount;
                    text = this.str_replace('__#@IMG#__', 'IMG' + lRandom + lCount, text);
                } else if (lCount < (this.count(trozos) - 1)) {
                    text += trozos[lCount] + 'q' + lRandom + (lCount - 1);
                    text = this.str_replace('__#@IMG#__', 'IMG' + lRandom + (lCount - 1), text);
                } else {
                    text += trozos[lCount];
                }

            }

        }

        text = this.addbbencode_second_pass(text, uid, logged, poster_posts);

        return text;

    },

    bbencode_second_pass_code: function(text, uid, bbcode_tpl) {

        /**
         * Does second-pass bbencoding of the [code] tags. This includes
         * running htmlspecialchars() over the text contained between
         * any pair of [code] tags that are at the first level of
         * nesting. Tags at the first level of nesting are indicated
         * by this format: [code:1:$uid] ... [/code:1:$uid]
         * Other tags are in this format: [code:$uid] ... [/code:$uid]
         */

        code_start_html = bbcode_tpl['code_open'];
        code_end_html =  bbcode_tpl['code_close'];

        // First, do all the 1st-level matches. These need an htmlspecialchars() run,
        // so they have to be handled differently.
        matches = null;
        match_count = this.preg_match_all("#\\[code:1:${uid}\](.*?)\\[\/code:1:${uid}\]#gm".f({ uid }), text, 'matches');

        for (i = 0; i < match_count; i++) {
            before_replace = matches[i][1];
            after_replace = matches[i][1];

            // Replace 2 spaces with "&nbsp;" so non-tabbed code indents without making huge long lines.
            after_replace = this.str_replace("  ", "&nbsp;", after_replace);
            // now Replace 2 spaces with "&nbsp;&nbsp;" to catch odd #s of spaces.
            after_replace = this.str_replace("  ", "&nbsp;", after_replace);

            // Replace tabs with "&nbsp;&nbsp;&nbsp;&nbsp;" so tabbed code indents sorta right without making huge long lines.
            after_replace = this.str_replace("\t", "&nbsp;&nbsp;&nbsp;&nbsp;", after_replace);

            // now Replace space occurring at the beginning of a line
            after_replace = this.preg_replace("/^ {1}/m", '&nbsp;', after_replace);

            str_to_match = "[code:1:${uid}]".f({ uid }) + before_replace + "[/code:1:${uid}]".f({ uid });

            replacement = code_start_html;
            replacement += after_replace;
            replacement += code_end_html;
            replacement = replacement.replace(/\\1/g, mLang[i]);

            text = this.str_replace(str_to_match, replacement, text);
        }

        // Now, do all the non-first-level matches. These are simple.
        text = this.str_replace("[code:${uid}]".f({ uid }), code_start_html, text);
        text = this.str_replace("[/code:${uid}]".f({ uid }), code_end_html, text);

        return text;

    },

    bin2asc: function(text) {

        var binary = [], self = null;

        if (arguments.length >= 3) {
            self = arguments[2];
        } else {
            self = this;
        }

        for(var i = 0; i < 255; i += 1) {
            binary[i] = {
                idx: i,
                char: self.chr(i),
                transchar: self.str_pad(self.base_convert(i, 10, 2), 8, '0', 'STR_PAD_LEFT')
            }

        }

        text = self.str_replace(' ', ':::NULLNULLNULL:::', text);
        binary.forEach(function(arr) {

            text = self.str_replace(arr.transchar, arr.char, text);

        });

        return self.str_replace(':::NULLNULLNULL:::', '', text);

    },

    crc32: function(str) {

        //  discuss at: http://phpjs.org/functions/crc32/
        // original by: Webtoolkit.info (http://www.webtoolkit.info/)
        // improved by: T0bsn
        //  depends on: utf8_encode
        //   example 1: crc32('Kevin van Zonneveld');
        //   returns 1: 1249991249

        var self = null;

        if (arguments.length >= 3) {
            self = arguments[2];
        } else {
            self = this;
        }

        str = self.utf8_encode(str);
        var crcTable = '00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 ' +
            '79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD 7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148' +
            '84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC ' +
            '14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 ' +
            '4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 ' +
            'DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 ' +
            'B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D ' +
            '76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 ' +
            '0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 ' +
            '856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA ' +
            'FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 ' +
            '4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 ' +
            '33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 ' +
            'B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B ' +
            'C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 ' +
            'E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 ' +
            '8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 ' +
            '10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 ' +
            '4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 ' +
            'DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 ' +
            'BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 ' +
            '2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 ' +
            '05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 ' +
            '86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 ' +
            'FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE ' +
            '4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 ' +
            '37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 ' +
            'BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 ' +
            'C30C8EA1 5A05DF1B 2D02EF8D', crc = 0, x = 0, y = 0;

        for (var i = 0, iTop = str.length; i < iTop; i += 1) {
            crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
        }

        return (crc ^ (-1)) >>> 0;

    },

    chr: function(codePt) {

        //  discuss at: http://phpjs.org/functions/chr/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: Brett Zamir (http://brett-zamir.me)
        //   example 1: chr(75) === 'K';
        //   example 1: chr(65536) === '\uD800\uDC00';
        //   returns 1: true
        //   returns 1: true

        if (codePt > 0xFFFF) { // Create a four-byte string (length 2) since this code point is high
            //   enough for the UTF-16 encoding (JavaScript internal use), to
            //   require representation with two surrogates (reserved non-characters
            //   used for building other characters; the first is "high" and the next "low")
            codePt -= 0x10000;

            return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
        }

        return String.fromCharCode(codePt);

    },

    chunk_split: function(body, chunklen, end) {

        //  discuss at: http://phpjs.org/functions/chunk_split/
        // original by: Paulo Freitas
        //    input by: Brett Zamir (http://brett-zamir.me)
        // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: Theriault
        //   example 1: chunk_split('Hello world!', 1, '*');
        //   returns 1: 'H*e*l*l*o* *w*o*r*l*d*!*'
        //   example 2: chunk_split('Hello world!', 10, '*');
        //   returns 2: 'Hello worl*d!*'

        chunklen = parseInt(chunklen, 10) || 76;
        end = end || '\r\n';

        if (chunklen < 1) { return false; }

        return body.match(new RegExp('.{0,' + chunklen + '}', 'g')).join(end);

    },

    count: function(mixed_var, mode) {

        //  discuss at: http://phpjs.org/functions/count/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //    input by: Waldo Malqui Silva (http://waldo.malqui.info)
        //    input by: merabi
        // bugfixed by: Soren Hansen
        // bugfixed by: Olivier Louvignes (http://mg-crea.com/)
        // improved by: Brett Zamir (http://brett-zamir.me)
        //   example 1: count([[0,0],[0,-4]], 'COUNT_RECURSIVE');
        //   returns 1: 6
        //   example 2: count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
        //   returns 2: 6

        var key, cnt = 0;

        if (mixed_var === null || typeof mixed_var === 'undefined') {
            return 0;
        } else if (mixed_var.constructor !== Array && mixed_var.constructor !== Object) {
            return 1;
        }

        if (mode === 'COUNT_RECURSIVE') { mode = 1; }
        if (mode != 1) { mode = 0; }

        for (key in mixed_var) {
            if (mixed_var.hasOwnProperty(key)) {
                cnt++;
                if (mode == 1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor ===
                    Object)) {
                    cnt += this.count(mixed_var[key], 1);
                }

            }

        }

        return cnt;

    },

    dss_rand: function() {

        val = rand_seed + this.microtime();
	    val = this.md5(val);

        return val.substring(4, 16);

    },

    escape_slashes: function(input) {

        /**
         * Escapes the "/" character with "\/". This is useful when you need
         * to stick a runtime string into a PREG regexp that is being delimited
         * with slashes.
         */

        output = this.str_replace('/', '\/', input);

        return output;

    },

    explode: function(delimiter, string, limit) {

        //  discuss at: http://phpjs.org/functions/explode/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //   example 1: explode(' ', 'Kevin van Zonneveld');
        //   returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}

        if (arguments.length < 2 || typeof delimiter === 'undefined' || typeof string === 'undefined') { return null; }
        if (delimiter === '' || delimiter === false || delimiter === null) { return false; }
        if (typeof delimiter === 'function' || typeof delimiter === 'object' || typeof string === 'function' || typeof string === 'object') {
            return {
                0 : ''
            };

        }
        if (delimiter === true) { delimiter = '1'; }

        // Here we go...
        delimiter += '';
        string += '';

        var s = string.split(delimiter);

        if (typeof limit === 'undefined') { return s; }

        // Support for limit
        if (limit === 0) { limit = 1; }

        // Positive limit
        if (limit > 0) {
            if (limit >= s.length) { return s; }
            return s.slice(0, limit - 1).concat([s.slice(limit - 1).join(delimiter)]);
        }

        // Negative limit
        if (-limit >= s.length) { return []; }

        s.splice(s.length + limit);

        return s;

    },

    extends: function(source) {

        for (var property in source) {
            if (this[property] && (typeof(this[property]) === 'object')
                && (this[property].toString() === '[object Object]') && source[property]) {
                this.extends(this[property], source[property]);
            } else {
                this[property] = source[property];
            }

        }

        return this;

    },

    getParamNames: function(func) {

        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
            ARGUMENT_NAMES = /([^\s,]+)/g,
            fnStr = func.toString().replace(STRIP_COMMENTS, ''),
            result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

        if (result === null) { result = []; }

        return result;

    },

    getUID: function() {

        return rand_seed;

    },

    getTPLData: function(key) {

        return bbcode_tpl[key];

    },

    htmlspecialchars: function(string, quote_style, charset, double_encode) {

        //       discuss at: http://phpjs.org/functions/htmlspecialchars/
        //      original by: Mirek Slugen
        //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //      bugfixed by: Nathan
        //      bugfixed by: Arno
        //      bugfixed by: Brett Zamir (http://brett-zamir.me)
        //      bugfixed by: Brett Zamir (http://brett-zamir.me)
        //       revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //         input by: Ratheous
        //         input by: Mailfaker (http://www.weedem.fr/)
        //         input by: felix
        // reimplemented by: Brett Zamir (http://brett-zamir.me)
        //             note: charset argument not supported
        //        example 1: htmlspecialchars("<a href='test'>Test</a>", 'ENT_QUOTES');
        //        returns 1: '&lt;a href=&#039;test&#039;&gt;Test&lt;/a&gt;'
        //        example 2: htmlspecialchars("ab\"c'd", ['ENT_NOQUOTES', 'ENT_QUOTES']);
        //        returns 2: 'ab"c&#039;d'
        //        example 3: htmlspecialchars('my "&entity;" is still here', null, null, false);
        //        returns 3: 'my &quot;&entity;&quot; is still here'

        var optTemp = 0, i = 0, noquotes = false;

        if (typeof quote_style === 'undefined' || quote_style === null) { quote_style = 2; }

        string = string.toString();

        if (double_encode !== false) {
            // Put this first to avoid double-encoding
            string = string.replace(/&/g, '&amp;');
        }

        string = string.replace(/</g, '&lt;') .replace(/>/g, '&gt;');

        var OPTS = {
            'ENT_NOQUOTES': 0,
            'ENT_HTML_QUOTE_SINGLE': 1,
            'ENT_HTML_QUOTE_DOUBLE': 2,
            'ENT_COMPAT': 2,
            'ENT_QUOTES': 3,
            'ENT_IGNORE': 4
        };

        if (quote_style === 0) { noquotes = true; }

        if (typeof quote_style !== 'number') {
            // Allow for a single string or an array of string flags
            quote_style = [].concat(quote_style);

            for (i = 0; i < quote_style.length; i += 1) {
                // Resolve string input to bitwise e.g. 'ENT_IGNORE' becomes 4
                if (OPTS[quote_style[i]] === 0) {
                    noquotes = true;
                } else if (OPTS[quote_style[i]]) {
                    optTemp = optTemp | OPTS[quote_style[i]];
                }

            }

            quote_style = optTemp;
        }

        if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) { string = string.replace(/'/g, ' &#039; '); }
        if (!noquotes) { string = string.replace(/"/g, '&quot;'); }

        return string;

    },

    hex2asc: function(text) {

        var hexadecimal = [], self = null;

        if (arguments.length >= 3) {
            self = arguments[2];
        } else {
            self = this;
        }

        for (i = 0; i < 255; i += 1) {
            hexadecimal[i] = {
                idx: i,
                char: self.chr(i),
                transchar: self.str_pad(self.base_convert(i, 10, 16), 2, '0', 'STR_PAD_LEFT')
            }

	    }

        text = self.str_replace(' ', ':::NULLNULLNULL:::', text);
        hexadecimal.forEach(function(arr) {

            text = self.str_replace(arr.transchar, arr.char, text);

        });

        return self.str_replace(':::NULLNULLNULL:::', '', text);

    },

    is_array: function(inputArr) {

        return Object.prototype.toString.call(inputArr) === '[object Array]';

    },

    isFunction: function(fnString) {

        if (typeof window[fnString] === "function") {
            return true;
        } else {
            return false;
        }

    },

    isReadyTpl: function() {

        return BBCODE_TPL_READY;

    },

    lang: function() {

        bbcode_tpl['quote_open'] = this.str_replace('{L_QUOTE}', lang['Quote'], bbcode_tpl['quote_open']);
        bbcode_tpl['spoiler_open'] = this.str_replace('{L_SPOILER}', lang['Spoiler'], bbcode_tpl['spoiler_open']);
        bbcode_tpl['spoiler_username_open'] = this.str_replace('{L_SPOILER}', lang['Spoiler'], bbcode_tpl['spoiler_username_open']);

        bbcode_tpl['quote_username_open'] = this.str_replace('{L_QUOTE}', lang['Quote'], bbcode_tpl['quote_username_open']);
        bbcode_tpl['quote_username_open'] = this.str_replace('{L_WROTE}', lang['wrote'], bbcode_tpl['quote_username_open']);

        // BEGIN Moderator Tags
        bbcode_tpl['mod_open'] = this.str_replace('{L_MOD}', lang['Mod'], bbcode_tpl['mod_open']);
        bbcode_tpl['mod_open'] = this.str_replace('{MOD_WARN}', lang['Mod_warninig'], bbcode_tpl['mod_open']);
        bbcode_tpl['mod_username_open'] = this.str_replace('{L_MOD}', lang['Mod'], bbcode_tpl['mod_username_open']);
        bbcode_tpl['mod_username_open'] = this.str_replace('{MOD_WARN}', lang['Mod_warninig'], bbcode_tpl['mod_username_open']);
        // END Moderator Tags

        bbcode_tpl['code_open'] = this.str_replace('{L_CODE}', lang['Code'], bbcode_tpl['code_open']);
        bbcode_tpl['code_open'] = this.str_replace('{L_LANG}', '\\1', bbcode_tpl['code_open']);

        bbcode_tpl['free_txt_open'] = this.str_replace('{L_FREE}', lang['free'], bbcode_tpl['free_txt_open']);
        bbcode_tpl['free_txt_username_open'] = this.str_replace('{L_FREE}', lang['free'], bbcode_tpl['free_txt_username_open']);

        bbcode_tpl['ytube'] = this.str_replace('{L_LINK}', lang['Link'], bbcode_tpl['ytube']);

        // dyk
        bbcode_tpl['dyk_open'] = this.str_replace('{L_DYK}', lang['dyk'], bbcode_tpl['dyk_open']);

    },

    load_bbcode_template: function(tpl) {

        /**
         * Loads bbcode templates from the bbcode.tpl file of the current template set.
         * Creates an array, keys are bbcode names like "b_open" or "url", values
         * are the associated template.
         * Probably pukes all over the place if there's something really screwed
         * with the bbcode.tpl file.
         *
         * Nathan Codding, Sept 26 2001.
         */

        var bbcode_tpls = new Array();

        if (tpl.trim() === '') {
            BBCODE_TPL_READY = false;
            return;
        }

        tpl = this.removeComments(tpl, '$');

        // replace \ with \\ and then ' with \'.
        tpl = this.str_replace('\\', '\\\\', tpl);
        tpl = this.str_replace('\'', '\\\'', tpl);

        // strip newlines.
        tpl = this.str_replace('\n\r', '', tpl);
        tpl = this.str_replace('\r', '', tpl);
        tpl = this.str_replace('\n', '', tpl);
        tpl = this.str_replace('\t', '', tpl);
        tpl = this.str_replace('{TPL_IMG_PATH}', BBCODE_IMGPATH, tpl);

        // Turn template blocks into PHP assignment statements for the values of $bbcode_tpls..
        tpl = this.preg_replace('#<!-- BEGIN (.*?) -->(.*?)<!-- END (.*?) -->#', '\n\\1 = \\2', tpl);
        tpl = tpl.split('\n');

        for (var tplIx = 0; tplIx < tpl.length; tplIx += 1) {
            if (tpl[tplIx] !== '') {
                var eq = tpl[tplIx].indexOf('=');

                bbcode_tpls[tpl[tplIx].substring(0, eq - 1)] = this.ltrim(tpl[tplIx].substring(eq + 1));
                BBCODE_TPL_READY = true;
            }

        }

        if (arguments.length === 2) {
            if (arguments[1] === true) { bbcode_tpls = this.prepare_bbcode_template(bbcode_tpls); }
        }

        return bbcode_tpls;

    },

    load_rainbow_colors: function () {

        return {
            1: '#ff0000',
            2: '#ffA500',
            3: '#ffff00',
            4: '#008000',
            5: '#0000ff',
            6: '#4b0082',
            7: '#8f00ff'
        };

    },

    ltrim: function(str, charlist) {

        //  discuss at: http://phpjs.org/functions/ltrim/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //    input by: Erkekjetter
        // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfixed by: Onno Marsman
        //   example 1: ltrim('    Kevin van Zonneveld    ');
        //   returns 1: 'Kevin van Zonneveld    '

        charlist = !charlist ? ' \\s\u00A0' : (charlist + '').replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
        var re = new RegExp('^[' + charlist + ']+', 'g');

        return (str + '').replace(re, '');

    },

    make_bbcode_uid: function() {

        var uid = this.dss_rand();

	    uid = uid.substring(0, BBCODE_UID_LEN);

	    return uid;

    },

    make_clickable: function(text) {

        /**
         * Rewritten by Nathan Codding - Feb 6, 2001.
         * - Goes through the given string, and replaces xxxx://yyyy with an HTML <a> tag linking
         * 	to that URL
         * - Goes through the given string, and replaces www.xxxx.yyyy[zzzz] with an HTML <a> tag linking
         * 	to http://www.xxxx.yyyy[/zzzz]
         * - Goes through the given string, and replaces xxxx@yyyy with an HTML mailto: tag linking
         *		to that email address
        * - Only matches these 2 patterns either after a space, or at the beginning of a line
        *
        * Notes: the email one might get annoying - it's easy to make it more restrictive, though.. maybe
        * have it require something like xxxx@yyyy.zzzz or such. We'll see.
        */

        text = this.preg_replace('#(script|about|applet|activex|chrome):#is', "\\1&#058;", text);

        // pad it with a space so we can match things at the start of the 1st line.
        ret = ' ' + text;

        // matches an "xxxx://yyyy" URL at the start of a line, or after a space.
        // xxxx can only be alpha characters.
        // yyyy is anything up to the first space, newline, comma, double quote or <
        ret = this.preg_replace("#(^|[\n ])([\w]+?://[\w\#$%&~/.\-;:=,?@\[\]+]*)#is", "\\1<a href=\"\\2\" target=\"_blank\">\\2</a>", ret);

        // matches a "www|ftp.xxxx.yyyy[/zzzz]" kinda lazy URL thing
        // Must contain at least 2 dots. xxxx contains either alphanum, or "-"
        // zzzz is optional.. will contain everything up to the first space, newline,
        // comma, double quote or <.
        ret = this.preg_replace("#(^|[\n ])((www|ftp)\.[\w\#$%&~/.\-;:=,?@\[\]+]*)#is", "\\1<a href=\"http://\\2\" target=\"_blank\">\\2</a>", ret);

        // matches an email@domain type address at the start of a line, or after a space.
        // Note: Only the followed chars are valid; alphanums, "-", "_" and or ".".
        ret = this.preg_replace("#(^|[\n ])([a-z0-9&\-_.]+?)@([\w\-]+\.([\w\-\.]+\.)*[\w]+)#i", "\\1<a href=\"mailto:\\2@\\3\">\\2@\\3</a>", ret);

        // Remove our padding..
        ret = ret.substring(1);

        return ret;

    },

    md5: function(str) {

        //  discuss at: http://phpjs.org/functions/md5/
        // original by: Webtoolkit.info (http://www.webtoolkit.info/)
        // improved by: Michael White (http://getsprink.com)
        // improved by: Jack
        // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //    input by: Brett Zamir (http://brett-zamir.me)
        // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //  depends on: utf8_encode
        //   example 1: md5('Kevin van Zonneveld');
        //   returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'

        var xl, self = null;

        var rotateLeft = function(lValue, iShiftBits) {

            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));

        };

        var addUnsigned = function(lX, lY) {

            var lX4, lY4, lX8, lY8, lResult;

            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) { return (lResult ^ 0x80000000 ^ lX8 ^ lY8); }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                } else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }

            } else {
                return (lResult ^ lX8 ^ lY8);
            }

        };

        var _F = function(x, y, z) {

            return (x & y) | ((~x) & z);

        };
        var _G = function(x, y, z) {

            return (x & z) | (y & (~z));

        };
        var _H = function(x, y, z) {

            return (x ^ y ^ z);

        };
        var _I = function(x, y, z) {

            return (y ^ (x | (~z)));

        };

        var _FF = function(a, b, c, d, x, s, ac) {

            a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);

        };

        var _GG = function(a, b, c, d, x, s, ac) {

            a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);

        };

        var _HH = function(a, b, c, d, x, s, ac) {

            a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);

        };

        var _II = function(a, b, c, d, x, s, ac) {

            a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
            return addUnsigned(rotateLeft(a, s), b);

        };

        var convertToWordArray = function(str) {

            var lWordCount,
                lMessageLength = str.length,
                lNumberOfWords_temp1 = lMessageLength + 8,
                lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64,
                lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16,
                lWordArray = new Array(lNumberOfWords - 1),
                lBytePosition = 0,
                lByteCount = 0;

            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }

            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;

            return lWordArray;

        };

        var wordToHex = function(lValue) {

            var wordToHexValue = '',
                wordToHexValue_temp = '',
                lByte, lCount;

            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                wordToHexValue_temp = '0' + lByte.toString(16);
                wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
            }

            return wordToHexValue;

        };

        var x = [],
            k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
            S12 = 12,
            S13 = 17,
            S14 = 22,
            S21 = 5,
            S22 = 9,
            S23 = 14,
            S24 = 20,
            S31 = 4,
            S32 = 11,
            S33 = 16,
            S34 = 23,
            S41 = 6,
            S42 = 10,
            S43 = 15,
            S44 = 21;

        if (arguments.length >= 3) {
            self = arguments[2];
        } else {
            self = this;
        }

        str = self.utf8_encode(str);
        x = convertToWordArray(str);
        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;

        xl = x.length;
        for (k = 0; k < xl; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = addUnsigned(a, AA);
            b = addUnsigned(b, BB);
            c = addUnsigned(c, CC);
            d = addUnsigned(d, DD);
        }

        var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);

        return temp.toLowerCase();

    },

    microtime: function(get_as_float) {

        //  discuss at: http://phpjs.org/functions/microtime/
        // original by: Paulo Freitas
        // improved by: Dumitru Uzun (http://duzun.me)
        //   example 1: timeStamp = microtime(true);
        //   example 1: timeStamp > 1000000000 && timeStamp < 2000000000
        //   returns 1: true
        //   example 2: /^0\.[0-9]{1,6} [0-9]{10,10}$/.test(microtime())
        //   returns 2: true

        if (typeof performance !== 'undefined' && performance.now) {
            var now = (performance.now() + performance.getEntriesByType("navigation")[0].duration) / 1e3;
            if (get_as_float) { return now; }

            // Math.round(now)
            var s = now | 0;
            return (Math.round((now - s) * 1e6) / 1e6) + ' ' + s;
        } else {
            var now = (Date.now ? Date.now() : new Date().getTime()) / 1e3;
            if (get_as_float) { return now; }

            // Math.round(now)
            var s = now | 0;
            return (Math.round((now - s) * 1e3) / 1e3) + ' ' + s;
        }

    },

    parser: function(str) {

        var result = '',
            logged = false,
            poster_posts = 0;

        if (arguments.length === 2) {
            // Only load the templates ONCE..
            if (BBCODE_TPL_READY === false) {
                // load templates from file into array.
                bbcode_tpl = this.load_bbcode_template(arguments[1]);

                // prepare array for use in regexps.
                bbcode_tpl = this.prepare_bbcode_template(bbcode_tpl);
            }

        }

        if (arguments.length >= 3) { logged = arguments[2]; }
        if (arguments.length >= 4) { poster_posts = arguments[3]; }
        if (arguments.length === 5) { rand_seed = arguments[4]; } else { rand_seed = 'bb_' + this.make_bbcode_uid(); }
        if (typeof bbcode_tpl !== 'object') { return str; }
        if (typeof str === 'undefined') { str = ''; }

        mLang = [];
        if (str !== '') {
            str = str.replace(/\n\r/g, '</n></r>');
            str = str.replace(/\n/g, '</n>');
            str = str.replace(/\r/g, '</r>');
            str = str.replace(/\t/g, '    ');

            result = this.bbencode_second_pass(this.bbencode_first_pass(str, rand_seed, false, 0), rand_seed, logged, poster_posts);
            result = this.make_clickable(result);
            result = this.smilies_pass(result);
            result = this.smilies_pass(result);
            result = this.removeRaw(result, rand_seed);
            result = this.removeChCode(result);

            this.tooltip(); // Set tooltip

            return result.replace(/\\/g, '').replace(/&lt;\/n&gt;/gm, '\n').replace(/&lt;\/r&gt;/gm, '\r');
        } else {
            return str;
        }

    },

    preg_match: function(pattern, str, match) {

        var m_match = 'g',
            maxStack = 0,
            hasMatch = 0;

        if ((window[match] === null || typeof window[match] === 'undefined') && (typeof match !== 'undefined')) { window[match] = []; } else if (match !== 'undefined') { window[match] = []; }

        try {
            var flg = pattern.substr(pattern.lastIndexOf(pattern[0]) + 1),
                _flag = (flg === '') ? m_match : flg,
                _pattern = pattern.substr(1, pattern.lastIndexOf(pattern[0]) - 1),
                regex = new RegExp(_pattern, _flag);

            while ((m = regex.exec(str)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) { regex.lastIndex++; }

                if (m && (typeof match !== 'undefined')) { window[match].push(m); } else if (m) { hasMatch += 1; }
                if (maxStack > 1000) { break; } else { maxStack++; }
            }

            return (typeof match !== 'undefined') ? window[match].length : hasMatch;
        } catch {
            return 0;
        }

    },

    preg_match_all: function(pattern, str, matches) {

        var m_match = 'g',
            maxStack = 0,
            hasMatch = 0;

        if (window[matches] === null || typeof window[matches] === 'undefined' && (typeof matches !== 'undefined')) { window[matches] = []; } else if (matches !== 'undefined') { window[matches] = []; }

        try {
            var flg = pattern.substr(pattern.lastIndexOf(pattern[0]) + 1),
                _flag = (flg === '') ? m_match : flg,
                _pattern = pattern.substr(1, pattern.lastIndexOf(pattern[0]) - 1),
                regex = new RegExp(_pattern, _flag);

            while ((m = regex.exec(str)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) { regex.lastIndex++; }

                if (m && (typeof matches !== 'undefined')) { window[matches].push(m); } else if (m) { hasMatch++; }
                if (maxStack > 1000) { break; } else { maxStack++; }
            }

            return (typeof matches !== 'undefined') ? window[matches].length : hasMatch;
        } catch {
            return 0;
        }

    },

    preg_replace: function(pattern, replacement, subject, limit, func) {

        /**
         * preg_replace (from PHP) in JavaScript!
         *
         * https://gist.github.com/fuzzyfox/5841963
         *
         * This is basically a pattern replace. You can use a regex pattern to search and
         * another for the replace. For more information see the PHP docs on the original
         * function (http://php.net/manual/en/function.preg-replace.php), and for more on
         * JavaScript flavour regex visit http://www.regular-expressions.info/javascript.html
         *
         * NOTE: Unlike the PHP version, this function only deals with string inputs. No arrays.
         *
         * @author	William Duyck <fuzzyfox0@gmail.com>
         * @license http://www.mozilla.org/MPL/2.0/ Mozilla Public License 2.0
         *
         * @param	{String}	pattern	The pattern to search for.
         * @param	{String}	replace	The string to replace.
         * @param	{String}	subject	The string to search and replace.
         * @param	{Integer}	limit	The maximum possible replacements.
         * @return	{String}	If matches are found, the new subject will be returned.
         */

        if (limit === undefined) { limit = -1; }
        if (func === undefined) { func = false; }

        try {
            var flg = pattern.substr(pattern.lastIndexOf(pattern[0]) + 1),
                _flag = (flg === '') ? 'gim' : flg,
                _pattern = pattern.substr(1, pattern.lastIndexOf(pattern[0]) - 1),
                reg	= new RegExp(_pattern, _flag),
                res	= [],
                x	= 0,
                y	= 0,
                rtn	= subject,
                maxStack = 0;

            var tmp = [];
            if (limit === -1) {
                do {
                    tmp = reg.exec(subject);
                    if (tmp !== null) { res.push(tmp); }
                    if (maxStack > 1000) { break; } else { maxStack++; }
                } while (tmp !== null && _flag.indexOf('g') !== -1);

            } else {
                res.push(reg.exec(subject));
            }

            for (x = res.length -1; x > -1; x--) {
                tmp = replacement;
                for (y = res[x].length - 1; y > -1; y--) {
                    var row = res[x][y];

                    if (func === true) {
                        var fn = replacement.trim(),
                            lastRtn = row;

                        if (fn !== '' && fn.startsWith('return jsHBBcode.') === true) {
                            try {
                                fn = fn.replace(/\\1/g, row);
                                tmp = new Function(fn)();
                                break;
                            } catch {
                                tmp = lastRtn;
                            }

                        }

                    }

                    tmp = tmp.replaceAll('${' + y + '}', row).replaceAll('$' + y, row).replaceAll('\\' + y, row);
                }

                rtn = rtn.replace(res[x][0], tmp);
            }

            return rtn;
        } catch {
            return subject;
        }

    },

    preg_quote: function(str, delimiter) {

        //  discuss at: http://phpjs.org/functions/preg_quote/
        // original by: booeyOH
        // improved by: Ates Goral (http://magnetiq.com)
        // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: Brett Zamir (http://brett-zamir.me)
        // bugfixed by: Onno Marsman
        //   example 1: preg_quote("$40");
        //   returns 1: '\\$40'
        //   example 2: preg_quote("*RRRING* Hello?");
        //   returns 2: '\\*RRRING\\* Hello\\?'
        //   example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
        //   returns 3: '\\\\\\.\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:'

        return String(str).replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');

    },

    prepare_bbcode_template: function(bbcode_tpl) {

        /**
         * Prepares the loaded bbcode templates for insertion into preg_replace()
         * or str_replace() calls in the bbencode_second_pass functions. This
         * means replacing template placeholders with the appropriate preg backrefs
         * or with language vars. NOTE: If you change how the regexps work in
         * bbencode_second_pass(), you MUST change this function.
         *
         * Nathan Codding, Sept 26 2001
         *
         */

        if (typeof bbcode_tpl === 'undefined') { bbcode_tpl = []; }

        bbcode_tpl['olist_open'] = this.str_replace('{LIST_TYPE}', '\\1', bbcode_tpl['olist_open']);

        bbcode_tpl['color_open'] = this.str_replace('{COLOR}', '\\1', bbcode_tpl['color_open']);

        bbcode_tpl['size_open'] = this.str_replace('{SIZE}', '\\1', bbcode_tpl['size_open']);

        bbcode_tpl['tip_open'] = this.str_replace('{TEXT}', '\\2', bbcode_tpl['tip_open']);
        bbcode_tpl['tip_open'] = this.str_replace('{TOOLTIP}', '\\1', bbcode_tpl['tip_open']);

        bbcode_tpl['warn_open'] = this.str_replace('{TITLE}', '\\1', bbcode_tpl['warn_open']);
        //bbcode_tpl['warn_open'] = this.str_replace('{TEXT}', '\\2', bbcode_tpl['warn_open']);

        bbcode_tpl['info_open'] = this.str_replace('{TITLE}', '\\1', bbcode_tpl['info_open']);
        //bbcode_tpl['info_open'] = this.str_replace('{TEXT}', '\\2', bbcode_tpl['info_open']);

        bbcode_tpl['success_open'] = this.str_replace('{TITLE}', '\\1', bbcode_tpl['success_open']);
        //bbcode_tpl['success_open'] = this.str_replace('{TEXT}', '\\2', bbcode_tpl['success_open']);

        bbcode_tpl['error_open'] = this.str_replace('{TITLE}', '\\1', bbcode_tpl['error_open']);
        //bbcode_tpl['error_open'] = this.str_replace('{TEXT}', '\\2', bbcode_tpl['error_open']);

        bbcode_tpl['quote_username_open'] = this.str_replace('{USERNAME}', '\\1', bbcode_tpl['quote_username_open']);

        // BEGIN Moderator Tags
        bbcode_tpl['mod_username_open'] = this.str_replace('{USERNAME}', '\\1', bbcode_tpl['mod_username_open']);
        // END Moderator Tags

        bbcode_tpl['spoiler_username_open'] = this.str_replace('{USERNAME}', '\\1', bbcode_tpl['spoiler_username_open']);

        bbcode_tpl['free_txt_username_open'] = this.str_replace('{USERNAME}', '\\1', bbcode_tpl['free_txt_username_open']);

        bbcode_tpl['img'] = this.str_replace('{URL}', '\\1', bbcode_tpl['img']);
        bbcode_tpl['img_wh'] = this.str_replace('{WIDTH}', '\\1', bbcode_tpl['img_wh']);
        bbcode_tpl['img_wh'] = this.str_replace('{HEIGHT}', '\\2', bbcode_tpl['img_wh']);
        bbcode_tpl['img_wh'] = this.str_replace('{URL}', '\\3', bbcode_tpl['img_wh']);
        bbcode_tpl['img_w'] = this.str_replace('{WIDTH}', '\\1', bbcode_tpl['img_w']);
        bbcode_tpl['img_w'] = this.str_replace('{URL}', '\\2', bbcode_tpl['img_w']);

        this.lang();

        // We do URLs in several different ways..
        bbcode_tpl['url1'] = this.str_replace('{URL}', '\\1', bbcode_tpl['url']);
        bbcode_tpl['url1'] = this.str_replace('{DESCRIPTION}', '\\1', bbcode_tpl['url1']);

        bbcode_tpl['url2'] = this.str_replace('{URL}', 'http://\\1', bbcode_tpl['url']);
        bbcode_tpl['url2'] = this.str_replace('{DESCRIPTION}', '\\1', bbcode_tpl['url2']);

        bbcode_tpl['url3'] = this.str_replace('{URL}', '\\1', bbcode_tpl['url']);
        bbcode_tpl['url3'] = this.str_replace('{DESCRIPTION}', '\\2', bbcode_tpl['url3']);

        bbcode_tpl['url4'] = this.str_replace('{URL}', 'http://\\1', bbcode_tpl['url']);
        bbcode_tpl['url4'] = this.str_replace('{DESCRIPTION}', '\\3', bbcode_tpl['url4']);

        bbcode_tpl['url5'] = this.str_replace('{URL}', 'https://\\1', bbcode_tpl['url']);
        bbcode_tpl['url5'] = this.str_replace('{DESCRIPTION}', '\\1', bbcode_tpl['url5']);

        bbcode_tpl['url6'] = this.str_replace('{URL}', 'https://\\1', bbcode_tpl['url']);
        bbcode_tpl['url6'] = this.str_replace('{DESCRIPTION}', '\\3', bbcode_tpl['url6']);

        bbcode_tpl['email'] = this.str_replace('{EMAIL}', '\\1', bbcode_tpl['email']);

        bbcode_tpl['ytube'] = this.str_replace('{YOUTUBEID}', '\\1', bbcode_tpl['ytube']);
        bbcode_tpl['ytube'] = this.str_replace('{YOUTUBELINK}', '\\1', bbcode_tpl['ytube']);

        bbcode_tpl['page'] = this.str_replace('{LINK}', '\\1', bbcode_tpl['page']);
        bbcode_tpl['page'] = this.str_replace('{OPENEXTLINK}', lang['OpenExtLink'], bbcode_tpl['page']);

        bbcode_tpl['wiki_open'] = this.str_replace('{QUERY}', this.str_replace('\\\"', '\"', '\\1'), bbcode_tpl['wiki_open']);

        bbcode_tpl['table_mainrow_color'] = this.str_replace('{TABMRCOLOR}', '\\1', bbcode_tpl['table_mainrow_color']);
        bbcode_tpl['table_mainrow_size'] = this.str_replace('{TABMRSIZE}', '\\1', bbcode_tpl['table_mainrow_size']);
        bbcode_tpl['table_mainrow_cs1'] = this.str_replace('{TABMRCSCOLOR}', '\\1', bbcode_tpl['table_mainrow_cs']);
        bbcode_tpl['table_mainrow_cs1'] = this.str_replace('{TABMRCSSIZE}', '\\2', bbcode_tpl['table_mainrow_cs1']);
        bbcode_tpl['table_maincol_color'] = this.str_replace('{TABMCCOLOR}', '\\1', bbcode_tpl['table_maincol_color']);
        bbcode_tpl['table_maincol_size'] = this.str_replace('{TABMCSIZE}', '\\1', bbcode_tpl['table_maincol_size']);
        bbcode_tpl['table_maincol_cs1'] = this.str_replace('{TABMCCSCOLOR}', '\\1', bbcode_tpl['table_maincol_cs']);
        bbcode_tpl['table_maincol_cs1'] = this.str_replace('{TABMCCSSIZE}', '\\2', bbcode_tpl['table_maincol_cs1']);
        bbcode_tpl['table_row_color'] = this.str_replace('{TABRCOLOR}', '\\1', bbcode_tpl['table_row_color']);
        bbcode_tpl['table_row_size'] = this.str_replace('{TABRSIZE}', '\\1', bbcode_tpl['table_row_size']);
        bbcode_tpl['table_row_cs1'] = this.str_replace('{TABRCSCOLOR}', '\\1', bbcode_tpl['table_row_cs']);
        bbcode_tpl['table_row_cs1'] = this.str_replace('{TABRCSSIZE}', '\\2', bbcode_tpl['table_row_cs1']);
        bbcode_tpl['table_col_color'] = this.str_replace('{TABCCOLOR}', '\\1', bbcode_tpl['table_col_color']);
        bbcode_tpl['table_col_size'] = this.str_replace('{TABCSIZE}', '\\1', bbcode_tpl['table_col_size']);
        bbcode_tpl['table_col_cs1'] = this.str_replace('{TABCCSCOLOR}', '\\1', bbcode_tpl['table_col_cs']);
        bbcode_tpl['table_col_cs1'] = this.str_replace('{TABCCSSIZE}', '\\2', bbcode_tpl['table_col_cs1']);
        bbcode_tpl['table_size'] = this.str_replace('{TABSIZE}', '\\1', bbcode_tpl['table_size']);
        bbcode_tpl['table_color'] = this.str_replace('{TABCOLOR}', '\\1', bbcode_tpl['table_color']);
        bbcode_tpl['table_cs1'] = this.str_replace('{TABCSCOLOR}', '\\1', bbcode_tpl['table_cs']);
        bbcode_tpl['table_cs1'] = this.str_replace('{TABCSSIZE}', '\\2', bbcode_tpl['table_cs1']);

        BBCODE_TPL_READY = true;

        return bbcode_tpl;

    },

    rainbow: function(text) {

        //
        // Returns text highlighted in rainbow colours
        //
        var self = null;

        if (arguments.length >= 3) {
            self = arguments[2];
        } else {
            self = this;
        }

        var colors = self.load_rainbow_colors(),
            length = 0,
            result = '',
            color_counter = 0,
            TAG_OPEN = false;

        text = self.trim(self.stripslashes(text));
        length = self.strlen(text);

        for (var i = 0; i < length; i += 1) {
            var char = self.substr(text, i, 1);

            if (TAG_OPEN === false) {
                if (char === '<') {
                    TAG_OPEN = true;
                    result += char;
                } else if (self.preg_match('#\\S#gm', char) > 0) {
                    color_counter++;
                    result += '<span style="color:' + colors[color_counter] + ';">' + char + '</span>';
                    color_counter = (color_counter == 7) ? 0 : color_counter;
                } else {
                    result += char;
                }

            } else {
                if (char === '>') { TAG_OPEN = false; }
                result += char;
            }

        }

        return result;

    },

    rand: function(min, max) {

        //  discuss at: http://phpjs.org/functions/rand/
        // original by: Leslie Hoare
        // bugfixed by: Onno Marsman
        //        note: See the commented out code below for a version which will work with our experimental (though probably unnecessary) srand() function)
        //   example 1: rand(1, 1);
        //   returns 1: 1

        var argc = arguments.length;

        if (argc === 0) {
            min = 0;
            max = 2147483647;
        } else if (argc === 1) {
            throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
        }

        return Math.floor(Math.random() * (max - min + 1)) + min;

    },

    raw_text: function(text) {

        // https://stackoverflow.com/a/8803657

        var returnText = '' + text,
            self = null;

        if (typeof preservebreaklines === 'undefined') { preservebreaklines = true; }
        if (typeof preservedoblesspaces === 'undefined') { preservedoblesspaces = true; }

        //-- Remove BR tags and replace them with line break
        returnText = returnText.replace(/<br>/gi, '\n');
        returnText = returnText.replace(/<br\s\/>/gi, '\n');
        returnText = returnText.replace(/<br\/>/gi, '\n');

        //-- Remove P and A tags but preserve what's inside of them
        returnText = returnText.replace(/<p.*>/gi, '\n');
        returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, ' $2 ($1)');

        //-- Remove all inside SCRIPT and STYLE tags
        returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, '');
        returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, '');

        //-- Remove all else
        returnText = returnText.replace(/<(?:.|\s)*?>/g, '');

        //-- Get rid of more than 2 multiple line breaks:
        if (preservebreaklines === false) { returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, '\n\n'); }

        //-- Get rid of more than 2 spaces:
        if (preservedoblesspaces === true) { returnText = returnText.replace(/ +(?= )/g, ''); }

        //-- Get rid of html-encoded characters:
        returnText = returnText.replace(/&nbsp;/gi, ' ');
        returnText = returnText.replace(/&amp;/gi, '&');
        returnText = returnText.replace(/&quot;/gi, '"');
        returnText = returnText.replace(/&lt;/gi, '<');
        returnText = returnText.replace(/&gt;/gi, '>');

        if (arguments.length >= 3) {
            self = arguments[2];
        } else {
            self = this;
        }

        return self.base64_encode(returnText);

    },

    removeChCode: function(text) {


        var code_entities_match = ['<', '>', '"', ':', '[', ']', '(', ')', '{', '}'],
            code_entities_replace = ['#&lt;#', '#&gt;#', '#&quot;#', '#&#58;#', '#&#91;#', '#&#93;#', '#&#40;#', '#&#41;#', '#&#123;#', '#&#125;#'];

        for (var iCode = 0; iCode < code_entities_match.length; iCode += 1) {
            text = this.preg_replace(code_entities_replace[iCode], code_entities_match[iCode], text);
        }

        return text;

    },

    removeComments: function(pLine, Token) {

        if (typeof Token === 'undefined') { Token = "'"; }

        var regex = new RegExp('\\' + Token + '(.*)', 'gm');

        return pLine.replace(regex, '');

    },

    removeRaw: function(text, uid) {

        // [raw] and [/raw] for raw text.
        // this.base64_decode(text)

        var lenRaw = text.length,
            iRaw = 0,
            MAX_EXE = 0;

        while (iRaw < lenRaw) {
            var iKey = '[raw:${uid}]'.f({ uid }),
                sRaw = text.indexOf(iKey, iRaw),
                jKey = '[/raw:${uid}]'.f({ uid }),
                eRaw = text.indexOf(jKey, sRaw),
                pText = '';

            if (sRaw > -1 && eRaw > -1) {
                pText = this.base64_decode(text.substring(sRaw + iKey.length, sRaw + (eRaw - sRaw)));
                text = text.substring(0, sRaw) + pText + text.substring(eRaw + jKey.length);
                iRaw = 0;
            } else {
                iRaw = lenRaw;
            }

            if (MAX_EXE > 1000) { break; } // Prevent infinite loop.
            MAX_EXE += 1;
        }

        text = this.str_replace("[raw:${uid}]".f({ uid }), '', text);
        text = this.str_replace("[/raw:${uid}]".f({ uid }), '', text);

        return text;

    },

    replace_listitems: function(text, uid) {

        /**
         * This is used to change a [*] tag into a [*:$uid] tag as part
         * of the first-pass bbencoding of [list] tags. It fits the
         * standard required in order to be passed as a variable
         * function into bbencode_first_pass_pda().
         */

        if (arguments.length >= 3) {
            var self = arguments[2];

            text = self.str_replace("[*]", "[*:${uid}]".f({ uid }), text);
        } else {
            text = this.str_replace("[*]", "[*:${uid}]".f({ uid }), text);
        }

        return text;

    },

    reverse: function(text) {

        if (arguments.length >= 3) {
            self = arguments[2];
        } else {
            self = this;
        }

        return self.strrev(text);

    },

    rtrim: function(str, charlist) {

        //  discuss at: http://phpjs.org/functions/rtrim/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //    input by: Erkekjetter
        //    input by: rem
        // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfixed by: Onno Marsman
        // bugfixed by: Brett Zamir (http://brett-zamir.me)
        //   example 1: rtrim('    Kevin van Zonneveld    ');
        //   returns 1: '    Kevin van Zonneveld'

        charlist = !charlist ? ' \\s\u00A0' : (charlist + '').replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\\$1');

        var re = new RegExp('[' + charlist + ']+$', 'g');

        return (str + '').replace(re, '');

    },

    setImagePath: function(TPL_IMG_PATH, SMILE_PATH) {

        if (typeof TPL_IMG_PATH !== 'undefined') { BBCODE_IMGPATH = TPL_IMG_PATH; }
        if (typeof SMILE_PATH !== 'undefined') { smilies_path = SMILE_PATH; }

    },

    sha1: function(str) {

        //  discuss at: http://phpjs.org/functions/sha1/
        // original by: Webtoolkit.info (http://www.webtoolkit.info/)
        // improved by: Michael White (http://getsprink.com)
        // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //    input by: Brett Zamir (http://brett-zamir.me)
        //   example 1: sha1('Kevin van Zonneveld');
        //   returns 1: '54916d2e62f65b3afa6e192e6a601cdbe5cb5897'

        var rotate_left = function(n, s) {

            var t4 = (n << s) | (n >>> (32 - s));
            return t4;

        };

        var cvt_hex = function(val) {

            var str = '', i, v;

            for (i = 7; i >= 0; i--) {
                v = (val >>> (i * 4)) & 0x0f;
                str += v.toString(16);
            }

            return str;

        };

        var blockstart, i, j, W = new Array(80),
            H0 = 0x67452301, H1 = 0xEFCDAB89, H2 = 0x98BADCFE,
            H3 = 0x10325476,  H4 = 0xC3D2E1F0, A, B, C, D, E, temp;

        // utf8_encode
        str = decodeURIComponent(encodeURIComponent(str));
        var str_len = str.length,
            word_array = [];

        for (i = 0; i < str_len - 3; i += 4) {
            j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
            word_array.push(j);
        }

        switch (str_len % 4) {
        case 0:
            i = 0x080000000;
            break;
        case 1:
            i = str.charCodeAt(str_len - 1) << 24 | 0x0800000;
            break;
        case 2:
            i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 0x08000;
            break;
        case 3:
            i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) <<
            8 | 0x80;
            break;
        }

        word_array.push(i);
        while ((word_array.length % 16) != 14) {
            word_array.push(0);
        }

        word_array.push(str_len >>> 29);
        word_array.push((str_len << 3) & 0x0ffffffff);

        for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
            for (i = 0; i < 16; i++) {
                W[i] = word_array[blockstart + i];
            }
            for (i = 16; i <= 79; i++) {
                W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
            }

            A = H0;
            B = H1;
            C = H2;
            D = H3;
            E = H4;

            for (i = 0; i <= 19; i++) {
                temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }

            for (i = 20; i <= 39; i++) {
                temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }

            for (i = 40; i <= 59; i++) {
                temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }

            for (i = 60; i <= 79; i++) {
                temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }

            H0 = (H0 + A) & 0x0ffffffff;
            H1 = (H1 + B) & 0x0ffffffff;
            H2 = (H2 + C) & 0x0ffffffff;
            H3 = (H3 + D) & 0x0ffffffff;
            H4 = (H4 + E) & 0x0ffffffff;
        }

        temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
        return temp.toLowerCase();

    },

    sizeof: function(mixed_var, mode) {

        //  discuss at: http://phpjs.org/functions/sizeof/
        // original by: Philip Peterson
        //  depends on: count
        //   example 1: sizeof([[0,0],[0,-4]], 'COUNT_RECURSIVE');
        //   returns 1: 6
        //   example 2: sizeof({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
        //   returns 2: 6

        return this.count(mixed_var, mode);

    },

    smilies_pass: function(message) {

        var i = 0,
            orig = [],
            repl = [],
            lCount = this.count(smilies);

        for (i = 0; i < lCount; i += 1) {
			orig.push("/(?<=.\\W|\\W.|^\\W)" + this.preg_quote(smilies[i]['code'], "(?=.\\W|\\W.|\\W$)") + "/gm");
			repl.push('<img class="" src="'+ smilies_path + smilies[i]['smile_url'] + '" alt="' + smilies[i]['emoticon'] + '" />');
		}

        if (this.count(orig) > 0) {
            for (i = 0; i < lCount; i += 1) {
                var iSmile = this.preg_replace(orig[i], repl[i], message);

                message = iSmile;
            }

            message = this.substr(message, 0);
	    }

	    return message;

    },

    strcasecmp: function(f_string1, f_string2) {

        //  discuss at: http://phpjs.org/functions/strcasecmp/
        // original by: Martijn Wieringa
        // bugfixed by: Onno Marsman
        //   example 1: strcasecmp('Hello', 'hello');
        //   returns 1: 0

        var string1 = (f_string1 + '').toLowerCase();
        var string2 = (f_string2 + '').toLowerCase();

        if (string1 > string2) {
            return 1;
        } else if (string1 == string2) {
            return 0;
        }

        return -1;

    },

    stripslashes: function(str) {

        return str.addSlashes();

    },

    strrev: function(string) {

        //       discuss at: https://locutus.io/php/strrev/
        //      original by: Kevin van Zonneveld (https://kvz.io)
        //      bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
        // reimplemented by: Brett Zamir (https://brett-zamir.me)
        //        example 1: strrev('Kevin van Zonneveld')
        //        returns 1: 'dlevennoZ nav niveK'
        //        example 2: strrev('a\u0301haB')
        //        returns 2: 'Baha\u0301' // combining
        //        example 3: strrev('A\uD87E\uDC04Z')
        //        returns 3: 'Z\uD87E\uDC04A' // surrogates
        //             test: 'skip-3'

        string = string + '';

        // Performance will be enhanced with the next two lines of code commented
        // out if you don't care about combining characters
        // Keep Unicode combining characters together with the character preceding
        // them and which they are modifying (as in PHP 6)
        // See https://unicode.org/reports/tr44/#Property_Table (Me+Mn)
        // We also add the low surrogate range at the beginning here so it will be
        // maintained with its preceding high surrogate
        var chars = [
            '\uDC00-\uDFFF',
            '\u0300-\u036F',
            '\u0483-\u0489',
            '\u0591-\u05BD',
            '\u05BF',
            '\u05C1',
            '\u05C2',
            '\u05C4',
            '\u05C5',
            '\u05C7',
            '\u0610-\u061A',
            '\u064B-\u065E',
            '\u0670',
            '\u06D6-\u06DC',
            '\u06DE-\u06E4',
            '\u06E7\u06E8',
            '\u06EA-\u06ED',
            '\u0711',
            '\u0730-\u074A',
            '\u07A6-\u07B0',
            '\u07EB-\u07F3',
            '\u0901-\u0903',
            '\u093C',
            '\u093E-\u094D',
            '\u0951-\u0954',
            '\u0962',
            '\u0963',
            '\u0981-\u0983',
            '\u09BC',
            '\u09BE-\u09C4',
            '\u09C7',
            '\u09C8',
            '\u09CB-\u09CD',
            '\u09D7',
            '\u09E2',
            '\u09E3',
            '\u0A01-\u0A03',
            '\u0A3C',
            '\u0A3E-\u0A42',
            '\u0A47',
            '\u0A48',
            '\u0A4B-\u0A4D',
            '\u0A51',
            '\u0A70',
            '\u0A71',
            '\u0A75',
            '\u0A81-\u0A83',
            '\u0ABC',
            '\u0ABE-\u0AC5',
            '\u0AC7-\u0AC9',
            '\u0ACB-\u0ACD',
            '\u0AE2',
            '\u0AE3',
            '\u0B01-\u0B03',
            '\u0B3C',
            '\u0B3E-\u0B44',
            '\u0B47',
            '\u0B48',
            '\u0B4B-\u0B4D',
            '\u0B56',
            '\u0B57',
            '\u0B62',
            '\u0B63',
            '\u0B82',
            '\u0BBE-\u0BC2',
            '\u0BC6-\u0BC8',
            '\u0BCA-\u0BCD',
            '\u0BD7',
            '\u0C01-\u0C03',
            '\u0C3E-\u0C44',
            '\u0C46-\u0C48',
            '\u0C4A-\u0C4D',
            '\u0C55',
            '\u0C56',
            '\u0C62',
            '\u0C63',
            '\u0C82',
            '\u0C83',
            '\u0CBC',
            '\u0CBE-\u0CC4',
            '\u0CC6-\u0CC8',
            '\u0CCA-\u0CCD',
            '\u0CD5',
            '\u0CD6',
            '\u0CE2',
            '\u0CE3',
            '\u0D02',
            '\u0D03',
            '\u0D3E-\u0D44',
            '\u0D46-\u0D48',
            '\u0D4A-\u0D4D',
            '\u0D57',
            '\u0D62',
            '\u0D63',
            '\u0D82',
            '\u0D83',
            '\u0DCA',
            '\u0DCF-\u0DD4',
            '\u0DD6',
            '\u0DD8-\u0DDF',
            '\u0DF2',
            '\u0DF3',
            '\u0E31',
            '\u0E34-\u0E3A',
            '\u0E47-\u0E4E',
            '\u0EB1',
            '\u0EB4-\u0EB9',
            '\u0EBB',
            '\u0EBC',
            '\u0EC8-\u0ECD',
            '\u0F18',
            '\u0F19',
            '\u0F35',
            '\u0F37',
            '\u0F39',
            '\u0F3E',
            '\u0F3F',
            '\u0F71-\u0F84',
            '\u0F86',
            '\u0F87',
            '\u0F90-\u0F97',
            '\u0F99-\u0FBC',
            '\u0FC6',
            '\u102B-\u103E',
            '\u1056-\u1059',
            '\u105E-\u1060',
            '\u1062-\u1064',
            '\u1067-\u106D',
            '\u1071-\u1074',
            '\u1082-\u108D',
            '\u108F',
            '\u135F',
            '\u1712-\u1714',
            '\u1732-\u1734',
            '\u1752',
            '\u1753',
            '\u1772',
            '\u1773',
            '\u17B6-\u17D3',
            '\u17DD',
            '\u180B-\u180D',
            '\u18A9',
            '\u1920-\u192B',
            '\u1930-\u193B',
            '\u19B0-\u19C0',
            '\u19C8',
            '\u19C9',
            '\u1A17-\u1A1B',
            '\u1B00-\u1B04',
            '\u1B34-\u1B44',
            '\u1B6B-\u1B73',
            '\u1B80-\u1B82',
            '\u1BA1-\u1BAA',
            '\u1C24-\u1C37',
            '\u1DC0-\u1DE6',
            '\u1DFE',
            '\u1DFF',
            '\u20D0-\u20F0',
            '\u2DE0-\u2DFF',
            '\u302A-\u302F',
            '\u3099',
            '\u309A',
            '\uA66F-\uA672',
            '\uA67C',
            '\uA67D',
            '\uA802',
            '\uA806',
            '\uA80B',
            '\uA823-\uA827',
            '\uA880',
            '\uA881',
            '\uA8B4-\uA8C4',
            '\uA926-\uA92D',
            '\uA947-\uA953',
            '\uAA29-\uAA36',
            '\uAA43',
            '\uAA4C',
            '\uAA4D',
            '\uFB1E',
            '\uFE00-\uFE0F',
            '\uFE20-\uFE26'
        ],
            graphemeExtend = new RegExp('(.)([' + chars.join('') + ']+)', 'g');

        // Temporarily reverse
        string = string.replace(graphemeExtend, '$2$1');

        return string.split('').reverse().join('');

    },

    str_pad: function(input, pad_length, pad_string, pad_type) {

        //  discuss at: http://phpjs.org/functions/str_pad/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: Michael White (http://getsprink.com)
        //    input by: Marco van Oort
        // bugfixed by: Brett Zamir (http://brett-zamir.me)
        //   example 1: str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT');
        //   returns 1: '-=-=-=-=-=-Kevin van Zonneveld'
        //   example 2: str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH');
        //   returns 2: '------Kevin van Zonneveld-----'

        var half = '', pad_to_go = '';

        var str_pad_repeater = function(s, len) {

            var collect = '';

            while (collect.length < len) {
                collect += s;
            }

            collect = collect.substr(0, len);

            return collect;

        };

        input += '';
        pad_string = pad_string !== undefined ? pad_string : ' ';

        if (pad_type !== 'STR_PAD_LEFT' && pad_type !== 'STR_PAD_RIGHT' && pad_type !== 'STR_PAD_BOTH') {
            pad_type = 'STR_PAD_RIGHT';
        }

        if ((pad_to_go = pad_length - input.length) > 0) {
            if (pad_type === 'STR_PAD_LEFT') {
                input = str_pad_repeater(pad_string, pad_to_go) + input;
            } else if (pad_type === 'STR_PAD_RIGHT') {
                input = input + str_pad_repeater(pad_string, pad_to_go);
            } else if (pad_type === 'STR_PAD_BOTH') {
                half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
                input = half + input + half;
                input = input.substr(0, pad_length);
            }

        }

        return input;

    },

    str_replace: function(search, replace, subject, count) {

        //  discuss at: http://phpjs.org/functions/str_replace/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: Gabriel Paderni
        // improved by: Philip Peterson
        // improved by: Simon Willison (http://simonwillison.net)
        // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: Onno Marsman
        // improved by: Brett Zamir (http://brett-zamir.me)
        //  revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
        // bugfixed by: Anton Ongson
        // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfixed by: Oleg Eremeev
        // bugfixed by: Glen Arason (http://CanadianDomainRegistry.ca)
        // bugfixed by: Glen Arason (http://CanadianDomainRegistry.ca) Corrected count
        //    input by: Onno Marsman
        //    input by: Brett Zamir (http://brett-zamir.me)
        //    input by: Oleg Eremeev
        //        note: The count parameter must be passed as a string in order
        //        note: to find a global variable in which the result will be given
        //   example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
        //   returns 1: 'Kevin.van.Zonneveld'
        //   example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
        //   returns 2: 'hemmo, mars'
        //   example 3: str_replace(Array('S','F'),'x','ASDFASDF');
        //   returns 3: 'AxDxAxDx'
        //   example 4: str_replace(['A','D'], ['x','y'] , 'ASDFASDF' , 'cnt');
        //   returns 4: 'xSyFxSyF' // cnt = 0 (incorrect before fix)
        //   returns 4: 'xSyFxSyF' // cnt = 4 (correct after fix)

        var i = 0,
            j = 0,
            temp = '',
            repl = '',
            sl = 0,
            fl = 0,
            f = [].concat(search),
            r = [].concat(replace),
            s = subject,
            ra = Object.prototype.toString.call(r) === '[object Array]',
            sa = Object.prototype.toString.call(s) === '[object Array]';
            s = [].concat(s);

        if (typeof (search) === 'object' && typeof (replace) === 'string') {
            temp = replace;
            replace = new Array();
            for (i = 0; i < search.length; i += 1) {
                replace[i] = temp;
            }

            temp = '';
            r = [].concat(replace);
            ra = Object.prototype.toString.call(r) === '[object Array]';
        }

        if (count) { this.window[count] = 0; }

        for (i = 0, sl = s.length; i < sl; i++) {
            if (s[i] === '') { continue; }
            for (j = 0, fl = f.length; j < fl; j++) {
                temp = s[i] + '';
                repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
                s[i] = (temp).split(f[j]).join(repl);
                if (count) { this.window[count] += ((temp.split(f[j])).length - 1); }
            }

        }

        return sa ? s : s[0];

    },

    strright: function(tmp, nRight) {

        var len = this.strlen(tmp);

        if (nRight == 0) {
            str = '';
        } else {
            if (nRight < len) { str = this.Mid(tmp, len - nRight + 1, len); }
        }

        return str;

    },

    strlen: function(string, unicode) {

        //  discuss at: http://phpjs.org/functions/strlen/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: Sakimori
        // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //    input by: Kirk Strobeck
        // bugfixed by: Onno Marsman
        //  revised by: Brett Zamir (http://brett-zamir.me)
        //        note: May look like overkill, but in order to be truly faithful to handling all Unicode
        //        note: characters and to this function in PHP which does not count the number of bytes
        //        note: but counts the number of characters, something like this is really necessary.
        //   example 1: strlen('Kevin van Zonneveld');
        //   returns 1: 19
        //   example 2: ini_set('unicode.semantics', 'on');
        //   example 2: strlen('A\ud87e\udc04Z');
        //   returns 2: 3

        var str = string + '';
        var i = 0,
            chr = '',
            lgth = 0;

        if (!unicode && string) { return string.length; } else if (!string) { return 0; }

        var getWholeChar = function(str, i) {
            var code = str.charCodeAt(i);
            var next = '',
            prev = '';
            if (0xD800 <= code && code <= 0xDBFF) {
            // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
            if (str.length <= (i + 1)) {
                throw 'High surrogate without following low surrogate';
            }
            next = str.charCodeAt(i + 1);
            if (0xDC00 > next || next > 0xDFFF) {
                throw 'High surrogate without following low surrogate';
            }
            return str.charAt(i) + str.charAt(i + 1);
            } else if (0xDC00 <= code && code <= 0xDFFF) {
            // Low surrogate
            if (i === 0) {
                throw 'Low surrogate without preceding high surrogate';
            }
            prev = str.charCodeAt(i - 1);
            if (0xD800 > prev || prev > 0xDBFF) {
                //(could change last hex to 0xDB7F to treat high private surrogates as single characters)
                throw 'Low surrogate without preceding high surrogate';
            }
            // We can pass over low surrogates now as the second component in a pair which we have already processed
            return false;
            }
            return str.charAt(i);
        };

        for (i = 0, lgth = 0; i < str.length; i++) {
            if ((chr = getWholeChar(str, i)) === false) { continue; }
            // Adapt this line at the top of any loop,
            // passing in the whole string and the current iteration and returning a
            // variable to represent the individual character; purpose is to treat the
            // first part of a surrogate pair as the whole character and then ignore
            // the second part.

            lgth++;
        }

        return lgth;

    },

    strpos: function(haystack, needle, offset) {

        //  discuss at: http://phpjs.org/functions/strpos/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: Onno Marsman
        // improved by: Brett Zamir (http://brett-zamir.me)
        // bugfixed by: Daniel Esteban
        //   example 1: strpos('Kevin van Zonneveld', 'e', 5);
        //   returns 1: 14

        var i = (haystack + '').indexOf(needle, (offset || 0));

        return i === -1 ? false : i;

    },

    strip_tags: function(input, allowed) {

        //  discuss at: http://phpjs.org/functions/strip_tags/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: Luke Godfrey
        // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //    input by: Pul
        //    input by: Alex
        //    input by: Marc Palau
        //    input by: Brett Zamir (http://brett-zamir.me)
        //    input by: Bobby Drake
        //    input by: Evertjan Garretsen
        // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfixed by: Onno Marsman
        // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfixed by: Eric Nagel
        // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfixed by: Tomasz Wesolowski
        //  revised by: Rafał Kukawski (http://blog.kukawski.pl/)
        //   example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
        //   returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
        //   example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
        //   returns 2: '<p>Kevin van Zonneveld</p>'
        //   example 3: strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
        //   returns 3: "<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>"
        //   example 4: strip_tags('1 < 5 5 > 1');
        //   returns 4: '1 < 5 5 > 1'
        //   example 5: strip_tags('1 <br/> 1');
        //   returns 5: '1  1'
        //   example 6: strip_tags('1 <br/> 1', '<br>');
        //   returns 6: '1 <br/> 1'
        //   example 7: strip_tags('1 <br/> 1', '<br><br/>');
        //   returns 7: '1 <br/> 1'

        allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)

        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
            commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

        return input.replace(commentsAndPhpTags, '').replace(tags, function($0, $1) {

            return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';

        });

    },

    substr: function(str, start, len, unicode) {

        //  discuss at: http://phpjs.org/functions/substr/
        //     version: 909.322
        // original by: Martijn Wieringa
        // bugfixed by: T.Wild
        // improved by: Onno Marsman
        // improved by: Brett Zamir (http://brett-zamir.me)
        //  revised by: Theriault
        //        note: Handles rare Unicode characters if 'unicode.semantics' ini (PHP6) is set to 'on'
        //   example 1: substr('abcdef', 0, -1);
        //   returns 1: 'abcde'
        //   example 2: substr(2, 0, -6);
        //   returns 2: false
        //   example 3: ini_set('unicode.semantics',  'on');
        //   example 3: substr('a\uD801\uDC00', 0, -1);
        //   returns 3: 'a'
        //   example 4: ini_set('unicode.semantics',  'on');
        //   example 4: substr('a\uD801\uDC00', 0, 2);
        //   returns 4: 'a\uD801\uDC00'
        //   example 5: ini_set('unicode.semantics',  'on');
        //   example 5: substr('a\uD801\uDC00', -1, 1);
        //   returns 5: '\uD801\uDC00'
        //   example 6: ini_set('unicode.semantics',  'on');
        //   example 6: substr('a\uD801\uDC00z\uD801\uDC00', -3, 2);
        //   returns 6: '\uD801\uDC00z'
        //   example 7: ini_set('unicode.semantics',  'on');
        //   example 7: substr('a\uD801\uDC00z\uD801\uDC00', -3, -1)
        //   returns 7: '\uD801\uDC00z'

        var i = 0,
            allBMP = true,
            es = 0,
            el = 0,
            se = 0,
            ret = '';
            str += '';
        var end = str.length;

        switch (unicode) {
        case 'on':
            // Full-blown Unicode including non-Basic-Multilingual-Plane characters
            // strlen()
            for (i = 0; i < str.length; i++) {
                if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
                    allBMP = false;
                    break;
                }

            }

            if (!allBMP) {
                if (start < 0) {
                    for (i = end - 1, es = (start += end); i >= es; i--) {
                        if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
                            start--;
                            es--;
                        }

                    }

                } else {
                    var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

                    while ((surrogatePairs.exec(str)) != null) {
                        var li = surrogatePairs.lastIndex;

                        if (li - 2 < start) {
                            start++;
                        } else {
                            break;
                        }

                    }

                }

                if (start >= end || start < 0) { return false; }
                if (len < 0) {
                    for (i = end - 1, el = (end += len); i >= el; i--) {
                        if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
                            end--;
                            el--;
                        }

                    }

                    if (start > end) { return false; }

                    return str.slice(start, end);
                } else {
                    se = start + len;
                    for (i = start; i < se; i++) {
                        ret += str.charAt(i);
                        if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
                            // Go one further, since one of the "characters" is part of a surrogate pair
                            se++;
                        }

                    }

                    return ret;
                }

            }

            break;
            // Fall-through
        case 'off':
            // assumes there are no non-BMP characters;
            // if there may be such characters, then it is best to turn it on (critical in true XHTML/XML)
        default:
            if (start < 0) { start += end; }

            end = typeof len === 'undefined' ? end : (len < 0 ? len + end : len + start);
            // PHP returns false if start does not fall within the string.
            // PHP returns false if the calculated end comes before the calculated start.
            // PHP returns an empty string if start and end are the same.
            // Otherwise, PHP returns the portion of the string from start to end.
            return start >= str.length || start < 0 || start > end ? !1 : str.slice(start, end);
        }

        // Please Netbeans
        return undefined;

    },

    syntaxHighlight: function(text) {

        /*** Override this function with your own syntaxHighlight function ***/

        return text;

    },

    trim: function(str, charlist) {

        //  discuss at: https://locutus.io/php/trim/
        // original by: Kevin van Zonneveld (https://kvz.io)
        // improved by: mdsjack (https://www.mdsjack.bo.it)
        // improved by: Alexander Ermolaev (https://snippets.dzone.com/user/AlexanderErmolaev)
        // improved by: Kevin van Zonneveld (https://kvz.io)
        // improved by: Steven Levithan (https://blog.stevenlevithan.com)
        // improved by: Jack
        //    input by: Erkekjetter
        //    input by: DxGx
        // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
        //   example 1: trim('    Kevin van Zonneveld    ')
        //   returns 1: 'Kevin van Zonneveld'
        //   example 2: trim('Hello World', 'Hdle')
        //   returns 2: 'o Wor'
        //   example 3: trim(16, 1)
        //   returns 3: '6'

        var whitespace = [' ', '\n', '\r', '\t', '\f', '\x0b', '\xa0',
            '\u2000', '\u2001', '\u2002', '\u2003', '\u2004', '\u2005',
            '\u2006', '\u2007', '\u2008', '\u2009', '\u200a', '\u200b',
            '\u2028', '\u2029', '\u3000'].join(''), l = 0, i = 0;

        str += '';
        if (charlist) { whitespace = (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1'); }

        l = str.length;
        for (i = 0; i < l; i += 1) {
            if (whitespace.indexOf(str.charAt(i)) === -1) {
                str = str.substring(i);
                break;
            }

        }

        l = str.length;
        for (i = l - 1; i >= 0; i--) {
            if (whitespace.indexOf(str.charAt(i)) === -1) {
                str = str.substring(0, i + 1);
                break;
            }

        }

        return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';

    },

    tooltip: function() {

        /*** Override this function with your own tooltip function ***/

    },

    undo_htmlspecialchars: function(input) {

        /**
         * Nathan Codding - August 24, 2000.
         * Takes a string, and does the reverse of the PHP standard function
         * htmlspecialchars().
         */

        input = this.preg_replace("/&gt;/i", ">", input);
        input = this.preg_replace("/&lt;/i", "<", input);
        input = this.preg_replace("/&quot;/i", "\"", input);
        input = this.preg_replace("/&amp;/i", "&", input);

        return input;

    },

    undo_make_clickable: function(text) {

        /**
         * Nathan Codding - Feb 6, 2001
         * Reverses the effects of make_clickable(), for use in editpost.
         * - Does not distinguish between "www.xxxx.yyyy" and "http://aaaa.bbbb" type URLs.
         *
         */

        text = this.preg_replace("#<!-- BBCode auto-link start --><a href=\"(.*?)\" target=\"_blank\">.*?</a><!-- BBCode auto-link end -->#i", "\\1", text);
        text = this.preg_replace("#<!-- BBcode auto-mailto start --><a href=\"mailto:(.*?)\">.*?</a><!-- BBCode auto-mailto end -->#i", "\\1", text);

	    return text;

    },

    urlencode: function(str) {

        //       discuss at: http://phpjs.org/functions/urlencode/
        //      original by: Philip Peterson
        //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //      improved by: Brett Zamir (http://brett-zamir.me)
        //      improved by: Lars Fischer
        //         input by: AJ
        //         input by: travc
        //         input by: Brett Zamir (http://brett-zamir.me)
        //         input by: Ratheous
        //      bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //      bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //      bugfixed by: Joris
        // reimplemented by: Brett Zamir (http://brett-zamir.me)
        // reimplemented by: Brett Zamir (http://brett-zamir.me)
        //             note: This reflects PHP 5.3/6.0+ behavior
        //             note: Please be aware that this function expects to encode into UTF-8 encoded strings, as found on
        //             note: pages served as UTF-8
        //        example 1: urlencode('Kevin van Zonneveld!');
        //        returns 1: 'Kevin+van+Zonneveld%21'
        //        example 2: urlencode('http://kevin.vanzonneveld.net/');
        //        returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
        //        example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
        //        returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'

        str = (str + '').toString();

        // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
        // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
        return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');

    },

    utf8_encode: function(argString) {

        //  discuss at: https://locutus.io/php/utf8_encode/
        // original by: Webtoolkit.info (https://www.webtoolkit.info/)
        // improved by: Kevin van Zonneveld (https://kvz.io)
        // improved by: sowberry
        // improved by: Jack
        // improved by: Yves Sucaet
        // improved by: kirilloid
        // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
        // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
        // bugfixed by: Ulrich
        // bugfixed by: Rafał Kukawski (https://blog.kukawski.pl)
        // bugfixed by: kirilloid
        //   example 1: utf8_encode('Kevin van Zonneveld')
        //   returns 1: 'Kevin van Zonneveld'

        if (argString === null || typeof argString === 'undefined') { return ''; }

        // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        var string = (argString + ''),
            utftext = '', start, end, stringl = 0;

        start = end = 0;
        stringl = string.length;
        for (var n = 0; n < stringl; n += 1) {
            var c1 = string.charCodeAt(n), enc = null;

            if (c1 < 128) {
                end++
            } else if (c1 > 127 && c1 < 2048) {
                enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
            } else if ((c1 & 0xF800) !== 0xD800) {
                enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
            } else {
                // surrogate pairs
                if ((c1 & 0xFC00) !== 0xD800) {
                    throw new RangeError('Unmatched trail surrogate at ' + n);
                }

                var c2 = string.charCodeAt(++n);
                if ((c2 & 0xFC00) !== 0xDC00) {
                    throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
                }

                c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
                enc = String.fromCharCode((c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
            }
            if (enc !== null) {
                if (end > start) { utftext += string.slice(start, end); }

                utftext += enc;
                start = end = n + 1;
            }

        }

        if (end > start) { utftext += string.slice(start, stringl); }

        return utftext

    }

};

function quoteState(obj, obj1) {

    var capa, imgTree;

    capa = document.getElementById(obj);
    imgTree = document.getElementById(obj1);

    if ((capa.style.visibility === 'hidden') || (capa.style.visibility === 'hide' || capa.style.visibility === '')) {
        capa.style.visibility = 'visible';
        capa.style.display = 'block';
        imgTree.src = './images/nolines_minus.png';
    } else {
        capa.style.visibility = 'hidden';
        capa.style.display = 'none';
        imgTree.src = './images/nolines_plus.png';
    }

}
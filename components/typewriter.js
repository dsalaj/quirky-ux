var strDiff = function (original, changed, splitChar) {
    // TODO: maybe replace with https://github.com/jhchen/fast-diff/blob/master/diff.js
    // TODO: to be smarter on matching the common blocks
    if (typeof splitChar == "undefined") {
        splitChar = "";
    }
    var string1 = new Array();
    var string2 = new Array();

    string1 = original.split(splitChar);
    string2 = changed.split(splitChar);
    var diff = new Array();
    var idxs = new Array();
    var add = true;

    if (original.length > changed.length) {
        var length = string1.length;
        for (x = 0; x < length; x++) {
            if (string1[x] != string2[x]) {
                diff.push(string1[x]);
                idxs.push(x);
                break;
            }
        }
        add = true;
    }
    else {
        var length = string2.length;
        for (x = 0; x < length; x++) {
            if (string1[x] != string2[x]) {
                diff.push(string2[x]);
                idxs.push(x);
                break;
            }
        }
        add = false;
    }

    return {
        diff: diff,
        idxs: idxs,
        add: add
    };
};

function get_txt(x) {
    return x.textContent
}
var Student = class {
    constructor(elem) {
        this.elem = elem;
        this.text = elem.textContent;
        this.sound = document.getElementById(elem.getAttribute("rewrite-audio"));
    }
};

var stuff = [];
//var sound = document.getElementById("audio");
window.addEventListener('load', function() {
    var targets = document.getElementsByClassName("rewrite");
    Array.prototype.forEach.call(targets, function(target) {
        stuff.push(new Student(target));
        target.setAttribute("contenteditable", "true"); // make text editable
        target.setAttribute("style", "outline: 0px solid transparent;"); // hide the outline of editable element
        target.setAttribute("spellcheck", "false"); // hide the spell checking underline of editable text
    });
});
function ChangeText() {
    setInterval(function(){
        Array.prototype.forEach.call(stuff, function(s) {
            var a = s.elem.textContent;
            var diff = strDiff(s.text, a);
            var step = 1;
            if(typeof diff.diff[0] !== "undefined"){
                s.sound.play();
                if (diff.add){
                    var output = [a.slice(0, diff.idxs[0]), diff.diff.slice(0, step), a.slice(diff.idxs[0])].join('');
                    s.elem.textContent = output;
                } else {
                    var output = [a.slice(0, diff.idxs[0]), a.slice(diff.idxs[0] + 1)].join('');
                    s.elem.textContent = output;
                }
            } else {
                s.sound.pause();
                s.sound.currentTime = 0;
            }
            diff = null;
        });
    }, 200);
}
ChangeText();
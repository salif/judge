var _input = [[], [], [], [], []];
var _output = [[], [], [], [], []];
var _xml;
var _isRunning = false;
var _console = [[], [], [], [], []];
(function () {
    window.addEventListener("load", function () {
        var exeFile = new XMLHttpRequest();
        exeFile.open("GET", "exercises.xml", true);
        exeFile.onreadystatechange = function () {
            if (exeFile.readyState === 4 && (exeFile.status === 200 || exeFile.status == 0)) {
                var exedEl = document.getElementById("exed");
                var xmlc = exeFile.responseXML.firstChild;
                var exe1d = xmlc.getElementsByTagName("exe1")[0];
                exedEl.innerHTML = "<h3>Exercise 1: " +
                    exe1d.getElementsByTagName("title")[0]
                        .firstChild.nodeValue.trim() + "</h3><pre>" +
                    exe1d.getElementsByTagName("description")[0]
                        .firstChild.nodeValue.trim() + "</pre>";
                _xml = xmlc;
            }
        };
        exeFile.send();
        if (!localStorage.getItem("jcount")) {
            localStorage.setItem("jcount", "0");
        }
        _updateStorage();
    });
    window.addEventListener("error", function (err) {
        alert("Something went wrong! " + err.message);
        _isRunning = false;
    });
    function _updateStorage() {
        var count = parseInt(localStorage.getItem("jcount"), 10);
        var tempdom = document.querySelectorAll("td");
        tempdom.forEach(function (e) { e.remove(); });
        for (var i = 1; i <= count; i++) {
            var jd_data = localStorage.getItem("jd" + i).split("||");
            var tbl = document.getElementById("sbms");
            var tbl_row = tbl.insertRow(-1);
            var tbl_cell1 = tbl_row.insertCell(0);
            var tbl_cell2 = tbl_row.insertCell(1);
            var tbl_cell3 = tbl_row.insertCell(2);
            var tbl_cell4 = tbl_row.insertCell(3);
            tbl_cell1.innerHTML = jd_data[1]
                .replace(/n/g, "&#10008;")
                .replace(/y/g, "&#10004;") +
                " " + jd_data[0] + "/5";
            tbl_cell2.innerHTML = jd_data[2];
            tbl_cell3.innerHTML = jd_data[3];
            tbl_cell4.innerHTML = "<input type='button' value='delete' onclick='_dells(" + i + ")' />";
        }
    }
    function _dells(v) {
        localStorage.removeItem("jd" + v);
        var count = parseInt(localStorage.getItem("jcount"), 10);
        if (v === count) {
            localStorage.setItem("jcount", (count - 1).toString());
            _updateStorage();
            return;
        }
        for (var i = v + 1; i <= count; i++) {
            localStorage.setItem("jd" + (i - 1), localStorage.getItem("jd" + i));
        }
        localStorage.removeItem("jd" + count);
        localStorage.setItem("jcount", (count - 1).toString());
        _updateStorage();
    }
    window["_dells"] = _dells;
    function _run_js(code, args, ci) {
        (function (code) {
            var console = {
                log: function (v) {
                    _console[ci].push(v.toString());
                },
                error: function (v) {
                    _console[ci].push(v.toString());
                },
                warn: function (v) {
                    _console[ci].push(v.toString());
                }
            };
            var _i = -1;
            var alert = function (v) {
                console.log(v);
            };
            var prompt = function (v) {
                return args[++_i];
            };
            var confirm = function () { };
            var _submit = null;
            var _run_code = null;
            var _exeChange = null;
            var _run_js = null;
            var _input = null;
            var _output = null;
            var _xml = null;
            var _isRunning = null;
            var _updateStorage = null;
            var _dells = null;
            var window = null;
            var document = null;
            var XMLHttpRequest = null;
            var fetch = null;
            var open = function () { };
            var close = function () { };
            var screen = null;
            var location = null;
            var history = null;
            var navigator = null;
            var setInterval = null;
            var setTimeout = null;
            var cookie = null;
            var localStorage = null;
            var sessionStorage = null;
            eval(code);
        }).call({}, code);
    }
    function _run_code(lang, code, args) {
        for (var i = 0; i < 5; i++) {
            _run_js(code, args[i], i);
        }
    }
    function _submit() {
        if (_isRunning) {
            alert("Please wait!");
            return;
        }
        _isRunning = true;
        _console = [[], [], [], [], []];
        _input = [[], [], [], [], []];
        _output = [[], [], [], [], []];
        var codeElement = document.getElementById("code");
        var code = codeElement.value;
        var langElement = document.getElementById("lang");
        var lang = langElement.value;
        var exeElement = document.getElementById("exe");
        var exeNum = exeElement.value;
        var xml = _xml.getElementsByTagName("exe" + exeNum)[0];
        _input = [
            xml
                .getElementsByTagName("a1")[0]
                .getElementsByTagName("input")[0]
                .firstChild.nodeValue.trim().split("\n"),
            xml
                .getElementsByTagName("a2")[0]
                .getElementsByTagName("input")[0]
                .firstChild.nodeValue.trim().split("\n"),
            xml
                .getElementsByTagName("a3")[0]
                .getElementsByTagName("input")[0]
                .firstChild.nodeValue.trim().split("\n"),
            xml
                .getElementsByTagName("a4")[0]
                .getElementsByTagName("input")[0]
                .firstChild.nodeValue.trim().split("\n"),
            xml
                .getElementsByTagName("a5")[0]
                .getElementsByTagName("input")[0]
                .firstChild.nodeValue.trim().split("\n")
        ];
        _output = [
            xml
                .getElementsByTagName("a1")[0]
                .getElementsByTagName("output")[0]
                .firstChild.nodeValue.trim().split("\n"),
            xml
                .getElementsByTagName("a2")[0]
                .getElementsByTagName("output")[0]
                .firstChild.nodeValue.trim().split("\n"),
            xml
                .getElementsByTagName("a3")[0]
                .getElementsByTagName("output")[0]
                .firstChild.nodeValue.trim().split("\n"),
            xml
                .getElementsByTagName("a4")[0]
                .getElementsByTagName("output")[0]
                .firstChild.nodeValue.trim().split("\n"),
            xml
                .getElementsByTagName("a5")[0]
                .getElementsByTagName("output")[0]
                .firstChild.nodeValue.trim().split("\n")
        ];
        _run_code(lang, code, _input);
        setTimeout(function () {
            var score = 0;
            var det_score = "";
            for (var i = 0; i < 5; i++) {
                if (_console[i].join("\n") === _output[i].join("\n")) {
                    score++;
                    det_score += "y";
                }
                else {
                    det_score += "n";
                }
            }
            _console = [[], [], [], [], []];
            _input = [[], [], [], [], []];
            _output = [[], [], [], [], []];
            var l_count = parseInt(localStorage.getItem("jcount"), 10) + 1;
            localStorage.setItem("jcount", l_count.toString());
            localStorage.setItem("jd" + l_count, score + "||" + det_score + "||" + exeNum + "||" + new Date().toLocaleString());
            _updateStorage();
            window.scrollTo(0, document.body.scrollHeight);
            _isRunning = false;
        }, 1000);
    }
    window["_submit"] = _submit;
    function _exeChange() {
        var exeNum = "";
        var exeEl = document.getElementById("exe");
        exeNum = exeEl.value;
        document.getElementById("exed").innerHTML = "<h3>Exercise " + exeNum + ": " +
            _xml
                .getElementsByTagName("exe" + exeNum)[0]
                .getElementsByTagName("title")[0]
                .firstChild.nodeValue.trim() + "</h3><pre>" +
            _xml
                .getElementsByTagName("exe" + exeNum)[0]
                .getElementsByTagName("description")[0]
                .firstChild.nodeValue.trim() + "</pre>";
    }
    window["_exeChange"] = _exeChange;
})();

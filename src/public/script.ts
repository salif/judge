import { join } from "path";

let _input: any[][] = [[], [], [], [], []];
let _output: any[][] = [[], [], [], [], []];
let _xml: any;
let _isRunning: boolean = false;
let _console: any[][] = [[], [], [], [], []];

(() => {
    window.addEventListener("load", () => {
        let exeFile: XMLHttpRequest = new XMLHttpRequest();
        exeFile.open("GET", "exercises.xml", true);
        exeFile.onreadystatechange = function () {
            if (exeFile.readyState === 4 && (exeFile.status === 200 || exeFile.status == 0)) {
                let exedEl: any = document.getElementById("exed");
                let xmlc: any = exeFile.responseXML.firstChild;
                let exe1d: any = xmlc.getElementsByTagName("exe1")[0];
                exedEl.innerHTML = "<h3>Exercise 1: " +
                    exe1d.getElementsByTagName("title")[0]
                        .firstChild.nodeValue.trim() + "</h3><pre>" +
                    exe1d.getElementsByTagName("description")[0]
                        .firstChild.nodeValue.trim() + "</pre>";
                _xml = xmlc;
            }
        }
        exeFile.send();
    });

    window.addEventListener("error", (err) => {
        alert("Something went wrong! " + err.message);
        _isRunning=false;
    });

    function _run_js(code: string, args: any, ci: number): void {
        ((code: string) => {
            let console = {
                log: (v: any) => {
                    _console[ci].push(v.toString());
                },
                error: (v: any) => {
                    _console[ci].push(v.toString());
                },
                warn: (v: any) => {
                    _console[ci].push(v.toString());
                }
            };
            let _i: number = -1;
            let alert: Function = (v: any) => {
                console.log(v);
            };
            let prompt: Function = (v: any) => {
                return args[++_i];
            };
            let confirm: Function = () => { };
            let _submit: any = null;
            let _run_code: any = null;
            let _exeChange = null;
            let _run_js: any = null;
            let _input: any = null;
            let _output: any = null;
            let _xml: any = null;
            let _isRunning: any = null;
            let window: any = null;
            let document: any = null;
            let XMLHttpRequest: any = null;
            let fetch: any = null;
            let open: Function = function () { };
            let close: Function = function () { };
            let screen: any = null;
            let location: any = null;
            let history: any = null;
            let navigator: any = null;
            let setInterval: any = null;
            let setTimeout: any = null;
            let cookie: any = null;
            eval(code);
        }).call({}, code);
    }

    function _run_code(lang: string, code: string, args: any[][]) {
        for (let i = 0; i < 5; i++) {
            _run_js(code, args[i], i);
        }
    }

    function _submit(): void {
        if (_isRunning) {
            alert("Please wait!");
            return;
        }
        _isRunning = true;
        const codeElement: any = document.getElementById("code");
        let code: string = codeElement.value;
        const langElement: any = document.getElementById("lang");
        let lang: string = langElement.value;
        const exeElement: any = document.getElementById("exe");
        let exeNum: string = exeElement.value;
        let xml: any = _xml.getElementsByTagName("exe" + exeNum)[0];
        _input = [
            [xml
                .getElementsByTagName("a1")[0]
                .getElementsByTagName("input")[0]
                .firstChild.nodeValue.trim()],
            [xml
                .getElementsByTagName("a2")[0]
                .getElementsByTagName("input")[0]
                .firstChild.nodeValue.trim()],
            [xml
                .getElementsByTagName("a3")[0]
                .getElementsByTagName("input")[0]
                .firstChild.nodeValue.trim()],
            [xml
                .getElementsByTagName("a4")[0]
                .getElementsByTagName("input")[0]
                .firstChild.nodeValue.trim()],
            [xml
                .getElementsByTagName("a5")[0]
                .getElementsByTagName("input")[0]
                .firstChild.nodeValue.trim()],
        ];
        _output = [
            [xml
                .getElementsByTagName("a1")[0]
                .getElementsByTagName("output")[0]
                .firstChild.nodeValue.trim()],
            [xml
                .getElementsByTagName("a2")[0]
                .getElementsByTagName("output")[0]
                .firstChild.nodeValue.trim()],
            [xml
                .getElementsByTagName("a3")[0]
                .getElementsByTagName("output")[0]
                .firstChild.nodeValue.trim()],
            [xml
                .getElementsByTagName("a4")[0]
                .getElementsByTagName("output")[0]
                .firstChild.nodeValue.trim()],
            [xml
                .getElementsByTagName("a5")[0]
                .getElementsByTagName("output")[0]
                .firstChild.nodeValue.trim()],
        ];
        _run_code(lang, code, _input);
        setTimeout(() => {
            alert("console: " + JSON.stringify(_console));
            let score:number=0;
            for (let i=0; i<5; i++) {
                if(_console[i].join("\n") === _output[i].join("\n")) {
                    score++;
                }
            }
            alert("score: " + score);
            _console = [[], [], [], [], []];
            _isRunning = false;
        }, 1000)
    }
    window["_submit"] = _submit;

    function _exeChange(): void {
        let exeNum: string = "";
        const exeEl: any = document.getElementById("exe");
        exeNum = exeEl.value;
        document.getElementById("exed").innerHTML = "<h3>Exercise " + exeNum + ": " +
            _xml
                .getElementsByTagName("exe" + exeNum)[0]
                .getElementsByTagName("title")[0]
                .firstChild.nodeValue.trim() + "</h3><pre>" +
            _xml
                .getElementsByTagName("exe" + exeNum)[0]
                .getElementsByTagName("description")[0]
                .firstChild.nodeValue.trim() + "</pre>"
    }
    window["_exeChange"] = _exeChange;
})();

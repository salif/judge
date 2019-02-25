window.addEventListener("error", (err) => {
    alert("Something went wrong! " + err.message);
});

let _evalCode_orig_code: any[] = [];
let _evalCode_orig_args: any[] = [];
let _evalCode_orig_xml: any;
(() => {
    let _evalCode_con: any[] = [];
    function js(code: string, args: any[]): void {
        ((_evalCode_code) => {
            let console = {
                log: (v: any) => {
                    _evalCode_con.push(v);
                },
                error: (v: any) => {
                    _evalCode_con.push(v);
                },
                warn: (v: any) => {
                    _evalCode_con.push(v);
                }
            };
            const _evalCode_args: any[] = _evalCode_orig_args;
            let _evalCode_i: number = -1;
            let alert: Function = (v: any) => {
                console.log(v);
            };
            let prompt: Function = (v: any) => {
                return _evalCode_args[++_evalCode_i];
            };
            let confirm: Function = () => {};
            let _evalCode_submit: Function = () => { };
            let _evalCode_orig_code: string = "";
            let _evalCode_exeChange = null;
            let window: any = null;
            let document: any = null;
            let XMLHttpRequest: any = null;
            let fetch: any = null;
            let open: Function = function () { };
            let close: Function = function () { };
            let screen: any = null;
            let location: any = null;
            let history: any = null;
            let navigator:any=null;
            let setInterva:any=null;
            let setTimeout:any=null;
            let cookie:any=null;
            eval(_evalCode_code);
        }).call({}, code);
    }
    function _evalCode_submit(): void {
        const codeEl: any = document.getElementById("code");
        let code: string = codeEl.value;
        const langEl: any = document.getElementById("lang");
        let lang: string = langEl.value;
        const exeEl: any = document.getElementById("exe");
        let exe: string = exeEl.value;
        switch (exe) {
            case "exe1":
                let exejs = window["exercises"]["exe1"];
                _evalCode_orig_args = exejs[1];
                _evalCode_orig_code = [exejs[2], exejs[3], exejs[4], exejs[5], exejs[6]];
                break;
        }
        switch (lang) {
            case "js":
                for (let i = 0; i < 5; i++) {
                    js(code, _evalCode_orig_args);
                }
                break;
        }
        setTimeout(() => {
            if (_evalCode_con.join("\n") === _evalCode_orig_code.join()) {
                alert(true);
            }
            else {
                alert(_evalCode_con);
            }
            _evalCode_con = [];
        }, 1000)
    }
    window["_evalCode_submit"] = _evalCode_submit;
    function _evalCode_exeChange(): void {
        let exeNum: string = "";
        const exeEl: any = document.getElementById("exe");
        exeNum = exeEl.value;
        document.getElementById("exed").innerHTML = "<h3>Exercise " + exeNum + ": " +
            _evalCode_orig_xml
                .getElementsByTagName("exe" + exeNum)[0]
                .getElementsByTagName("title")[0]
                .firstChild.nodeValue.trim() + "</h3><pre>" +
            _evalCode_orig_xml
                .getElementsByTagName("exe" + exeNum)[0]
                .getElementsByTagName("description")[0]
                .firstChild.nodeValue.trim() + "</pre>"
    }
    window["_evalCode_exeChange"] = _evalCode_exeChange;
})();
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
            _evalCode_orig_xml = xmlc;
        }
    }
    exeFile.send();
});

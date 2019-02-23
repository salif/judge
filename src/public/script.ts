let _evalCode_orig_code: any[] = [];
let _evalCode_orig_args: any[] = [];
(() => {
    let _evalCode_con: any[] = [];
    function js(code: string, args: any[]) {
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
            let _evalCode_submit: Function = () => { };
            let _evalCode_orig_code: string = "";
            let window: any = {};
            let document: any = {};
            eval(_evalCode_code);
        })(code)
    }
    function _evalCode_submit() {
        const codeEl: any = document.getElementById("code");
        let code: string = codeEl.value;
        const langEl: any = document.getElementById("lang");
        let lang: string = langEl.value;
        const exeEl: any = document.getElementById("code");
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
})();
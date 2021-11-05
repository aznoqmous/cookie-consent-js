export default class Utils {
    static DOMLoaded(){
        return new Promise(res => {
            if(!document.body) document.addEventListener('DOMContentLoaded', ()=>{ res() })
            else res()
        })
    }
}
import Rules from "./rules.json"
import Cookies from "./cookies"
import Utils from "./utils.js"
import Lang from "./lang.js"

export default class CookieConsent {

    static get key(){ return "cookie_consent" }

    constructor(){
        this.getBannedScriptRules()

        this.observe()
    }
    
    init(config){
        this.config = Object.assign({
            services: ["functionnal", "google"],
            title: Lang.get("popupTitle"),
            disclaimer: Lang.get("popupDisclaimer"),
            legalNoticeText: Lang.get('legalNotice'),
            legalNoticeUrl: "/mentions-legales", // to override 
            popupDetailsTitle: Lang.get('popupDetailsTitle'),
            popupDetailsDisclaimer: Lang.get('popupDetailsDisclaimer'),
        }, config)

        Utils.DOMLoaded()
        .then(()=>{
            this.buildPopup()
        })
    }

    /**
     * Data
     */
    getData(){
        return Cookies.get(CookieConsent.key)
    }
    saveData(data){
        Cookies.set(CookieConsent.key, data)
    }

    /**
     * Popup
     */
    buildPopup(){
        this.popup = this.create(document.body, {
            className: "cookie-consent-popup"
        }, "form")

        let title = this.create(this.popup, { innerHTML: this.config.title })
        let disclaimer = this.create(this.popup, { innerHTML: this.config.disclaimer })

        let acceptAll = this.create(this.popup, { innerHTML: Lang.get('allowAll') }, 'button')
        let denyAll = this.create(this.popup, { innerHTML: Lang.get('disallowAll') }, 'button')

        let customize = this.create(this.popup, { innerHTML: Lang.get('customize') })
        customize.addEventListener('click', ()=>{ 
            this.popupDetails.classList.add('active')
         })

        let legalNotice = this.create(this.popup, { 
            innerHTML: this.config.legalNoticeText, 
            href: this.config.legalNoticeUrl
        }, "a")

        this.buildDetailsPopup()
    }

    buildDetailsPopup(){
        let data = this.getData()

        this.popupDetails = this.create(document.body, {
            className: "cookie-consent-popup-details"
        }, "form")
        this.popupDetails.addEventListener('submit', (e)=>{
            e.preventDefault()
        })

        let title = this.create(this.popupDetails, { innerHTML: this.config.popupDetailsTitle })
        let disclaimer = this.create(this.popupDetails, { innerHTML: this.config.popupDetailsDisclaimer })

        let acceptAll = this.create(this.popupDetails, { innerHTML: Lang.get('allowAll') }, 'button')
        let denyAll = this.create(this.popupDetails, { innerHTML: Lang.get('disallowAll') }, 'button')

        let rules = this.create(this.popupDetails)
        this.config.services.map(k => {
            let lang = Lang.get(k)
            let service = this.create(rules, {
                className: "service"
            })
            this.create(service, {
                innerHTML: lang.name
            })
            this.create(service, {
                innerHTML: lang.description,
            })
            let input = this.create(service, { 
                name: k, 
                value: data[k],
                type: 'hidden'
            }, 'input')

            let allow = this.create(service, {
                innerHTML: Lang.get("allow"),
                disabled: Rules[k].mandatory,
                className: "allow"
            }, "button")
            allow.addEventListener('click', ()=>{
                input.value = true
                this.savePopupDetailsData()
                this.updatePopupDetails()
            })

            if(!Rules[k].mandatory){
                let disallow = this.create(service, {
                    innerHTML: Lang.get("disallow"),
                    className: "disallow"
                }, "button")
                disallow.addEventListener('click', ()=>{
                    input.value = false
                    this.savePopupDetailsData()
                    this.updatePopupDetails()
                })
            }
            
        })
        this.updatePopupDetails()
    }
    updatePopupDetails(){
        [...this.popupDetails.querySelectorAll('.service')]
        .map(service => {
            let isAllowed = service.querySelector('input[type="hidden"]').value == "true"
            let allow = service.querySelector('.allow')
            let disallow = service.querySelector('.disallow')
            if(isAllowed){
                allow.classList.add('active')
                if(disallow) disallow.classList.remove('active')
            }
            else {
                allow.classList.remove('active')
                if(disallow) disallow.classList.add('active')
            }
        })
    }
    savePopupDetailsData(){
        let datas = this.getPopupDetailsData()
        this.saveData(datas)
    }
    getPopupDetailsData(){
        let formData = new FormData(this.popupDetails)
        return Object.fromEntries([...formData.entries()].map(entry => [entry[0], entry[1]]))       
    }

    create(parent, attributes={}, tagName="div"){
        let el = document.createElement(tagName)
        for(let key in attributes) el[key] = attributes[key]
        parent.appendChild(el)
        return el
    }

    /**
     * Scripts
     * */

    getBannedScriptRules(){
        let data = this.getData()
        this.bannedScriptRules = []
        Object.keys(Rules)
            .filter(k => data[k] && data[k] != "true")
            .filter(k => Rules[k].scripts)
            .map(k => this.bannedScriptRules = [...this.bannedScriptRules, ...Rules[k].scripts])
    }

    isScriptBanned(script){
        return this.bannedScriptRules.filter(rule => {
            if(script.src) return script.src.match(rule) 
            else return script.innerHTML.match(rule)
        }).length > 0
    }

    /**
     * Cookies
     */

    

    /** 
     * MISC 
     * */

    observe(){
        new MutationObserver((mutations)=>{
            ;[...mutations].map(m => {
                ;[...m.addedNodes]
                .filter(n => n.tagName == "SCRIPT")
                .map(n => {
                    if(this.isScriptBanned(n)) n.type = "javascript/blocked"
                })
            })
        }).observe(document.head, { attributes: true, childList: true, subtree: true })
    }
}
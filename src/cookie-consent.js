import Rules from "./rules.json"
import Cookies from "./cookies"
import Utils from "./utils.js"
import Lang from "./lang.js"

import CookieSvg from "./cookie.svg"

export default class CookieConsent {

    static get key(){ return "cookie_consent" }

    constructor(){
        this.config = {
            services: ["google", "facebook"],
            title: Lang.get("popupTitle"),
            disclaimer: Lang.get("popupDisclaimer"),
            legalNoticeText: Lang.get('legalNotice'),
            legalNoticeUrl: "/mentions-legales", // to override 
            popupDetailsTitle: Lang.get('popupDetailsTitle'),
            popupDetailsDisclaimer: Lang.get('popupDetailsDisclaimer'),
            cookieColor: 'black'
        }
        this.defaultServices = Object.fromEntries(this.config.services.map(s => [ s, false ]))
        this.defaultServices.functionnal = true

        this.getBannedScriptRules()
        this.getBannedCookieRules()

        this.observe()
        this.overrideCookieSetter()
    }
    
    init(config){
        this.config = Object.assign(this.config, config)
        Utils.DOMLoaded()
        .then(()=>{
            this.buildPopup()
        })
    }

    /**
     * Data
     */
    getData(){
        return Object.assign(this.defaultServices, JSON.parse(Cookies.get(CookieConsent.key)))
    }
    saveData(data){
        Cookies.set(CookieConsent.key, JSON.stringify(data))
    }
    isDataSet(){
        return !!(Cookies.get(CookieConsent.key))
    }

    /**
     * Popup
     */
    buildPopup(){
        this.popup = this.create(document.body, {
            className: "cookie-consent-popup"
        }, "div")
        if(!this.isDataSet()) this.popup.classList.add('active')

        let cookieFigure = this.create(this.popup, {}, "figure")
        let cookieImg = this.create(cookieFigure, { 
            src: CookieSvg,
            style: `filter: drop-shadow(0 1.5rem ${this.config.cookieColor})`
        }, 'img')

        let title = this.create(this.popup, { innerHTML: this.config.title })
        let disclaimer = this.create(this.popup, { innerHTML: this.config.disclaimer, className: "disclaimer" })

        let buttons = this.create(this.popup, { className: "buttons" })

        let acceptAll = this.create(buttons, { innerHTML: Lang.get('allowAll') }, 'button')
        let denyAll = this.create(buttons, { innerHTML: Lang.get('disallowAll') }, 'button')
        let customize = this.create(buttons, { innerHTML: Lang.get('customize') }, 'button')
        acceptAll.addEventListener('click', ()=>{ this.acceptAll() })
        denyAll.addEventListener('click', ()=>{ this.denyAll() })

        cookieFigure.addEventListener('click', ()=>{
            this.setPopupDetailsActive()
        })
        customize.addEventListener('click', ()=>{ 
            this.setPopupDetailsActive()
        })

        let legalNotice = this.create(this.popup, { 
            innerHTML: this.config.legalNoticeText, 
            href: this.config.legalNoticeUrl
        }, "a")

        this.buildDetailsPopup()
    }

    buildDetailsPopup(){
        this.popupDetailsContainer = this.create(document.body, {
            className: "cookie-consent-popup-details"
        }, "div")
        this.popupDetails = this.create(this.popupDetailsContainer, {}, 'form')
        this.popupDetails.addEventListener('submit', (e)=>{
            e.preventDefault()
        })
        
        let title = this.create(this.popupDetails, { innerHTML: this.config.popupDetailsTitle }, 'strong')
        let disclaimer = this.create(this.popupDetails, { innerHTML: this.config.popupDetailsDisclaimer, className: "disclaimer" })
        
        let buttons = this.create(this.popupDetails, { className: "buttons" })
        let acceptAll = this.create(buttons, { innerHTML: Lang.get('allowAll') }, 'button')
        let denyAll = this.create(buttons, { innerHTML: Lang.get('disallowAll') }, 'button')
        acceptAll.addEventListener('click', ()=>{ this.acceptAll() })
        denyAll.addEventListener('click', ()=>{ this.denyAll() })

        let services = this.create(this.popupDetails, {className: "services"})
        this.addService('functionnal', services)
        this.config.services.map(k => {
            this.addService(k, services)
        })
        this.updatePopupDetails()

        let legalNotice = this.create(this.popupDetails, { 
            innerHTML: this.config.legalNoticeText, 
            href: this.config.legalNoticeUrl
        }, "a")
    }
    addService(k, parent){
        let data = this.getData()
        let lang = Lang.get(k)
        let service = this.create(parent, {
            className: "service"
        })
        let serviceDetails = this.create(service)
        this.create(serviceDetails, {
            innerHTML: lang.name
        }, 'strong')
        this.create(serviceDetails, {
            innerHTML: lang.description,
        })
        let input = this.create(service, { 
            name: k, 
            value: data[k],
            required: Rules[k].mandatory,
            type: 'hidden'
        }, 'input')

        let buttons = this.create(service, { className: "buttons" })
        let allow = this.create(buttons, {
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
            let disallow = this.create(buttons, {
                innerHTML: Lang.get("disallow"),
                className: "disallow"
            }, "button")
            disallow.addEventListener('click', ()=>{
                input.value = false
                this.savePopupDetailsData()
                this.updatePopupDetails()
            })
        }
    }
    acceptAll(){
        [...this.popupDetails.querySelectorAll('.service input[type="hidden"]')]
        .map(input => input.value = true)
        this.updatePopupDetails()
        this.savePopupDetailsData()
        this.popup.classList.remove('active')
    }
    denyAll(){
        [...this.popupDetails.querySelectorAll('.service input[type="hidden"]:not([required])')]
        .map(input => input.value = false)
        this.updatePopupDetails()
        this.savePopupDetailsData()
        this.popup.classList.remove('active')
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
        this.getBannedCookieRules()
        this.deleteBannedCookies()
    }
    getPopupDetailsData(){
        let formData = new FormData(this.popupDetails)
        return Object.fromEntries([...formData.entries()].map(entry => [entry[0], entry[1]]))       
    }

    setPopupDetailsActive(){
        this.popupDetailsContainer.classList.add('active')
        let hidePopupDetails = (e)=>{
            if(!this.popupDetails.contains(e.target)) {
                this.popupDetailsContainer.classList.remove('active')
                document.removeEventListener('click', hidePopupDetails)
            }
        }
        setTimeout(()=>{
            document.addEventListener('click', hidePopupDetails)
        })
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
            .filter(k => data && data[k] && data[k] != "true")
            .filter(k => Rules[k].scripts)
            .map(k => this.bannedScriptRules = [...this.bannedScriptRules, ...Rules[k].scripts])
    }

    isScriptBanned(script){
        return this.bannedScriptRules.some(rule => 
            (script.src && script.src.match(rule))
            || script.innerHTML.match(rule)
        )
    }

    /**
     * Cookies
     */
    getBannedCookieRules(){
        let data = this.getData()
        this.bannedCookieRules = []
        Object.keys(Rules)
            .filter(k => data && data[k] && data[k] !== "true")
            .filter(k => Rules[k].cookies)
            .map(k => this.bannedCookieRules = [...this.bannedCookieRules, ...Rules[k].cookies])
    }
    deleteBannedCookies(){
        Object.keys(Cookies.getAll())
        .map(key => {
            if(this.bannedCookieRules.some(rule => key.match(rule))) Cookies.remove(key, "/")
        })
    }
    

    /** 
     * MISC 
     * */
    observe(){
        new MutationObserver((mutations)=>{
            ;[...mutations].map(m => {
                ;[...m.addedNodes]
                .filter(n => n.tagName == "SCRIPT")
                .map(n => {
                    if(this.isScriptBanned(n)) {
                        n.type = "javascript/blocked"
                    }
                })
            })
        }).observe(document.head, { attributes: true, childList: true, subtree: true })
    }
    overrideCookieSetter(){
        let cookieSetterOrig = document.__lookupSetter__("cookie");
        let cookieGetterOrig = document.__lookupGetter__("cookie");
        let self = this
        this.getBannedCookieRules()
        Object.defineProperty(document, 'cookie', {
            set: function(value){
                if (!value.match("cookie-consent") && self.bannedCookieRules.some(rule => value.match(rule))) {
                    return;
                }
                return cookieSetterOrig.apply(document, arguments)
            },
            get:  function(){
                return cookieGetterOrig.apply(document);
            },
            configurable: true
        })
    }
}
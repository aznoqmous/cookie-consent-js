import Rules from "./rules.json"
import Cookies from "./cookies"
import Utils from "./utils.js"
import Lang from "./lang.js"

import CookieSvg from "./cookie.svg"

export default class CookieConsent {

    static get key(){ return "cookie_consent" }

    constructor(){
        this.config = {
            services: Object.keys(Rules).filter(key => key != "functionnal"),
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
        this.getBannedIframeRules()


        this.observe()
        this.overrideCookieSetter()
    }
    
    init(config){
        this.config = Object.assign(this.config, config)
        Utils.DOMLoaded()
        .then(()=>{
            this.buildPopup()
        })
        this.deleteBannedCookies()
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

    get enabledServices(){
        return ['functionnal', ...this.config.services]
    }

    get allowedRules(){
        let data = this.getData() 
        return Object.fromEntries(
            Object.keys(Rules)
            .filter(k => !data || typeof data[k] == 'undefined' || data[k] == 'true')
            .map(k => ([k, Rules[k]]))
        )
    }
        
    get disallowedRules(){
        let data = this.getData() 
        return Object.fromEntries(
            Object.keys(Rules)
            .filter(k => data && typeof data[k] !== 'undefined' && data[k] != 'true')
            .map(k => ([k, Rules[k]]))
        )
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
            innerHTML: CookieSvg,
            style: `fill: ${this.config.cookieColor}`
        }, 'figure')

        let title = this.create(this.popup, { innerHTML: this.config.title })
        let disclaimer = this.create(this.popup, { innerHTML: this.config.disclaimer, className: "disclaimer" })

        let buttons = this.create(this.popup, { className: "buttons" })

        let acceptAll = this.create(buttons, { 
            innerHTML: Lang.get('allowAll'),
            className: "allow"
        }, 'button')
        let denyAll = this.create(buttons, { 
            innerHTML: Lang.get('disallowAll'),
            className: "disallow"
        }, 'button')

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
        let acceptAll = this.create(buttons, { 
            innerHTML: Lang.get('allowAll'),
            className: "allow"
        }, 'button')
        let denyAll = this.create(buttons, { 
            innerHTML: Lang.get('disallowAll'),
            className: "disallow"
        }, 'button')
        acceptAll.addEventListener('click', ()=>{ this.acceptAll() })
        denyAll.addEventListener('click', ()=>{ this.denyAll() })


        let services = this.create(this.popupDetails, {className: "services"})
        this.addedTypes = {}
        Object.keys(Rules).filter(r => this.enabledServices.includes(r)).map(key =>  this.addedTypes[Rules[key].type] = false)
        this.enabledServices
        .sort((a,b)=> {
            if(Rules[a].type == 'functionnal') return -1
            if(Rules[b].type == 'functionnal') return 1
            else return Rules[a].type > Rules[b].type ? 1 : -1
        })
        .map(k => {
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
        let serviceType = Rules[k].type
        if(!this.addedTypes[serviceType]){
            this.create(parent, { 
                innerHTML: Lang.get("types")[serviceType],
                className: "type"
            }, 'small')
            this.addedTypes[serviceType] = true
        }

        let service = this.create(parent, {
            className: "service"
        })
        let serviceDetails = this.create(service, { className: "details" })
        this.create(serviceDetails, {
            innerHTML: lang.name
        }, 'strong')
        this.create(serviceDetails, {
            innerHTML: lang.description,
        }, 'small')
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
    accept(key){
        let field = this.popupDetails.querySelector(`.service input[name="${key}"]`)
        field.value = true
        field.parentElement.querySelector('.allow').classList.add('active')
        field.parentElement.querySelector('.disallow').classList.remove('active')
        this.updatePopupDetails()
        this.savePopupDetailsData()
    }
    deny(key){
        this.popupDetails.querySelector(`.service input[name="${key}"]`).value = false
        this.updatePopupDetails()
        this.savePopupDetailsData()
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
        this.bannedScriptRules = []
        Object.values(this.disallowedRules)
        .filter(rule => rule.scripts)
        .map(rule => this.bannedScriptRules.push(...rule.scripts))
        console.log(this.bannedScriptRules)
    }
    isScriptBanned(script){
        return this.bannedScriptRules.some(rule => 
            (script.src && script.src.match(rule))
            || (!script.innerHTML.match("CookieConsent") && script.innerHTML.match(rule))
        )
    }

    /**
     * Cookies
     */
    getBannedCookieRules(){
        this.bannedCookieRules = []
        Object.values(this.disallowedRules)
        .filter(rule => rule.cookies)
        .map(rule => this.bannedCookieRules.push(...rule.cookies))
    }
    deleteBannedCookies(){
        Object.keys(Cookies.getAll())
        .filter(key => this.bannedCookieRules.some(rule => key.match(rule)))
        .map(key => Cookies.remove(key, "/"))
    }
    
    /**
     * Iframes
     */
    getBannedIframeRules(){
        this.bannedIframeRules = [] 
        Object.values(this.disallowedRules)
        .filter(rule => rule.iframes)
        .map(rule => this.bannedIframeRules.push(...rule.iframes))
    }
    isIframeBanned(iframe){
        return this.bannedIframeRules.some(rule => 
            iframe.src && iframe.src.match(rule)
        )
    }
    iframeBannedBy(iframe){
        let matchingRules = this.bannedIframeRules.filter(rule => iframe.src.match(new RegExp(rule)))
        if(!matchingRules.length) return false

        let matchingRule = matchingRules[0]

        let matchingServices = Object.keys(Rules)
            .filter(r => this.enabledServices.includes(r))
            .filter(r => Rules[r].iframes)
            .filter(r => Rules[r].iframes && Rules[r].iframes.includes(matchingRule))

        return matchingServices.length ? matchingServices[0] : false
    }
    disableIframe(iframe){
        if(!iframe.src) return null
        let key = this.iframeBannedBy(iframe)
        iframe.setAttribute('data-src', iframe.src)
        iframe.removeAttribute('src')
        iframe.disabled = true
        iframe.classList.add('cookie-consent-blocked')
        

        let styles = window.getComputedStyle(iframe)
        let figureIframe = this.create(iframe.parentElement, { 
            className: "cookie-consent-iframe",
            style: `width: ${styles.width}; height: ${styles.height}`
        }, 'figure')
        this.create(figureIframe, {
            innerHTML: Lang.get("iframeBlocked").replace("%s", Lang.get(key).name)
        })
        let allowButton = this.create(figureIframe, {
            innerHTML: Lang.get("allow")
        }, 'button')
        allowButton.addEventListener('click', ()=>{
            this.accept(key)
            window.location.reload()
        })
        iframe.parentElement.insertBefore(figureIframe, iframe)
        iframe.parentElement.insertBefore(iframe, figureIframe)

    }

    /** 
     * MISC 
     * */
    observe(){
        new MutationObserver((mutations)=>{
            ;[...mutations].map(m => {
                ;[...m.addedNodes]
                .filter(n => n.tagName == "SCRIPT" && this.isScriptBanned(n))
                .map(n => n.type = "javascript/blocked")
                
                ;[...m.addedNodes]
                .filter(n => n.tagName == 'IFRAME' && this.isIframeBanned(n))
                .map(n => this.disableIframe(n))
            })
        }).observe(document.head, { attributes: true, childList: true, subtree: true })

        document.addEventListener('DOMContentLoaded', ()=>{
            ;[...document.querySelectorAll('iframe')]
                .filter(iframe => this.isIframeBanned(iframe))
                .map(iframe => this.disableIframe(iframe))
        })
    }
    overrideCookieSetter(){
        let cookieSetterOrig = document.__lookupSetter__("cookie");
        let cookieGetterOrig = document.__lookupGetter__("cookie");
        let self = this
        this.getBannedCookieRules()
        Object.defineProperty(document, 'cookie', {
            set: function(value){
                if (!value.match(/cookie_consent_js/) && self.bannedCookieRules.some(rule => value.match(rule))) {
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
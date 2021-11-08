import CookieConsent from "./cookie-consent"
import Style from "../scss/style.scss"

let style = document.createElement('style')
style.innerHTML = Style.toString()
document.head.appendChild(style)

window.CookieConsent = new CookieConsent()
# cookie-consent-js
`tarteau-citron` like cookie settings widget, but doesnt break with mootools

## How to use
Link cookie-consent script way up your `<head>` so it loads first
```html
<script src="<path to cookie-consent>/cookie-consent.min.js"></script>
```

Call `CookieConsent.init()` afterwards
```html
<script>
    CookieConsent.init()
</script>
```

## Settings
You can override default settings by passing a configuration object to `CookieConsent.init()`
```html
<script>
    CookieConsent.init({
        /* 
        * Services to use on this site 
        * "functionnal" is added afterwards
        * */
        services: [
            "google", 
            "facebook"
        ], 

        title: "", // title of the fixed widget
        disclaimer: "", // disclaimer of the fixed widget
        legalNoticeText: "", // text of the legal notice link
        legalNoticeUrl: "/mentions-legales", // href of the legal notice link

        popupDetailsTitle: "", // title of the "details" popup
        popupDetailsDisclaimer: "", // disclaimer of the "details" popup

        cookieColor: "black" // color of the fixed widget cookie image
    })
</script>
```
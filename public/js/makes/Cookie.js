class Cookie {
    static get(name) {
        if(!this.exist()) {
            return;
        }

        var matches = window.document.cookie.match(
            new RegExp("(?:^|; )"+name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')+ "=([^;]*)")
        );
        var value =  matches ? decodeURIComponent(matches[1]) : undefined;

        try {
            value = JSON.parse(value);
        }
        catch(e){}

        return value;
    }

    static set(name, value, options) {
        if(this.exist()) {
            if(typeof value != "string" || !isNaN(value)) {
                value = JSON.stringify(value);
            }

            options = options || {};
            var expires = options.expires;
            if(typeof expires == "number" && expires) {
                var d = new Date();
                d.setTime(d.getTime() + expires * 1000);
                expires = options.expires = d;
            }

            if(expires && expires.toUTCString) {
                options.expires = expires.toUTCString();
            }

            value = encodeURIComponent(value);
            var updatedCookie = name + "=" + value;

            for(var propName in options) {
                updatedCookie += "; " + propName;
                var propValue = options[propName];
                if(propValue !== true) {
                    updatedCookie += "=" + propValue;
                }
            }

            window.document.cookie = updatedCookie;
        }
        else {

        }
    }

    static delete(name) {
        if(this.exist()) {
            this.set(name, "", {expires: -1});
        }
        else {

        }
    }

    static clear() {
        if(this.exist()) {
            document.cookie = "";
            return true;
        }
        return false;
    }

    static exist() {
        return window.navigator.cookieEnabled;
    }
}

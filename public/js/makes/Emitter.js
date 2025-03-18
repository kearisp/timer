class Emitter {
    on(evt, handler) {
        if(typeof this.__events === "undefined")
            this.__events = {};

        if(typeof this.__events[evt] === "undefined") {
            this.__events[evt] = [];
        }

        this.__events[evt].push(handler);
    }

    off(evt) {

    }

    emit(evt, params) {
        if(!this.__events || !this.__events[evt]) {
            return;
        }

        for(const i in this.__events[evt]) {
            this.__events[evt][i].apply(this, Array.isArray(params) ? params : []);
        }
    }
}

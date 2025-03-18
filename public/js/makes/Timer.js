class Timer extends Emitter {
    constructor(time) {
        super();

        console.log(time);

        this.init(time);
    }

    start() {
        if(!this.run) {
            this.run = true;

            this.time = this.getTime();
            this.start_time = new Date() * 1;

            this._step(this.start_time);
        }
    }

    _step() {
        const _this = this;

        if(this.run) {
            setTimeout(function() {
                _this._step();
            }, 0);
        }
        else {
            this.time = this.getTime();
            this.start_time = 0;
        }

        this.emit("step");
        //this.log();
    }

    log() {
        let d, h, m, s = (this.getTime()) / 1000;

        d = Math.floor(s / 24 / 60 / 60);
        if(d >= 1)
            s -= d * 24 * 60 * 60;
        h = Math.floor(s / 60 / 60);
        if(h >= 1)
            s -= h * 60 * 60;
        m = Math.floor(s / 60);
        if(m >= 1)
            s -= m * 60;
        s = Math.floor(s);

        console.log(d + "d", h + "h", m + "m", s + "s");
    }

    getTimerStr() {
        var d, h, m, s = (this.getTime()) / 1000;

        d = Math.floor(s / 24 / 60 / 60);
        if(d >= 1)
            s -= d * 24 * 60 * 60;
        h = Math.floor(s / 60 / 60);
        if(h >= 1)
            s -= h * 60 * 60;
        m = Math.floor(s / 60);
        if(m >= 1)
            s -= m * 60;
        s = Math.floor(s);

        return d + "d" + " " + h + "h" + " " + m + "m" + " " + s + "s";
    }

    getTime() {

        if(this.start_time > 0) {
            return this.time + (new Date() * 1 - this.start_time);
        }

        return this.time;
    }

    stop() {
        this.run = false;
    }

    clear() {
        this.time = 0;
    }

    init(time) {
        if(typeof time === "undefined")
            time = 0;

        this.time = time;
        this.run = false;
        this.data = {};
    }
}

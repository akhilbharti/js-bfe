/*
#36. create a Fake Timer(setTimeout)
*/

class FakeTimer {
    constructor() {
        this.originalImp = {
            setTimeout: window.setTimeout,
            clearTimeout: window.clearTimeout,
            dateNow: Date.now
        }
        this.timerId = 0;
        this.queue = [];
        this.currentTime = 0
    }

    install() {
        window.setTimeout = (callback, delay, ...args) => {
            const id = this.timerId++;
            this.queue.push({
                id,
                callback,
                time: this.currentTime + delay,
                args
            });
            this.queue.sort((a, b) => b.time - a.time)
            return id;
        }

        window.clearTimeout = (removeId) => {
            this.queue = this.queue.filter(({ id }) => id !== removeId)
        }

        Date.now = () => this.currentTime;
    }

    uninstall() {
        window.setTimeout = this.originalImp.setTimeout;
        window.clearTimeout = this.originalImp.clearTimeout;
        Date.now = this.originalImp.dateNow;
    }

    tick() {
        while (this.queue.length) {
            const { callback, time, args } = this.queue.pop();
            this.currentTime = time;
            callback(...args)
        }
    }
}
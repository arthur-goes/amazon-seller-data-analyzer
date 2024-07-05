class Logger {
    
    constructor(showLogs = false) {
        this.showLogs = showLogs;
    }

    log(message){
        if (this.showLogs) {
            console.log(message);
        }
    }

}

module.exports = Logger;
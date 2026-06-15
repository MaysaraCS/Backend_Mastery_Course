class Logger {
    constructor(){
        // singleton pattern , only one object of the class logger will be created in this application 
        if(!Logger.instance){
            Logger.instance = this;
        }
        return Logger.instance; 
    }

    log(level,message,metadata ={}){
        const logObject = {
            level, level,
            message, message,
            timestamp: Date.now(),
            ...metadata
        };
        // this could call datadog logger in more advanced implementation, for now we will just log to console
        console.log(JSON.stringify(logObject));
    }

    info(message,metadata ={}){
        this.log('info',message,metadata);
    }
    error(message,metadata ={}){
        this.log('error',message,metadata);
    }
    warn(message,metadata ={}){
        this.log('warn',message,metadata);
    }
    debug(message,metadata ={}){
        this.log('debug',message,metadata);
    }
}

const logger = new Logger();
module.exports = logger;
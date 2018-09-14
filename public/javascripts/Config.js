const debugMode = false;

function getPort() {
    if(debugMode){
        return 8089
    }
    return 8090
}

module.exports = {
    getPort
}

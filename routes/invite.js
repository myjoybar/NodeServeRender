const express = require("express");
const router = express.Router();
var path = require('path'); //系统路径模块
var fs = require('fs'); //文件模块
var Log = require('../public/javascripts/Log.js'); //
router.get("/:channel/:language/:moduleName", function (req, res) {
    Log.printLog(req.params);
    var file = path.join(__dirname, '../public/json/meta.json');
    //读取json文件
    fs.readFile(file, 'utf-8', function (err, data) {
        if (err) {
            res.send('server is busy');
        } else {
            // Log.printLog(data);
            var channel = req.params.channel
            var language = req.params.language
            var moduleName = req.params.moduleName
            Log.printLog("channel=" + channel)
            Log.printLog("language=" + language)
            Log.printLog("moduleName=" + moduleName)
            var jsonMeta = JSON.parse(data);
            var newMeta = null;
            for (var i = 0, l = jsonMeta.metas.length; i < l; i++) {
                var myJson = jsonMeta.metas[i];
                for (var valLanguage in myJson) {
                    Log.printLog("valLanguage= " + valLanguage);
                    if (valLanguage == language) {
                        var originData = myJson[valLanguage];
                        Log.printLog("originData=" + JSON.stringify(originData))
                        for (var k in originData) {
                            Log.printLog("moduleName= " + moduleName);
                            var originMetaData = originData[k];
                            Log.printLog("originMetaData= " + JSON.stringify(originMetaData));
                            Log.printLog("originMetaData.description= " + originMetaData.description);
                            if (originMetaData.moduleName == moduleName) {
                                originMetaData.og_image = combineImageUrl(language,moduleName)
                                originMetaData.og_url = combineOrgUrl(channel, language, moduleName)
                                newMeta = originMetaData;
                                break;
                            }
                        }
                    }
                }
            }
            if (Log.isEmpty(newMeta)) {
                newMeta = defaultMeta(channel, language, moduleName)
            }
            Log.printLog("newMeta=" + JSON.stringify(newMeta))
            res.render("invite", {
                channel: req.params.channel,
                language: req.params.language,
                moduleName: req.params.moduleName,
                inviteKey: req.query.i,
                inviteKeyD: req.query.d,
                metadata: newMeta,
                 resourceHost: "http://www.talkyou.me/public",
                // resourceHost: "",
            });

            // res.send("express is started! this is index!");
        }
    });
})

function defaultMeta(channel, language, moduleName) {
    Log.printLog("channel=" + channel + ", language=" + language + ", moduleName=" + moduleName)
    var metaObj = new Object()
    metaObj.channel = channel
    metaObj.language = language
    metaObj.moduleName = moduleName
    metaObj.description = "Join TalkU to enjoy free calls and texts, you will like it."
    metaObj.og_title = "Free Calls & Free Texts";
    metaObj.og_image = "/images/share/en/share_f.png"
    metaObj.og_url = combineOrgUrl(channel, language, moduleName)
    metaObj.og_site_name = "talkyou.me"
    metaObj.og_type = "article"
    return metaObj
}

function combineOrgUrl(channel, language, moduleName) {
    var url = "http://talkyou.me/invite/" + channel + "/" + language + "/" + moduleName
    return url
}

function combineImageUrl(language,moduleName) {
    var imgUrl = "/images/share/"+language+"/share_" + moduleName + ".png"
    return imgUrl

}


module.exports = router;

//http://127.0.0.1:8086/invite/fb/en/a
//http://127.0.0.1:8086/invite/fb/en/a?i=aaaaa
//http://127.0.0.1:8089/invite/fqq/cnt/a?i=aaaaa&d=123
//http://e382c873.ngrok.io/invite/fqq/cnt/a?i=aaaaa&d=123
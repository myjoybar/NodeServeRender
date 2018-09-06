const express = require("express");
const router = express.Router();
var path = require('path'); //系统路径模块
var fs = require('fs'); //文件模块
router.get("/:channel/:language/:module", function (req, res) {
    console.log(req.params);
    var file = path.join(__dirname, '../public/json/meta.json');
    //读取json文件
    fs.readFile(file, 'utf-8', function (err, data) {
        if (err) {
            res.send('server is busy');
        } else {
            // console.log(data);
            var channel = req.params.channel
            var language = req.params.language
            var module = req.params.module
            console.log("channel=" + channel)
            console.log("language=" + language)
            console.log("module=" + module)
            var jsonMeta = JSON.parse(data);
            var newMeta = null;
            for (var i = 0, l = jsonMeta.metas.length; i < l; i++) {
                var myJson = jsonMeta.metas[i];
                for (var valLanguage in myJson) {
                    console.log("valLanguage= " + valLanguage);
                    if (valLanguage == language) {
                        var originData = myJson[valLanguage];
                        console.log("originData=" + JSON.stringify(originData))
                        for (var k in originData) {
                            console.log("module= " + module);
                            var originMetaData = originData[k];
                            console.log("originMetaData= " + JSON.stringify(originMetaData));
                            console.log("originMetaData.description= " + originMetaData.description);
                            if (originMetaData.module == module) {
                                originMetaData.og_image = combineImageUrl(language,module)
                                originMetaData.og_url = combineOrgUrl(channel, language, module)
                                newMeta = originMetaData;
                                break;
                            }
                        }
                    }
                }
            }
            if (isEmptyObj(newMeta)) {
                newMeta = deFaultMeta(channel, language, module)
            }
            console.log("newMeta=" + JSON.stringify(newMeta))
            res.render("invite", {
                channel: req.params.channel,
                language: req.params.language,
                module: req.params.module,
                inviteKey: req.query.i,
                inviteKeyD: req.query.d,
                metadata: newMeta,
            });

            // res.send("express is started! this is index!");
        }
    });
})

function deFaultMeta(channel, language, module) {
    console.log("channel=" + channel + ", language=" + language + ", module=" + module)
    var metaObj = new Object()
    metaObj.channel = channel
    metaObj.language = language
    metaObj.module = module
    metaObj.description = "Join TalkU to enjoy free calls and texts, you will like it."
    metaObj.og_title = "Free Calls & Free Texts";
    metaObj.og_image = "/images/share/en/share_f.png"
    metaObj.og_url = combineOrgUrl(channel, language, module)
    metaObj.og_site_name = "talkyou.me"
    metaObj.og_type = "article"
    return metaObj
}

function combineOrgUrl(channel, language, module) {
    var url = "http://talkyou.me/invite/" + channel + "/" + language + "/" + module
    return url
}

function combineImageUrl(language,module) {
    var imgUrl = "/images/share/"+language+"/share_" + module + ".png"
    return imgUrl

}

function isEmptyObj(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return true;
    } else {
        return false;
    }
}

module.exports = router;

//http://127.0.0.1:8086/invite/fb/en/a
//http://127.0.0.1:8086/invite/fb/en/a?i=aaaaa
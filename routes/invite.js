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
            var channel= req.params.channel
            var language= req.params.language
            var module= req.params.module
            console.log("channel="+channel)
            console.log("language="+language)
            console.log("module="+module)

            var jsonMeta = JSON.parse(data);
            var newMeta = null;

            for(var i=0,l=jsonMeta.metas.length;i<l;i++){
                var obi = jsonMeta.metas[i];
                console.log("originData = "+obi);
                if(obi.language==language){
                    console.log("originData = "+obi);
                    newMeta = obi;
                    newMeta.og_image = "/images/share/cn/share_"+module+".png"
                    newMeta.og_url = "http://talkyou.me/invite/"+channel+"/"+language+"/"+module
                }

            }

           // var meta = jsonMeta.metas[1];
            var meta = newMeta;
            res.render("invite", {
                channel: req.params.channel,
                language: req.params.language,
                module: req.params.module,
                inviteKey: req.query.i,
                inviteKeyD: req.query.d,
                metadata: meta,
            });
        }
    });
})
module.exports = router;

//http://127.0.0.1:8086/invite/fb/en/a
//http://127.0.0.1:8086/invite/fb/en/a?i=aaaaa
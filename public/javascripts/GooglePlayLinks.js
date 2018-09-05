function getGooglePlayUrlByChannel(from) {
    return getGooglePlayUrlByChannelAndInviteKey(from, "");
}

function getGooglePlayUrlByChannelAndInviteKey(from, invitekey) {
    var headLink = "https://play.google.com/store/apps/details?id=me.talkyou.app.im&referrer=utm_source%3D";

    var clickLinks = "";
    switch (from) {

        case 'fe':
            clickLinks = headLink + "email";
            break;
        case 'ff':
            clickLinks = headLink + "facebook";
            break;
        case 'fm':
            clickLinks = headLink + "messager";
            break;
        case 'fqg':
            clickLinks = headLink + "qqGroup";
            break;
        case 'fqq':
            clickLinks = headLink + "qq";
            break;
        case 'fs':
            clickLinks = headLink + "sms";
            break;
        case 'fsina':
            clickLinks = headLink + "sina";
            break;
        case 'ft':
            clickLinks = headLink + "twitter";
            break;
        case 'fwa':
            clickLinks = headLink + "whatsApp";
            break;
        case 'fwf':
            clickLinks = headLink + "wechatFriend";
            break;
        case 'fwg':
            clickLinks = headLink + "wechatGroup";
            break;
        case 'fl':
            clickLinks = headLink + "fl";
            break;
        case 'google_ad':
            clickLinks = headLink + "google_ad";
            break;
        case 'google_adnew':
            clickLinks = headLink + "google_adnew";
            break;
        case 'othersocial':
            clickLinks = headLink + "othersocial";
            break;

        case 'fsnap':
            clickLinks = headLink + "Snapchat";
            break;
        case 'fskyp':
            clickLinks = headLink + "Skype";
            break;
        case 'fmel':
            clickLinks = headLink + "Messenger_Lite";
            break;
        case 'ffal':
            clickLinks = headLink + "Facebook_Lite";
            break;
        case 'fins':
            clickLinks = headLink + "Instagram";
            break;
        case 'fkik':
            clickLinks = headLink + "Kik";
            break;
        case 'fhangt':
            clickLinks = headLink + "Hangouts";
            break;
        case 'ftele':
            clickLinks = headLink + "Telegram";
            break;
        case 'fline':
            clickLinks = headLink + "LINE";
            break;
        case 'fviber':
            clickLinks = headLink + "Viber";
            break;
        case 'flinkin':
            clickLinks = headLink + "LinkedIn";
            break;
        case 'fsignal':
            clickLinks = headLink + "Signal";
            break;
        case 'ftruec':
            clickLinks = headLink + "Truecaller";
            break;
        case 'fimo':
            clickLinks = headLink + "imo";
            break;
        case 'fimobe':
            clickLinks = headLink + "imo_beta";
            break;
        case 'fkaka':
            clickLinks = headLink + "KakaoTalk";
            break;
        case 'fshac':
            clickLinks = headLink + "ShareChat";
            break;
        case 'ffg':
            clickLinks = headLink + "facebookGroup";
            break;
        case 'pstnSMS':
            clickLinks = headLink + "pstnSMS";
            break;

        default:
            var otherLink = "otherLink"
            clickLinks = "https://play.google.com/store/apps/details?id=me.talkyou.app.im&referrer=utm_source%3D"+otherLink;
    }
    if(!isEmpty(invitekey)){
        clickLinks = clickLinks+ "%26utm_content%3Dautoinvite_"+invitekey;
    }
    return clickLinks;
}

function isEmpty(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}


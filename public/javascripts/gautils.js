/**
 * Created by joybar on 14/04/2017.
 */
// document.body.onload = start;
// function start() {
//     initGA();
// }
//
function initGA() {
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-96358692-1', 'auto');
    ga('send', 'pageview');
}

function GASendEvent(hitType, eventCategory,eventAction, eventLabel ) {
    ga('send', {
        // hitType: 'event',
        // eventCategory: 'Videos',
        // eventAction: 'play',
        // eventLabel: 'Fall Campaign'

        hitType: hitType,
        eventCategory: eventCategory,
        eventAction: eventAction,
        eventLabel: eventLabel
    });
}

function GASendEvent( eventCategory,eventAction, eventLabel ) {
    ga('send', {
        hitType: 'event',
        eventCategory: eventCategory,
        eventAction: eventAction,
        eventLabel: eventLabel
    });
}

function GASendPage() {
    ga('send', {
        hitType: 'pageview',
        page: location.pathname
    });
}

function getProjectPath() {
    var pathName = window.document.location.pathname;
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return  projectName;
}

function getCurrentFullPageName()
{
    var strUrl=location.href;
    var arrUrl=strUrl.split("/");
    var strPage=arrUrl[arrUrl.length-1];
    return strPage;
}

function getGACategoryName(){
    return getProjectPath()+"/"+getCurrentFullPageName();
}

function getPathName () {
    var pathName = window.document.location.pathname;
    return pathName;
}



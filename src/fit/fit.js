const isMobile = () => {
    let mobileAgent = new Array("iphone", "ipod", "ipad", "android", "mobile", "blackberry", "webos", "incognito", "webmate", "bada", "nokia", "lg", "ucweb", "skyfire");
    let browser = navigator.userAgent.toLowerCase();
    let flag = false;
    for (let i = 0; i < mobileAgent.length; i++) {
        if (browser.indexOf(mobileAgent[i]) != -1) {
            flag = true;
            break;
        }
    }
    return flag;
};
const computeRem = () => {
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;// 屏幕宽度
    let htmlDom = document.getElementsByTagName("html")[0];// 根元素
    if (isMobile()) {
        htmlDom.style.fontSize = 20*(htmlWidth / 320) + "px";// rem 基准值
    } else {
        htmlDom.style.fontSize = 16 + "px";// rem 基准值
    }
};
const computeScale = () => {
    let dpr = Math.min(window.devicePixelRatio,3);
    let scale= 1/ dpr;
    let meta=document.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=device-width,initial-scale="+scale+",maximum-scale=,user-scalable=0 ";
    document.firstElementChild.firstChild.appendChild(meta);
};
let resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
(function(){
    computeScale();
    computeRem();
})();
if(document.addEventListener){
    window.addEventListener(resizeEvent,computeRem);
}
export {isMobile,computeRem,computeScale};
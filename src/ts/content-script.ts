import {browser} from "webextension-polyfill-ts";

let clickedEl:any = null;

function getElementByXpath(path):HTMLElement|null {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLElement;
}

function getElementXPath (element) {
    if (!element) return null

    if (element.id) {
        return `//*[@id="${element.id}"]`
    } else if (element.tagName === 'BODY') {
        return '/html/body'
    } else {
        const sameTagSiblings = Array.from(element.parentNode.childNodes)
            .filter((e:any) => e.nodeName === element.nodeName)
        const idx = sameTagSiblings.indexOf(element)

        return getElementXPath(element.parentNode) +
            '/' +
            element.tagName.toLowerCase() +
            (sameTagSiblings.length > 1 ? `[${idx + 1}]` : '')
    }
}

document.addEventListener("contextmenu", function(event){
    clickedEl = event.target;
    }, true);

browser.runtime.onMessage.addListener((request, sender) => new Promise((resolve,reject) =>  {
    if(request == "getClickedEl") {
        resolve(getElementXPath(clickedEl));
    }
    reject();
}));

browser.runtime.onMessage.addListener((bug, sender) => new Promise((resolve,reject) =>  {
    if(bug.type == "bug") {
        console.log(bug)
            let elementXPath = getElementByXpath(bug.xpath);
            console.log("element from xpath:");
            if (elementXPath) {
                elementXPath.style.backgroundColor = "#FDFF47";
            }


        resolve(true);
    }
    reject();
}));


console.log("initialize trecka");
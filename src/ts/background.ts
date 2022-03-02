import { browser } from "webextension-polyfill-ts";

function printClickedEl(info, tab) {
    console.log(tab);
    browser.tabs.sendMessage(tab.id, "getClickedEl", {frameId: info.frameId}).then(xpath => {
        console.log(xpath);
        //TODO: Open up Trecka with xpath to describe the bug.

    });
}



browser.contextMenus.create({
    title: "Track Bug on Trecka",
    contexts:["page"],
    onclick: printClickedEl
});

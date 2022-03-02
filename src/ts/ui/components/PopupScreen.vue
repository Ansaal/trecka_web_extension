<template>
  <div>Popup</div>
  <button @click="clickBug('12345')">See Bug</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { browser } from "webextension-polyfill-ts";

export default defineComponent({
  mounted() {
    // Can access web-extension api through Vue files
    // Sends a message to the background script every time the popup is opened
    browser.runtime.sendMessage({ from: "PopupScreen.vue" });
  },

  methods: {

    clickBug(bugId:string) {
      browser.tabs.query({active: true, currentWindow: true}).then(tabs=> {
        let id:number = tabs[0].id as number;
        browser.tabs.sendMessage(id, {type:"bug",bugId:bugId,xpath:"//*[@id=\"nav-questions\"]"});
      }).catch(()=>{
        return;
      });
    }

  }

});
</script>

<style lang="scss"></style>

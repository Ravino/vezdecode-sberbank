<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'App',
}

</script>

<style>
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  overscroll-behavior-y: none;
  font-size: 15px;
}

body {
  margin: 0;
}

html, body {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background-color: rgb(160, 231, 32);
  flex-direction: column;
  height: 100%;
  display: flex;
}

.mainstyle {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  background-color: rgb(160, 231, 32);
  -ms-flex-align: stretch;
  -ms-flex-direction: column;
  -webkit-align-items: stretch;
  -webkit-box-align: stretch;
  -webkit-box-direction: normal;
  -webkit-box-orient: vertical;
  -webkit-flex-basis: auto;
  -webkit-flex-direction: column;
  -webkit-flex-shrink: 0;
  align-items: stretch;
  border: 0 solid black;
  box-sizing: border-box;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0;
  min-height: 0;
  min-width: 0;
  padding: 0;
  position: relative;
  z-index: 0;
}

.mainstyle_2 {
  border: 0 solid #ffffff;
  box-sizing: border-box;
  color: rgb(255, 255, 255);
  display: inline;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.svgg {
  height: 4rem;
  align-self: flex-start;
  display: inline-block;
}

.form-control:focus {
  background-color: initial;
  outline: initial;
  box-shadow: none;
  border: none;
  line-height: initial;
}

</style>

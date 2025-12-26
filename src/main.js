import Vue from 'vue';
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

import enLang from 'element-ui/lib/locale/lang/en'

Vue.use(Element, {
    size: 'medium', locale: enLang
})

new Vue({
    el: '#app',
    render: h => h(App)
});

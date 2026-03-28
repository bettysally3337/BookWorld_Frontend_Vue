import { createApp } from 'vue'
import './styles/index.scss' // Add our new SCSS central hub
import App from './App.vue'
import { i18n } from './i18n'

createApp(App).use(i18n).mount('#app');

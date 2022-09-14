import {createApp} from "vue";
import App from './App.vue'
import router from './router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-buttons-bs4';
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css';


createApp(App).use(router).mount('#app')

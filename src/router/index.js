import { createWebHistory, createRouter } from "vue-router";
import availibilityPage from "../views/availibility-page.vue";
import reservationPage from "../views/reservation-page.vue";
import eventsPage from "../views/events-page.vue";

const routes = [
        {
            path: '/availibility',
            name:'availibilityPage',
            component: availibilityPage,
        },
        {
            path: '/reservation/:id',
            name:'reservationPage',
            component: reservationPage,
        },
        {
            path: '/events',
            name:'eventsPage',
            component: eventsPage,
        }
        
];

const router = new createRouter({
    history : createWebHistory(),
    routes,
    
});

export default router;

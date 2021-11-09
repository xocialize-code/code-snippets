import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Event from '@/components/Event.vue'
import Welcome from '@/components/Welcome.vue'
import Session from '@/components/Session.vue'
import store from '@/store'

const routes = [
  {
    path: '/:uuid?',
    name: 'Home',
    component: Home,
    props: (route) => ({ uuid: route.params.uuid || 0 }),
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/event/:uuid?',
    name: 'Event',
    component: Event,
    props: (route) => ({ uuid: route.params.uuid || 0 }),
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/welcome/:event_id?/:invitation_id?',
    name: 'Welcome',
    component: Welcome,
    props: (route) => ({ event_id: route.params.event_id || 0, invitation_id: route.params.invitation_id || 0 }),
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/session/:uuid?/:sessid?',
    name: 'Session',
    component: Session,
    props: (route) => ({ uuid: route.params.uuid || 0, sessid: route.params.sessid || 0 }),
    meta: {
      requiresAuth: false,
    }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authGaurd(to)) {
      next()
    } else {
      next(`/login/${to.params.uuid}`);
    }
  } else {
    next()
  }
});

const authGaurd = (to) => {
  // console.log("checking auth", to, store.getters.ID_TOKEN);
  if(typeof store.getters.ID_TOKEN !== 'undefined') {
    return true;
  } else {
    return false;
  }
}


export default router
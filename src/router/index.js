import Vue from 'vue'
import VueRouter from 'vue-router'
import DailyApside from '../views/DailyApside.vue'
import PageNotFound from '../views/PageNotFound.vue'
import AdmLogin from '../views/adm/Login.vue'
import AdmApsiders from '../views/adm/AdmApsiders.vue'
import AdmDashboard from '../views/adm/Dashboard.vue'
import AdmAsistencias from '../views/adm/Asistencia.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DailyApside',
    component: DailyApside
  },
  {
    path: '/adm/login',
    name: 'Login',
    component: AdmLogin
  },
  {
    path: '/adm',
    redirect: '/adm/dashboard',
  },
  {
    path: '/adm/dashboard',
    name: 'Dashboard',
    component: AdmDashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/adm/apsiders',
    name: 'AdmApsiders',
    component: AdmApsiders,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/adm/asistencias',
    name: 'AdmAsistencias',
    component: AdmAsistencias,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '*',
    component: PageNotFound
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL || '/',
  routes
})

// Middleware
router.beforeEach((to, from, next) => {

  // verify token expiration
  const expiration = localStorage.getItem('expires_in');
  if (expiration) {
    const expirationDate = parseInt(expiration);
    const now = new Date() / 1000;
    if (now > expirationDate) {
      localStorage.removeItem('token');
      localStorage.removeItem('type');
      localStorage.removeItem('access_token');
      localStorage.removeItem('expires_in');
    }
  }

  const requiresAuth = to.meta.requiresAuth || false;
  console.log(requiresAuth)

  if (requiresAuth === false) {
    return next();
  }

  if (to.name !== 'Login' && !localStorage.getItem('access_token')) {
    next({ name: 'Login' });
  }

  else next();
})


export default router
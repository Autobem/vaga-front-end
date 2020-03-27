import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Index.vue'),
  },
  {
    path: '/pokemon/:id',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
    props: (route) => ({ id: route.params.id })
  },
  {
    name: 'pageNotFound',
    path: '*',
    component: () => import('../views/PageNotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


export default router;

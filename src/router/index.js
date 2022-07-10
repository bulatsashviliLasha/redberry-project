import { createRouter, createWebHistory } from 'vue-router';

const RegisteredView = () => import('@/views/RegisteredView.vue');
const LandingView = () => import('@/views/LandingView.vue');
const PageNotFound = () => import('@/views/PageNotFound.vue');
const ChessInfoView = () => import('@/views/ChessInfoView.vue');
const PersonalInfoView = () => import('@/views/PersonalInfoView.vue')

const routes = [
  {
    path: '/',
    name: 'landingTab',
    component: LandingView
  },
  {
    path: '/personalForm',
    name: 'personalInfoTab',
    component: PersonalInfoView
  },
  {
    path: '/chessForm',
    name: 'chessInfoTab',
    component: ChessInfoView
  },
  {
    path: '/complete',
    name: 'CompleteTab',
    component: RegisteredView
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: PageNotFound,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 };
  }
})

export default router

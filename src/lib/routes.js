import { Main, Splash } from '../pages'

export default {
  root: 'splash',
  routes: [
    {
      path: '/',
      component: Splash,
    },
    {
      path: 'home',
      component: Main,
    },
    {
      path: 'about',
      component: Main,
    },
    {
      path: 'search',
      component: Main,
    },
  ],
}

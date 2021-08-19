import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';
import Root from './components/Root';

const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
        loadData: () => new Promise((resolve) => {
          setTimeout(() => {
            resolve({ name: 'xiaoming' });
          }, 200);
        })
      },
      {
        path: '/about',
        component: About
      },
      {
        path: '*',
        restricted: false,
        component: NotFound
      }
    ]
  }
];

export default routes;

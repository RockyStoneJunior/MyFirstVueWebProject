/**
 * @file
 * Created by hanan on 16/10/15.
 */
const Hello = r => require(['views/hello'], r);
const NotFound = r => require(['views/notfound'], r);
const Headertop = r => require(['views/header'], r);
const Tree = r => require(['views/tree'], r);
const Test = r => require(['views/test'], r);
const Footer = r => require(['views/footer'], r);
const RichTextor = r => require(['views/richTextor'], r);

// 根目录
const rootPath = '';

// 页面路由
const routes = [
  {path: '', redirect: {name: 'hello'}},
  {path: '/hello',
      components: {
      default:Hello,
      headers:Headertop,
          footers:Footer
      },
      name: 'hello'
  },
  {path: '/header', component: Headertop, name: 'headertop'},
    {path: '/richTextor', components: {default:RichTextor,headers:Headertop,footers:Footer}, name: 'RichTextor'},
  {path: '/tree', components: {default:Tree,headers:Headertop,footers:Footer}, name: 'tree'},
  {path: '/test',components: {default:Test,headers:Headertop,footers:Footer}, name: 'tree'}
].map(route => {
  route.path = rootPath + route.path;
  return route;
});

// 404 页
routes.push({path: '*', components:{ default:NotFound,headers:Headertop}, name: 'notfound'});

export default routes;

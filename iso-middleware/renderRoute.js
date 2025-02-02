import React from 'react';
// import chalk from 'chalk';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import routes from '../shared/routes';
import HTML from '../shared/components/HTML';
import App from '../shared/App';
import { Helmet } from 'react-helmet';

export default function renderRoute(req, res) {
  const branch = matchRoutes(routes, req.url);
  const promises = [];

  branch.forEach(({ route, match }) => {
    if (route.loadData) {
      promises.push(route.loadData(match));
    }
  });

  Promise.all(promises).then(data => {
    // data will be an array[] of datas returned by each promises.
    // // console.log(data)
    const finalRouteData = data[0];
    const context = data.reduce((context, data) => Object.assign(context, data), {});

    const router = <StaticRouter location={req.url} context={context}><App /></StaticRouter>;

    const app = renderToString(router);

    const html = renderToString(<HTML html={app} serverState={finalRouteData} />);
    
    const helmet = Helmet.renderStatic();

    // console.log(chalk.green(`<!DOCTYPE html>${html}`));

    return res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      </head>
    ${html}`);
  });
}

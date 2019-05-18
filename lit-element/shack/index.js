/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */

import './elements/shack-app.js';

import {initTemplatePolyfill} from '../node_modules/lit-html/polyfills/template_polyfill.js';
if (new URL(window.location.href).searchParams.has('tp')) {
  initTemplatePolyfill(true);
};

(async function() {
  const categories = {
    'mens_outerwear': {
      title: 'Men\'s Outerwear',
    },
    'ladies_outerwear': {
      title: 'Ladies Outerwear',
    },
    'mens_tshirts': {
      title: 'Men\'s T-Shirts',
    },
    'ladies_tshirts': {
      title: 'Ladies T-Shirts',
    },
  };

  const promises = [];
  for (const c in categories) {
    promises.push((async () => {
      const resp = await fetch(`./${c}.json`);
      categories[c].items = await resp.json();
      categories[c].slug = c;
    })());
  }
  await Promise.all(promises);

  const app = document.createElement('shack-app');
  app.page = 'mens_tshirts';
  app.categories = categories;
  document.body.appendChild(app);
})();

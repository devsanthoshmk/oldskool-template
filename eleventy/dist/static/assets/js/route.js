const routes = [
      '/index',
      '/product',
      '/cart',
      '/checkout',
      '/checkout-payment',
      '/checkout-shipping',
      '/forgotten-password',
      '/login',
      '/register',
    ];

function extractParams(route, path) {
  const routeParts = route.split('/');
  const pathParts = path.split('/');

  const params = {};

  routeParts.forEach((part, index) => {
    if (part.startsWith(':')) {
      const paramName = part.slice(1);
      params[paramName] = pathParts[index];
    }
  });
  console.log(params)
  return params;
}

function renderComponent(matchedRoute, params) {
  const appContainer = document.getElementById('content');
  // appContainer.innerHTML = '<h1>Loading....<h1>';

  // const instance = new component(params);
  fetch(matchedRoute)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text(); // Parse the response as JSON
  })
  .then((html) => {
    console.log(html.slice(9000,18210));
    console.log(html.slice(-2517,-1000));
    let content= html.slice(18210,-2517);
    appContainer.innerHTML = content;     // Append the element to the container
    // appContainer.innerHTML = html;     // Append the element to the container
    window.removeEventListener('DOMContentLoaded', safeRouter);
    document.dispatchEvent(new Event("DOMContentLoaded"));
    window.addEventListener('DOMContentLoaded',safeRouter);

    // Adding route spicific js logic to overcome script tag not running in innerHtml addition
    if (matchedRoute===routes[0]){
      load_start=0;
      load_end=0;
        if(typeof getProds === "function") {
          afterProds();
          console.log("skipped reload")
        }
        else {
          const script = document.createElement("script");
          script.src = "/static/assets/js/index.js"; // 
          script.onload = () => getProds();
          document.head.appendChild(script);
          console.log("first load")
        }

    }

    //rendering scripts which comes with #content in csr
    // document.querySelectorAll("#content script").forEach((oldScript) => {
    //   const newScript = document.createElement("script");

    //   if (oldScript.src) {
    //       newScript.src = oldScript.src;
    //       newScript.async = oldScript.async;
    //   } else {
    //       newScript.text = oldScript.text;
    //   }
    //   document.body.appendChild(newScript);
    //   oldScript.remove();

    // });



  })
  .catch((error) => {
    console.error('Error fetching or processing the JSON:', error);
  });

  // appContainer.appendChild(instance.render());
}

function router() {
  const path = window.location.pathname;

  let matchedRoute = null;
  let matchedParams = {};

  routes.forEach(route => {
    const routeRegex = new RegExp(`^${route.replace(/:\w+/g, '[^/]+')}$`);
    if (routeRegex.test(path)) {
      matchedRoute = route;
      matchedParams = extractParams(route, path);
    }
  });

  if (matchedRoute) {
    renderComponent(matchedRoute, matchedParams);
  } else {
    // renderComponent(NotFound);
  }
}
function safeRouter() {
  if (!first) router();
  else first=false;
}
let first=true;
window.addEventListener('DOMContentLoaded',safeRouter);
window.addEventListener('popstate', router);

const links = document.querySelectorAll('.route');
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const path = link.getAttribute('href');
    if (path !== window.location.pathname){
      window.history.pushState({}, '', path);
      router();

    }

  });
});
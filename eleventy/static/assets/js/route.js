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
const parser = new DOMParser();

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
    console.log(html.slice(9000,18180));
    console.log(html.slice(-2517,-1000));
    let content= html.slice(18180,-2517);
    appContainer.innerHTML = content;     // Append the element to the container
    // appContainer.innerHTML = html;     // Append the element to the container
    document.dispatchEvent(new Event("DOMContentLoaded"));

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

// window.addEventListener('DOMContentLoaded', router);
window.addEventListener('popstate', router);

const links = document.querySelectorAll('.route');
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const path = link.getAttribute('href');
    window.history.pushState({}, '', path);

    router();
  });
});
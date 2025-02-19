
// const products= {{ products | dump | safe }};
// console.log(products); 

function renderProducts(products,fresh=false) {

  const container = document.querySelector("#products");

  if (!container){ 
      console.error("Container not found!");
      return;
  }

  let productsHTML = '';

    products.forEach(product => {
        // Generate Badges
        let badgesHTML = '';
        if (product.sale_price) {
            badgesHTML += `
                <span class="badge badge-card">
                    <span class="f-w-2 f-h-2 bg-danger rounded-circle d-block me-1"></span> Sale
                </span>
            `;
        }
        if (product.new) {
            badgesHTML += `
                <span class="badge badge-card">
                    <span class="f-w-2 f-h-2 bg-success rounded-circle d-block me-1"></span> High Demand
                </span>
            `;
        }
        if (product.sold_out) {
            badgesHTML += `
                <span class="badge badge-card">
                    <span class="f-w-2 f-h-2 bg-secondary rounded-circle d-block me-1"></span> Sold Out
                </span>
            `;
        }

        // Quick Add Button
        const quickAddHTML = !product.sold_out ? `
            <div class="position-absolute start-0 bottom-0 end-0 z-index-20 p-2">
                <button class="btn btn-quick-add"><i class="ri-add-line me-2"></i> Quick Add</button>
            </div>
        ` : '';

        // Price Display Logic
        let priceHTML;
        if (product.sold_out) {
            priceHTML = `<p class="mt-2 mb-0 small text-muted">Sold Out</p>`;
        } else {
            priceHTML = product.offer_price 
                ? `<p class="mt-2 mb-0 small"><s class="text-muted">${product.currency} ${product.price}</s> <span class="text-danger">${product.currency}${product.offer_price}</span></p>`
                : `<p class="mt-2 mb-0 small">${product.currency}${product.price}</p>`;
        }

        // Build Product Card
        const productHTML = `
            <div class="col-12 col-sm-6 col-lg-3">
                <div class="card border border-transparent position-relative overflow-hidden h-100 transparent">
                    <div class="card-img position-relative">
                        <div class="card-badges">
                            ${badgesHTML}
                        </div>
                        <span class="position-absolute top-0 end-0 p-2 z-index-20 text-muted">
                            <i class="ri-heart-line"></i>
                        </span>
                        <picture class="position-relative overflow-hidden d-block bg-light">
                            <img class="w-100 img-fluid position-relative z-index-10 pexels" 
                                 src="${product.img}" 
                                 alt="${product.title}" 
                                 title="${product.title}">
                        </picture>
                        ${quickAddHTML}
                    </div>
                    <div class="card-body px-0">
                        <a class="text-decoration-none link-cover" href="/product">${product.title}</a>
                        <span class="text-secondary">| By ${product.brand}</span>
                        <small class="text-muted d-block">${product.options}</small>
                        ${priceHTML}
                    </div>
                </div>
            </div>
        `;
        productsHTML += productHTML;
    });
    if (fresh){
      container.innerHTML='';
    }
    container.innerHTML += productsHTML;
}

let load_start=0; 
let load_end=0;
function freshLoad(n=10){
    load_start=0; 
    load_end=0;

    const loadMoreButton = document.querySelector('#lm-btn');
    loadMoreButton.className = 'btn btn-outline-dark btn-sm mt-5 align-self-center py-3 px-4 border-2';
    loadMoreButton.textContent = 'Load More';
    loadMoreButton.style.pointerEvents = 'auto';
    loadMoreButton.classList.remove("d-none");

    load(n);

}
function load(n=10){
    if (products.length>load_start){
        console.log(products)
        load_end+=n;
        renderProducts(products.slice(load_start,load_end),load_start===0 ? true : false);
        load_start+=n;
    } else {
        const loadMoreButton = document.querySelector('#lm-btn');
        loadMoreButton.className = 'btn btn-danger disabled mt-5 align-self-center py-3 px-4 border-0';

        loadMoreButton.textContent = 'No more products to load';
        loadMoreButton.style.pointerEvents = 'none';

        setTimeout(() => {
            loadMoreButton.className = "d-none"; // Removes the button element from the DOM
            console.log('Button removed after 5 seconds');
        }, 5000);

    }
}


let products=[];
let og_products=[];
function getProds(){
    fetch("data/products.json")
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the response as JSON
    })
    .then((rawProducts) => {
        products=rawProducts;
        og_products=JSON.parse(JSON.stringify(rawProducts));
        afterProds();

        //loading brand names to filter it in filter canvas
        // renderBrands(products);
    // setTimeout(()=>{renderProducts(products);console.log(1)},5000);
    })
}

let defultPrice;
function afterProds(){
    freshLoad(5);        //Load products in home page(index.html)
    renderBrands(); //render brands in offcanvas based on products
    performSearch();

    // adding filter related codes
    const minInput = document.querySelector('.filter-min');
    const maxInput = document.querySelector('.filter-max');
    defultPrice=[ "60.00", "900.00" ].map((n) => Number(n));
    console.log(defultPrice)

    const offcanvasElement = document.getElementById('offcanvasFilters');

    offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
      filter(); // call it whenever offcanvas hides
    });

}

function renderBrands(){
    let brands='';
    products.forEach((product,index)=>{
        // number of prods in brand html
        // <span class="text-muted ms-1 fs-9">(21)</span>
        const brand = `
            <div class="form-group form-check-custom mb-1">
                        <input type="checkbox" class="form-check-input" id="filter-brands-modal-${index}" value="${product.brand_id}">
                        <label class="form-check-label fw-normal text-body flex-grow-1 d-flex align-items-center" for="filter-brands-modal-${index}">${product.brand}</label>
                    </div>
        `
        brands+=brand;
    })

    const brandHtml=document.querySelector('.simplebar-content');
    brandHtml.innerHTML+=brands;
}

function sortIt(by,a=true){
    console.log(by,a,typeof a);
    // note:
        // make price is a constent value for all obj coz thoses with offer proce sucks in soring

    if (by === "title"){
        console.log("title")
        products.sort((x, y) => x[by].localeCompare(y[by]));
        
    } else if(by === "getOG"){
        products=structuredClone(og_products);
    } else {
        console.log("not title")
        products.sort((x, y) => (a==="true" ? x[by] - y[by] : y[by] - x[by]));
    }

    renderProducts(products.slice(0,load_start),true);
    console.log(products.slice(0));
}


function filter() {

    products=structuredClone(og_products);

    /*
        price filter change check
    */

    //getting the slider 
    const slider = document.querySelector('.noUi-target').noUiSlider;

    // Geting the current values of the slider
    const price = slider.get().map((n) => Number(n));
    //checking if it changed
    if (defultPrice.every((value,index)=> value === price[index])) {
        console.log("no change in price");
    } else {
        //pricefilter func here
        products=products.filter((el) => el.price>price[0] && el.price<price[1]);
        console.log("price changed call a func", products);
    }

    /*
        brand filter change check
    */

    const brandinp = document.querySelectorAll('#filter-modal-brands input[type="checkbox"]:checked');
    const brands = Array.from(brandinp).map(checkbox => {
    return checkbox.value;
    });
    if(brands.length === 0){
        console.log("no change in brand")
    } else {
        products=products.filter((el) => brands.includes(el.brand_id));
        console.log(products);
    }

    /*
        size filter change check
    */

    const sizeinp = document.querySelectorAll('#filter-modal-sizes input[type="checkbox"]:checked');

    // Map each checked checkbox to its label text
    const sizes = Array.from(sizeinp).map(checkbox => {
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        return label ? label.textContent.trim() : null; // Return trimmed text or null if not found
    });
    if (sizes.length == 0){
        console.log("no change in size");
    } else {
        products=products.filter((el) => sizes.some((e) => el.options.some((op) => op.includes(e))));
        console.log("Selected sizes:", products);
    }

    /*
        rendering products
    */

    if(products.length === 0){
        const container = document.querySelector("#products");
        inner=`
            <div class="col-12 col-sm-6 col-lg-3">
                <!-- Card Product Skeleton -->
                <div class="card border border-transparent position-relative overflow-hidden h-100 transparent">
                    <div class="card-img position-relative">
                        
                        <!-- Skeleton Image -->
                        <div class="position-relative overflow-hidden d-block bg-light skeleton-image-container">
                            <div class="skeleton-image skeleton">CHANGE YOUR FILTER OR CLEAR DEFULTS</div>
                        </div>
                    </div>
                    <div class="card-body px-0">
                        <!-- Skeleton Text -->
                        <div class="skeleton-line skeleton mb-2"></div>
                        <div class="skeleton-line skeleton short"></div>
                        <div class="skeleton-line skeleton price"></div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML=inner;


    } else {
        // adding red badge in filter to show filters applied
        const badge=document.querySelector("#filter-changed");
        badge.classList.remove('d-none');
        freshLoad(5);
    }


}

function search(query,fromURL){
    console.log(query);
    products=structuredClone(og_products);
    products=products.filter(e => {
      return e.title.trim().toLowerCase().includes(query.toLowerCase().trim()) ||
        e.brand.trim().toLowerCase().includes(query.toLowerCase().trim()) ||
        query.toLowerCase().trim().split(" ").some(el => e.title.trim().toLowerCase().includes(el)) ||
        query.toLowerCase().trim().split(" ").some(el => e.brand.trim().toLowerCase().includes(el));
    });


    console.log(products);
    let prods=document.querySelector("#sortSelect")
    prods.scrollIntoView({ behavior: 'smooth' });
    freshLoad(5);
    if (!fromURL) document.querySelector("#search-close").click();
    window.removeEventListener('popstate', router);
    window.history.pushState({ }, '', `/index?query=${query}`);
    window.addEventListener('popstate', router);

}



// SSG Specific code this do not run in CSR injuction

// getProds();

// console.log("from index.html");
// // Ensure selection resets to "Sort By" after page reload
// window.onload = function() {
//     document.getElementById("sortSelect").selectedIndex = 0; // Reset dropdown to "Sort By"
// };

function performSearch(){
    const url=new URLSearchParams(window.location.search);
    let query=url.get("query");
    console.log(query);
    if (query.length !== 0) search(url.get("query"),fromURL=true);

}

// window.addEventListener('DOMContentLoaded',performSearch);

inputTag=document.querySelector("#search");

inputTag.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        search(inputTag.value);
    };
});
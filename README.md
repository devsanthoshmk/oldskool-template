# **Synopsis**

1. [Todo](#Todo)
2. [Tweaks](#tweaks)
3. [Contributing Instruction](#e-commerce-website)

## Todo:

### Kavishri R

- [ ] Mobile responsiveness (probably changing Bootstrap class names)
- [ ] Flipkart Amazon like product image display(side by side)
- [ ] add Buy Now(use "add to shopping button" change color and text to it) and Like button(we already have it on product image at homescreens)
- [ ] Fix Breadcrumbs broken links and disappear in smaller displays in /checkout /checkout-shipping /shopping /payment
- [ ] Check on UI inconsistancy and mobile responsiveness in /checkout and /checkout-shipping(like removing the product list and grand total and all)
- [ ] Create a popup using Bootstrap after clicking complete order in /checkout-shipping
- [ ] Testing and Improving Front-end stuffs overall
- [ ] Add More todos here *if any*

### Santhosh M K

- [ ] Add sort, filter, search built-in functions to respective buttons
- [ ] SSG products to html files
- [ ] Use product.json similar for You May Also Like
- [ ] Create htmls for upper base.html(the trimming part upper in CSR) and same for lower part to get indexes
- [ ] Add non-persistant cart first
- [ ] Add non-persistant wishlist first
- [ ] Get current location in checkout page
- [ ] Auto fill infos(like name(immutable), email(immutable), address(mutable)) from login info or sign-up based on it in /checkout
- [ ] Save name,address on /checkout and /checkout-shopping in json to send them to database
- [ ] Make like button working #wishlist
- [ ] Learn to use payment gateway
- [ ] Implement testing payment gateway(with cloudflare)
- [ ] Learn google oauth login and user login
- [ ] Implement /login /register with loc funciton say nodejs
- [ ] Learn database(MySql)
- [ ] Implement database in /checkout /checkout-shopping wishlist login oauth... everywhere
- [ ] Implement cloudflare workers instead of loc functions
- [ ] Implement supabase instead of MySql
- [ ] Deploy whole thing to pages


## Tweaks:

- [ ] https://uiverse.io/Nawsome/spicy-wolverine-85 with out loader__ball for loading if needed
- [ ] Remove footer header wherevery not needed
- [ ] Innovative Front-end design ideas like using local storage to pickup where user were


# Those function(sort,filter....) format(Deprecated):

```javascript
function sort_by_price(reverse=false){
  if (!reverse){
  //{
  //low to high logic 
  //}
  } else {
  //high to low
  }

  // now change products array within that sorting logic and that's it!!!

  //calling the load funtion to renderProducts with load more button in mind here you dont need to do anythin

  load();

}
```

# E-Commerce Website

**THIS IS DEV BRANCH FEATURES IN PROCESS COMES HERE**

## Installation

  - First go to eleventy folder
  ```bash
    cd eleventy
  ```

  - Install requirements by
  ```bash
    npm install
  ```

## Contribution

  - open vs code
  ```bash
    code .
  ```

  - run dev server(in any terminal under eleventy folder)
  ```bash
    npm run serve
  ```

  - Go to templates folder you can find html files....

### **Changes will reflect on the go in the browser while the dev server is active no need to restart**

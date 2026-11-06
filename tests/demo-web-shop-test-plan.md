# Demo Web Shop - Core E-commerce User Operations Test Plan

## Application Overview

Test the customer-facing Tricentis Demo Web Shop at https://demowebshop.tricentis.com/. The storefront supports category browsing and sorting, keyword search, product detail and stock/price display, adding products to a cart, cart quantity/removal, coupon and shipping estimate controls, account registration and sign-in, and checkout. Checkout is gated by acceptance of terms and offers guest checkout or registration; the visible checkout flow proceeds through billing address, shipping address, shipping method, payment method, payment information, and order confirmation. Run each scenario independently from a fresh browser context with an empty cart and no signed-in user. Use unique email addresses for registration, and only demo-safe payment options; capture an order confirmation for the positive order test.

## Test Scenarios

### 1. 1. Account registration and sign-in

**Seed:** `tests/seed.spec.ts`

#### 1.1. Register a new customer and sign in successfully

**File:** `tests/account-registration-login.spec.ts`

**Steps:**
  1. Start from a fresh anonymous session and open Register.
    - expect: The registration form is displayed with personal details, email, password, and confirm-password fields.
  2. Choose a gender if desired; enter valid first and last names, a unique email address, a valid password, and the same value in Confirm password; submit Register.
    - expect: Registration succeeds with a visible success confirmation and the new account is signed in.
  3. Log out, open Log in, and submit the same email and password.
    - expect: Sign-in succeeds and the customer is shown as authenticated.
  4. Open My account and verify account details, then log out.
    - expect: The account area is accessible while signed in and the session returns to anonymous state after logout.

#### 1.2. Reject incomplete registration and mismatched passwords

**File:** `tests/account-registration-validation.spec.ts`

**Steps:**
  1. Start from a fresh anonymous session, open Register, and submit the form with all fields blank.
    - expect: Registration is blocked and required-field validation is shown for the required personal and credential fields.
  2. Enter valid first name, last name, and a unique syntactically valid email; enter a password and a different confirm-password value; submit Register.
    - expect: The form does not create an account and clearly reports the password confirmation mismatch.

#### 1.3. Reject sign-in with unknown credentials

**File:** `tests/account-registration-validation.spec.ts`

**Steps:**
  1. Start from a fresh anonymous session, open Log in, enter an email address not registered in this run and an incorrect password, and submit.
    - expect: Sign-in is denied, a clear authentication error is shown, and protected account pages remain inaccessible.

### 2. 2. Product browsing and search

**Seed:** `tests/seed.spec.ts`

#### 2.1. Browse Books and sort products by price

**File:** `tests/product-discovery.spec.ts`

**Steps:**
  1. Start from the store home page and open the Books category.
    - expect: The Books category page is displayed with product cards and product names/prices.
  2. Select Price: Low to High from Sort by.
    - expect: The category refreshes with visible products ordered by ascending price, and the selected sort option remains visible.
  3. Open the Computing and Internet product from the catalog.
    - expect: The product detail page shows its name, description, in-stock availability, current price, quantity field, and Add to cart control.

#### 2.2. Find a known product using keyword search

**File:** `tests/product-discovery.spec.ts`

**Steps:**
  1. Start from a fresh session, open Search, enter the exact keyword Computing and Internet, and submit.
    - expect: Search results include the Computing and Internet product and provide a link to its detail page.
  2. Open the matching result.
    - expect: The product detail page matches the searched product.

#### 2.3. Handle a search with no matching products

**File:** `tests/product-discovery.spec.ts`

**Steps:**
  1. Start from a fresh session, open Search, enter a distinctive term that does not match any catalog item, and submit.
    - expect: The page reports that no products were found and does not display unrelated results.

### 3. 3. Product selection and adding to cart

**Seed:** `tests/seed.spec.ts`

#### 3.1. Add a selected quantity of an in-stock product

**File:** `tests/add-to-cart.spec.ts`

**Steps:**
  1. Start from a fresh session, navigate to the in-stock Computing and Internet product detail page, and set Qty to 2.
    - expect: The quantity field accepts the requested positive integer.
  2. Click Add to cart.
    - expect: A success notification is shown and the header cart count reflects two units.
  3. Open Shopping cart and inspect the product row and totals.
    - expect: The correct product appears with quantity 2 and its line subtotal equals twice the displayed unit price.

#### 3.2. Reject an invalid product quantity

**File:** `tests/add-to-cart.spec.ts`

**Steps:**
  1. Start from a fresh session, open the Computing and Internet product detail page, set Qty to 0 (and repeat with a negative value if accepted by the field), then attempt to add it to the cart.
    - expect: The invalid quantity is rejected with clear validation or a safe correction; no zero/negative-quantity line is added and the cart count remains unchanged.

### 4. 4. Shopping cart management

**Seed:** `tests/seed.spec.ts`

#### 4.1. Update cart quantity and remove a product

**File:** `tests/cart-management.spec.ts`

**Steps:**
  1. Start from a fresh session, add one Computing and Internet product, and open Shopping cart.
    - expect: The cart shows the selected product, unit price, quantity 1, and matching subtotal.
  2. Change the cart quantity to 3 and select Update shopping cart.
    - expect: The cart retains the product at quantity 3 and recalculates the line subtotal and order subtotal correctly.
  3. Select the product's remove checkbox and update the cart.
    - expect: The product is removed, the cart count returns to zero, and the empty-cart message is displayed.

#### 4.2. Handle invalid discounts and estimate shipping

**File:** `tests/cart-management.spec.ts`

**Steps:**
  1. Start from a fresh session, add an eligible physical product, and open the cart.
    - expect: The cart displays Discount Code and Estimate shipping controls.
  2. Enter an invalid coupon code and apply it.
    - expect: The store reports that the coupon is invalid or cannot be applied; no discount is deducted and totals remain correct.
  3. Request a shipping estimate with a valid destination country and postal code.
    - expect: A shipping estimate is displayed for the entered destination without changing the product quantity or applying an unintended discount.

### 5. 5. Checkout and order placement

**Seed:** `tests/seed.spec.ts`

#### 5.1. Require terms acceptance before checkout

**File:** `tests/checkout.spec.ts`

**Steps:**
  1. Start from a fresh session, add a product, open the cart, leave the terms-of-service checkbox unchecked, and click Checkout.
    - expect: Checkout does not proceed and a terms-of-service dialog or validation message asks the customer to accept the terms.
  2. Close the message, accept the terms, and click Checkout again.
    - expect: The customer is taken to the login/register choice, which offers Checkout as Guest and Register.

#### 5.2. Complete a guest checkout and place a demo order

**File:** `tests/checkout.spec.ts`

**Steps:**
  1. Start from a fresh session with one physical product in the cart, accept the cart terms, click Checkout, and choose Checkout as Guest.
    - expect: The checkout page opens and exposes the billing, shipping, shipping method, payment method, payment information, and confirm-order stages.
  2. Complete all required billing address fields with valid test data and continue; complete or confirm the shipping address, select an available shipping method, and continue.
    - expect: Required address validation passes and checkout advances through the shipping address and shipping method stages.
  3. Select an available demo payment method, complete any required payment information, and continue to confirmation.
    - expect: Checkout advances to order confirmation and the order summary shows the correct product, quantity, and total.
  4. Review the order and confirm it using the site's final order action.
    - expect: A successful order confirmation with an order number is displayed, and the completed cart is empty. Do not use any real payment credentials.

#### 5.3. Block guest checkout when required billing details are missing

**File:** `tests/checkout-validation.spec.ts`

**Steps:**
  1. Start from a fresh session, add a product, accept terms, proceed through Checkout as Guest, and submit the billing-address step with required fields blank.
    - expect: Checkout remains on the billing-address step, required fields are identified, and no order is submitted.

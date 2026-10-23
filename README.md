# Interactive Product Inventory & Analytics Dashboard

A browser-based JavaScript capstone with console output. No installation, framework, or server is required.

## Run

1. Open `index.html` in Chrome, Edge, or Firefox.
2. Open developer tools using **F12**, then select **Console**.
3. Click **Add product & run report**.
4. Enter **Monitor**, then **150** in the prompts.

The inventory contains Laptop ($800), Mouse ($25), and your new Monitor ($150), for a total of **$975.00**. Affordable items are Mouse and Monitor. The report also appears on the page.

## Controls

- **Add product & run report:** validate and add another product.
- **Show report:** display the current inventory and analytics.
- **Search product:** case-insensitive exact-name lookup; returns the first match.
- **Tax & discount:** enter custom percentages and view an adjusted total. Discount is applied before tax. Original prices stay unchanged.

Cancel closes a prompt without adding a partial product. Blank names, blank prices, negative prices, nonnumeric values, and infinite values are rejected. Zero-priced products are accepted. Prices are rounded to cents. Duplicate names are allowed.

## JavaScript concepts demonstrated

| Requirement | Implementation in script.js |
| --- | --- |
| Data and input | `prompt()`, explicit `String()` / `Number()`, array of product objects |
| Conditions | `if...else` price tiers, `switch` category badges |
| Loops and flow | `while` validation retries, `for...of` search, `continue` and `break` |
| Functions and scope | Regular functions, arrow functions, default parameters, private function scope, local `let` / `const` |
| Array methods | `forEach()` console output, `filter()` affordable products, `map()` formatted report |

Category thresholds are configurable in the `thresholds` object: **Budget < $100**, **Standard $100–under $500**, **Premium ≥ $500**. Affordable means strictly **under $200**. Analytics treat each product entry as one item.

## Sample console output

```text
--- Initializing Inventory System ---
--- Processing Inventory Roster (forEach) ---
* Item: Laptop ($800.00) -> Category: Premium
* Item: Mouse ($25.00) -> Category: Budget
* Item: Monitor ($150.00) -> Category: Standard

--- Financial Analytics ---
Total Inventory Value: $975.00
Filtered Affordable Items (Under $200.00): ["Mouse","Monitor"]
Formatted Report List: ["LAPTOP: $800.00","MOUSE: $25.00","MONITOR: $150.00"]
```

Data is stored in memory only. Refreshing the page resets the sample inventory. This project uses browser `prompt()` and is intended to run through `index.html`, not directly with `node script.js`.

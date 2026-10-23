"use strict";

// One private scope keeps inventory and configuration off the global object.
(() => {
  const inventory = [
    { name: "Laptop", price: 800 },
    { name: "Mouse", price: 25 },
  ];

  const thresholds = { budget: 100, premium: 500, affordable: 200 };
  const money = (value) => new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 2,
  }).format(value);
  const output = document.getElementById("output");

  // Regular function + if/else: thresholds can be customized per report.
  function getCategory(price, limits = thresholds) {
    let tier;
    if (price < limits.budget) {
      tier = "low";
    } else if (price < limits.premium) {
      tier = "middle";
    } else {
      tier = "high";
    }

    // switch converts a validated price tier into a display badge.
    switch (tier) {
      case "low": return "Budget";
      case "middle": return "Standard";
      case "high": return "Premium";
      default: return "Uncategorized";
    }
  }

  function readName(message) {
    while (true) {
      const input = prompt(message);
      if (input === null) return null;
      const name = String(input).trim(); // Explicit string conversion.
      if (!name) {
        alert("Please enter a product name, or press Cancel to exit.");
        continue;
      }
      return name;
    }
  }

  function readNumber(message, minimum, maximum) {
    while (true) {
      const input = prompt(message);
      if (input === null) return null;
      const value = Number(input); // Explicit numeric conversion.
      if (input.trim() === "" || !Number.isFinite(value) ||
          value < minimum || value > maximum) {
        alert(`Enter a number from ${minimum} to ${maximum}, or press Cancel.`);
        continue; // Retry invalid input without changing saved inventory.
      }
      return value;
    }
  }

  // Local parameters do not modify original product prices.
  const adjustedPrice = (price, taxPercent = 0, discountPercent = 0) =>
    price * (1 - discountPercent / 100) * (1 + taxPercent / 100);

  function calculateTotal(products, taxPercent = 0, discountPercent = 0) {
    let total = 0;
    for (const product of products) {
      total += adjustedPrice(product.price, taxPercent, discountPercent);
    }
    return total;
  }

  function showReport(taxPercent = 0, discountPercent = 0) {
    const lines = ["--- Processing Inventory Roster (forEach) ---"];
    inventory.forEach((product) => {
      lines.push(`* Item: ${product.name} (${money(product.price)}) -> Category: ${getCategory(product.price)}`);
    });

    const affordable = inventory
      .filter((product) => product.price < thresholds.affordable)
      .map((product) => product.name);
    const formattedReport = inventory.map((product) =>
      `${product.name.toUpperCase()}: ${money(product.price)}`);

    lines.push("", "--- Financial Analytics ---",
      `Total Inventory Value: ${money(calculateTotal(inventory))}`,
      `Filtered Affordable Items (Under ${money(thresholds.affordable)}): ${JSON.stringify(affordable)}`,
      `Formatted Report List: ${JSON.stringify(formattedReport)}`);

    if (taxPercent !== 0 || discountPercent !== 0) {
      lines.push(`Adjusted Total (discount ${discountPercent}%, then tax ${taxPercent}%): ${money(calculateTotal(inventory, taxPercent, discountPercent))}`);
    }
    // Log each roster row and report line to the console using forEach.
    lines.forEach((line) => console.log(line));
    output.textContent = lines.join("\n");
  }

  function addProduct() {
    console.log("--- Initializing Inventory System ---");
    const name = readName("Enter a new product name (example: Monitor):");
    if (name === null) {
      output.textContent = "Product entry cancelled. Inventory was not changed.";
      return;
    }
    const price = readNumber("Enter the product price in USD (example: 150):", 0, 1000000000);
    if (price === null) {
      output.textContent = "Product entry cancelled. Inventory was not changed.";
      return;
    }
    inventory.push({ name, price: Math.round(price * 100) / 100 });
    showReport();
  }

  function searchProduct() {
    const query = readName("Enter the exact product name to find:");
    if (query === null) return;
    let match = null;
    for (const product of inventory) {
      if (product.name.toLowerCase() !== query.toLowerCase()) continue;
      match = product;
      break; // Stop as soon as the first matching product is found.
    }
    const message = match
      ? `Found: ${match.name} (${money(match.price)}) -> Category: ${getCategory(match.price)}`
      : `No product found for "${query}".`;
    console.log(message);
    output.textContent = message;
  }

  function showAdjustedReport() {
    const tax = readNumber("Enter tax percentage (0–100):", 0, 100);
    if (tax === null) return;
    const discount = readNumber("Enter discount percentage (0–100):", 0, 100);
    if (discount === null) return;
    showReport(tax, discount);
  }

  document.getElementById("add-product").addEventListener("click", addProduct);
  document.getElementById("show-report").addEventListener("click", () => showReport());
  document.getElementById("search-product").addEventListener("click", searchProduct);
  document.getElementById("adjust-prices").addEventListener("click", showAdjustedReport);
})();

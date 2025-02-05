document.addEventListener("DOMContentLoaded", function () {
  const brandsHero = document.querySelector(".brands-hero");
  const brandsContainer = document.querySelector(".brands-container");
  const modelsContainers = document.querySelectorAll(".models-container");
  const breadcrumbsList = document.querySelector(".breadcrumbs");
  const autoPartsLink = document.querySelector("#auto-parts-link");

  // Initially hide breadcrumb
  breadcrumbsList.style.display = "none";

  // Handle "Auto Parts" click
  autoPartsLink.addEventListener("click", function (e) {
    e.preventDefault();
    showBrands();
    updateBreadcrumbs();
  });

  // Handle brand clicks
  brandsContainer.addEventListener("click", function (e) {
    e.preventDefault();
    const brandItem = e.target.closest(".brand-item");
    if (!brandItem) return;

    const brandName = brandItem.dataset.brand;
    const modelsContainer = document.getElementById(`${brandName}-models`);

    if (modelsContainer) {
      // Hide brands, show selected brand's models
      brandsContainer.classList.add("hidden");
      modelsContainer.classList.remove("hidden");

      // Update breadcrumbs with brand
      updateBreadcrumbs(brandName);
    }
  });

  // Handle breadcrumb Auto Parts click
  document
    .querySelector("#breadcrumb-auto-parts")
    .addEventListener("click", function (e) {
      e.preventDefault();
      showBrands();
      updateBreadcrumbs();
    });

  // Update breadcrumbs function
  function updateBreadcrumbs(brandName = null) {
    breadcrumbsList.style.display = "flex";

    // Clear any existing brand crumb
    while (breadcrumbsList.children.length > 1) {
      breadcrumbsList.removeChild(breadcrumbsList.lastChild);
    }

    // Add brand crumb if a brand is selected
    if (brandName) {
      const separator = document.createElement("li");
      separator.className = "breadcrumb-separator";
      separator.textContent = "›";
      breadcrumbsList.appendChild(separator);

      const brandCrumb = document.createElement("li");
      brandCrumb.className = "breadcrumb-item";
      brandCrumb.textContent =
        brandName.charAt(0).toUpperCase() + brandName.slice(1);
      breadcrumbsList.appendChild(brandCrumb);
    }
  }

  // Function to show brands and hide models
  function showBrands() {
    brandsHero.style.display = "block";
    brandsContainer.classList.remove("hidden");
    modelsContainers.forEach((container) => {
      container.classList.add("hidden");
    });
  }
});

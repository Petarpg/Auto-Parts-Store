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
  });

  // Handle brand clicks
  brandsContainer.addEventListener("click", function (e) {
    e.preventDefault();
    const brandItem = e.target.closest(".brand-item");
    if (!brandItem) return;

    const brandName = brandItem.dataset.brand;
    showBrandModels(brandName);
  });

  // Handle model clicks
  document.querySelectorAll(".models-container").forEach((container) => {
    container.addEventListener("click", function (e) {
      e.preventDefault();
      const modelItem = e.target.closest(".model-item");
      if (!modelItem) return;

      const modelName = modelItem.dataset.model;
      const brandName = this.id.replace("-models", "");
      showModelVersions(brandName, modelName);
    });
  });

  // Handle model version clicks
  document.querySelectorAll(".model-details").forEach((container) => {
    container.addEventListener("click", function (e) {
      e.preventDefault();
      const versionItem = e.target.closest(".model-version-item");
      if (!versionItem) return;

      const versionName = versionItem.dataset.version;
      const modelName = this.id.replace("-details", "").split("-").pop();
      const brandName = this.id.replace("-details", "").split("-")[0];

      // Hide the model versions list
      this.querySelector(".model-versions-list").classList.add("hidden");

      // Show the version details (you'll need to add this container)
      const versionDetails = document.getElementById(
        `${brandName}-${modelName}-${versionName}-details`
      );
      if (versionDetails) {
        versionDetails.classList.remove("hidden");
        updateBreadcrumbs("version", versionName, brandName, modelName);
      }
    });
  });

  // Handle breadcrumb clicks
  breadcrumbsList.addEventListener("click", function (e) {
    e.preventDefault();
    const clickedItem = e.target.closest(".breadcrumb-item");
    if (!clickedItem) return;

    const type = clickedItem.dataset.type;
    const value = clickedItem.dataset.value;
    const modelName = clickedItem.dataset.model;

    if (type === "auto-parts") {
      showBrands();
    } else if (type === "brand") {
      showBrandModels(value);
    } else if (type === "model") {
      showModelVersions(value, modelName);
    }
  });

  function showBrands() {
    // Hide all other containers
    document.querySelectorAll(".model-details").forEach((detail) => {
      detail.classList.add("hidden");
    });
    modelsContainers.forEach((container) => {
      container.classList.add("hidden");
    });

    // Show brands
    brandsHero.style.display = "block";
    brandsContainer.classList.remove("hidden");

    // Update breadcrumbs
    updateBreadcrumbs("auto-parts");
  }

  function showBrandModels(brandName) {
    // Hide other containers
    brandsContainer.classList.add("hidden");
    document.querySelectorAll(".model-details").forEach((detail) => {
      detail.classList.add("hidden");
    });

    // Show models for selected brand
    const modelsContainer = document.getElementById(`${brandName}-models`);
    if (modelsContainer) {
      modelsContainer.classList.remove("hidden");
      modelsContainer.querySelector(".models-list").classList.remove("hidden");
      updateBreadcrumbs("brand", brandName);
    }
  }

  function showModelVersions(brandName, modelName) {
    // Hide models list
    const modelsContainer = document.getElementById(`${brandName}-models`);
    if (modelsContainer) {
      modelsContainer.querySelector(".models-list").classList.add("hidden");
    }

    // Show model versions
    const modelDetails = document.getElementById(
      `${brandName}-${modelName}-details`
    );
    if (modelDetails) {
      modelDetails.classList.remove("hidden");
      modelDetails
        .querySelector(".model-versions-list")
        .classList.remove("hidden");
      updateBreadcrumbs("model", modelName, brandName);
    }
  }

  function updateBreadcrumbs(type, value = "", brandName = "") {
    breadcrumbsList.style.display = "flex";

    // Always show Auto Parts
    breadcrumbsList.innerHTML = `
      <li class="breadcrumb-item" data-type="auto-parts">
        <a href="#">Auto Parts</a>
      </li>
    `;

    // Add brand if needed
    if (type === "brand" || type === "model") {
      breadcrumbsList.innerHTML += `
        <li class="breadcrumb-separator">›</li>
        <li class="breadcrumb-item" data-type="brand" data-value="${
          brandName || value
        }">
          <a href="#">${brandName || value}</a>
        </li>
      `;
    }

    // Add model if needed
    if (type === "model") {
      breadcrumbsList.innerHTML += `
        <li class="breadcrumb-separator">›</li>
        <li class="breadcrumb-item" data-type="model" data-value="${brandName}" data-model="${value}">
          <a href="#">${value}</a>
        </li>
      `;
    }
  }
});

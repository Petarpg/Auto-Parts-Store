document.addEventListener("DOMContentLoaded", function () {
  const brandsHero = document.querySelector(".brands-hero");
  const brandsContainer = document.querySelector(".brands-container");
  const modelsContainers = document.querySelectorAll(".models-container");
  const breadcrumbsList = document.querySelector(".breadcrumbs");
  const autoPartsLink = document.querySelector("#auto-parts-link");

  const brands = [
    { name: "Audi", key: "audi", image: "images/audi.png" },
    { name: "Alfa Romeo", key: "alfa-romeo", image: "images/Alfa Romeo.png" },
    { name: "BMW", key: "bmw", image: "images/BMW.png" },
    {
      name: "Mercedes-Benz",
      key: "mercedes",
      image: "images/Mercedes-Benz.png",
    },
    { name: "VW", key: "vw", image: "images/VW.png" },
    { name: "Opel", key: "opel", image: "images/opel.png" },
  ];

  const carData = {
    audi: {
      name: "Audi",
      models: {
        100: { name: "Audi 100", versions: ["C4", "4A"] },
        80: { name: "Audi 80", versions: ["B4", "B3"] },
        a3: { name: "Audi A3", versions: ["8L1", "8P1"] },
      },
    },
    "alfa-romeo": {
      // Match this with the data-brand attribute
      name: "Alfa Romeo",
      models: {
        147: { name: "Alfa 147", versions: ["937"] },
        156: { name: "Alfa 156", versions: ["932"] },
        159: { name: "Alfa 159", versions: ["939"] },
      },
    },
    bmw: {
      name: "BMW",
      models: {
        3: { name: "BMW 3", versions: ["E46", "E90"] },
        5: { name: "BMW 5", versions: ["E39", "E60"] },
      },
    },
    mercedes: {
      // Match this with the data-brand attribute
      name: "Mercedes-Benz",
      models: {
        "c-class": { name: "Mercedes C Class", versions: ["W203"] },
        "e-class": { name: "Mercedes E Class", versions: ["W211"] },
      },
    },
    vw: {
      name: "VW",
      models: {
        golf: { name: "VW Golf", versions: ["IV"] },
        passat: { name: "VW Passat", versions: ["B5"] },
      },
    },
    opel: {
      name: "Opel",
      models: {
        astra: { name: "Opel Astra", versions: ["H"] },
        vectra: { name: "Opel Vectra", versions: ["C"] },
      },
    },
  };

  // Initially hide breadcrumb
  breadcrumbsList.style.display = "none";

  // Generate brands list on page load
  generateBrandList();

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

    const brandKey = brandItem.dataset.brand;
    generateModels(brandKey);
    updateBreadcrumbs("brand", carData[brandKey].name, brandKey);
  });

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".brand-item").forEach((brandItem) => {
      brandItem.addEventListener("click", () => {
        const brand = brandItem.dataset.brand;
        generateModels(brand);
      });
    });
  });

  // Handle model clicks
  document
    .querySelector(".models-list")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const modelItem = e.target.closest(".model-item");
      if (!modelItem) return;

      const modelKey = modelItem.dataset.model;
      const brandKey = modelItem.dataset.brand;

      // First generate the versions
      generateModelVersions(brandKey, modelKey);

      // Then update breadcrumbs with the correct model name
      updateBreadcrumbs(
        "model",
        carData[brandKey].models[modelKey].name,
        brandKey,
        modelKey // Add modelKey here
      );
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

    // Hide all containers first
    document.querySelector(".model-versions-container").classList.add("hidden");
    document
      .querySelector(".version-details-container")
      .classList.add("hidden");
    document.querySelector(".engine-types").classList.add("hidden");

    if (type === "auto-parts") {
      showBrands();
    } else if (type === "brand") {
      // Get the brand key and generate its models
      const brandKey = value;
      generateModels(brandKey);
      updateBreadcrumbs("brand", carData[brandKey].name, brandKey);
    } else if (type === "model") {
      const brandKey = clickedItem.dataset.brand;
      const modelKey = clickedItem.dataset.model;
      generateModelVersions(brandKey, modelKey);
      updateBreadcrumbs(
        "model",
        carData[brandKey].models[modelKey].name,
        brandKey,
        modelKey
      );
    }
  });

  function generateBrandList() {
    brandsContainer.innerHTML = ""; // Clear existing content

    brands.forEach((brand) => {
      const brandElement = document.createElement("li");
      brandElement.classList.add("brand-item");
      brandElement.dataset.brand = brand.key;
      brandElement.innerHTML = `
        <a href="#" class="brand-link">
          <img src="${brand.image}" class="brand-logo" alt="${brand.name}" />
          <span>${brand.name}</span>
        </a>
      `;
      brandsContainer.appendChild(brandElement);
    });
  }

  function generateModels(brandKey) {
    const modelsList = document.querySelector(".models-list");
    modelsList.innerHTML = ""; // Clear previous content

    Object.entries(carData[brandKey].models).forEach(([modelKey, model]) => {
      const modelElement = document.createElement("li");
      modelElement.classList.add("model-item");
      modelElement.dataset.model = modelKey;
      modelElement.dataset.brand = brandKey;
      modelElement.innerHTML = `
        <a href="#" class="model-link">
          <img src="images/audi-100-c4.png" class="model-image" alt="" />
          <span>${model.name}</span>
        </a>
      `;
      modelsList.appendChild(modelElement);
    });

    // Hide brands, show models
    brandsContainer.classList.add("hidden");
    document.querySelector(".models-container").classList.remove("hidden");
  }

  function generateModelVersions(brandKey, modelKey) {
    const versionsList = document.querySelector(".model-versions-list");
    versionsList.innerHTML = ""; // Clear previous versions

    carData[brandKey].models[modelKey].versions.forEach((version) => {
      const versionElement = document.createElement("li");
      versionElement.classList.add("model-version-item");
      versionElement.dataset.version = version;
      versionElement.dataset.brand = brandKey;
      versionElement.dataset.model = modelKey;
      versionElement.innerHTML = `
        <a href="#" class="model-version-link">
          <img src="images/audi-100-c4.png" class="model-version-image" alt="" />
          <div class="model-version-info">
            <h3>${carData[brandKey].models[modelKey].name} (${version})</h3>
            <span class="model-years">12.1990 - 07.1994</span>
          </div>
        </a>
      `;
      versionsList.appendChild(versionElement);
    });

    // Hide models, show versions
    document.querySelector(".models-container").classList.add("hidden");
    document
      .querySelector(".model-versions-container")
      .classList.remove("hidden");
  }

  // Add event listener for version clicks
  document
    .querySelector(".model-versions-list")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const versionItem = e.target.closest(".model-version-item");
      if (!versionItem) return;

      const version = versionItem.dataset.version;
      const brandKey = versionItem.dataset.brand;
      const modelKey = versionItem.dataset.model;

      showVersionDetails(brandKey, modelKey, version);
    });

  function showVersionDetails(brandKey, modelKey, version) {
    // Hide versions list
    document.querySelector(".model-versions-container").classList.add("hidden");

    // Show selected version with engine type buttons
    const selectedVersion = document.querySelector(".selected-version");
    selectedVersion.innerHTML = `
      <div class="model-version-item">
        <div class="model-version-link">
          <img src="images/audi-100-c4.png" class="model-version-image" alt="" />
          <div class="model-version-info">
            <h3>${carData[brandKey].models[modelKey].name} (${version})</h3>
            <span class="model-years">12.1990 - 07.1994</span>
          </div>
        </div>
      </div>
    `;

    // Show version details container
    document
      .querySelector(".version-details-container")
      .classList.remove("hidden");

    // Show engine types only after version is selected
    document.querySelector(".engine-types").classList.remove("hidden");

    // Update breadcrumbs to include version
    updateBreadcrumbs("version", version, brandKey, modelKey);
  }

  function showBrands() {
    // Hide all other containers
    document.querySelectorAll(".model-details").forEach((detail) => {
      detail.classList.add("hidden");
    });
    modelsContainers.forEach((container) => {
      container.classList.add("hidden");
    });
    // Hide model versions container and engine types
    document.querySelector(".model-versions-container").classList.add("hidden");
    document
      .querySelector(".version-details-container")
      .classList.add("hidden");
    document.querySelector(".engine-types").classList.add("hidden");

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

  function updateBreadcrumbs(type, value = "", brandKey = "", modelKey = "") {
    breadcrumbsList.style.display = "flex";

    // Always show Auto Parts
    breadcrumbsList.innerHTML = `
      <li class="breadcrumb-item" data-type="auto-parts">
        <a href="#">Auto Parts</a>
      </li>
    `;

    // Add brand if needed
    if (type === "brand" || type === "model" || type === "version") {
      breadcrumbsList.innerHTML += `
        <li class="breadcrumb-separator">›</li>
        <li class="breadcrumb-item" data-type="brand" data-value="${brandKey}">
          <a href="#">${carData[brandKey].name}</a>
        </li>
      `;
    }

    // Add model if needed
    if (type === "model" || type === "version") {
      breadcrumbsList.innerHTML += `
        <li class="breadcrumb-separator">›</li>
        <li class="breadcrumb-item" data-type="model" data-brand="${brandKey}" data-model="${modelKey}">
          <a href="#">${carData[brandKey].models[modelKey].name}</a>
        </li>
      `;
    }

    // Add version if needed
    if (type === "version") {
      breadcrumbsList.innerHTML += `
        <li class="breadcrumb-separator">›</li>
        <li class="breadcrumb-item" data-type="version" data-brand="${brandKey}" data-model="${modelKey}" data-version="${value}">
          <a href="#">${value}</a>
        </li>
      `;
    }
  }
});

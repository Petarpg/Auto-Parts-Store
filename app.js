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

  // Add this engine data structure at the top with other data
  const engineData = {
    petrol: [
      {
        engine: "1.8",
        power: "75 коня - 55 kW",
        years: "08.1982 - 12.1987",
        fuel: "бензин",
        code: "DR, RS",
      },
      {
        engine: "1.8",
        power: "88 коня - 65 kW",
        years: "02.1986 - 07.1988",
        fuel: "бензин",
        code: "SH",
      },
      {
        engine: "1.8 quattro",
        power: "88 коня - 65 kW",
        years: "08.1986 - 07.1990",
        fuel: "бензин",
        code: "SH",
      },
      {
        engine: "1.8",
        power: "90 коня - 66 kW",
        years: "08.1983 - 07.1989",
        fuel: "бензин",
        code: "DS, NP, SH",
      },
      {
        engine: "1.8 Cat",
        power: "90 коня - 66 kW",
        years: "03.1985 - 11.1990",
        fuel: "бензин",
        code: "4B, PH",
      },
    ],
    diesel: [
      {
        engine: "2.0 D",
        power: "70 коня - 51 kW",
        years: "08.1982 - 07.1988",
        fuel: "дизел",
        code: "CN",
      },
      {
        engine: "2.0 D Turbo",
        power: "87 коня - 64 kW",
        years: "08.1982 - 07.1988",
        fuel: "дизел",
        code: "DE",
      },
      {
        engine: "2.0 D Turbo",
        power: "100 коня - 74 kW",
        years: "03.1988 - 11.1990",
        fuel: "дизел",
        code: "NC",
      },
      {
        engine: "2.4 D",
        power: "82 коня - 60 kW",
        years: "08.1989 - 07.1991",
        fuel: "дизел",
        code: "3D",
      },
      {
        engine: "2.5 TDI",
        power: "120 коня - 88 kW",
        years: "01.1990 - 11.1990",
        fuel: "дизел",
        code: "1T",
      },
    ],
  };

  // Add this at the top level with other data structures
  let currentVersionInfo = {
    brandKey: null,
    modelKey: null,
    version: null,
    modelName: null,
  };

  // Update the categoryParts data structure with all categories
  const categoryParts = {
    "Спирачна система": [
      { name: "Спирачни дискове", image: "images/placeholder.jpeg" },
      { name: "Спирачни накладки", image: "images/placeholder.jpeg" },
      { name: "Спирачни апарати", image: "images/placeholder.jpeg" },
      { name: "Спирачни маркучи", image: "images/placeholder.jpeg" },
    ],
    "Окачване на колелата": [
      { name: "Амортисьори", image: "images/placeholder.jpeg" },
      { name: "Пружини", image: "images/placeholder.jpeg" },
      { name: "Носачи", image: "images/placeholder.jpeg" },
      { name: "Тампони", image: "images/placeholder.jpeg" },
    ],
    "Кормилна система": [
      { name: "Кормилни накрайници", image: "images/placeholder.jpeg" },
      {
        name: "Рейка кормилна кутия",
        image: "images/placeholder.jpeg",
      },
      { name: "Кормилна щанга", image: "images/placeholder.jpeg" },
      {
        name: "Маншон за кормилен накрайник",
        image: "images/placeholder.jpeg",
      },
      { name: "Хидравлична помпа", image: "images/placeholder.jpeg" },
      { name: "Тампони за кормилна рейка", image: "images/placeholder.jpeg" },
      {
        name: "Демпфер кормилно управление",
        image: "images/placeholder.jpeg",
      },
      { name: "Кормилен хебел", image: "images/placeholder.jpeg" },
    ],
    "Задвижване на колелата": [
      { name: "Полуоски", image: "images/placeholder.jpeg" },
      { name: "Шарнири", image: "images/placeholder.jpeg" },
      { name: "Маншони", image: "images/placeholder.jpeg" },
    ],
    Трансмисия: [
      {
        name: "Съединител комплект",
        image: "images/placeholder.jpeg",
      },
      { name: "Маховик", image: "images/placeholder.jpeg" },
      { name: "Лагер съединител", image: "images/placeholder.jpeg" },
    ],
    "Ремъчно задвижване": [
      { name: "Ангренажен ремък", image: "images/placeholder.jpeg" },
      { name: "Ролки", image: "images/placeholder.jpeg" },
      { name: "Пистов ремък", image: "images/placeholder.jpeg" },
    ],
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
  document
    .querySelector(".model-versions-list")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const versionItem = e.target.closest(".model-version-item");
      if (!versionItem || !versionItem.classList.contains("clickable")) return;

      const version = versionItem.dataset.version;
      const brandKey = versionItem.dataset.brand;
      const modelKey = versionItem.dataset.model;

      // Hide model versions container
      document
        .querySelector(".model-versions-container")
        .classList.add("hidden");

      // Show version details container and its children
      document
        .querySelector(".version-details-container")
        .classList.remove("hidden");
      document.querySelector(".selected-version").classList.remove("hidden");
      document.querySelector(".engine-types").classList.remove("hidden");

      showVersionDetails(brandKey, modelKey, version);
    });

  // Handle breadcrumb clicks
  breadcrumbsList.addEventListener("click", function (e) {
    e.preventDefault();
    const clickedItem = e.target.closest(".breadcrumb-item");
    if (!clickedItem) return;

    const type = clickedItem.dataset.type;
    const value = clickedItem.dataset.value;
    const brandKey = clickedItem.dataset.brand;
    const modelKey = clickedItem.dataset.model;

    // Hide all containers first
    document.querySelector(".model-versions-container").classList.add("hidden");
    document
      .querySelector(".version-details-container")
      .classList.add("hidden");
    document.querySelector(".engine-types").classList.add("hidden");
    document.querySelector(".engine-details").classList.add("hidden");
    document.querySelector(".parts-categories").classList.add("hidden");

    if (type === "auto-parts") {
      showBrands();
    } else if (type === "brand") {
      generateModels(value);
      updateBreadcrumbs("brand", carData[value].name, value);
    } else if (type === "model") {
      // Regenerate model versions when navigating back to model
      generateModelVersions(brandKey, modelKey);
      updateBreadcrumbs(
        "model",
        carData[brandKey].models[modelKey].name,
        brandKey,
        modelKey
      );
    } else if (type === "version") {
      // Show version details when navigating back to version
      document
        .querySelector(".version-details-container")
        .classList.remove("hidden");
      document.querySelector(".selected-version").classList.remove("hidden");
      document.querySelector(".engine-types").classList.remove("hidden");

      // Use stored version info if available, otherwise use breadcrumb data
      const versionToShow = currentVersionInfo.version || value;
      const brandKeyToUse = currentVersionInfo.brandKey || brandKey;
      const modelKeyToUse = currentVersionInfo.modelKey || modelKey;

      showVersionDetails(brandKeyToUse, modelKeyToUse, versionToShow);
    } else if (type === "auto-parts" || type === "brand") {
      // Clear stored version info when navigating back too far
      currentVersionInfo = {
        brandKey: null,
        modelKey: null,
        version: null,
        modelName: null,
      };
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

    // Check if the model and its versions exist
    if (!carData[brandKey]?.models[modelKey]?.versions) {
      console.warn(`No versions found for ${brandKey} ${modelKey}`);
      return;
    }

    carData[brandKey].models[modelKey].versions.forEach((version) => {
      // Only create clickable version if it has data
      const versionElement = document.createElement("li");
      versionElement.classList.add("model-version-item");

      // Add version info without making it clickable if no data
      versionElement.innerHTML = `
        <div class="model-version-link">
          <img src="images/audi-100-c4.png" class="model-version-image" alt="" />
          <div class="model-version-info">
            <h3>${carData[brandKey].models[modelKey].name} (${version})</h3>
            <span class="model-years">12.1990 - 07.1994</span>
          </div>
        </div>
      `;

      // Only add click-related attributes if we have engine data for this version
      if (engineData.petrol.length > 0 || engineData.diesel.length > 0) {
        versionElement.dataset.version = version;
        versionElement.dataset.brand = brandKey;
        versionElement.dataset.model = modelKey;

        // Make it look clickable
        versionElement.querySelector(".model-version-link").style.cursor =
          "pointer";
        // Add hover effect class
        versionElement.classList.add("clickable");
      } else {
        // Make it look non-clickable
        versionElement.style.opacity = "0.7";
        versionElement.querySelector(".model-version-link").style.cursor =
          "default";
      }

      versionsList.appendChild(versionElement);
    });

    // Hide models, show versions
    document.querySelector(".models-container").classList.add("hidden");
    document
      .querySelector(".model-versions-container")
      .classList.remove("hidden");
  }

  function showVersionDetails(brandKey, modelKey, version) {
    // Store current version info
    currentVersionInfo = {
      brandKey,
      modelKey,
      version,
      modelName: carData[brandKey]?.models[modelKey]?.name || "",
    };

    // Show selected version with engine type buttons
    const selectedVersion = document.querySelector(".selected-version");
    selectedVersion.innerHTML = `
      <div class="model-version-item">
        <div class="model-version-link">
          <img src="images/audi-100-c4.png" class="model-version-image" alt="" />
          <div class="model-version-info">
            <h3>${currentVersionInfo.modelName} (${currentVersionInfo.version})</h3>
            <span class="model-years">12.1990 - 07.1994</span>
          </div>
        </div>
      </div>
    `;

    // Show version details container and its children
    document
      .querySelector(".version-details-container")
      .classList.remove("hidden");
    document.querySelector(".selected-version").classList.remove("hidden");
    document.querySelector(".engine-types").classList.remove("hidden");

    // Update breadcrumbs to only show up to model level
    updateBreadcrumbs(
      "model",
      currentVersionInfo.modelName,
      currentVersionInfo.brandKey,
      currentVersionInfo.modelKey
    );

    // Hide engine specs and parts categories
    document.querySelector(".engine-details").classList.add("hidden");
    document.querySelector(".parts-categories").classList.add("hidden");
    document.querySelectorAll(".engine-type-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
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
    document.querySelector(".parts-categories").classList.add("hidden");

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

  document
    .querySelector(".engine-types")
    .addEventListener("click", function (e) {
      const button = e.target.closest(".engine-type-btn");
      if (!button) return;

      // Remove active class from all buttons
      document.querySelectorAll(".engine-type-btn").forEach((btn) => {
        btn.classList.remove("active");
      });

      // Add active class to clicked button
      button.classList.add("active");

      if (button.classList.contains("petrol")) {
        showEngineSpecs("petrol");
      } else if (button.classList.contains("diesel")) {
        showEngineSpecs("diesel");
      }
    });

  function showEngineSpecs(fuelType) {
    const tableBody = document.querySelector(".engine-specs tbody");
    const engineDetails = document.querySelector(".engine-details");

    if (fuelType === "petrol" || fuelType === "diesel") {
      const engines = engineData[fuelType];
      tableBody.innerHTML = engines
        .map(
          (engine) => `
          <tr>
            <td>${engine.engine}</td>
            <td>${engine.power}</td>
            <td>${engine.years}</td>
            <td>${engine.fuel}</td>
            <td>${engine.code}</td>
          </tr>
        `
        )
        .join("");

      engineDetails.classList.remove("hidden");
    } else {
      engineDetails.classList.add("hidden");
    }
  }

  // Update the table click handler to add version to breadcrumbs only when showing parts
  document
    .querySelector(".engine-specs tbody")
    .addEventListener("click", function (e) {
      // Only proceed if we clicked a row or its descendants
      const row = e.target.closest("tr");
      if (!row) return;

      // Prevent any text selection
      e.preventDefault();

      // Get current version info from breadcrumbs
      const modelBreadcrumb = document.querySelector('[data-type="model"]');
      const brandKey = modelBreadcrumb.dataset.brand;
      const modelKey = modelBreadcrumb.dataset.model;
      const version = document
        .querySelector(".model-version-info h3")
        .textContent.match(/\((.*?)\)/)[1];

      // First hide the version-details-container (which contains everything)
      document
        .querySelector(".version-details-container")
        .classList.add("hidden");

      // Then hide individual elements
      document.querySelector(".selected-version").classList.add("hidden");
      document.querySelector(".engine-types").classList.add("hidden");
      document.querySelector(".engine-details").classList.add("hidden");

      // Finally show parts categories and update breadcrumbs with version
      document.querySelector(".parts-categories").classList.remove("hidden");

      // Add version to breadcrumbs only when showing parts
      updateBreadcrumbs("version", version, brandKey, modelKey);
    });

  // Add click handler for category items
  document.querySelectorAll(".category-item").forEach((item) => {
    item.addEventListener("click", function () {
      const categoryName = this.querySelector("span").textContent;
      const parts = categoryParts[categoryName];

      if (parts) {
        showPartsDropdown(parts, this);
      }
    });
  });

  function showPartsDropdown(parts, categoryElement) {
    // Create modal-like overlay
    const overlay = document.createElement("div");
    overlay.className = "parts-overlay";

    // Create dropdown container with header
    const dropdown = document.createElement("div");
    dropdown.className = "parts-dropdown";

    // Add header with title and close button
    const header = document.createElement("div");
    header.className = "parts-dropdown-header";
    header.innerHTML = `
      <h2>${categoryElement.querySelector("span").textContent} - ${
      currentVersionInfo.modelName
    } (${currentVersionInfo.version})</h2>
      <button class="close-btn">&times;</button>
    `;

    // Add parts grid
    const partsGrid = document.createElement("div");
    partsGrid.className = "parts-grid";
    parts.forEach((part) => {
      const partItem = document.createElement("div");
      partItem.className = "part-item";
      partItem.innerHTML = `
        <img src="${part.image}" alt="${part.name}" />
        <span>${part.name}</span>
      `;
      partsGrid.appendChild(partItem);
    });

    // Assemble the dropdown
    dropdown.appendChild(header);
    dropdown.appendChild(partsGrid);
    overlay.appendChild(dropdown);
    document.body.appendChild(overlay);

    // Function to close the overlay
    const closeOverlay = () => {
      overlay.remove();
      // Remove the event listener when closing
      document.removeEventListener("keydown", handleEscKey);
    };

    // Handle ESC key press
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        closeOverlay();
      }
    };

    // Add ESC key listener
    document.addEventListener("keydown", handleEscKey);

    // Handle close button click
    header.querySelector(".close-btn").addEventListener("click", closeOverlay);

    // Close when clicking outside
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeOverlay();
      }
    });
  }
});

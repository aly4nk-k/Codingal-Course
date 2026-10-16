/* =========================================================
   SMART CELL CITY — INTERACTIONS
   Accessible, responsive, and consistent with the project model.
========================================================= */
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  /* CITY MAP */
  const cityBuildings = $$(".city-building");
  const buildingIcons = {
    Nucleus: "🏛️", "Cell Membrane": "🚧", Mitochondria: "⚡",
    Ribosomes: "🏭", "Rough ER": "🛣️", "Golgi Apparatus": "📦",
    Lysosomes: "♻️", Vacuole: "🗄️", Chloroplast: "🌱", "Cell Wall": "🧱"
  };
  const cityFields = {
    icon: $("#selectedIcon"), component: $("#selectedComponent"),
    organelle: $("#selectedOrganelle"), function: $("#selectedFunction"),
    role: $("#selectedRole"), similarity: $("#selectedSimilarity")
  };

  function updateCityInfo(building) {
    if (!building) return;
    cityBuildings.forEach((item) => {
      const selected = item === building;
      item.classList.toggle("selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    const data = building.dataset;
    if (cityFields.icon) cityFields.icon.textContent = buildingIcons[data.organelle] || "🏙️";
    if (cityFields.component) cityFields.component.textContent = data.component || "City system";
    if (cityFields.organelle) cityFields.organelle.textContent = data.organelle || "Organelle";
    if (cityFields.function) cityFields.function.textContent = data.function || "Function information is not available.";
    if (cityFields.role) cityFields.role.textContent = data.component || "City system";
    if (cityFields.similarity) cityFields.similarity.textContent = data.similarity || "Both systems contribute to the operation of the whole.";
  }
  cityBuildings.forEach((building) => {
    building.setAttribute("aria-pressed", String(building.classList.contains("selected")));
    building.addEventListener("click", () => updateCityInfo(building));
  });
  updateCityInfo($(".city-hall") || cityBuildings.find((b) => b.classList.contains("selected")));

  /* ORGANELLE SEARCH */
  const searchInput = $("#organelleSearch");
  const organelleCards = $$(".organelle-card");
  if (searchInput) {
    searchInput.setAttribute("aria-label", "Search cell organelles");
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLocaleLowerCase();
      let visibleCount = 0;
      organelleCards.forEach((card) => {
        const match = card.textContent.toLocaleLowerCase().includes(query);
        card.hidden = !match;
        if (match) visibleCount++;
      });
      let status = $("#organelleSearchStatus");
      if (!status) {
        status = document.createElement("p");
        status.id = "organelleSearchStatus";
        status.className = "search-status";
        status.setAttribute("aria-live", "polite");
        searchInput.closest(".search-box")?.insertAdjacentElement("afterend", status);
      }
      status.textContent = query ? `${visibleCount} organelle${visibleCount === 1 ? "" : "s"} found` : "Showing all organelles";
    });
  }

  /* AI CHALLENGE TABS */
  const challengeTabs = $$(".challenge-tab");
  const challenges = $$(".challenge");
  function activateChallenge(tab, shouldScroll = false) {
    const targetId = tab?.dataset.challenge;
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target) return;
    challengeTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
    });
    challenges.forEach((item) => {
      const active = item === target;
      item.classList.toggle("active", active);
      item.hidden = !active;
    });
    if (shouldScroll && window.matchMedia("(max-width: 800px)").matches) {
      target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    }
  }
  challengeTabs.forEach((tab, index) => {
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", String(tab.classList.contains("active")));
    tab.tabIndex = tab.classList.contains("active") ? 0 : -1;
    tab.addEventListener("click", () => activateChallenge(tab, true));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % challengeTabs.length;
      if (event.key === "ArrowLeft") next = (index - 1 + challengeTabs.length) % challengeTabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = challengeTabs.length - 1;
      challengeTabs[next]?.focus();
      activateChallenge(challengeTabs[next]);
    });
  });
  const initialTab = challengeTabs.find((tab) => tab.classList.contains("active")) || challengeTabs[0];
  if (initialTab) activateChallenge(initialTab);

  /* ENERGY SIMULATOR
     Normal capacity = 120; emergency capacity = 100 is a separate scenario. */
  const facilitySlider = $("#facilitySlider");
  const facilityCount = $("#facilityCount");
  const simDemand = $("#simDemand");
  const simAvailable = $("#simAvailable");
  const simBalance = $("#simBalance");
  const simStatus = $("#simStatus");
  const cityStatus = $("#cityStatus");
  const energyModel = { fixedDemand: 80, perFacility: 10, normalCapacity: 120, emergencyCapacity: 100 };
  function updateSimulator() {
    if (!facilitySlider) return;
    const x = Number(facilitySlider.value);
    const demand = energyModel.perFacility * x + energyModel.fixedDemand;
    const balance = energyModel.normalCapacity - demand;
    if (facilityCount) facilityCount.textContent = String(x);
    if (simDemand) simDemand.textContent = String(demand);
    if (simAvailable) simAvailable.textContent = String(energyModel.normalCapacity);
    if (simBalance) simBalance.textContent = balance > 0 ? `+${balance}` : String(balance);
    if (simStatus) {
      simStatus.classList.remove("sim-good", "sim-balanced", "sim-danger");
      if (balance > 0) {
        simStatus.textContent = "SURPLUS";
        simStatus.classList.add("sim-good");
      } else if (balance === 0) {
        simStatus.textContent = "BALANCED";
        simStatus.classList.add("sim-balanced");
      } else {
        simStatus.textContent = "SHORTAGE";
        simStatus.classList.add("sim-danger");
      }
    }
    if (cityStatus) {
      const isShortage = balance < 0;
      const isBalanced = balance === 0;
      cityStatus.textContent = isShortage ? "ENERGY SHORTAGE" : isBalanced ? "ENERGY BALANCED" : "SYSTEM OPERATIONAL";
      const light = cityStatus.previousElementSibling;
      if (light) light.classList.toggle("danger-light", isShortage);
    }
    facilitySlider.setAttribute("aria-valuetext", `${x} additional facilities; demand ${demand} of ${energyModel.normalCapacity} energy units`);
  }
  if (facilitySlider) {
    facilitySlider.addEventListener("input", updateSimulator);
    updateSimulator();
  }

  /* MOBILE NAVIGATION */
  const mobileMenu = $("#mobileMenu");
  const navLinks = $("#primary-navigation") || $(".nav-links");
  function setMenuOpen(open) {
    if (!mobileMenu || !navLinks) return;
    navLinks.classList.toggle("mobile-open", open);
    mobileMenu.setAttribute("aria-expanded", String(open));
    mobileMenu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    const icon = mobileMenu.querySelector("span");
    if (icon) icon.textContent = open ? "✕" : "☰";
  }
  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", () => setMenuOpen(!navLinks.classList.contains("mobile-open")));
    navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") setMenuOpen(false); });
    window.addEventListener("resize", () => { if (window.innerWidth > 800) setMenuOpen(false); });
    document.addEventListener("click", (event) => {
      if (window.innerWidth <= 800 && navLinks.classList.contains("mobile-open") && !navLinks.contains(event.target) && !mobileMenu.contains(event.target)) setMenuOpen(false);
    });
  }

  /* ACTIVE NAV LINK */
  const sections = $$("main section[id]");
  const navigationLinks = $$(".nav-links a");
  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navigationLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`));
    }, { rootMargin: "-20% 0px -60% 0px", threshold: [0, .1, .25, .5] });
    sections.forEach((section) => navObserver.observe(section));
  }

  /* LIVE MAP CLOCK */
  const mapClock = $("#mapClock");
  function updateClock() {
    if (!mapClock) return;
    const now = new Date();
    const time = [now.getHours(), now.getMinutes(), now.getSeconds()].map((value) => String(value).padStart(2, "0")).join(":");
    mapClock.textContent = `SYSTEM ONLINE // ${time}`;
  }
  updateClock();
  if (mapClock) window.setInterval(updateClock, 1000);

  /* GENTLE REVEAL: CSS handles reduced-motion users without hiding content. */
  const revealElements = $$(".stat-card, .organelle-card, .formula-card, .fixed-energy-card, .integration-banner, .emergency-card, .simulator-card, .model-placeholder, .conclusion-card, .team-card");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08 });
    revealElements.forEach((element) => {
      element.classList.add("reveal-ready");
      revealObserver.observe(element);
    });
  }

  /* MODEL VERIFICATION */
  const aiVerification = {
    energy: { capacity: energyModel.emergencyCapacity, fixedDemand: energyModel.fixedDemand, energyPerFacility: energyModel.perFacility, biology: "PASS", mathematics: "PASS", decision: "APPROVED" },
    waste: { vacuoleAllocation: 5, biology: "PARTIAL", mathematics: "LIMITED", decision: "MODIFIED" },
    transportation: { erAllocation: 15, proposedAllocation: 30, structuralDamage: 50, biology: "FAIL", mathematics: "FAIL", decision: "REJECTED" }
  };
  aiVerification.energy.calculateMaximum = function () {
    return Math.floor((this.capacity - this.fixedDemand) / this.energyPerFacility);
  };
  const verifiedMaximum = aiVerification.energy.calculateMaximum();
  console.info("%c🧬 SMART CELL CITY ONLINE", "color:#1a73e8;font-size:18px;font-weight:bold;");
  console.info("Energy model: E = 10x + 80 | normal capacity: 120 | emergency capacity: 100");
  console.info(`Verified maximum additional facilities: ${verifiedMaximum} in emergency mode; 4 at normal capacity.`);
  console.info("AI challenge decisions: APPROVED / MODIFIED / REJECTED");
})();

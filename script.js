const analyticsPreferenceKey = "forx_analytics_preference";
const analyticsMeasurementID = "G-ZN1CRK79D8";
const cookieBanner = document.querySelector("[data-cookie-banner]");

function readAnalyticsPreference() {
  try {
    return localStorage.getItem(analyticsPreferenceKey);
  } catch {
    return null;
  }
}

function storeAnalyticsPreference(preference) {
  try {
    localStorage.setItem(analyticsPreferenceKey, preference);
  } catch {
    // Keep the choice for this page view when browser storage is unavailable.
  }
}

function loadAnalytics() {
  if (window.dataLayer) {
    window.gtag?.("consent", "update", {
      analytics_storage: "granted"
    });
    return;
  }

  window.dataLayer = [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted"
  });
  window.gtag("js", new Date());
  window.gtag("config", analyticsMeasurementID, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  const analyticsScript = document.createElement("script");
  analyticsScript.async = true;
  analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsMeasurementID}`;
  document.head.append(analyticsScript);
}

function setAnalyticsPreference(preference) {
  storeAnalyticsPreference(preference);
  cookieBanner.hidden = true;

  if (preference === "accepted") {
    loadAnalytics();
  } else {
    window.gtag?.("consent", "update", {
      analytics_storage: "denied"
    });
  }
}

function showCookieBanner() {
  cookieBanner.hidden = false;
}

const analyticsPreference = readAnalyticsPreference();
if (analyticsPreference === "accepted") {
  loadAnalytics();
} else if (analyticsPreference !== "rejected") {
  showCookieBanner();
}

document.querySelector("[data-cookie-accept]")?.addEventListener("click", () => {
  setAnalyticsPreference("accepted");
});

document.querySelector("[data-cookie-reject]")?.addEventListener("click", () => {
  setAnalyticsPreference("rejected");
});

document.querySelectorAll("[data-cookie-settings]").forEach((button) => {
  button.addEventListener("click", showCookieBanner);
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

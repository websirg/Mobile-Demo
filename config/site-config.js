/**
 * Websirg Mobix - Central Site & Business Configuration
 * Everything here updates reactively across Website, Dashboard, POS, and Invoices.
 */
const DEFAULT_SITE_CONFIG = {
  siteName: "Websirg Mobix",
  shortName: "Websirg Mobix",
  tagline: "Smartphones • Accessories • Repairs",
  phone: "+91 93546 31515",
  rawPhone: "919354631515",
  whatsapp: "+91 93546 31515",
  rawWhatsapp: "919354631515",
  email: "info@websirg.com",
  address: "Shop No. 14, Main Market, Connaught Place, New Delhi - 110001, India",
  shortAddress: "Main Market, New Delhi, India",
  gstNumber: "07ABCDE1234F1Z5",
  logo: "images/logo/logo.svg",
  darkLogo: "images/logo/logo-dark.svg",
  iconLogo: "images/logo/logo-icon.svg",
  favicon: "images/logo/favicon.svg",
  primaryColor: "#2563EB",
  primaryDark: "#1D4ED8",
  secondaryColor: "#06B6D4",
  darkBg: "#0B1220",
  darkBg2: "#050914",
  surfaceBg: "#FFFFFF",
  bodyBg: "#F8FAFC",
  textMain: "#111827",
  textMuted: "#64748B",
  borderColor: "#E2E8F0",
  openingHours: "Mon - Sat: 10:00 AM - 9:30 PM | Sun: 11:00 AM - 8:00 PM",
  warrantyPolicy: "7 Days Replacement on Accessories • 1 Year Brand Warranty on Smartphones • 90 Days Repair Guarantee",
  termsCondition: "1. Goods once sold are subject to manufacturer warranty terms.\n2. Original tax invoice required for all warranty claims.\n3. Physical and liquid damage not covered under store warranty.\n4. Repaired devices carry a 90-day warranty on replaced functional parts only."
};

function getSiteConfig() {
  try {
    const saved = localStorage.getItem('wm_site_config');
    if (saved) {
      return { ...DEFAULT_SITE_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Error reading site config from localStorage:', e);
  }
  return { ...DEFAULT_SITE_CONFIG };
}

function saveSiteConfig(newConfig) {
  try {
    const current = getSiteConfig();
    const updated = { ...current, ...newConfig };
    localStorage.setItem('wm_site_config', JSON.stringify(updated));
    applySiteConfig();
    return updated;
  } catch (e) {
    console.error('Error saving site config:', e);
    return null;
  }
}

function applySiteConfig() {
  const config = getSiteConfig();

  // 1. CSS Custom Properties
  document.documentElement.style.setProperty('--primary', config.primaryColor);
  document.documentElement.style.setProperty('--primary-dark', config.primaryDark || '#1D4ED8');
  document.documentElement.style.setProperty('--secondary', config.secondaryColor);

  // 2. DOM replacements
  document.querySelectorAll('[data-config]').forEach(el => {
    const key = el.getAttribute('data-config');
    if (key === 'siteName') el.textContent = config.siteName;
    else if (key === 'shortName') el.textContent = config.shortName;
    else if (key === 'tagline') el.textContent = config.tagline;
    else if (key === 'phone') el.textContent = config.phone;
    else if (key === 'whatsapp') el.textContent = config.whatsapp;
    else if (key === 'email') el.textContent = config.email;
    else if (key === 'address') el.textContent = config.address;
    else if (key === 'shortAddress') el.textContent = config.shortAddress;
    else if (key === 'gstNumber') el.textContent = config.gstNumber;
    else if (key === 'openingHours') el.textContent = config.openingHours;
    else if (key === 'phone-link') el.setAttribute('href', 'tel:' + config.phone.replace(/\s+/g, ''));
    else if (key === 'whatsapp-link') {
      const cleanNum = (config.rawWhatsapp || config.whatsapp).replace(/[^0-9]/g, '');
      el.setAttribute('href', 'https://wa.me/' + cleanNum + '?text=' + encodeURIComponent('Hello ' + config.siteName + ', I have an enquiry regarding smartphones and services.'));
    }
    else if (key === 'email-link') el.setAttribute('href', 'mailto:' + config.email);
    else if (key === 'logo') {
      const isShop = window.location.pathname.includes('/shop/');
      const prefix = isShop ? '../' : '';
      el.setAttribute('src', prefix + (el.closest('.shop-sidebar') || el.classList.contains('dark-logo-target') ? config.darkLogo : config.logo));
    }
    else if (key === 'darkLogo') {
      const prefix = window.location.pathname.includes('/shop/') ? '../' : '';
      el.setAttribute('src', prefix + config.darkLogo);
    }
    else if (key === 'iconLogo') {
      const prefix = window.location.pathname.includes('/shop/') ? '../' : '';
      el.setAttribute('src', prefix + config.iconLogo);
    }
    else if (key === 'copyright') el.textContent = `© ${new Date().getFullYear()} ${config.siteName}. All rights reserved.`;
  });

  // 3. Document Title
  if (document.title && document.title.includes('|')) {
    const parts = document.title.split('|');
    document.title = `${config.siteName} | ${parts.slice(1).join('|').trim()}`;
  }
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', applySiteConfig);
}

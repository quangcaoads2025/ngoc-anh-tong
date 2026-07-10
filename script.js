/*
  KẾT NỐI BIỂU MẪU:
  Dán URL Web App Google Apps Script vào FORM_ENDPOINT.
  Endpoint nhận JSON: name, phone, area, interest, message, createdAt, source.
*/
const FORM_ENDPOINT = "";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  const closeMenu = () => {
    mainNav?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Mở menu");
    document.body.classList.remove("menu-open");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = mainNav?.classList.toggle("is-open") ?? false;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Đóng menu" : "Mở menu");
    document.body.classList.toggle("menu-open", isOpen);
  });

  mainNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", event => {
    if (!mainNav?.classList.contains("is-open")) return;
    if (!mainNav.contains(event.target) && !menuToggle?.contains(event.target)) closeMenu();
  });

  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -25px" });
    revealElements.forEach(element => revealObserver.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add("is-visible"));
  }

  const sectionLinks = [...document.querySelectorAll('.main-nav a[href^="#"]:not(.nav-cta)')];
  const sections = sectionLinks
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      sectionLinks.forEach(link => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    }, { rootMargin: "-25% 0px -60%", threshold: [0.01, 0.2, 0.5] });
    sections.forEach(section => navObserver.observe(section));
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });
      productCards.forEach(card => {
        const categories = (card.dataset.category || "").split(/\s+/);
        card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
      });
    });
  });

  document.querySelectorAll(".accordion-item button").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".accordion-item");
      const shouldOpen = !item?.classList.contains("is-open");
      document.querySelectorAll(".accordion-item").forEach(other => {
        other.classList.remove("is-open");
        other.querySelector("button")?.setAttribute("aria-expanded", "false");
      });
      if (item && shouldOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  const phoneInput = document.querySelector('input[name="phone"]');
  phoneInput?.addEventListener("input", event => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 10);
    const parts = [];
    if (digits.length > 0) parts.push(digits.slice(0, 4));
    if (digits.length > 4) parts.push(digits.slice(4, 7));
    if (digits.length > 7) parts.push(digits.slice(7, 10));
    event.target.value = parts.join(" ");
    event.target.classList.remove("is-invalid");
  });

  const form = document.getElementById("leadForm");
  const formStatus = document.getElementById("formStatus");

  form?.addEventListener("submit", async event => {
    event.preventDefault();
    formStatus.className = "form-status";
    formStatus.textContent = "";
    form.querySelectorAll(".is-invalid").forEach(field => field.classList.remove("is-invalid"));

    const formData = Object.fromEntries(new FormData(form).entries());
    const phone = String(formData.phone || "").replace(/\D/g, "");
    const requiredFields = ["name", "phone", "interest"];
    let valid = true;

    requiredFields.forEach(name => {
      const field = form.elements[name];
      if (!String(formData[name] || "").trim()) {
        field?.classList.add("is-invalid");
        valid = false;
      }
    });

    if (!/^0\d{9}$/.test(phone)) {
      form.elements.phone?.classList.add("is-invalid");
      valid = false;
    }

    if (!form.elements.consent.checked) valid = false;

    if (!valid) {
      formStatus.classList.add("error");
      formStatus.textContent = "Vui lòng nhập đủ thông tin, số điện thoại 10 số và xác nhận đồng ý liên hệ.";
      return;
    }

    const payload = {
      name: String(formData.name).trim(),
      phone,
      area: String(formData.area || "").trim(),
      interest: String(formData.interest).trim(),
      message: String(formData.message || "").trim(),
      createdAt: new Date().toISOString(),
      source: "Website Hệ Thống Ngọc Anh"
    };

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    formStatus.textContent = FORM_ENDPOINT ? "Đang gửi yêu cầu..." : "Đang kiểm tra kết nối...";

    try {
      if (!FORM_ENDPOINT) {
        throw new Error("FORM_ENDPOINT_NOT_CONFIGURED");
      }

      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("SUBMIT_FAILED");

      formStatus.classList.add("success");
      formStatus.textContent = "Đã gửi yêu cầu. Đội ngũ tư vấn sẽ liên hệ theo thông tin bạn cung cấp.";
      form.reset();
    } catch (error) {
      formStatus.classList.add("error");
      formStatus.textContent = error.message === "FORM_ENDPOINT_NOT_CONFIGURED"
        ? "Biểu mẫu chưa được kết nối dữ liệu. Vui lòng gọi 1900 9270 hoặc liên hệ Zalo 0888 858 200."
        : "Chưa thể gửi yêu cầu. Vui lòng gọi 1900 9270 để được hỗ trợ.";
    } finally {
      submitButton.disabled = false;
    }
  });

  const currentYear = document.getElementById("currentYear");
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());
});

const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const orderForm = document.getElementById("order-form");
const formMessage = document.getElementById("form-message");

if (!mobileMenuButton || !mobileMenu || !orderForm || !formMessage) {
  throw new Error("Không tìm thấy thành phần menu hoặc biểu mẫu cần thiết.");
}

function closeMobileMenu() {
  mobileMenu.classList.add("hidden");
  mobileMenu.classList.remove("flex");
  mobileMenuButton.setAttribute("aria-expanded", "false");
  mobileMenuButton.setAttribute("aria-label", "Mở menu điều hướng");
}

mobileMenuButton.addEventListener("click", () => {
  const isOpening = mobileMenu.classList.contains("hidden");

  mobileMenu.classList.toggle("hidden");
  mobileMenu.classList.toggle("flex");
  mobileMenuButton.setAttribute("aria-expanded", String(isOpening));
  mobileMenuButton.setAttribute(
    "aria-label",
    isOpening ? "Đóng menu điều hướng" : "Mở menu điều hướng"
  );
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
    closeMobileMenu();
    mobileMenuButton.focus();
  }
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent =
    "Thông tin đã được kiểm tra trong bản demo này. Chưa có đơn hàng nào được gửi đến máy chủ hoặc tiệm bánh.";
  formMessage.classList.remove("hidden");
});
/* DarkMode */

export const darkModeToggle = () => {
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  if (darkModeToggle) {
    const savedMode = localStorage.getItem("theme");

    if (savedMode === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      darkModeToggle.checked = true;
      document.getElementById("logo").src = "https://res.cloudinary.com/dvdiiqe8e/image/upload/v1729365148/JAP-API/NovaShop_cfccd9.png";
    }

    darkModeToggle.addEventListener("change", () => {
      if (darkModeToggle.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        document.getElementById("logo").src = "https://res.cloudinary.com/dvdiiqe8e/image/upload/v1729365148/JAP-API/NovaShop_cfccd9.png";
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        document.getElementById("logo").src = "https://res.cloudinary.com/dvdiiqe8e/image/upload/v1729365151/JAP-API/NovaShop_white_bni6jm.png";
      }
    });
  }
};

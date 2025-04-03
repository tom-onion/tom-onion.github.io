let menuList = document.getElementById("menuList");
menuList.style.maxHeight = "0px";

function toggleMenu() {
  if (menuList.style.maxHeight == "0px") {
    menuList.style.maxHeight = "300px";
  } else {
    menuList.style.maxHeight = "0px";
  }
}

//HTML scroll effect//
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
/* Disable keyboard shortcuts */
// Disable Ctrl+S, Ctrl+U, Ctrl+Shift+I, Ctrl+Shift+C
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && (event.key === 's' || event.key === 'S')) {
    event.preventDefault();
    alert('Saving the page is disabled.');
  } else if (event.ctrlKey && (event.key === 'u' || event.key === 'U')) {
    event.preventDefault();
    alert('Viewing the page source is disabled.');
  } else if (event.ctrlKey && event.shiftKey && (event.key === 'i' || event.key === 'I')) {
    event.preventDefault();
    alert('Inspect Element is disabled.');
  } else if (event.ctrlKey && event.shiftKey && (event.key === 'c' || event.key === 'C')) {
    event.preventDefault();
    alert('Inspect Element is disabled.');
  }
});
/* Disable right-click context menu */
document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
  alert('Right-click is disabled.');
});
/* Disable F12 */
document.addEventListener('keydown', function (event) {
  if (event.key === 'F12') {
    event.preventDefault();
    alert('F12 key is disabled.');
  }
});
// Disable Ctrl+Shift+J
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.shiftKey && (event.key === 'j' || event.key === 'J')) {
    event.preventDefault();
    alert('Opening console is disabled.');
  }
});
// Disable Ctrl+Shift+C
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.shiftKey && (event.key === 'c' || event.key === 'C')) {
    event.preventDefault();
    alert('Opening console is disabled.');
  }
});
// Disable Ctrl+Shift+I
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.shiftKey && (event.key === 'i' || event.key === 'I')) {
    event.preventDefault();
    alert('Opening console is disabled.');
  }
});
// Disable Ctrl+U
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && (event.key === 'u' || event.key === 'U')) {
    event.preventDefault();
    alert('Viewing the page source is disabled.');
  }
});
// Disable Ctrl+C
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && (event.key === 'c' || event.key === 'C')) {
    event.preventDefault();
    alert('Copying is disabled.');
  }
});
// Disable Ctrl+A
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && (event.key === 'a' || event.key === 'A')) {
    event.preventDefault();
    alert('Selecting all is disabled.');
  }
});
// Disable Ctrl+P
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && (event.key === 'p' || event.key === 'P')) {
    event.preventDefault();
    alert('Printing is disabled.');
  }
});
// Disable Ctrl+V
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && (event.key === 'v' || event.key === 'V')) {
    event.preventDefault();
    alert('Pasting is disabled.');
  }
});
// Disable Ctrl+X
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && (event.key === 'x' || event.key === 'X')) {
    event.preventDefault();
    alert('Cutting is disabled.');
  }
});
// Disable Ctrl+Z
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && (event.key === 'z' || event.key === 'Z')) {
    event.preventDefault();
    alert('Undo is disabled.');
  }
});
// Disable Ctrl+Y
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && (event.key === 'y' || event.key === 'Y')) {
    event.preventDefault();
    alert('Redo is disabled.');
  }
});
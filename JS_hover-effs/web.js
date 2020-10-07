let mouse = document.querySelector(".cursor");
let navLinks = document.querySelectorAll(".nav-links li");

window.addEventListener("mousemove", cursor);

function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}

navLinks.forEach((link) => {
  link.addEventListener("mouseover", () => {
    mouse.classList.add("link-inc");
		link.classList.add('moused-link')
	});
	link.addEventListener("mouseleave", () => {
		mouse.classList.remove("link-inc");
		link.classList.remove('moused-link')
  });
});

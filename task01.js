const btn = document.querySelector(".j-btn-test");

btn.addEventListener("click", () => {
  const firstIcon = document.querySelector(".btn_icon_one");
  const secondIcon = document.querySelector(".btn_icon_two");
  if (firstIcon.style.display === "none") {
    firstIcon.style.display = "";
    secondIcon.style.display = "none";
  } else {
    firstIcon.style.display = "none";
    secondIcon.style.display = "";
  }
})
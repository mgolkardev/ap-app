const modal = document.getElementById("video-modal");
const close = document.getElementsByClassName("close-modal")[0];

function showModal(src) {
  modal.style.display = "block";
}

// close click
close.onclick = function () {
  modal.style.display = "none";
  input.focus();
};

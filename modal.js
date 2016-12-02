function showModal() {
  var modal = document.getElementById('modal');
  modal.className = "modalContainer fadeIn";
  modal.style.display = "flex";
};

function hideModal() {
  var modal = document.getElementById('modal');
  modal.className = "modalContainer fadeOut";
  setTimeout(function(){
    modal.style.display = "none";
  }, 200);
};

const sidebarBtn = document.querySelector(".toggle-btn");
const sidebar = document.querySelector("aside");
const main = document.querySelector(".main-menu");

sidebarBtn.addEventListener("click", () => {
  document.body.classList.toggle("active");
  main.classList.toggle("siderbar-activate");
});

// Menu

function mostrarDiv(idBoton) {

  const idDiv = idBoton.replace('button-', '');

  const divs = document.querySelectorAll('.div-carta');

  divs.forEach(div => {
    div.classList.remove('show')
  })
  const divMostrar = document.getElementById(idDiv);

  divMostrar.classList.add('show');
}


const tabs = document.querySelectorAll('.a-tabs');

tabs.forEach(tab => {

  tab.addEventListener('click', function () {

    tabs.forEach(t => {
      t.classList.remove('active');
    });
    this.classList.add('active');

    mostrarDiv(this.id);
  });
});

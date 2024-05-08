const navbar = `
<nav>
<div class="sidebar-header">
    <a class="logo-wrapper">
        <img src="./assets/img/logof-192x192.png" alt="Logo">
        <h2 class="hidden">BISTRO</h2>
    </a>
    <button class="toggle-btn">
        <img src="./assets/svg/expand.svg" alt="expand button">
    </button>
</div>
<div class="sidebar-links">
    <a class="link" href="/index.html">
        <img src="./assets/svg/home.svg" alt="">
        <span class="hidden">Inicio</span>
    </a>
    <a class="link" href="/menu.html">
        <img src="./assets/svg/menu.svg" alt="">
    <span class="hidden">Menu</span>
    </a>
    <a class="link" href="/reservas.html">
        <img src="./assets/svg/reservas.svg" alt="">
        <span class="hidden">Reservas</span>
    </a>
    </li>
    <a class="link" href="/contacto.html">
        <img src="./assets/svg/ubicacion.svg" alt="">
        <span class="hidden">Ubicación y Contacto</span>
    </a>
</div>
</nav>`;
document.querySelector("body").insertAdjacentHTML("afterbegin", navbar);


const sidebarBtn = document.querySelector(".toggle-btn");
//const sidebar = document.querySelector("aside");
const main = document.querySelector(".main");

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

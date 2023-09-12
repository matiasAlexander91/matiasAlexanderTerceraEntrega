import { elegirEjercicio } from "./plan.js";
import { ejercicios } from "../db/ejercicios.js";

const userLogin = document.getElementById("userLogin");
const divEjercicios = document.getElementById("ejercicios");
const filterInput = document.getElementById("filter__input");
const btnAgregarAleatorio = document.getElementById("btnAgregarAleatorio")

export let ejerciciosDisponibles = JSON.parse(
  localStorage.getItem("ejercicios")
);
let usuarioLogeado = JSON.parse(sessionStorage.getItem("usuario"));

document.addEventListener("DOMContentLoaded", () => {
  if (usuarioLogeado === null) {
    const a = document.createElement("a");
    a.href = "./html/usuarios.html";
    a.innerHTML = "Login";
    userLogin.appendChild(a);
  } else {
    const p = document.createElement("p");
    const close = document.createElement("button");

    p.innerHTML = `Bienvenido ${usuarioLogeado.user}`;
    close.id = "cerrar__sesion";
    close.innerHTML = "cerrar sesion";
    close.addEventListener("click", () => {

      sessionStorage.removeItem("usuario");
      location.reload();
    });
    userLogin.appendChild(p);
    userLogin.appendChild(close);
  }

  generarCardsEjercicios(ejerciciosDisponibles);
});

export const generarCardsEjercicios = (ejercicios) => {
  divEjercicios.innerHTML = "";

  ejercicios.forEach((ejercicio) => {
    const { imagen, nombre, categoria, id } = ejercicio;
    let card = document.createElement("div");

    card.className = "ejercicio";
    card.innerHTML = `
          <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="${imagen}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">${categoria}</p>
            <button id="btn${id}" class="btn btn-primary"> Elegir </button>
          </div>
        </div>
          `;

    divEjercicios.appendChild(card);

    const btnElegir = document.getElementById(`btn${id}`);
    btnElegir.addEventListener("click", () => elegirEjercicio(id));
  });
};

filterInput.addEventListener("keyup", (e) => {
  const ejerciciosFilter = ejerciciosDisponibles.filter((ejercicio) =>
    ejercicio.nombre.toLowerCase().includes(e.target.value)
  );

  ejerciciosDisponibles = ejerciciosFilter;

  if (e.target.value !== "") {
    generarCardsEjercicios(ejerciciosFilter);
  } else {
    ejerciciosDisponibles = JSON.parse(localStorage.getItem("ejercicios"));
    generarCardsEjercicios(ejerciciosDisponibles);
  }
});
let objetosSeleccionados = [];

document.getElementById("generarBoton").addEventListener("click", function() {
  
  objetosSeleccionados = obtenerObjetosAleatorios(ejercicios, 6);

  const tablaObjetos = document.getElementById("tablaObjetos");
  const tbody = tablaObjetos.querySelector("tbody");
  tbody.innerHTML = ""; 

  objetosSeleccionados.forEach((objeto) => {
    const row = document.createElement("tr");
    const nombreCell = document.createElement("td");
    const categoriaCell = document.createElement("td");
    nombreCell.textContent = objeto.nombre;
    categoriaCell.textContent = objeto.categoria;
    row.appendChild(nombreCell);
    row.appendChild(categoriaCell);
    tbody.appendChild(row);
  });

  
  tablaObjetos.style.display = "table";
});
document.addEventListener("click", function(event) {
  const tablaObjetos = document.getElementById("tablaObjetos");
  const generarBoton = document.getElementById("generarBoton");
  

  if (event.target !== tablaObjetos && event.target !== generarBoton) {
    tablaObjetos.style.display = "none"; 
  }
});
function obtenerObjetosAleatorios(objetos, cantidad) {
  if (cantidad > objetos.length) {
    console.error("No hay suficientes objetos en el arreglo para obtener la cantidad solicitada.");
    return [];
  }

  const objetosAleatorios = [];
  const copiaObjetos = [...objetos];

  for (let i = 0; i < cantidad; i++) {
    const indiceAleatorio = Math.floor(Math.random() * copiaObjetos.length);
    const objetoAleatorio = copiaObjetos.splice(indiceAleatorio, 1)[0];
    objetosAleatorios.push(objetoAleatorio);
  }

  return objetosAleatorios;
}

btnAgregarAleatorio.addEventListener ("click", function() {

  objetosSeleccionados.forEach((objeto) => {
   
    elegirEjercicio(objeto.id)
  }    
  )
})

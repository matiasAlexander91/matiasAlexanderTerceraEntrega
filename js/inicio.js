
import { elegirEjercicio } from "./plan.js";

const divEjercicios = document.getElementById("ejercicios");


export let ejerciciosDisponibles = JSON.parse(localStorage.getItem("ejercicios"));

document.addEventListener("DOMContentLoaded", () => {
  generarCardsEjercicios(ejerciciosDisponibles);
});

const generarCardsEjercicios = (ejercicios) => {
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

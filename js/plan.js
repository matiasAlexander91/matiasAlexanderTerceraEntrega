import { ejerciciosDisponibles } from "./inicio.js";

JSON.parse(sessionStorage.getItem("plan")) === null &&
  sessionStorage.setItem("plan", JSON.stringify([]));

document.addEventListener("DOMContentLoaded", () => {
  dibujarPlan();
});

let plan = JSON.parse(sessionStorage.getItem("plan"));
const btnPlan = document.getElementById("btnPlan");
const listaPlan = document.getElementById("items");
const footPlan = document.getElementById("totales");
const planTable = document.getElementById("plan");

btnPlan.addEventListener("click", () => {
  dibujarPlan();
  if (planTable.style.display === "block") {
    planTable.style.display = "none";
  } else {
    planTable.style.display = "block";
  }
});


export const elegirEjercicio = (idEjercicio) => {
  const ejercicio = ejerciciosDisponibles.find(
    (ejercicio) => ejercicio.id === idEjercicio
  );

  const { nombre, imagen, id } = ejercicio;

  const ejercicioPlan = plan.find((ejercicio) => ejercicio.id === idEjercicio);

  if (ejercicioPlan === undefined) {
    const nuevoEjercicioPlan = {
      id: id,
      nombre: nombre,
      imagen: imagen,
      cantidad: 1,
    };

    plan.push(nuevoEjercicioPlan);
    sessionStorage.setItem("plan", JSON.stringify(plan));
  } else {
    const indexEjercicioPlan = plan.findIndex(
      (ejercicio) => ejercicio.id === idEjercicio
    );
    sessionStorage.setItem("plan", JSON.stringify(plan));
  }
  plan = JSON.parse(sessionStorage.getItem("plan"));

};

const dibujarPlan = () => {
  listaPlan.innerHTML = "";
  plan.forEach((ejercicio) => {
    const { imagen, nombre, id } = ejercicio;
    let body = document.createElement("tr");

    body.className = "ejercicio__plan";

    body.innerHTML = `
        <th><img id="fotoejErcicioPlan" src="${imagen}" class="card-img-top" style="width:40%; height: 30%"</th>        
        <td>${nombre}</td>
        <td>
        <button id="-${id}" class="btn btn-danger">-</button>
        </td>
        `;
    listaPlan.append(body);

    const btnRestar = document.getElementById(`-${id}`);
    btnRestar.addEventListener("click", () => reducirCantidad(id));
  });
  dibujarFooter();
};

const dibujarFooter = () => {
  if (plan.length > 0) {
    footPlan.innerHTML = "";

    let footer = document.createElement("tr");
    footer.innerHTML = `
        <th><b>Ejercicios Elegidos:</b></th>
        <td></td>
        <td>${generarTotales().cantidadTotal}</td>
        <td></td>
        `;
    footPlan.append(footer);
  } else {
    footPlan.innerHTML = "<h3> No hay ejercicios en su plan </h3>";
  }
};

const generarTotales = () => {
  const cantidadTotal = plan.reduce(
    (total, { cantidad }) => total + cantidad,
    0
  );
  return {
    cantidadTotal: cantidadTotal,
  };
};

const reducirCantidad = (id) => {
  const indexEjercicioPlan = plan.findIndex((ejercicio) => ejercicio.id === id);
  console.log(plan[indexEjercicioPlan].cantidad);
  plan[indexEjercicioPlan].cantidad--;
  
  if (plan[indexEjercicioPlan].cantidad === 0) {
    plan.splice(indexEjercicioPlan, 1);
  }
  
  sessionStorage.setItem("plan", JSON.stringify(plan));
  dibujarPlan();
  
};

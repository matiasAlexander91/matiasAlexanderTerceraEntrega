const btnRegister = document.getElementById("btn__register");
const formRegister = document.getElementById("user__register");
const formLogin = document.getElementById("user__login");
const btnLogin = document.getElementById("btn__logearse");

let usuarios = JSON.parse(localStorage.getItem("usuarios"));

class newUser {
  constructor(user, pass) {
    this.id = usuarios.length + 1;
    this.user = user;
    this.pass = pass;
    this.admin = false;
  }
}
document.addEventListener("DOMContentLoaded", () => {
    if(btnLogin != null){

        btnLogin.addEventListener("click", (e) => {
            e.preventDefault();
            
            const user = formLogin.children[0].children[1].value;
            const pass = formLogin.children[1].children[1].value;
            
            validarYlogear(user, pass);
        });
    }
    if(btnRegister != null){

        btnRegister.addEventListener("click", (e) => {
            e.preventDefault();
            
            const user = formRegister.children[0].children[1].value;
            const pass = formRegister.children[1].children[1].value;
            
            const nuevoUsuario = new newUser(user, pass);
            
            validarYRegistrar(nuevoUsuario);
        });
    }
})


const validarYlogear = (user, pass) => {
  const userExiste = usuarios.find((usuario) => usuario?.user === user);

  if (userExiste === undefined || userExiste.pass !== pass) {
    Swal.fire({
      title: 'Error!',
      text: 'Usuario o contraseña incorrecta',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  } else {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Bienvenido ${user}',
      showConfirmButton: false,
      timer: 2500
    })
    

    let usuario = {
      user: userExiste.user,
      pass: userExiste.pass,
      admin: userExiste.admin,
    };

    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    location.href = "../index.html";
  }
};




const validarYRegistrar = (nuevoUsuario) => {
  const userNuevo = usuarios.find(
    (usuario) => usuario?.user === nuevoUsuario.user
  );
  if (nuevoUsuario.user === "") {
    Swal.fire({
      title: 'Error!',
      text: 'Por favor complete los campos',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
   
  } else if (userNuevo === undefined) {
    console.log("2");
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    sessionStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
    console.log(usuarios);
    location.href = "../index.html";
  } else {
    Swal.fire({
      title: 'Error!',
      text: 'El usuario ya existe',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
    

    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    location.href = "../index.html";
  }
};

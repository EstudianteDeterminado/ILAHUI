//Evento con el ID ingresar
document.getElementById("ingresar").addEventListener("click", function(){
    //Estamos obteniendo los valores
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
    const user = userCredential.user;
      // ...
    console.log("La cuenta se creo exitosamente")
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
      // ..
    console.log = ("Peresenta fallas en su Autenticación")
    });

})
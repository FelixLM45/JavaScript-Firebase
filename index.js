var firebaseConfig = {
    apiKey: "AIzaSyDUq82yFhxzHtJzeZyJx6qJUNX0trg8KBc",
    authDomain: "proyecto-39dbd.firebaseapp.com",
    databaseURL: "https://proyecto-39dbd-default-rtdb.firebaseio.com",
    projectId: "proyecto-39dbd",
    storageBucket: "proyecto-39dbd.appspot.com",
    messagingSenderId: "69082522471",
    appId: "1:69082522471:web:d48773fc28460ca701c5c2",
    measurementId: "G-WV1Z97WHJ7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields() {
    document.getElementById("Input1").value = '';
    document.getElementById("Input2").value = '';
    document.getElementById("Input3").value = '';
    document.getElementById("Input4").value = 'selecciona';
}

function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var edad = document.getElementById("Input3").value;
    var rol = document.getElementById("Input4").value;
    var tactica = document.getElementById("Input5").value;
    var pasiva = document.getElementById("Input6").value;
    var definitiva = document.getElementById("Input7").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var personaje = {
            id, //nombre de leyenda:id
            nombre,
            edad,
            rol,
            tactica,
            pasiva,
            definitiva
        }

        //console.log(personaje);

        firebase.database().ref('Personajes/' + id).update(personaje).then(() => {
            resetFields();
        }).then(() => {
            read();
        });

        swal("Listo!", "Agregado correctamente", "success");


    } else {
        swal("Error", "Llena todos los campos", "warning");
    }

    document.getElementById("Input1").disabled = false;
    //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es


    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Personajes').push().key;
    //data[`Personajes/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read() {
    document.getElementById("Table1").innerHTML = '';

    var ref = firebase.database().ref('Personajes');

    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(personaje) {

    if (personaje != null) {
        var table = document.getElementById("Table1");

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);

        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = personaje.id;
        cell2.innerHTML = personaje.nombre;
        cell3.innerHTML = personaje.edad;
        cell4.innerHTML = personaje.rol;
        cell5.innerHTML = personaje.tactica;
        cell6.innerHTML = personaje.pasiva;
        cell7.innerHTML = personaje.definitiva;
        cell8.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR('${personaje.id}')">Eliminar</button>`;
        cell9.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR(\'' + personaje.id + '\')">Modificar</button>';
    }
}

//Funcion delete
function deleteR(id) {
    firebase.database().ref('Personajes/' + id).set(null).then(() => {
        read();
    }).then(() => {
        swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id) {
    var ref = firebase.database().ref('Personajes/' + id);
    ref.on('value', function(snapshot) {
        updateR(snapshot.val());
    });
}

//Funcion modificar
function updateR(personaje) {
    if (personaje != null) {
        document.getElementById("Input1").value = personaje.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value = personaje.nombre;
        document.getElementById("Input3").value = personaje.edad;
        document.getElementById("Input4").value = personaje.rol;
        document.getElementById("Input5").value = personaje.tactica;
        document.getElementById("Input6").value = personaje.pasiva;
        document.getElementById("Input7").value = personaje.definitiva;
    }
}


//Para consulta de rol
function readQ() {
    document.getElementById("Table2").innerHTML = '';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Personajes");
    ref.orderByChild("rol").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}

function printRowQ(personaje) {

    var table = document.getElementById("Table2");

    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);

    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = personaje.id;
    cell2.innerHTML = personaje.nombre;
    cell3.innerHTML = personaje.edad;
    cell4.innerHTML = personaje.rol;
    cell5.innerHTML = personaje.tactica;
    cell6.innerHTML = personaje.pasiva;
    cell7.innerHTML = personaje.definitiva;
}
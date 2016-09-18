var peliculas = [];

function Pelicula(ID, titulo) {
  this.ID = ID;
  this.titulo = titulo;

  this.getID = function () {
    return this.ID;
  }
  this.setID = function (ID) {
    this.ID = ID;
  }
  this.getTitulo = function (){
    return this.titulo;
  }
  this.setTitulo = function (titulo){
    this.titulo = titulo;
  }
}

function estaVacio(array) {
  if (array.length === 0){
    return true;
  } else {
    return false;
  }
}

function ingresarPelicula(pelicula, array) {
  evaluarSiExisteLaPelicula (array, pelicula);
}


function verSiSeCargoLaPelicula(pelicula, array){
  for (i in array){
    if (pelicula.getTitulo() === array[i].getTitulo()){
      break;
    }
    return true;
  }
}

function evaluarSiExisteLaPelicula (array, pelicula) {
  if (estaVacio(array)){
    prompt('se ingreso la pelicula');
    array.push(pelicula);
  } else {
    if (verSiSeCargoLaPelicula(pelicula,array)){
      alert('la pelicula ya se ingreso');
    } else {
      prompt('se ingreso la pelicula');
      array.push(pelicula);
    }
  }
}

function ordenarPeliculasPorTitulo(array) {
  array.sort(function(a,b){
    if (a.titulo > b.titulo){
      return 1;
    }
    if (a.titulo < b.titulo){
      return -1;
    }
    return 0;
  });
}

function ordenarPeliculasPorID(array) {
  array.sort(function (a,b){
    return (a.ID - b.ID)
  });
}

function eliminarPelicula(array,ID){
  for (i in array){
    if (array[i].getID() === ID){
      array.splice(i,1);
    }
  }
}

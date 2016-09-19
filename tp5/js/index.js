var peliculas = [];

function Pelicula(id, titulo) {
  this.id = id;
  this.titulo = titulo;

  this.getId = function () {
    return this.id;
  }
  this.setId = function (id) {
    this.id = id;
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

function ordenarPeliculasPorid(array) {
  array.sort(function (a,b){
    return (a.id - b.id)
  });
}

function eliminarPelicula(array,id){
  for (i in array){
    if (array[i].getId() === id){
      array.splice(i,1);
    }
  }
}

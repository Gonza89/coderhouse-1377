function Pelicula(id,titulo) {
  this.id = id;
  this.titulo = titulo;

  this.getId = function () {
    return this.id;
  }

  this.setId = function (id) {
    this.id = id;
  }

  this.getTitulo = function () {
    return this.titulo;
  }

  this.setTitulo = function (titulo) {
    this.titulo = titulo;
  }
}


var imdb = (function () {
  var peliculas = [];

  var existePelicula = function (pelicula) {
    var pos = -1;
    for (i = 0; i < peliculas.length && pos === -1; i++){
      if (pelicula.id === peliculas[i].id){
        pos = i;
      }
    }
    return pos;
  }

  var guardarPeliculas = function () {
    var datos = JSON.stringify(noticias);
    localStorage.setItem('peliculas', datos);  

  }


  var agregarPelicula = function (pelicula) {
    var pos = existePelicula(pelicula);
    if (pos === -1){
      peliculas.push(pelicula);
      guardarPeliculas();
    } else {
      alert('la pelicula ya existe');
    }
  }

  var eliminarPelicula = function (pelicula) {
    var pos = existePelicula(pelicula) {
      if (pos > -1){
        peliculas.splice(pos,1);
        guardarPeliculas()
      } else {
        alert('la pelicula no existe');
      }
    }
  }

  var ordenarPeliculasPor = function (atributo) {
    peliculas.sort(function (a,b) {
      if (a.atributo > b.atributo ) {
        return 1;
      }
      if (a.atributo < b.atributo) {
        return -1;
      }
      return 0
    });
  console.log(peliculas);
  guardarPeliculas();
  }
  return {
    agregarPeliculaPub: agregarPelicula,
    eliminarPeliculaPub: eliminarPelicula
  }
})()

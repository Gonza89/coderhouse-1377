function Pelicula(id,titulo, descripcion, imagen) {
  this.id = id;
  this.titulo = titulo;
  this.descripcion = descripcion;
  this.imagen = imagen;

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

var IMDB = (function () {
  var peliculas = [];
  var claveLocalStorage = 'peliculas';


  var existePelicula = function (pelicula) {
    var pos = -1;
    for (i = 0; i < peliculas.length && pos === -1; i++){
      if (pelicula.id === peliculas[i].id){
        pos = i;
      }
    }
    return pos;
  }

  var borrarPeliculaDOM = function (pelicula) {
    var pelicula = document.getElementById(pelicula.id);
    pelicula.parentNode.removeChild(pelicula);

  }

  var precargarPeliculas = function () {
    var datos = localStorage.getItem(claveLocalStorage);
    if (datos !== null && datos !== ''){
      peliculas = JSON.parse(datos);
      for (i = 0; i < peliculas.length; i ++){
        dibujarPelicula(peliculas[i]);
      }
    }
  }


  var dibujarPelicula = function(pelicula){
      var ul = document.getElementById('peliculas');
      var li = document.createElement("li");
      var h1 = document.createElement("h1");
      var p = document.createElement("p");
      var img = document.createElement("img");
      var titulo = document.createTextNode(pelicula.titulo);
      var descripcion = document.createTextNode(pelicula.descripcion);
      var imagen = document.createTextNode(pelicula.imagen);

      li.setAttribute("id", pelicula.id);
      img.setAttribute("src","fuenteImagen");

      img.appendChild(imagen);
      h1.appendChild(titulo);
      p.appendChild(descripcion);
      li.appendChild(h1);
      li.appendChild(p);
      li.appendChild(img);
      ul.appendChild(li);
    }

  var guardarPeliculas = function () {
    var datos = JSON.stringify(peliculas);
    localStorage.setItem('peliculas', datos);
  }

  var recuperarPeliculas = function () {
    var datos = localStorage.getItem('peliculas');
    if (datos !== null) {
        peliculas = JSON.parse(datos);
    }
    for (i in peliculas){
      dibujarPelicula(peliculas[i]); // llamar al otro modulo
  }
}

  var agregarPelicula = function (pelicula) {
    var pos = existePelicula(pelicula);
    if (pos === -1){
      peliculas.push(pelicula);
      guardarPeliculas();
      dibujarPelicula(pelicula);
      } else {
      alert('la pelicula ya existe');
    }
  }

  var eliminarPelicula = function (pelicula) {
    var pos = existePelicula(pelicula);
      if (pos > -1){
        peliculas.splice(pos,1);
        guardarPeliculas();
        borrarPeliculaDOM(pelicula);
      } else {
        alert('la pelicula no existe');
      }
    }


  var ordenarPeliculasPor = function (atributo) {
    peliculas.sort(function (a,b) {
      if (a[atributo] > b[atributo] ) {
        return 1;
      }
      if (a[atributo] < b[atributo]) {
        return -1;
      }
      return 0
    });
  console.log(peliculas);
  guardarPeliculas();
  }

  return {
    agregarPeliculaPub: agregarPelicula,
    eliminarPeliculaPub: eliminarPelicula,
    precargarPeliculasPub: precargarPeliculas
  }

})()

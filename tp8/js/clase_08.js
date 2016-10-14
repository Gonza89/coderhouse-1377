function Pelicula(id, titulo, descripcion, imagen) {
  this.id = id;
  this.titulo = titulo;
  this.descripcion = descripcion;
  this.imagen = imagen;
}

var IMDB = (function () {
    var peliculas = [];
    var claveLocalStorage = 'peliculas';

    var precargarPeliculas = function () {
      var datos = localStorage.getItem(claveLocalStorage);
      if (datos !== null && datos !== ''){
        peliculas = JSON.parse(datos);
        for(i = 0; i < peliculas.length; i ++){
            dibujarPelicula(peliculas[i]);
        }
      }
    }
    var guardarPeliculas = function () {
      var datos = JSON.stringify(peliculas);
      localStorage.setItem(claveLocalStorage, datos);
    }

    var agregarTexto = function (elemento, texto) {
        var nodoTexto = document.createTextNode(texto);
        elemento.appendChild(nodoTexto);
        return elemento;
    }
    var dibujarPelicula = function(pelicula){
      var ul = document.getElementById('peliculas');
      var li = document.createElement("li");
      var h3 = document.createElement("h3");
      var p = document.createElement("p");
      var img = document.createElement("img");
      var button = document.createElement('button');

      li.setAttribute('id', pelicula.id);
      li.setAttribute('class', 'list-group-item');
      img.setAttribute('src', pelicula.imagen);
      img.setAttribute('class', 'img-responsive');


      h3 = agregarTexto(h3, pelicula.titulo);
      p = agregarTexto(p, pelicula.descripcion);
      button = agregarTexto(button, 'Borrar');

      button.setAttribute('class', 'btn btn-primary borrar-pelicula');
      button.setAttribute('type', 'button');

      button.onclick = function () {
        eliminarPelicula(pelicula);
      }

      li.appendChild(h3);
      li.appendChild(p);
      li.appendChild(img);
      li.appendChild(button);
      ul.appendChild(li);
    }

    var borrarPeliculaDOM = function (pelicula) {
      var ul = document.getElementById("peliculas");
      var li = document.getElementById(pelicula.id);
      ul.removeChild(li);

    }

    var existePelicula = function (pelicula) {
        var pos = -1;
        for (i = 0; i < peliculas.length && pos === -1; i++){
          if (pelicula.titulo === peliculas[i].titulo){
            pos = i;
          }
        }
    return pos;
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

    var limpiarIMDB = function () {
      peliculas = [];
      localStorage.removeItem(claveLocalStorage);

      var peliculasDOM = docume.getElementById("peliculas");

      while (peliculasDOM.firstChild) {
        peliculasDOM.removeChild(peliculasDOM.firstChild);
      }
    }

    var generarNuevoId = function () {
        var mayorId = -1;
        for (i in peliculas){
            if (peliculas[i].id > mayorId){
                mayorId = peliculas[i].id;
            }
        }
        mayorId = mayorId + 1;
        return mayorId;

    }
    var vincularFormulario = function () {
        var boton = document.getElementById('boton');

        boton.onclick = crearPelicula;
    }

    var crearPelicula = function () {

        var id = generarNuevoId();
        var elemTitulo = document.getElementById('titulo');
        var elemDescripcion = document.getElementById('descripcion')
        var elemImagen = document.getElementById('imagen')


        var pelicula = new Pelicula(id, elemTitulo.value, elemDescripcion.value, elemImagen.value);
        agregarPelicula(pelicula);
    }

    var borrarDOM = function () {
      var peliculasDOM = document.getElementById("peliculas");

        while (peliculasDOM.firstChild) {
            peliculasDOM.removeChild(peliculasDOM.firstChild);
        }
    }


    var dibujarOtraVez = function (peliculas){
      for (i in peliculas){
        dibujarPelicula(peliculas[i]);
      }
    }


    var construirComparador = function (atributo, ascendente) {
        return function (a, b) {
        var resultado = 0;
        if (a[atributo] > b[atributo]){
          resultado = 1;
        }
        if (a[atributo] < b[atributo]){
          resultado = -1;
        }
        if (a[atributo] === b[atributo]){
          resultado = 0;
        }
        if (ascendente === false) {
          resultado = resultado * -1;
        }
        return resultado;
        }
    }

    var ordenar = function (atributo, ascendente) {

        var comparador = construirComparador(atributo, ascendente);
        peliculas.sort(comparador);

        borrarDOM();
        dibujarOtraVez(peliculas);
        guardarPeliculas();
    }

    var vincularOrdenamientos = function () {

        var ordId = document.getElementById('ordenamiento_id');
        var ordAz = document.getElementById('ordenamiento_az');
        var ordZa = document.getElementById('ordenamiento_za');

        ordId.onclick = function () {
          ordenar('id', true);
        }

        ordAz.onclick = function () {
            ordenar('titulo', true);
        }

        ordZa.onclick = function (){
            ordenar('titulo', false);
        }

    }

    var ocultarOMostrar = function (boton) {
      var elemento = document.getElementById('peliculas');
      if(boton.textContent === 'Mostrar Peliculas'){
        elemento.style.display = 'block';
        boton.innerHTML = 'Ocultar Peliculas';
      } else if (boton.textContent === 'Ocultar Peliculas'){
        elemento.style.display = 'none';
        boton.innerHTML = 'Mostrar Peliculas';
      }
    }

    var vincularBotonMostrar = function () {
      var boton = document.getElementById('boton-mostrar');
      boton.onclick = function () {
        ocultarOMostrar(boton);
      }
    }

    var editarPelicula = function () {
      var titulo = document.getElementById('label-titulo').innerHTML;
      var descripcion = document.getElementById("label-descripcion").innerHTML;
      var imagen = document.getElementById("label-imagen").innerHTML;
      var boton = document.getElementById("boton").innerHTML;

      titulo = "Editar Titulo";
      descripcion = "Editar Descripcion";
      imagen = "Editar Imagen";
      boton = "Editar";
    }

    var iniciar = function () {
        precargarPeliculas();
        vincularFormulario();
        vincularOrdenamientos();
        vincularBotonMostrar();
    }

    return {
        iniciar: iniciar
    };

})()


window.onload = IMDB.iniciar;

/*
casos de prueba

titulo:
taxi driver

descripción:
robert de niro es un pibe

imagen:
http://i.imgur.com/OnGKQlV.jpg
------------------
titulo:
star wars

descripción:
guerra de las galaxias

imagen:
http://i.imgur.com/c6myhws.jpg


*/

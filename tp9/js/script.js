function Pelicula(id, titulo, descripcion, imagen, categoria) {
  this.id = id;
  this.titulo = titulo;
  this.descripcion = descripcion;
  this.imagen = imagen;
  this.categoria = categoria;
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
    var modificarPelicula = function(pelicula){
      var posicion = obtenerPosicionPelicula(pelicula.id);
      peliculas[posicion].titulo = pelicula.titulo;
      peliculas[posicion].descripcion = pelicula.descripcion;
      peliculas[posicion].imagen = pelicula.imagen;
      peliculas[posicion].categoria = pelicula.categoria;

      $('#' + pelicula.id + ' ' + 'h3').html(pelicula.titulo);
      $('#' + pelicula.id + ' ' + 'p').html(pelicula.descripcion);
      $('#' + pelicula.id + ' ' + 'img').attr('src', pelicula.imagen);
      $('#' + pelicula.id + ' ' + 'h4').html(pelicula.categoria);

      guardarPeliculas();
      limpiarFormulario();
    }

    var limpiarFormulario = function() {
        $('#boton').off('click');
        $('#boton').html('Agregar').on('click', crearPelicula);

        $('#titulo').val('');
        $('#descripcion').val('');
        $('#imagen').val('');
        $('#categoria').val('');

    }

    var cargarPelicula = function (pelicula) {
      $('#titulo').val(pelicula.titulo);
      $('#descripcion').val(pelicula.descripcion);
      $('#imagen').val(pelicula.imagen);
      $('#categoria').val(pelicula.categoria);
      $('#boton').off('click');
      $('#boton').html('Modificar').on('click', function() {
          pelicula.titulo = $("#titulo").val();
          pelicula.descripcion = $("#descripcion").val();
          pelicula.imagen = $("#imagen").val();
          pelicula.categoria = $('#categoria').val();

          modificarPelicula(pelicula);
      })
    }

    var dibujarPelicula = function(pelicula){
      $('<li/>')
          .attr('id', pelicula.id)
          .addClass('list-group-item')
          .appendTo('#peliculas');

      var botonEliminar = $('<button/>')
          .addClass('btn btn-default btn-xs')
          .on('click', function() {
              eliminarPelicula(pelicula.id);
          });
      var botonModificar = $('<button/>')
          .addClass('btn btn-default btn-xs')
          .on('click', function() {
              cargarPelicula(pelicula);
          });

      $('<span/>')
          .addClass('glyphicon glyphicon-remove')
          .html('Borrar')
          .appendTo(botonEliminar);

      $('<span/>')
          .addClass('glyphicon glyphicon-pencil')
          .html('Modificar')
          .appendTo(botonModificar);

      botonEliminar.appendTo('#' + pelicula.id);
      botonModificar.appendTo('#' + pelicula.id);

      $('<h3/>').html(pelicula.titulo).appendTo('#' + pelicula.id);
      $('<p/>').html(pelicula.descripcion).appendTo('#' + pelicula.id);
      $('<h4/>').html(pelicula.categoria).appendTo('#' + pelicula.id);
      $('<img/>').attr('src', pelicula.imagen).addClass("img-responsive").css({ width:"300px", height: "450px" }).appendTo('#' + pelicula.id);
    }

    var borrarPeliculaDOM = function (id) {
      $('#' + id).remove();
    }

    var obtenerPosicionPelicula = function (id) {
      var posicion = -1;
      for (i=0; i < peliculas.length && posicion === -1; i++){
        if (peliculas[i].id === id){
          posicion = i;
        }
      }
      return posicion;
    }

    var agregarPelicula = function (pelicula) {
      peliculas.push(pelicula);
      guardarPeliculas();
      dibujarPelicula(pelicula);
      limpiarFormulario();
    }

    var eliminarPelicula = function (id) {
      var posicion = obtenerPosicionPelicula(id);
      peliculas.splice(posicion, 1);
      guardarPeliculas();
      borrarPeliculaDOM(id);
    }

    var limpiarPeliculasDOM = function () {
      $("#peliculas li").remove();
    }

    var limpiarIMDB = function () {
      peliculas = [];
      localStorage.removeItem(claveLocalStorage);

      limpiarPeliculasDOM();
    }

    var construirComparador = function(atributo, ordenamientoAscendente) {
        return function(elementoA, elementoB) {
            var resultado;
            if (elementoA[atributo] > elementoB[atributo]) {
                resultado = 1;
            }
            if (elementoA[atributo] === elementoB[atributo]) {
                resultado = 0;
            }
            if (elementoA[atributo] < elementoB[atributo]) {
                resultado = -1;
            }
            if (ordenamientoAscendente === false) {
                resultado = -resultado;
            }
            return resultado;
        }
    }

    var ordenarPeliculas = function(atributo, ordenamientoAscendente) {

        var comparador = construirComparador(atributo, ordenamientoAscendente);

        peliculas.sort(comparador);

        guardarPeliculas();
        limpiarPeliculasDOM();
        precargarPeliculas();

    }

    var generarNuevoId = function () {
      var id = 0;
      if (peliculas.length !== 0) {
          var atributo = 'id';
          var ordenamientoAscendente = false;
          var comparador = construirComparador(atributo, ordenamientoAscendente);
          var copiaPeliculas = peliculas;

          copiaPeliculas.sort(comparador);

          id = copiaPeliculas[0].id + 1;

      }

      return id;

    }

    var mostrarOcultarListado = function() {
      $('#peliculas').toggle(
          // funcion de callback
        function() {
          if ($('#mostrarOcultarListado').text() === 'Ocultar Peliculas') {
            $('#mostrarOcultarListado').text('Mostrar Peliculas');

                    } else {

                        $('#mostrarOcultarListado').text('Ocultar Peliculas');
                    }

                }

            );
        }



    var vincularFormulario = function () {
        $('#boton').off('click').on('click', crearPelicula);
    }

    var crearPelicula = function () {

        var id = generarNuevoId();
        var elemTitulo = $('#titulo').val();
        var elemDescripcion = $('#descripcion').val();
        var elemImagen = $('#imagen').val();
        var elemcategoria = $('#categoria').val();


        var pelicula = new Pelicula(id, elemTitulo, elemDescripcion, elemImagen, elemcategoria);
        agregarPelicula(pelicula);
    }

    var vincularOrdenamientos = function () {

      $('#id').off('click').on('click', function functionName() {
          var atributo = 'id';
          var ordenamientoAscendente = true;

          ordenarPeliculas(atributo, ordenamientoAscendente);

      });
      $('#az').off('click').on('click', function functionName() {
          var atributo = 'titulo';
          var ordenamientoAscendente = true;

          ordenarPeliculas(atributo, ordenamientoAscendente);

      });
      $('#za').off('click').on('click', function functionName() {

          var atributo = 'titulo';
          var ordenamientoAscendente = false;

          ordenarPeliculas(atributo, ordenamientoAscendente);

      })

    }

    var vincularBotonListado = function() {
        $('#mostrarOcultarListado').on('click', function() {
            mostrarOcultarListado();
        })
    }

    var iniciar = function () {
        vincularFormulario();
        vincularOrdenamientos();
        vincularBotonListado();
        precargarPeliculas();
    }

    return {
        limpiarIMDB: limpiarIMDB,
        iniciar: iniciar
    };

})()


$(document).ready(function() {

    IMDB.iniciar();

});

/*
funcionalidades.
  crear una pelicula
  modificar y eliminar pelicula individualmente
  mostrar y ocultar listado de peliculas
  ordenar peliculas

casos de prueba

titulo:
taxi driver

descripción:
robert de niro es un pibe

imagen:
http://i.imgur.com/OnGKQlV.jpg

categoria:
Accion
------------------
titulo:
star wars

descripción:
guerra de las galaxias

imagen:
http://i.imgur.com/c6myhws.jpg

categoria:
Ciencia Ficcion

*/

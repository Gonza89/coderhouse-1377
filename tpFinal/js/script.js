function Artista (id, nombre, imagen){
  this.id = id;
  this.nombre = nombre;
  this.imagen = imagen;
}

function Discografia (id, nombre) {
  this.id = id;
  this.nombre = nombre;
}

function Album (nombre, imagen, release_date) {
  this.nombre = nombre;
  this.imagen = imagen;
  this.release_date = release_date;
}

function Cancion (numero, nombre, duracion, preview) {
  this.numero = numero;
  this.nombre = nombre;
  this.duracion = duracion;
  this.preview = preview;
}


var Spotify = (function () {

  var artistasFavoritos = [];
  var claveLocalStorage = 'artistasFavoritos';

  var dibujarArtista = function (artista, parametro) {

    var prefijo = parametro === 'resultadoFavoritos' ? 'f_' : 'b_';
    $('<li/>')
      .attr('id', prefijo + artista.id)
      .addClass('list-group-item')
      .appendTo('#'+parametro);

    var botonFav = $('<button/>')
      .addClass('btn btn-default')
      .attr('type', 'button')
      .off('click')
      .on('click', function() {
        if($(this).children('span').hasClass('glyphicon-star-empty')){
          $(this).children('span').removeClass('glyphicon-star-empty').addClass('glyphicon-star');
          agregarAFavoritos(artista);
        } else {
          $(this).children('span').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
          eliminarDeFavoritos(artista.id);
          if (parametro === 'resultadoFavoritos'){
            $('#' + prefijo + artista.id).remove()
          }
        }
      })
      .appendTo('#' + prefijo + artista.id);

    $('<span/>')
      .addClass('glyphicon '+ verificarSiEsFavorito(artista.id) )
      .html('Favoritos')
      .appendTo(botonFav);

    $('<h3/>')
      .html(artista.nombre)
      .appendTo('#' + prefijo + artista.id);

    $('<img/>')
      .attr('src', artista.imagen)
      .addClass('img-responsive')
      .css({height: "200px", width: "200px"}).appendTo('#'+ prefijo + artista.id);

    if (parametro === "resultadoFavoritos"){
      var discos = $('<h4/>')
        .appendTo('#'+ prefijo +artista.id)
        

      $('<a/>')
        .html('Discografía')
        .attr('href', '#')
        .attr('id', 'linkDiscografia')
        .appendTo(discos)
        .off('click')
        .on('click', function () {
          $('#discografia' + prefijo + artista.id).empty();
          buscarDiscografia (artista.id);
        });

      $('<ul/>')
        .attr('id', 'discografia'+ prefijo + artista.id)
        .addClass('list-group')
        .appendTo('#' + prefijo + artista.id);
    }

  }

  var verificarSiEsFavorito = function (id) {
    var posicion = obtenerPosicion(id);
    if (posicion < 0){
      return ('glyphicon-star-empty');
    } else {
      return ('glyphicon-star');
    }
  }

  var buscarArtista = function () {
    $("#buscarArtistas").off('click').on("click", function () {
      $('#resultadoArtistas').empty();
      var artista = $("#buscadorArtistas").val();
      $.ajax({
        url: "https://api.spotify.com/v1/search?type=artist&q=" + artista,
        crossDomain: true,
        dataType: "json"
      }).done(function (data) {
        for (obj of data.artists.items){
          if (obj.images.length > 1){
            var artista = new Artista(obj.id, obj.name, obj.images[1].url);
            dibujarArtista (artista, "resultadoArtistas");
          }
        }
      }).fail(function (jqXHR, textStatus) {
        console.error("textStatus");
      });
    });
  }

  var pestaniaFavoritos = function () {
    $("#linkFavoritos").off('click').on('click', function () {
      $('#resultadoFavoritos').empty();
      $("#linkFavoritos").parent().addClass("active");
      $("#linkBuscador").parent().removeClass("active");
      $("#pestaniaBuscador").removeClass("show").addClass("hidden");
      $("#pestaniaFavoritos").removeClass("hidden").addClass("show");
      for (var i = 0; i < artistasFavoritos.length; i++) {
        dibujarArtista(artistasFavoritos[i], 'resultadoFavoritos');
      }
    })
  }

  var pestaniaBuscador = function () {
    $("#linkBuscador").off('click').on("click", function () {
      $("#linkBuscador").parent().addClass("active");
      $("#linkFavoritos").parent().removeClass("active");
      $("#pestaniaBuscador").removeClass("hidden").addClass("show");
      $("#pestaniaFavoritos").removeClass("show").addClass("hidden");
    })
  }


  var agregarAFavoritos = function (artista) {
    artistasFavoritos.push(artista);
    guardarArtistas();
  }

  var obtenerPosicion = function (id) {
    var posicion = -1;
    for (var i = 0; i < artistasFavoritos.length && posicion === -1; i++) {
      if (artistasFavoritos[i].id === id) {
        posicion = i;
      }
    }
    return posicion;
  }

  var eliminarDeFavoritos = function (id) {
    var posicion = obtenerPosicion(id);
    artistasFavoritos.splice(posicion, 1);
    guardarArtistas();
  }

  var guardarArtistas = function () {
    var artistas = JSON.stringify(artistasFavoritos);
    localStorage.setItem(claveLocalStorage, artistas);
  }

  var cargarArtistasFavoritos = function () {
    var datos = localStorage.getItem(claveLocalStorage);
    if (datos !== null && datos !== '') {
      artistasFavoritos = JSON.parse(datos);
    }
  }

  var buscarDiscografia = function (id) {

    $.ajax({
      url: 'https://api.spotify.com/v1/artists/' + id + '/albums?album_type=album&market=AR',
      crossDomain: true,
      dataType: 'json'
    }).done(function  (data) {
      for (obj of data.items){
        var discografia = new Discografia (obj.id, obj.name);
        dibujarDiscografia(id, discografia);
      }
    }).fail(function (jqXHR, textStatus) {
        console.error("textStatus");
      });
  }

  var dibujarDiscografia = function (id, discografia) {
    $('<li/>')
      .attr('id', discografia.id)
      .addClass('list-group-item')
      .appendTo('#discografiaf_' + id);

    $('<h5/>')
      .html(discografia.nombre)
      .appendTo('#' + discografia.id)
      .off('click')
      .on('click', function () {
        $("#dialogDetalleAlbum").modal("show");
        mostrarAlbum (discografia.id);
    })
  }

  var mostrarAlbum = function (id) {
    $.ajax({
      url: 'https://api.spotify.com/v1/albums/' + id,
      crossDomain: true,
      dataType: 'json'
    }).done(function (data) {
      var album = new Album (data.name, data.images[1].url, data.release_date);
      var canciones = data.tracks.items;
      $("<ul/>").addClass("list-group canciones").appendTo(".modal-body");
      if (canciones.length > 0){
        for (var i = 0; i < data.tracks.items.length; i++){
          var cancion = new Cancion (canciones[i].track_number, canciones[i].name, canciones[i].duration_ms, canciones[i].preview_url);
          dibujarCancion(cancion);
        }
      }
      dibujarAlbum(album);
    })
  }

  var dibujarAlbum = function (album) {
    $(".modal-header").empty();

    $("<h3/>")
      .html(album.nombre)
      .addClass("text-center")
      .appendTo(".modal-header");

    $("<h4/>")
      .html(album.release_date)
      .addClass("text-center")
      .appendTo(".modal-header");

    $("<img/>")
    .attr("src", album.imagen)
    .appendTo(".modal-header");

  }

  var dibujarCancion = function (cancion) {

    $("<li>")
      .attr("id", cancion.numero)
      .addClass("list-group-item")
      .appendTo(".canciones");

    $("<p>")
      .html(cancion.numero)
      .appendTo("#" + cancion.numero);

    $("<p>")
      .html(cancion.nombre)
      .addClass(".text-center")
      .appendTo("#" + cancion.numero);

    $("<p>")
      .html(moment(cancion.duracion).format("mm:ss"))
      .appendTo("#" + cancion.numero)
  }

  var iniciar = function () {
    buscarArtista();
    pestaniaFavoritos();
    pestaniaBuscador();
    cargarArtistasFavoritos();
  }
  return {
    iniciar: iniciar
  };
})()


$(document).ready(function () {

  Spotify.iniciar();

});

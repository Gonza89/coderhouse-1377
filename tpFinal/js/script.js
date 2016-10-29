function Artista (id, nombre, imagen, fav){
  this.id = id;
  this.nombre = nombre;
  this.imagen = imagen;
  this.fav = fav;

  this.setFav = function (fav) {
    this.fav = fav;
  }
  this.getFav = function () {
    return this.fav;
  }
}



var Spotify = (function () {

  var artistasFavoritos = [];
  var claveLocalStorage = 'artistasFavoritos';

  var dibujarArtista = function (artista) {
    $('<li/>')
      .attr('id', artista.id)
      .addClass('list-group-item')
      .appendTo('#resultadoArtistas');

    var botonFav = $('<button/>')
      .addClass('btn btn-default')
      .attr('type', 'button')
      .off('click').on('click', function () { agregarAFavoritos(artista); });

    if (artista.getFav){
      $('<span/>')
        .addClass('glyphicon glyphicon-star')
        .html('Favoritos')
        .appendTo(botonFav);
      botonFav.appendTo('#' + artista.id);
    } else {
      $('<span/>')
        .addClass('glyphicon glyphicon-star-empty')
        .html('Favoritos')
        .appendTo(botonFav);
      botonFav.appendTo('#' + artista.id);
    }

    $('<h3/>')
      .html(artista.nombre)
      .appendTo('#' + artista.id);

    $('<img/>')
      .attr('src', artista.imagen)
      .addClass('img-responsive')
      .css({height: "200px", width: "200px"}).appendTo('#'+ artista.id);

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
            var artista = new Artista(obj.id, obj.name, obj.images[1].url, "");
            dibujarArtista (artista);
          }
        }
      }).fail(function (jqXHR, textStatus) {
        console.error("textStatus");
      });
    });
  }

  var pestaniaFavoritos = function () {
    $("#linkFavoritos").off('click').on('click', function () {
      $("#linkFavoritos").parent().addClass("active");
      $("#linkBuscador").parent().removeClass("active");
      $("#pestaniaBuscador").removeClass("show").addClass("hidden");
      $("#pestaniaFavoritos").removeClass("hidden").addClass("show");
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

  agregarAFavoritos = function (artista) {
    artista.setFav(true);
    artistasFavoritos.push(artista);
    guardarArtista();
    //dibujarArtistaEnFavoritos(artista);
  }

  var guardarArtista = function () {
    var artistas = JSON.stringify(artistasFavoritos);
    localStorage.setItem(claveLocalStorage, artistas);
  }

  var iniciar = function () {
    buscarArtista();
    pestaniaFavoritos();
    pestaniaBuscador();
  }
  return {
    iniciar: iniciar
  };
})()


$(document).ready(function () {

  Spotify.iniciar();

});

function Pelicula(id,titulo,descripcion,anio,duracion,actores, director) {
  this.id = id;
  this.titulo = titulo;
  this.descripcion = descripcion;
  this.anio = anio;
  this.duracion = duracion;
  this.actores = actores;
  this.director = director;

  this.editartitulo = function (titulo) {
      this.titulo = titulo;
  }
  this.editarDescripcion = function (descripcion) {
    this.descripcion = descripcion;
  }
  this.editarAnio = function (anio) {
    this.anio = anio;
  }
  this.editarDuracion = function (duracion) {
    this.duracion = duracion;
  }
  this.editarActores = function (actor) {
    this.actores = actores.push(actor);
    for (i in actores){
      console.log(actores[i]);
    }
  }
  this.editarDirector = function (director) {
    this.director = director;
  }
}

function Pelicula(id, titulo, descripcion, anio, duracion, director) {
  this.id = id;
  this.titulo = titulo;
  this.descripcion = descripcion;
  this.anio = anio;
  this.duracion = duracion;
  this.actores = [];
  this.director = director;

  this.setTitulo = function (titulo) {
    this.titulo = titulo;
  }
  this.getTitulo = function () {
    return this.titulo;
  }
  this.setDescripcion = function (descripcion) {
    this.descripcion = descripcion;
  }
  this.getDescripcion = function (){
    return this.descripcion;
  }
  this.setAnio = function (anio) {
    this.anio = anio;
  }
  this.getAnio = function(){
    return this.anio;
  }
  this.setDuracion = function (duracion) {
    this.duracion = duracion;
  }
  this.getDuracion = function () {
    return this.duracion;
  }
  this.addActores = function () {
    var actor = prompt('ingresar un actor: ');
    this.actores.push(actor);
    var agregar = prompt('quiere agregar un actor mas?(si/no)');
    if (agregar === 'si'){
      this.addActores();
    }
  }
  this.getActores = function () {
    return this.actores;
  }
  this.setDirector = function (director) {
    this.director = director;
  }
  this.getDirector = function () {
    return this.director;
  }
}

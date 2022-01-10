class Usuario {
    constructor(nombre, apellido, libros, mascota) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascota = [mascota];
    }
    getFullName(){
        return ` ${this.nombre} ${this.apellido} `
    }
    addMascota(nuevaMascota){
        this.mascota.push(nuevaMascota)
    }
    countMascotas(){
        return this.mascota.length
    }
    addBook(nombre, autor){
        let libro = {nombre: nombre, autor: autor}
        this.libros.push(libro)
    }
   getBookNames(){
       return this.libros.map(function (libros) {
            return libros.nombre
        })
    }
}
const luis = new Usuario('Luis','Andrade',[{nombre: 'El Señor de Los Anillos', autor: 'Tolkien'}],'Bongo')
console.log(luis)
luis.addMascota('Mia')
luis.addBook('harry poter', 'Rowling')
console.log(luis.getFullName())
console.log(luis.countMascotas())
console.log("los nombres de los libros")
console.log(luis.getBookNames())
console.log(luis)
console.log(luis.libros[1].nombre)
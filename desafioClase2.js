class Usuario {
    constructor(nombre, apellido, libros, mascota) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [{nombre: libros[0].nombre , autor: libros[0].autor }];
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
        let nombresLibro = [] ;
        let i = 0
        while (i < this.libros.length){
            nombresLibro[i] = this.libros[i].nombre
            i = i +1
        }
        return nombresLibro
    }
}
luis = new Usuario('Luis','Andrade',[{nombre: 'El Señor de Los Anillos', autor: 'Tolkien'}],'Bongo')
console.log(luis)
luis.addMascota('Mia')
luis.addBook('harry poter', 'Rowling')
console.log(luis.getFullName())
console.log(luis.countMascotas())
console.log(luis.getBookNames())
console.log(luis)
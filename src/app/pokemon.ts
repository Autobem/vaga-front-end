//Criação da classe Pokemon para popular a tela com a informações selecionadas.
export class Pokemon {
    constructor(
        public id: number,
        public nome: string,
        public url: string,
        public tipos: Array<string>,
        public desc: string
        ) 
        {}
}
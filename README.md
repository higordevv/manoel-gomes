# Manoel Gomes Library
Adicione a imagem do Manoel Gomes a qualquer imagem de entrada usando o Node.js.


<div align="center">
<img src="https://github.com/higordevv/manoel-gomes/blob/master/src/__tests__/test_images/input.png?raw=true" alt="test1" width="200"/> -> <img src="https://github.com/higordevv/manoel-gomes/blob/master/src/__tests__/test_images/expected_output.png?raw=true" alt="test1" width="200"/>
</div>

## Instalação
```bash
npm install manoel-gomes 
```
### Uso
A biblioteca `manoel-gomes` oferece uma classe para adicionar a imagem do Manoel Gomes a uma imagem de entrada. Você pode escolher a imagem de entrada e especificar uma imagem de saída que inclui a imagem do Manoel Gomes. Você também pode optar por retornar um buffer em vez de salvar a imagem em disco.

## Exemplo
```js
import { Caneta } from "manoel-gomes";


const caneta = new Caneta("/path/to/input/image.jpg", {
  exportImage: "/path/to/output/image.png",
  returnBuffer: false,
});

caneta.canetar()
  .then((exportedImage) => {
    console.log(`Manoel Gomes adicionado com sucesso em ${caneta.exportImage}`);
  })
  .catch((err) => {
    console.error(`Erro ao adicionar Manoel Gomes: ${err}`);
  });
 ```
## API
Classe `Caneta`
 - `new Caneta(inputImage: string, options?: CanetaOptions)`

Cria uma nova instância de `Caneta` 

Parâmetros
 - `inputImage`: caminho para a imagem de entrada.
 - options (opcional):
    - exportImage (padrão: `${process.cwd()}/canetado.png` ): caminho para a imagem de saída.
    - returnBuffer (padrão: false): se verdadeiro, retorna um buffer em vez de salvar a imagem em disco.
`canetar(): Promise<string | Buffer>`
Adiciona a imagem do Manoel Gomes à imagem de entrada.

`getExportedImage(): Promise<Buffer>`
Retorna o buffer da imagem de saída.

Interface `CanetaOptions`
`exportImage?: string`
Caminho para a imagem de saída. Padrão: `${process.cwd()}/canetado.png `

`returnBuffer?: boolean`
Se verdadeiro, retorna um buffer em vez de salvar a imagem em disco. Padrão: `false`.

## CLI
Também há uma CLI incluída na biblioteca que usa a classe `Caneta`. Você pode instalá-la globalmente para usá-la em qualquer lugar.

### Instalação
```bash
npm install -g manoel-gomes
```

### Uso
```bash 
npx manoel-gomes --input /path/to/input/image.jpg --output /path/to/output/image.png
Opções
-i, --input <value> (obrigatório): caminho para a imagem de entrada.
-o, --output <value> (opcional): caminho para a imagem de saída.
```
# Créditos
Esta biblioteca foi criada por @higordevv.

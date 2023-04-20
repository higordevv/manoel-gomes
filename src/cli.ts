import { Command } from "commander";
import figlet from "figlet";
import { Caneta } from "./Caneta";

const program = new Command();

console.log(
  figlet.textSync("Manoel gomes", {
    width: 80,
  }) + "CLI\n - By Higordevv"
);

program
  .version("1.0.0")
  .description("Adicione Manoel Gomes em qualquer imagem")
  .requiredOption("-i, --input  <value]>", "Input image")
  .option("-o, --output <value>", "Output with manoel gomes")
  .parse(process.argv);

const options = program.opts();

const caneta = new Caneta(options.input, {
  exportImage: options.output,
  returnBuffer: false,
});

caneta
  .canetar()
  .then((exportedImage) => {
    console.log(`Manoel Gomes adicionado com sucesso em ${options.output || caneta.exportImage}`);
  })
  .catch((err) => {
    console.error(`Erro ao adicionar Manoel Gomes: ${err}`);
  });

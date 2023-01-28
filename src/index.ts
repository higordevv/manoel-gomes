import Jimp from "jimp";

export class Caneta {
  private inputImage: string;
  private exportImage: string;

  constructor(inputimage: string, options?: { exportImg?: string }) {
    this.inputImage = inputimage;
    if (options && options.exportImg) {
      this.exportImage = options.exportImg;
    } else {
      this.exportImage = `${process.cwd()}/canetado.png`;
    }
  }
  public async addManoelGomes(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const originalImg = await Jimp.read(this.inputImage);
        const manoelGomes = await Jimp.read(__dirname + "/images/image.png");

        const oWidth: number = originalImg.getWidth();
        const oHeight: number = originalImg.getHeight();

        let w: number = manoelGomes.getWidth();
        let h: number = manoelGomes.getHeight();

        if (oWidth < w || oHeight < h) {
          if (oWidth / oHeight < 1) {
            h = Math.round((h * oWidth) / w);
            w = oWidth;
          } else {
            w = Math.round((w * oHeight) / h);
            h = oHeight;
          }
        }

        manoelGomes.resize(w, h);
        originalImg.blit(
          manoelGomes,
          Math.round((oWidth - w) / 2),
          oHeight - h
        );
        originalImg.write(this.exportImage);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}

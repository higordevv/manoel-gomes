import fs from "fs/promises";
import { createWriteStream, existsSync } from "fs";
import path from "path";
import { createCanvas, loadImage } from "canvas";
import { mkdirp } from "mkdirp";

interface CanetaOptions {
  exportImage?: string;
  returnBuffer?: boolean;
}

export class Caneta {
  private inputImage: string;
  public exportImage: string;
  private returnBuffer: boolean;

  constructor(inputImage: string, options: CanetaOptions = {}) {
    this.inputImage = inputImage;
    this.exportImage = options.exportImage ?? `${process.cwd()}/canetado.png`;
    this.returnBuffer = options.returnBuffer ?? false;
  }

  public async canetar(): Promise<string | Buffer> {
    try {
      const originalImg = await loadImage(this.inputImage);
      const manoelGomes = await loadImage(
        path.join(__dirname, "/images/image.png")
      );

      const canvas = createCanvas(originalImg.width, originalImg.height);
      const ctx = canvas.getContext("2d");

      ctx.drawImage(originalImg, 0, 0);

      const oWidth = originalImg.width;
      const oHeight = originalImg.height;
      const mWidth = manoelGomes.width;
      const mHeight = manoelGomes.height;

      let w = mWidth;
      let h = mHeight;

      if (oWidth < w || oHeight < h) {
        if (oWidth / oHeight < 1) {
          h = Math.round((h * oWidth) / w);
          w = oWidth;
        } else {
          w = Math.round((w * oHeight) / h);
          h = oHeight;
        }
      }

      ctx.drawImage(
        manoelGomes,
        Math.round((oWidth - w) / 2),
        oHeight - h,
        w,
        h
      );

      if (this.returnBuffer) {
        const buffer = canvas.toBuffer();
        return buffer;
      } else {
        const dir = path.dirname(this.exportImage);
        if (!existsSync(dir)) {
          await mkdirp(dir);
        }
        const out = createWriteStream(this.exportImage);
        const stream = canvas.createPNGStream();
        stream.pipe(out);

        return new Promise<string>((resolve, reject) => {
          out.on("finish", () => resolve(this.exportImage));
          out.on("error", reject);
        });
      }
    } catch (err) {
      throw new Error(`Failed to add Manoel Gomes to image: ${err}`);
    }
  }
  public async getExportedImage(): Promise<Buffer> {
    if (!this.exportImage) new Error("Image not found");
    const buffer = await fs.readFile(this.exportImage);
    return buffer;
  }
}

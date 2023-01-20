import Jimp from "jimp";

export function addManoelGomesToImage(
  inputimage: string,
  exportimage: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    Jimp.read(inputimage)
      .then((original_img) => {
        Jimp.read(__dirname + "/images/image.png")
          .then((manoelGomes) => {
            const o_width: number = original_img.getWidth();
            const o_height: number = original_img.getHeight();

            let w: number = manoelGomes.getWidth();
            let h: number = manoelGomes.getHeight();

            if (o_width < w || o_height < h) {
              if (o_width / o_height < 1) {
                // smaller width
                h = Math.round((h * o_width) / w);
                w = o_width;
              } // smaller height
              else {
                w = Math.round((w * o_height) / h);
                h = o_height;
              }
            }

            manoelGomes.resize(w, h);

            original_img.blit(
              manoelGomes,
              Math.round((o_width - w) / 2),
              o_height - h
            );
            original_img.write(exportimage);
            resolve();
          })
          .catch((err) => {
            console.log("error", err);
            reject(err);
          });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

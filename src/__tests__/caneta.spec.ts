import fs from "fs/promises";
import path from "path";
import { Caneta } from "../Caneta";

describe("Caneta", () => {
  it("should add Manoel Gomes to the input image and save the result", async () => {
    const inputImage = path.join(__dirname, "test_images", "input.png");
    const expectedOutput = path.join(
      __dirname,
      "test_images",
      "expected_output.png"
    );
    const outputImage = path.join(__dirname, "test_images", "output.png");

    const caneta = new Caneta(inputImage, { exportImage: outputImage });
    const result = await caneta.canetar();
    const expected = await fs.readFile(expectedOutput);
    const exported = await fs.readFile(outputImage);

    expect(result).toEqual(expected);
    expect(exported).toEqual(expected);
  });

  it("should add Manoel Gomes to the input image and return the result as a buffer", async () => {
    const inputImage = path.join(__dirname, "test_images", "input.png");
    const expectedOutput = path.join(
      __dirname,
      "test_images",
      "expected_output.png"
    );

    const caneta = new Caneta(inputImage, { returnBuffer: true });
    const result = await caneta.canetar();
    const expected = await fs.readFile(expectedOutput);

    expect(result).toEqual(expected);
    expect(Buffer.isBuffer(result)).toBe(true);
  });

  it("should throw an error if the input image is not found", async () => {
    const inputImage = "not_found.png";
    const caneta = new Caneta(inputImage);

    await expect(caneta.canetar()).rejects.toThrow(
      `Failed to add Manoel Gomes to image: Error: Failed to load image from path: ${inputImage}`
    );
  });
});

describe("getExportedImage", () => {
  it("should return the exported image as a buffer", async () => {
    const inputImage = path.join(__dirname, "test_images", "input.png");
    const outputImage = path.join(__dirname, "test_images", "output.png");

    const caneta = new Caneta(inputImage, { exportImage: outputImage });
    await caneta.canetar();

    const result = await caneta.getExportedImage();
    const expected = await fs.readFile(outputImage);

    expect(result).toEqual(expected);
    expect(Buffer.isBuffer(result)).toBe(true);
  });

  it("should throw an error if the exported image is not found", async () => {
    const inputImage = path.join(__dirname, "test_images", "input.png");
    const outputImage = "not_found.png";

    const caneta = new Caneta(inputImage, { exportImage: outputImage });

    await expect(caneta.getExportedImage()).rejects.toThrow(
      `ENOENT: no such file or directory, open '${outputImage}'`
    );
  });

});

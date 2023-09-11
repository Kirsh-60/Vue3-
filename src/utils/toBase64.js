// 图片路径转64
// 引入image-tools
import { pathToBase64 } from "./coverTo";

// 将图片转为base64
async function convertImageToBase64(imgPath) {
  try {
    const base64 = await pathToBase64(imgPath);
    return base64;
  } catch (error) {
    console.error(error);
  }
}


export { convertImageToBase64 };

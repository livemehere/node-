const fs = require("fs").promises;
const path = require("path");
const { exit } = require("process");

/**
 * 분류 기준
 *
 * 비디오 : mp4, mov
 * 캡쳐 : png, aae
 * 원본 이미지(E 없음) : jpg
 * 수정된 이미지(E 있음) : 그대로 유지 jpg
 */
const args = process.argv.slice(2);
const targetFolder = args[0];

if (!targetFolder) {
  console.error("타켓 폴더를 입력해주세요");
  exit();
}

main();

async function main() {
  try {
    await fs.readdir(targetFolder);
  } catch (e) {
    console.log("존재하지 않는 폴더입니다");
    return;
  }

  //1.args[0] 의 폴더를 타겟으로한다.

  //2.args[0] 폴더내의 파일을 모두 읽는다.
  const fileList = (await fs.readdir(targetFolder)).slice(1);
  //3.확장자 별로 분류하여 폴더에 넣는다.(동영상, 이미지, 캡쳐)
  // 폴더 생성
  try {
    await fs.mkdir(`${targetFolder}/video`);
    await fs.mkdir(`${targetFolder}/captured`);
    await fs.mkdir(`${targetFolder}/duplicated`);
  } catch (e) {}

  fileList.forEach((file) => {
    //4.jpg일 경우 E가 포함된지 확인한다. (있으면 수정된 파일임으로, E가 없는 동일한 파일을 원본폴더로 이동시킨다)
    const extension = path.extname(`./${targetFolder}/${file}`);
    if (extension == ".mp4" || extension == ".mov") {
      fs.rename(`./${targetFolder}/${file}`, `./${targetFolder}/video/${file}`);
      console.log(`${file} 이 video 폴더로 이동 되었습니다`);
    }

    if (extension == ".png" || extension == ".aae") {
      fs.rename(`./${targetFolder}/${file}`, `./${targetFolder}/captured/${file}`);
      console.log(`${file} 이 captured 폴더로 이동 되었습니다`);
    }

    if (extension == ".jpg") {
      const isEdited = /E/g.test(file);
      if (!isEdited) {
        fs.rename(`./${targetFolder}/${file}`, `./${targetFolder}/duplicated/${file}`);
        console.log(`${file} 이 duplicated 폴더로 이동 되었습니다`);
      }
    }
  });
}

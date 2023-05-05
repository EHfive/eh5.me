import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import opencc from "opencc";

const { OpenCC } = opencc;

const rootDir = fileURLToPath(new URL("../", import.meta.url));

async function* walk(dir: string): AsyncGenerator<string> {
  for await (const d of await fs.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}

async function main() {
  const converter = new OpenCC("s2twp.json");

  async function cvtFile(inputFile: string, outputFile: string) {
    const content = await fs.readFile(inputFile);
    const result = await converter.convertPromise(content.toString());
    try {
      await fs.mkdir(path.dirname(outputFile));
    } catch (e: any) {
      if (e.code !== "EEXIST") {
        throw e;
      }
    }
    await fs.writeFile(outputFile, result);
  }

  const contentDir = path.join(rootDir, "src/content/blog/");

  await fs.rm(path.join(contentDir, "zh-tw"), {
    recursive: true,
    force: true,
  });

  const tasks = [];

  tasks.push(
    cvtFile(
      path.join(rootDir, "src/i18n/zh-cn.json"),
      path.join(rootDir, "src/i18n/zh-tw.json")
    )
  );

  for await (const file of walk(path.join(contentDir, "zh-cn"))) {
    const outputFile = file.replace("zh-cn", "zh-tw");
    tasks.push(cvtFile(file, outputFile));
  }

  await Promise.all(tasks);
}

await main();

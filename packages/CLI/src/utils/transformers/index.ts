import { promises as fs } from "fs";
import { tmpdir } from "os";
import path from "path";
import type { TConfig } from "@/src/utils/config/schema";
import { transformImports } from "@/src/utils/transformers/transformImports";
import { transformToJSX } from "@/src/utils/transformers/transformToJSX";
import { transformNextJS } from "@/src/utils/transformers/transformNextJS";
import { Project, ScriptKind, type SourceFile } from "ts-morph";

export type TTransformOptions = {
  filename: string;
  raw: string;
  config: TConfig;
}

export type TTransform<Output = SourceFile> =
  (opts: TTransformOptions & {sourceFile: SourceFile}) => Promise<Output>;

const transformers: TTransform[] = [
  transformImports,
  transformNextJS,
];

const project = new Project({ compilerOptions: {} });

const createTempSourceFile = async (fileName: string) => {
  const directory = await fs.mkdtemp(path.join(tmpdir(), "wrapper-component-library-"));
  return path.join(directory, fileName);
};

export const transform = async (options: TTransformOptions) => {
  const tempFile = await createTempSourceFile(options.filename);
  const sourceFile = project.createSourceFile(tempFile, options.raw, {
    scriptKind: ScriptKind.TSX,
  });

  for (const transformer of transformers) {
    transformer({ sourceFile, ...options });
  }

  return await transformToJSX({sourceFile,...options});
}

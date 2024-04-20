import { TTransform } from "@/src/utils/transformers";

export const transformImports: TTransform = async ({ sourceFile, config }) => {
  const importDeclarations = sourceFile.getImportDeclarations();

  for (const importDeclaration of importDeclarations) {
    const moduleSpecifier = importDeclaration.getModuleSpecifierValue();

    // Replace @/registry/[style] with the components alias.
    if (moduleSpecifier.startsWith("@/registry/")) {
      importDeclaration.setModuleSpecifier(
        moduleSpecifier.replace(/^@\/registry\/[^/]+/, config.aliases.components)
      );
    }

    if (moduleSpecifier === "@/utils") {
      importDeclaration.setModuleSpecifier(
        moduleSpecifier.replace(/^@\/utils/, config.aliases.utils)
      );
    }

    if (moduleSpecifier === "@/types") {
      importDeclaration.setModuleSpecifier(
        moduleSpecifier.replace(/^@\/types/, config.aliases.types)
      );
    }

    if (moduleSpecifier === "@/constants") {
      importDeclaration.setModuleSpecifier(
        moduleSpecifier.replace(/^@\/constants/, config.aliases.constants)
      );
    }

    if (moduleSpecifier === "@/icons") {
      importDeclaration.setModuleSpecifier(
        moduleSpecifier.replace(/^@\/icons/, config.aliases.icons)
      );
    }
  }

  return sourceFile
}

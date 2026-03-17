const fs = require("fs");
const path = require("path");
const vscode = require("vscode");

const TARGET_EXTENSION_ID = "tht13.rst-vscode";

const { RstSectionProvider } = require("./document-symbol-provider");

/**
 * Patch the package.json file of the extension.
 * This function mutates the input JSON object.
 *
 * @param {Record<string, any>} json
 */
function patchPackageJson(json) {
  json.contributes.languages[0].configuration = "./rst-configuration.json";
  json.contributes.grammars[0].path = "./syntaxes/rst.tmLanguage.json";
  json.contributes.grammars[0].scopeName = "source.rst";
}

/**
 * Copy the asset files (e.g., syntax definitions, configuration files)
 * to the extension's directory.
 *
 * @param {string} wd
 */
function copyAssetFiles(wd) {
  const configSrc = path.join(
    __dirname,
    "configuration/rst-configuration.json",
  );
  const configDest = path.join(wd, "rst-configuration.json");
  const syntaxSrc = path.join(__dirname, "syntaxes/rst.tmLanguage.json");
  const syntaxDest = path.join(wd, "syntaxes/rst.tmLanguage.json");

  fs.mkdirSync(path.dirname(syntaxDest), { recursive: true });

  fs.cpSync(configSrc, configDest);
  fs.cpSync(syntaxSrc, syntaxDest);
}

/**
 * Find the installed extension directory to patch.
 *
 * @param {string} extensionId
 * @returns {string}
 */
function findTargetExtensionDir(extensionId = TARGET_EXTENSION_ID) {
  const extension = vscode.extensions.getExtension(extensionId);
  if (!extension) {
    throw new Error(`Extension not found: ${extensionId}`);
  }

  return extension.extensionPath;
}

function activate(context) {
  const extensionDir = findTargetExtensionDir();
  const packageJsonPath = path.join(extensionDir, "package.json");
  const packageJsonBackupPath = path.join(extensionDir, "package.json.backup");

  // Only patch if we haven't already patched (i.e., backup doesn't exist).
  if (!fs.existsSync(packageJsonBackupPath)) {
    // Backup the original package.json before patching.
    fs.copyFileSync(packageJsonPath, packageJsonBackupPath);

    // Read, patch, and write back the package.json file.
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    patchPackageJson(packageJson);
    fs.writeFileSync(
      packageJsonPath,
      `${JSON.stringify(packageJson, null, 2)}\n`,
    );

    // Copy the asset files to the extension directory.
    copyAssetFiles(extensionDir);
  }

  // Register the document symbol provider for reStructuredText files.
  context.subscriptions.push(
    vscode.languages.registerDocumentSymbolProvider(
      { language: "rst" },
      new RstSectionProvider(),
    ),
  );
}

function deactivate() {
  // If you want to restore the extension to original state,
  // remove this extension and reinstall the original one from the marketplace.
}

module.exports = {
  activate,
  deactivate,
};

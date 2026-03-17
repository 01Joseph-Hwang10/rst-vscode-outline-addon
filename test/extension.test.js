const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");

const vscode = require("vscode");

const TARGET_EXTENSION_ID = "tht13.rst-vscode";
const DEV_EXTENSION_ID = "01Joseph-Hwang10.rst-vscode-outline-addon";

/** @type {string} */
let mockExtensionDir;
/** @type {typeof vscode.extensions.getExtension} */
let originalGetExtension;

function writeJson(filePath, json) {
  fs.writeFileSync(filePath, `${JSON.stringify(json, null, 2)}\n`, "utf8");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function createMockTargetExtensionDir(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
  fs.mkdirSync(path.join(dirPath, "syntaxes"), { recursive: true });

  writeJson(path.join(dirPath, "package.json"), {
    contributes: {
      languages: [{ configuration: "./language-configuration.json" }],
      grammars: [
        { path: "./syntaxes/original.tmLanguage.json", scopeName: "text.rst" },
      ],
    },
  });
}

suite("Extension Tests", () => {
  suiteSetup(async () => {
    mockExtensionDir = path.join(os.tmpdir(), TARGET_EXTENSION_ID);
    createMockTargetExtensionDir(mockExtensionDir);

    originalGetExtension = vscode.extensions.getExtension.bind(
      vscode.extensions,
    );
    vscode.extensions.getExtension = (extensionId) => {
      if (extensionId === TARGET_EXTENSION_ID) {
        return {
          id: TARGET_EXTENSION_ID,
          extensionPath: mockExtensionDir,
          isActive: true,
          activate: async () => ({}),
        };
      }

      return originalGetExtension(extensionId);
    };
  });

  suiteTeardown(() => {
    vscode.extensions.getExtension = originalGetExtension;
    fs.rmSync(mockExtensionDir, { recursive: true, force: true });
  });

  test("activates developing extension without error", async () => {
    const extension = vscode.extensions.getExtension(DEV_EXTENSION_ID);
    assert.ok(extension, `Extension not found: ${DEV_EXTENSION_ID}`);

    await assert.doesNotReject(async () => {
      await extension.activate();
    });
  });
});

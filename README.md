# RST Preview Outline Addon

This extension patches locally installed extension `tht13.rst-vscode` to ensure the [outline view](https://code.visualstudio.com/docs/getstarted/userinterface#_outline-view) is displayed correctly for `.rst` files. It modifies the `package.json` and adds several syntax files and configuration files to achieve this. These files are from `trond-snekvik.simple-rst` extension, which is another popular reStructuredText extension for VSCode.

## Usage

1. Install this extension.
2. After the installation, VSCode will alert you that the extension has been modified. Click the "Reload Window" button on the alert to apply the changes.
3. After reloading, the preview button should now be visible in the editor when you open a `.rst` file.

### Restoring Original Behavior of `tht13.rst-vscode`

If you want to restore the original behavior of `tht13.rst-vscode`, you can follow these steps:

1. Uninstall this extension.
2. Reinstall `tht13.rst-vscode` from the VSCode marketplace.

## References

- `trond-snekvik.simple-rst`: https://marketplace.visualstudio.com/items?itemName=trond-snekvik.simple-rst
- `tht13.rst-vscode`: https://marketplace.visualstudio.com/items?itemName=tht13.rst-vscode

## License And Attribution

This project is distributed under the MIT License. Parts of this software are derived from the following MIT-licensed extensions:

- `tht13.rst-vscode` (RST Preview), Copyright (c) 2016 Thomas Townsend
- `trond-snekvik.simple-rst` (reStructuredText Syntax highlighting), Copyright 2021 Trond Snekvik

See `LICENSE`, `NOTICE`, and the files in `LICENSES/` for the full license texts and attribution notices.

## Caveats

- `tht13.rst-vscode` requires `docutils`. Make sure you have it installed in your Python environment to use the preview feature. You can install it using pip: `pip install docutils`. Also, makesure rst-vscode is configured to use the correct Python interpreter where docutils is installed.

const { ConcatSource } = require("webpack-sources");

class GreasemonkeyHeaderPlugin {
    constructor(options = {}) {
        if (!options.name || !options.include) {
            throw new Error('Greasemonkey-scripts should contain at least a name and a include');
        }

        // Just add this line to avoid problems with gm which are not there
        options.grant = options.grant || 'none';

        const lengthOfLongestOption = Object.keys(options)
            .sort((a, b) => a.length - b.length)
            .pop()
            .length;

        const commentBody = Object.keys(options)
            .map(key => ({
                key: key.padEnd(lengthOfLongestOption),
                value: options[key]
            }))
            .map(parts => `// @${parts.key} ${parts.value}`)
            .join('\n');

        this.comment = '// ==UserScript==\n' + commentBody + '\n// ==/UserScript==\n'
    }

    apply(compiler) {
        compiler.hooks.compilation.tap("GreasemonkeyHeaderPlugin", compilation => {
            compilation.hooks.afterOptimizeChunkAssets.tap("GreasemonkeyHeaderPlugin", chunks => {
                chunks.filter(chunk => chunk.canBeInitial())
                    .forEach(chunk => {
                        chunk.files.forEach(file => {
                            compilation.assets[file] = new ConcatSource(
                                this.comment,
                                compilation.assets[file]
                            );
                        })
                    })
            });
        });
    };
}

module.exports = GreasemonkeyHeaderPlugin;

const fs = require('fs');
const path = require('path');
const { transformSync } = require('@babel/core');
const rollup = require('rollup');
const { terser } = require('rollup-plugin-terser');

const srcPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');

// Transpile code with Babel
const transpileCode = (code) => {
  const babelConfig = {
    presets: ['@babel/preset-env', '@babel/preset-react'],
  };
  const result = transformSync(code, babelConfig);
  return result.code;
};

// Rollup configuration
const rollupConfig = {
  input: path.join(srcPath, 'index.js'),
  output: {
    file: path.join(distPath, 'index.js'),
    format: 'umd',
    name: 'FavoriteButton',
    globals: {
      react: 'React',
    },
  },
  external: ['react'],
  plugins: [terser()],
};

// Build library
async function build() {
  try {
    // Create dist directory if not exists
    if (!fs.existsSync(distPath)) {
      fs.mkdirSync(distPath);
    }

    // Transpile source code
    const srcFiles = fs.readdirSync(srcPath);
    srcFiles.forEach((file) => {
      const filePath = path.join(srcPath, file);
      if (fs.statSync(filePath).isFile()) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const transpiledCode = transpileCode(fileContent);
        fs.writeFileSync(path.join(distPath, file), transpiledCode);
      }
    });

    // Bundle with Rollup
    const bundle = await rollup.rollup(rollupConfig);
    await bundle.write(rollupConfig.output);

    console.log('Library built successfully!');
  } catch (error) {
    console.error('Error building library:', error);
  }
}

build();

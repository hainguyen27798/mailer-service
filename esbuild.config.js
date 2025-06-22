import { build } from 'esbuild';
import { cpSync, readFileSync } from 'fs';
import { mkdirSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

const external = [...Object.keys(pkg.dependencies || {})];

build({
  entryPoints: ['src/main.js'],
  outdir: 'dist',
  format: 'esm',
  splitting: true,
  bundle: true,
  platform: 'node',
  target: ['node20'],
  minify: true,
  external,
})
  .then(() => {
    console.log('🔧 Build completed. Now copying .proto files...');

    // Copy proto files from src/proto to dist/proto
    const srcProtoDir = 'src/proto';
    const distProtoDir = 'dist/proto';

    mkdirSync(distProtoDir, { recursive: true });
    cpSync(srcProtoDir, distProtoDir, { recursive: true });

    console.log('✅ Copied .proto files to dist/proto');
  })
  .catch(() => process.exit(1));

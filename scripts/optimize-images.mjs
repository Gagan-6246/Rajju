/**
 * Image Optimization Script
 * 
 * Compresses and resizes images in public/images/ to web-friendly sizes
 * while retaining visual clarity. Creates optimized versions in public/images/optimized/
 * 
 * Usage: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, '..', 'public', 'images');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'optimized');

// Configuration
const CONFIG = {
  // Max width for full-size images (retains clarity for full-screen backgrounds)
  maxWidth: 1920,
  // JPEG quality (80 is a great balance of size vs clarity)
  jpegQuality: 80,
  // Enable mozjpeg for better compression at same quality
  mozjpeg: true,
};

async function optimizeImages() {
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all JPG files (skip the optimized directory)
  const files = fs.readdirSync(INPUT_DIR).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return (ext === '.jpg' || ext === '.jpeg' || ext === '.png') && file !== 'optimized';
  });

  console.log(`\n🖼️  Found ${files.length} images to optimize\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, file);

    try {
      const originalStats = fs.statSync(inputPath);
      const originalSize = originalStats.size;
      totalOriginal += originalSize;

      // Get image metadata
      const metadata = await sharp(inputPath).metadata();
      
      // Determine resize width
      const needsResize = metadata.width > CONFIG.maxWidth;
      
      let pipeline = sharp(inputPath)
        // Auto-rotate based on EXIF orientation
        .rotate();
      
      if (needsResize) {
        pipeline = pipeline.resize({
          width: CONFIG.maxWidth,
          withoutEnlargement: true,
          fit: 'inside',
        });
      }

      // Output as optimized JPEG
      await pipeline
        .jpeg({
          quality: CONFIG.jpegQuality,
          mozjpeg: CONFIG.mozjpeg,
        })
        .toFile(outputPath);

      const optimizedStats = fs.statSync(outputPath);
      const optimizedSize = optimizedStats.size;
      totalOptimized += optimizedSize;

      const reduction = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
      const originalMB = (originalSize / 1024 / 1024).toFixed(2);
      const optimizedMB = (optimizedSize / 1024 / 1024).toFixed(2);

      console.log(
        `  ✅ ${file.padEnd(20)} ${originalMB}MB → ${optimizedMB}MB  (${reduction}% smaller)` +
        (needsResize ? ` [resized ${metadata.width}→${CONFIG.maxWidth}px]` : '')
      );
    } catch (err) {
      console.error(`  ❌ ${file}: ${err.message}`);
    }
  }

  const totalOriginalMB = (totalOriginal / 1024 / 1024).toFixed(2);
  const totalOptimizedMB = (totalOptimized / 1024 / 1024).toFixed(2);
  const totalReduction = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);

  console.log(`\n${'─'.repeat(60)}`);
  console.log(`  📊 Total: ${totalOriginalMB}MB → ${totalOptimizedMB}MB  (${totalReduction}% reduction)`);
  console.log(`${'─'.repeat(60)}\n`);
}

optimizeImages().catch(console.error);

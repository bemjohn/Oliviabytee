import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // JSON parser with sufficient limit for compressed images
  app.use(express.json({ limit: '25mb' }));

  // Directories for storage
  const uploadsDir = path.resolve(__dirname, 'public/uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const dataDir = path.resolve(__dirname, 'server/data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const catalogFilePath = path.join(dataDir, 'store_catalog.json');

  // Serve static uploaded photos with caching for fast performance
  app.use(
    '/uploads',
    express.static(uploadsDir, {
      maxAge: '7d',
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
      },
    })
  );

  // API 1: Upload Image endpoint (Saves binary file directly to disk)
  app.post('/api/upload', async (req, res) => {
    try {
      const { imageBase64, filename } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: 'Missing imageBase64 data' });
      }

      // Check if it has a data URL prefix
      const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let buffer: Buffer;
      let ext = '.jpg';

      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        if (mimeType.includes('png')) ext = '.png';
        else if (mimeType.includes('webp')) ext = '.webp';
        buffer = Buffer.from(matches[2], 'base64');
      } else {
        buffer = Buffer.from(imageBase64, 'base64');
      }

      const safeBase = (filename || 'hair-unit')
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '-')
        .slice(0, 30);
      const uniqueFilename = `${safeBase}-${Date.now()}${ext}`;
      const filePath = path.join(uploadsDir, uniqueFilename);

      await fs.promises.writeFile(filePath, buffer);

      return res.json({
        success: true,
        url: `/uploads/${uniqueFilename}`,
        filename: uniqueFilename,
      });
    } catch (err: any) {
      console.error('Image upload failed:', err);
      return res.status(500).json({ error: err.message || 'Image upload failed' });
    }
  });

  // API 2: Fetch shared store catalog (seen by all customers on all devices)
  app.get('/api/store-data', async (_req, res) => {
    try {
      if (fs.existsSync(catalogFilePath)) {
        const raw = await fs.promises.readFile(catalogFilePath, 'utf-8');
        return res.json(JSON.parse(raw));
      }
      return res.json(null);
    } catch (err: any) {
      console.error('Failed to read store catalog:', err);
      return res.json(null);
    }
  });

  // API 3: Save shared store catalog
  app.post('/api/store-data', async (req, res) => {
    try {
      const storeData = req.body;
      if (!storeData || typeof storeData !== 'object') {
        return res.status(400).json({ error: 'Invalid store data' });
      }
      await fs.promises.writeFile(
        catalogFilePath,
        JSON.stringify(storeData, null, 2),
        'utf-8'
      );
      return res.json({ success: true });
    } catch (err: any) {
      console.error('Failed to save store catalog:', err);
      return res.status(500).json({ error: err.message || 'Failed to save store data' });
    }
  });

  // API 4: Reset to default factory demo catalog
  app.post('/api/reset-demo', async (_req, res) => {
    try {
      if (fs.existsSync(catalogFilePath)) {
        await fs.promises.unlink(catalogFilePath);
      }
      return res.json({ success: true, message: 'Reset to demo catalog successfully' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Development vs Production serving
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  } else {
    // Mount Vite in middleware mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Oliviabytee Full-Stack Server running on port ${PORT}`);
  });
}

startServer();

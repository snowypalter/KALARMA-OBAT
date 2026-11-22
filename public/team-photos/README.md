# Team Member Photos

Letakkan foto-foto tim di folder ini dengan nama:

- `masalah.jpg` atau `masalah.png` - Problem/Issue illustration
- `andika.jpg` atau `andika.png` - Andika Bella Pratama Putra
- `syahrul.jpg` atau `syahrul.png` - Syahrul Ramdhani
- `nur-abdullah.jpg` atau `nur-abdullah.png` - Nur Abdullah Kholiq

## Usage

Setelah letakkan foto-foto, jalankan:

```bash
npm run convert-photos
# atau
bun run convert-photos
```

Script akan otomatis:
1. ✅ Convert semua foto ke base64
2. ✅ Update `src/data/teamPhotos.ts`
3. ✅ Foto akan muncul di modal "Tentang Ruang Obat"

## Supported Formats

- JPEG / JPG
- PNG
- GIF
- WebP
- BMP

## Tips

- Gunakan foto **square** (1:1 aspect ratio) untuk hasil terbaik
- Ukuran disarankan: 300x300px - 500x500px
- Foto akan di-resize otomatis oleh browser ke aspect-square

Done! 🎉

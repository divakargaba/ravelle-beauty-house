export function applyWatermark(imageSrc) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(img, 0, 0);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 6);

      const fontSize = Math.max(canvas.width, canvas.height) * 0.06;
      ctx.font = `${fontSize}px 'Playfair Display', Georgia, serif`;
      ctx.fillStyle = 'rgba(201, 169, 110, 0.25)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const text = 'Ravélle Beauty House';
      const lineHeight = fontSize * 1.5;

      for (let y = -canvas.height; y < canvas.height; y += lineHeight * 3) {
        for (let x = -canvas.width; x < canvas.width; x += ctx.measureText(text).width + 80) {
          ctx.fillText(text, x, y);
        }
      }

      ctx.restore();

      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.onerror = reject;
    img.src = imageSrc;
  });
}

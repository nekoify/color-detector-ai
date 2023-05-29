const net = new brain.NeuralNetwork();

const trainingData = [
    { input: { r: 0, g: 0, b: 0 }, output: { black: 1 } },
    { input: { r: 1, g: 1, b: 1 }, output: { white: 1 } },
    { input: { r: 1, g: 0, b: 0 }, output: { red: 1 } },
    { input: { r: 0, g: 1, b: 0 }, output: { green: 1 } },
    { input: { r: 0, g: 0, b: 1 }, output: { blue: 1 } },
    { input: { r: 0.5, g: 0.5, b: 0 }, output: { yellow: 1 } },
    { input: { r: 0.5, g: 0, b: 0.5 }, output: { purple: 1 } },
    { input: { r: 0, g: 0.5, b: 0.5 }, output: { teal: 1 } },
    { input: { r: 1, g: 0.5, b: 0 }, output: { orange: 1 } },
    { input: { r: 1, g: 0.5, b: 0.5 }, output: { coral: 1 } },
    { input: { r: 0.5, g: 1, b: 0 }, output: { lime: 1 } },
    { input: { r: 0.5, g: 1, b: 0.5 }, output: { mint: 1 } },
    { input: { r: 0, g: 1, b: 0.5 }, output: { aqua: 1 } },
    { input: { r: 0.5, g: 0, b: 1 }, output: { indigo: 1 } },
    { input: { r: 1, g: 0, b: 0.5 }, output: { magenta: 1 } },
    { input: { r: 0.5, g: 0, b: 0 }, output: { maroon: 1 } },
    { input: { r: 0, g: 0.5, b: 0 }, output: { olive: 1 } },
    { input: { r: 0, g: 0, b: 0.5 }, output: { navy: 1 } },
    { input: { r: 0.5, g: 0.5, b: 0.5 }, output: { gray: 1 } },
    { input: { r: 0.75, g: 0.75, b: 0.75 }, output: { silver: 1 } },
    { input: { r: 1, g: 1, b: 0 }, output: { yellow: 1 } },
    { input: { r: 1, g: 0, b: 1 }, output: { fuchsia: 1 } },
    { input: { r: 0, g: 1, b: 1 }, output: { cyan: 1 } },
  { input: { r: 1, g: 0.5, b: 0.25 }, output: { salmon: 1 } },
  { input: { r: 0.5, g: 1, b: 0.25 }, output: { limegreen: 1 } },
  { input: { r: 0.25, g: 0.5, b: 1 }, output: { cornflowerblue: 1 } },
  { input: { r: 1, g: 0.75, b: 0.25 }, output: { gold: 1 } },
  { input: { r: 0.75, g: 0.25, b: 1 }, output: { lavender: 1 } },
  { input: { r: 0.25, g: 1, b: 0.75 }, output: { aquamarine: 1 } },
  { input: { r: 1, g: 0.25, b: 0.75 }, output: { hotpink: 1 } },
  { input: { r: 0.75, g: 1, b: 0.25 }, output: { chartreuse: 1 } },
  { input: { r: 0.25, g: 0.75, b: 1 }, output: { dodgerblue: 1 } },
  { input: { r: 1, g: 0.25, b: 0.25 }, output: { crimson: 1 } },
  { input: { r: 0.25, g: 1, b: 0.25 }, output: { forestgreen: 1 } },
  { input: { r: 0.25, g: 0.25, b: 1 }, output: { royalblue: 1 } },
  { input: { r: 0.75, g: 0.75, b: 0.25 }, output: { khaki: 1 } },
  { input: { r: 0.25, g: 0.75, b: 0.75 }, output: { skyblue: 1 } },
  { input: { r: 0.75, g: 0.25, b: 0.75 }, output: { orchid: 1 } },
  { input: { r: 0.75, g: 0.75, b: 1 }, output: { lightsteelblue: 1 } },
  { input: { r: 1, g: 0.5, b: 0.75 }, output: { deeppink: 1 } },
  { input: { r: 0.5, g: 1, b: 0.75 }, output: { mediumaquamarine: 1 } },
  { input: { r: 0.75, g: 0.5, b: 1 }, output: { mediumorchid: 1 } },
  { input: { r: 0.5, g: 0.75, b: 1 }, output: { lightskyblue: 1 } },
  // Add more training samples for other colors
  ];

  net.train(trainingData);


  function detectColor(obj) {
    const output = net.run(obj);
    
    return Object.keys(output).reduce((a, b) => output[a] > output[b] ? a : b);
  }

  async function detectImageColor(imagePath) {
    const pixels = await getImagePixels(imagePath);
    const detectedColors = [];
    for (const pixel of pixels) {
      const output = net.run(pixel);
      const color = Object.keys(output).reduce((a, b) => (output[a] > output[b] ? a : b));
      detectedColors.push(color);
    }
    return detectedColors;
  }

  async function getImagePixels(imagePath) {
    const image = await Jimp.read(imagePath);
    const pixels = [];
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      const normalizedRGB = normalizeRGB(r, g, b);
      pixels.push(normalizedRGB);
    });
    return pixels;
  }

  function normalizeRGB(r, g, b) {
    return {
      r: r / 255,
      g: g / 255,
      b: b / 255,
    };
  }

  function findMostCommonValue(array) {
    const frequencyMap = {};
  
    for (const value of array) {
      frequencyMap[value] = (frequencyMap[value] || 0) + 1;
    }
  
    let mostCommonValue;
    let highestFrequency = 0;
  
    for (const value in frequencyMap) {
      if (frequencyMap[value] > highestFrequency) {
        mostCommonValue = value;
        highestFrequency = frequencyMap[value];
      }
    }
  
    return mostCommonValue;
  }


const imgUpload = document.getElementById("imgUpload")
imgUpload.addEventListener("change", () => {


const reader = new FileReader();

reader.onload = async function (event) {
    document.getElementById("color").textContent = "Processing..."
    const imageDataUrl = event.target.result;
    const image = await Jimp.read(imageDataUrl);
    const imageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
    const base64Image = imageBuffer.toString('base64');
    const imagePath = `data:image/jpeg;base64,${base64Image}`;

    detectImageColor(imagePath)
      .then((detectedColors) => {
        console.log('Detected colors:', detectedColors);
        const mostCommonColor = findMostCommonValue(detectedColors);
        console.log('Most common color:', mostCommonColor);
        document.getElementById("color").textContent = "Color: " + mostCommonColor
        document.getElementById("info").textContent = "Check console for full array of detected colors"
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  reader.readAsDataURL(imgUpload.files[0]);
})

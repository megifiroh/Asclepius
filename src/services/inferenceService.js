const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()

    const classes = ['Melanocytic nevus', 'Squamous cell carcinoma', 'Vascular lesion'];

    const prediction = model.predict(tensor);

    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const label = classes[classResult];

    let result;

    switch (label) {
      case 'Melanocytic nevus':
        result = "Cancer"
        break;
      case 'Squamous cell carcinoma':
        result = "Cancer"
        break;
      case 'Vascular lesion':
        result = "Cancer"
        break;
      default:
        result = "Non-Cancer"
        break;
    }

    return result;
  } catch (error) {
    throw new InputError(`Terjadi kesalahan dalam melakukan prediksi`)
  }
}

module.exports = predictClassification;
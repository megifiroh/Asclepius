require('dotenv').config();

const tf = require('@tensorflow/tfjs-node');

// disable this to use cloud storage
const path = require('path');
const modelDir = path.join(__dirname, 'model');
const localModelPath = path.join(modelDir, 'model.json');


async function loadModel() {
  // disable to use local path
  return tf.loadGraphModel(`file://${localModelPath}`);

  // enable to use from cloudstorage
  // return tf.loadGraphModel(process.env.MODEL_URL);
}

module.exports = { loadModel };

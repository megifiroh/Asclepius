const { v4: uuidv4 } = require('uuid');
const { DateTime } = require('luxon');
const predictClassification = require('../services/inferenceService');  // NEW
const storeData = require('../services/storeData');
const getData = require('../services/getHistories');

const collectionName = 'predictions';


async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const id = uuidv4();
  const createdAt = DateTime.now().toISO();

  const result = await predictClassification(model, image);

  const data = {
    id: id,
    result: result,
    suggestion: "dr firoh berkata anda sakit, segeralah ke dokter",
    createdAt: createdAt,
  }

  console.log(data);

  await storeData(id, data, collectionName);

  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data
  })
  response.code(201);
  return response;
}

const getHistoriesHandler = async (request, h) => {
  try {
    const data = await getData(collectionName);

    const response = h.response({
      status: 'success',
      data: data
    });

    response.code(200);
    return response;
  } catch (error) {
    return h.response({
      status: 'fail',
      message: 'Kesalahan mengambil data history'
    }).code(500);
  }
};

module.exports = { postPredictHandler, getHistoriesHandler };

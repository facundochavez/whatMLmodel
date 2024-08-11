const getTableData = (modelsData, similarDatasetData) => {
  const data = [];

  modelsData.forEach((model) => {
    const datasetMetrics = similarDatasetData.metrics.find(
      (metrics) => metrics.modelAlias === model.alias
    );
    
    data.push({
      model: model.name,
      icon: model.icon,
      trainingTime: model.metrics.trainingTime,
      predictionSpeed: model.metrics.predictionSpeed,
      memoryUsage: model.metrics.memoryUsage,
      accuracy: datasetMetrics?.accuracy || '-',
      precision: datasetMetrics?.precision || '-',
      recall: datasetMetrics?.recall || '-',
      f1Score: datasetMetrics?.f1Score || '-',
      rocAuc: datasetMetrics?.rocAuc || '-',
      confusionMatrix: datasetMetrics?.confusionMatrix || '-',
      crossEntropy: datasetMetrics?.crossEntropy || '-',
    });
  });

  return data;
};

export default getTableData;

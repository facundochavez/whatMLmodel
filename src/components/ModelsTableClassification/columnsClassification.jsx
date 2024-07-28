import Image from 'next/image';

export const columnsClassification = [

  {
    accessorKey: 'model',
    header: ()=> <div className='text-left ml-2'>Model</div>,
    cell: ({ row }) => {
      const modelName = row.getValue('model');
      const icon = row.getValue('icon');

      return (
        <div className='flex items-center gap-5 min-w-max'>
          <Image
            src={`./models-icons/model-icon-${icon}.svg`}
            alt={`${modelName} icon`}
            width={28}
            height={28}
            className='font-foreground ml-2'
          />
          <h2 className='text-left min-w-max text-base'>{modelName}</h2>
        </div>
      );
    },
  },
  {
    accessorKey: 'icon',
    header: null,
    cell: null
  },
  {
    accessorKey: 'trainingTime',
    header: 'Training Time',
  },
  {
    accessorKey: 'predictionSpeed',
    header: 'Prediction Speed',
  },
  {
    accessorKey: 'memoryUsage',
    header: 'Memory Usage',
  },
  {
    accessorKey: 'accuracy',
    header: 'Accuracy',
  },
  {
    accessorKey: 'precision',
    header: 'Precision',
  },
  {
    accessorKey: 'recall',
    header: 'Recall',
  },
  {
    accessorKey: 'f1Score',
    header: 'F1 Score',
  },
  {
    accessorKey: 'rocAuc',
    header: 'ROC AUC',
  },
  {
    accessorKey: 'confusionMatrix',
    header: 'Confusion Matrix',
  },
  {
    accessorKey: 'crossEntropy',
    header: 'Cross-Entropy',
  },
];

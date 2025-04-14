import { Worker } from 'bullmq';
import { processLogFile } from '../services/parser.js';

const worker = new Worker('log-processing', async job => {
  await processLogFile(job.data.filename);
}, {
  connection: {
    host: 'redis',
    port: 6379
  }
});
worker.on('completed', job => console.log(`Processed job ${job.id}`));
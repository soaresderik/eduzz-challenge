import Queue from "bull";
import redisConfig from "../configs/redis.configs";

import mail from "./mail.queue";
import history from "./history.queue";

const queues = [mail, history].map((job: any) => ({
  bull: new Queue(job.key, { redis: redisConfig }),
  name: job.key,
  handle: job.handle,
  options: job?.options,
}));

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find((i) => i.name === name);

    return queue.bull.add(data, queue.options);
  },
  process() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);

      queue.bull.on("failed", (job, err) => {
        console.log("Job failed", queue.key, job.data);
        console.log(err);
      });
    });
  },
};

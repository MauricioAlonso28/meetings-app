import { InjectQueue, OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Job, Queue } from "bullmq";

@Injectable()
export class EmailQueueProcessor extends WorkerHost { 
  constructor(
    @InjectQueue("email-queue")
    private readonly emailQueue: Queue,
  ) { 
    super();
  }

  async process(job: Job): Promise<void> {
    console.log(`Processing job ${job.id} with data:`, job.data);
  }

  @OnWorkerEvent("failed")
  async onFailed(job: Job, error: Error) {
    console.error(`Job ${job.id} failed:`, error);
  }

  @OnWorkerEvent("completed")
  async onCompleted(job: Job) { 
    console.log(`Job ${job.id} completed`);
  }

  async signedUpEmailQueue(email: string): Promise<void> {
    await this.emailQueue.add(
      "signed-up-email",
      { email },
      {
        delay: 3000,
        lifo: true
      },
    )
  }

  async signedInEmailQueue(email: string): Promise<void> {
    await this.emailQueue.add(
      "signed-in-email",
      { email },
      {
        delay: 1000,
        lifo: true
      },
    )
  }
}
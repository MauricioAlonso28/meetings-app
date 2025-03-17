import { InjectQueue, OnWorkerEvent, WorkerHost } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Job, Queue } from "bullmq";

@Injectable()
export class AuthQueueProcessor extends WorkerHost {
  constructor(
    @InjectQueue("auth-queue")
    private readonly authQueue: Queue
  ) {
    super()
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

  async tokenRemovedAfterUpdate(token: string): Promise<void> {
    await this.authQueue.add(
      "auth-token-removed",
      { token },
      {
        delay: 3000,
        lifo: true
      },
    )
  }
}
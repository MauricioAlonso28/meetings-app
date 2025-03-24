import { InjectQueue, OnWorkerEvent, WorkerHost } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Job, Queue } from "bullmq";

@Injectable()
export class ProfessionalQueueProcessor extends WorkerHost {
  constructor(
    @InjectQueue("professional-queue")
    private readonly professionalQueue: Queue,
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

  async enabledVisibility(
    email: string,
    completedName: string
  ): Promise<void> {
    await this.professionalQueue.add(
      "professional-enable-queue",
      {
        email,
        completedName,
      }, 
      {
        delay: 3000,
        lifo: true
      }
    )
  }
}
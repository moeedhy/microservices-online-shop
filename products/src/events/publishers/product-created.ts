import { BasePublisher } from "@moeed/common/build/events/base-publisher";
import { ProductCreatedEvent } from "@moeed/common/build/events/product-created-event";
import { Subjects } from "@moeed/common/build/events/subjects";
import { Connection } from "amqplib";

export class ProductCreatedPublisher extends BasePublisher<ProductCreatedEvent> {
  constructor(client: Connection) {
    super(client);
  }
  subject: Subjects.productcreated = Subjects.productcreated;
}

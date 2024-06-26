import { Resolver, Query } from "@nestjs/graphql";
import { XmlService } from "./xml.service";
import { Make } from "./entities/make.entity";

@Resolver(() => Make)
export class XmlResolver {
  constructor(private readonly xmlService: XmlService) {}

  @Query(() => [Make], { name: "makes" })
  async getMakes(): Promise<Make[]> {
    return this.xmlService.findAll();
  }
}

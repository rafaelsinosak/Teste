import { Test, TestingModule } from "@nestjs/testing";
import { XmlResolver } from "../xml.resolver";
import { XmlService } from "../xml.service";

describe("XmlResolver", () => {
  let resolver: XmlResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        XmlResolver,
        {
          provide: XmlService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    resolver = module.get<XmlResolver>(XmlResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });

  it("should return an array of makes", async () => {
    const result = await resolver.getMakes(); // Alterar o nome do método para getMakes
    expect(result).toEqual([]);
  });
});

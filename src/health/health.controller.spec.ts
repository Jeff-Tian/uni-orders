import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { DNSHealthIndicator, HealthCheckService } from '@nestjs/terminus';
import { HttpService } from '@nestjs/common';
import { HealthCheckExecutor } from '@nestjs/terminus/dist/health-check/health-check-executor.service';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [HealthController],
      providers: [
        { provide: 'AXIOS_INSTANCE_TOKEN', useValue: 'AXIOS_INSTANCE_TOKEN' },
        HttpService,
        DNSHealthIndicator,
        HealthCheckExecutor,
        HealthCheckService,
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

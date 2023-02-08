import { ApiProperty } from '@nestjs/swagger';

export class GetKnightsDto {
  @ApiProperty()
  filter: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { DeepPartial } from 'typeorm';

export const SucessUpdateMessage = 'Updated successfully';
export const SucessDeletedMessage = 'deleted successfully';

export class SuccessUpdateMessageResponse {
  @ApiProperty({ example: 'Updated Successfully' })
  message: 'Updated successfully';
}

export class SuccessRemoveMessageResponse {
  @ApiProperty({ example: `deleted successfully` })
  message: `deleted successfully`;
}

export class CreatedResponse<T> {
  @ApiProperty({
    example: {
      schema: {
        id: 'number',
        createdAt: 'Date',
        updatedAt: 'Date',
        elseProps: '...',
      },
    },
  })
  data: DeepPartial<T>;
}

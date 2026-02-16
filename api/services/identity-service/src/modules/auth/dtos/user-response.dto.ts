import { ApiProperty } from '@nestjs/swagger';
import { ID, EUserType } from '@cinema/shared';

export class UserResponseDto {
  @ApiProperty({ example: 'user-id-550e8400-e29b-41d4-a716-446655440000' })
  id: ID;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: '+380501234567' })
  phoneNumber: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: EUserType.CUSTOMER, enum: EUserType })
  userType: EUserType;

  @ApiProperty({ example: false })
  emailVerified: boolean;
}

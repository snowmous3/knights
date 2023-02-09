import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export enum AttributesEnum {
  STRENGTH = 'strength',
  DEXTERITY = 'dexterity',
  CONSTITUTION = 'constitution',
  INTELLIGENCE = 'intelligence',
  WISDOM = 'wisdom',
  CHARISMA = 'charisma',
}

export class CreateKnightsDto {
  @ApiProperty()
  _id: ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty()
  @IsNotEmpty()
  birthday?: string; // MM/DD/YYYY

  @ApiProperty()
  @IsNotEmpty()
  weapons: [Weapons];

  // @IsNotEmpty()
  attributes: Attribute;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(AttributesEnum)
  keyAttribute: AttributesEnum;

  isDeleted?: boolean;
}

export class Weapons {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  mod: number;

  @ApiProperty()
  @IsNotEmpty()
  attr: string;

  @ApiProperty()
  @IsNotEmpty()
  equipped?: boolean = true;
}

export class Attribute {
  @ApiProperty()
  @IsNotEmpty()
  strength: number;

  @ApiProperty()
  @IsNotEmpty()
  dexterity: number;

  @ApiProperty()
  @IsNotEmpty()
  constitution: number;

  @ApiProperty()
  @IsNotEmpty()
  intelligence: number;

  @ApiProperty()
  @IsNotEmpty()
  wisdom: number;

  @ApiProperty()
  @IsNotEmpty()
  charisma: number;
}

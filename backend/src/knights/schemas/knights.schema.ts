import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type KnightsDocument = HydratedDocument<Knights>;

@Schema()
export class Knights {
  @Prop()
  name: string;

  @Prop({ require: true })
  nickname: string;

  @Prop({ require: true })
  birthday: string;

  @Prop({ require: true })
  weapons: Array<{
    name: string;
    mod: number;
    attr: string;
    equipped: boolean;
  }>;

  // @Prop()
  // attributes: any;

  @Prop({ require: true })
  keyAttribute: string;

  @Prop()
  isDeleted?: boolean = false;
}
export const KnightsSchema = SchemaFactory.createForClass(Knights);

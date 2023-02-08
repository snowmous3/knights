import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateKnightsDto } from './dto/create-knights.dto';
import { UpdateKnightsDto } from './dto/update-knigths.dto';
import { GetKnightsDto } from './dto/get-knights.dto';
import { Knights, KnightsDocument } from './schemas/knights.schema';

@Injectable()
export class KnightsService {
  constructor(
    @InjectModel(Knights.name) private knightModel: Model<KnightsDocument>,
  ) {}

  async create(createKnightsDto: CreateKnightsDto) {
    const createdKnight = new this.knightModel(createKnightsDto);
    return createdKnight.save();
  }

  async find(findDto: GetKnightsDto): Promise<any> {
    const { filter } = findDto;
    let isDeleted = null;

    if (filter === 'heroes') {
      isDeleted = true;
    }

    return this.knightModel.find({ filter }).where({ isDeleted }).exec();
  }

  async findById(id: string) {
    return this.knightModel.findById(id);
  }

  async update(id: string, updateKnightsDto: UpdateKnightsDto) {
    return new Promise(async (resolve, reject) => {
      const knight = await this.findById(id);
      const newData = Object.assign(knight, updateKnightsDto);
      const orderServiceModel = await this.knightModel.findByIdAndUpdate(
        id,
        newData,
        {
          new: true,
          upsert: true,
        },
      );

      resolve(orderServiceModel);
    });
  }

  // Soft Delete
  async delete(id: string) {
    return this.update(id, { isDeleted: true });
  }
}

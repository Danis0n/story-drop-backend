import { Injectable } from '@nestjs/common';
import { AgeDto, InsertAge, TagDto } from '../../dto';
import { TagWithRelation } from '../../validation';
import { Builder } from 'builder-pattern';

@Injectable()
export class TagMapper {
  public mapToTagDto({ tag_id, tag_name, age }: TagWithRelation): TagDto {
    return Builder(TagDto)
      .tagId(tag_id)
      .name(tag_name)
      .age(
        Builder(AgeDto)
          .ageId(age.age_id)
          .name(age.age_name)
          .color(age.color)
          .build(),
      )
      .build();
  }

  private mapToInsertAge(age: string): InsertAge {
    return { age_id: age };
  }

  public mapToTagPrisma(tagIds: string[]): { tag_id: string }[] {
    return tagIds.map((id) => {
      return { tag_id: id };
    });
  }
}

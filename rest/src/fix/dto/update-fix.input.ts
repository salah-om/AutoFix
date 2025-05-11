import { InputType, PartialType } from '@nestjs/graphql';
import { CreateFixInput } from './create-fix.input';

@InputType()
export class UpdateFixInput extends PartialType(CreateFixInput) {}

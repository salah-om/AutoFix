import { IsOptional, IsString} from 'class-validator';
export class UpdateFixDto {
  @IsOptional()
  @IsString()  
  issue?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  videourl?: string;
}
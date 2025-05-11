import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { FixService } from './fix.service';
import { Fix } from './fix.entity';
import { CreateFixInput } from './dto/create-fix.input';
import { UpdateFixInput } from './dto/update-fix.input';

@Resolver(() => Fix)
export class FixResolver {
    constructor(private readonly fixService: FixService) {
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Creates a new fix entry
        Route: POST /fixes
        Param:
          - CreateFixInput (CreateFixInput) -> DTO containing fix details
        Postcondition: Returns the newly created fix entry
      ----------------------------------------------------------------------------------
    */
    @Mutation(() => Fix)
    createFix(@Args('createFixInput') createFixInput: CreateFixInput): Promise<Fix> {
        return this.fixService.create(createFixInput);
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves all fix records
        Route: GET /fixes
        Postcondition: Returns an array of fix records
      ----------------------------------------------------------------------------------
    */
    @Query(() => [Fix], { name: 'fixes' })
    findAll(): Promise<Fix[]> {
        return this.fixService.findAll();
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Retrieves a specific fix entry by ID
        Route: GET /fixes/:id
        Param: id (number) -> Fix ID
        Postcondition: Returns fix details if found, otherwise throws NotFoundException
      ----------------------------------------------------------------------------------
    */
    @Query(() => Fix, { name: 'fix' })
    async findOne(@Args('id', { type: () => Int } ) id: number): Promise<Fix> {
        const fix = await this.fixService.findOne(id);
        if(!fix){
            throw new NotFoundException('Fix not found');
        }
        return fix;
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Updates an existing fix record
        Route: PATCH /fixes/:id
        Param:
          - id (number) -> Fix ID
          - fixUpdate (UpdateFixInput) -> DTO containing updated fix details
        Postcondition: Returns updated fix entry if successful
      ----------------------------------------------------------------------------------
    */
    @Mutation(() => Fix)
    updateFix(@Args('id', { type: () => Int } ) id: number, @Args('updateFixInput') updateFixInput: UpdateFixInput): Promise<Fix> {
        return this.fixService.update(id, updateFixInput);
    }

    /*  
      ----------------------------------------------------------------------------------
        Purpose: Deletes a fix entry
        Route: DELETE /fixes/:id
        Param: id (number) -> Fix ID
        Postcondition: Removes the fix record from the database
      ----------------------------------------------------------------------------------
    */
    @Mutation(() => Boolean)
    async deleteFix(@Args('id', { type: () => Int } ) id: number): Promise<boolean> {
        await this.fixService.delete(id);
        return true;
    }
}

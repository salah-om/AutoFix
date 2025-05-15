import { gql } from '@apollo/client';
import client from '../apolloClient.js';

/*
-----------------------------------------------------------------------
  Purpose: Fetches all fixes by name from the database
  Returns: Array of fix objects
-----------------------------------------------------------------------
*/
export const getAllFixesByName = async () => {
  try {
    const { data } = await client.query({
      query: gql`
        query {
          fixes {
            id
            issue
          }
        }
      `,
      fetchPolicy: "no-cache" 
    });
    return data.fixes;
  } catch (error) {
    console.error("Error fetching fixes:", error);
  }
};

/*
-----------------------------------------------------------------------
  Purpose: Fetches all fixes from the database
  Returns: Array of fix objects
-----------------------------------------------------------------------
*/
export const getAllFixes = async () => {
  try {
    const { data } = await client.query({
      query: gql`
        query {
          fixes {
            id
            issue
            description
            videourl
          }
        }
      `,
      fetchPolicy: "no-cache" 
    });
    return data.fixes;
  } catch (error) {
    console.error("Error fetching fixes:", error);
  }
};

/*
-----------------------------------------------------------------------
  Purpose: Deletes a specific fix by ID
  Parameters: 
    - id: string - The fix ID to delete
  Returns: None
-----------------------------------------------------------------------
*/
export const deleteFix = async (id) => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation DeleteFix($id: Int!) {
          deleteFix(id: $id)
        }
      `,
      variables: {
        id: Number(id)
      }
    });
    return data.deleteFix;
  } catch (error) {
    console.error("Error deleting fix:", error);
  }
};

/*
-----------------------------------------------------------------------
  Purpose: Fetches a specific fix by ID
  Parameters: 
    - id: string - The fix ID to delete
  Returns: Fix JSON object
-----------------------------------------------------------------------
*/
export const getFixById = async (id) => {
  try {
    const { data } = await client.query({
      query: gql`
        query Fix($id: Int!) {
          fix(id: $id) {
            id
            issue
            description
            videourl
          }
        }
      `,
      variables: { id: Number(id) }
    });
    return data.fix;
  } catch (error) {
    console.error("Error fetching fix by id:", error);
  }
};


/*
-----------------------------------------------------------------------
  Purpose: Creates a fix
  Parameters: 
    - fixData: JSON data of the fix to be made
  Returns: Fix JSON object
-----------------------------------------------------------------------
*/
export const createFix = async (fixData) => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation CreateFix($input: CreateFixInput!) {
          createFix(createFixInput: $input) {
            id
            issue
          }
        }
      `,
      variables: {
        input: fixData
      }
    });
    return data.createFix;
  } catch (error) {
    console.error("Error creating fix:", error);
  }
};


/*
-----------------------------------------------------------------------
  Purpose: Updates a specific fix by ID
  Parameters: 
    - id: string - The fix ID to delete
    - fixData: JSON - Data fields to be updated
  Returns: Fix JSON object
-----------------------------------------------------------------------
*/
export const updateFix = async (id, fixData) => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation UpdateFix($id: Int!, $input: UpdateFixInput!) {
          updateFix(id: $id, updateFixInput: $input) {
            id
            issue
            description
          }
        }
      `,
      variables: {
        id: Number(id),
        input: fixData
      }
    });
    return data.updateFix;
  } catch (error) {
    console.error("Error updating fix:", error);
  }
};

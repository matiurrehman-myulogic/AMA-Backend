import { Auth } from "src/schema/auth.schema";

export const pipeline = [
    {
      $match: {
        // Your match conditions, if needed
      },
    },
    {
      $lookup: {
        from: 'auths', // The name of the User collection
        localField: 'questionerId',
        foreignField: '_id', // The field in the User collection to match with localField
        as: 'answerer', 
    },
    },


    {
      $unwind: '$answerer', // Unwind the arrays created by $lookup
    },
    {
      $project: {


          _id: '$answerer._id', 
          FullName: '$answerer.FullName',

      },
    },
  ];
  


  
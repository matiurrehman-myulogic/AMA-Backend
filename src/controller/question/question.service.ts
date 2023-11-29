import { Injectable } from '@nestjs/common';

import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Question,
  QuentionDocument,
  QuestionSchema,
} from 'src/schema/question.schema';

import * as mongoose from 'mongoose';
import { Auth, AuthDocument } from 'src/schema/auth.schema';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { User_Status } from 'src/constants';
import { FirebaseApp } from 'src/database/firebase-app';
import { addReponseDTO } from 'src/DTO/addResponse.dto';
import { ChatSchema } from './../../schema/chat.schema';
@Injectable()
export class QuestionService {
  constructor(
    private config: ConfigService,
    @InjectModel(Question.name)
    private QuestionModel: mongoose.Model<QuentionDocument>,
    @InjectModel(Auth.name)
    private UserModel: mongoose.Model<AuthDocument>,
  ) {}

  async create({ userId, data }): Promise<Question> {
    // const apiKey = this.config.get<string>('GOOGLE_MAPS_API_KEY');
    // const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.Location.Latitude},${data.Location.Longitude}&key=${apiKey}`;

    // try {
    //   const response = await axios.get(apiUrl);
    //   return response.data.results[0]; // Return the first result (usually the most accurate)

    // } catch (error) {
    //   throw new Error('Failed to retrieve location data.');
    // }
    console.log('question asked', data);

    const updatedUser = await this.UserModel.findOneAndUpdate(
      { _id: userId },
      { $inc: { Points: -2 } }, // Use $inc to decrement the Points field by 2
      { new: true }, // To return the updated document
    );

    const res = await this.QuestionModel.create({ ...data, userId, likes: 0 });
    return res;
  }

  async findAll() {
    try {
      const user = await this.QuestionModel.find();
      console.log('ghghghghg', user);

      if (user) {
        const filteredData = await Promise.all(
          user.map(async (item: any) => {
            const id = item.userId;
            console.log('vjevk', id);
            const userPresent = await this.UserModel.findOne({ _id: id });
            console.log('userrr', userPresent);

            return {
              ProfilePic: userPresent.ProfilePic,
              FullName: userPresent.FullName,
              question: {
                ...item._doc,
              },
            };
          }),
        );

        console.log('filtered', filteredData);
        return filteredData;
      }

      return []; // Return an empty array if no data is found
    } catch (error) {
      console.error('Error while Fetching venue list:', error.message);
      throw error;
    }
  }
  async unAnsweredQuestions(id: string,page:number,limit:number) {
    try {
      const skip = (page - 1) * limit;

      // console.log("ll44ll",user);
      const indexes = await this.QuestionModel.collection.getIndexes();
      console.log('indexxxesss', indexes);



      const nearQuestions = await this.QuestionModel.find({
        'location.coordinates': {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [12.9716, 77.5946],
            },
            $maxDistance: 500, // in meters
          },
        },
        status: User_Status.OPEN, // Add the condition for status
        userId: { $ne: id },

      })
      .sort({ createdAt: -1 })
      .skip(skip) // Skip records based on the page
      .limit(limit) // Limit the number of records per page
      .exec();


      const questionsWithoutCoordinates = await this.QuestionModel.find({
        'location.coordinates': { $exists: false },
        status: User_Status.OPEN,
        userId: { $ne: id },
      })
      .sort({ createdAt:-1 })
      .skip(skip) // Skip records based on the page
      .limit(limit) // Limit the number of records per page
      .exec();

      const questions = nearQuestions.concat(questionsWithoutCoordinates);
      console.log("limit ka question",limit,page,questions)
      if (questions) {
        const filteredData = await Promise.all(
          questions.map(async (item: any) => {
            const id = item.userId;
            const userPresent = await this.UserModel.findOne({ _id: id });
            console.log('userrrffffff', userPresent);

            return {
              ProfilePic: userPresent.ProfilePic,
              FullName: userPresent.FullName,
              question: {
                ...item._doc,
              },
            };
          }),
        );

        return filteredData;
      }

      return []; // Return an empty array if no data is found
    } catch (error) {
      console.error('Error while Fetching venue list:', error.message);
      throw error;
    }
  }

  async updateLikesDecrement(id: string) {
    const userPresent = await this.QuestionModel.findOne({ _id: id });
    console.log(userPresent);
  }
  updateLikesIncrement(id: string) {}

  async findById(id: string) {
    console.log('kl', id);
    // Convert the string to ObjectId
    // Convert the string to ObjectId
    const objectId = new mongoose.Types.ObjectId(id);
    const questionDetails = await this.QuestionModel.findOne({
      _id: objectId,
    });
    console.log('ussseerr', questionDetails);
    return questionDetails;
  }
  update(id: number, UpdateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
  async CloseQuestion(id: string) {
    console.log('kl', id);
    // Convert the string to ObjectId
    // Convert the string to ObjectId
    const objectId = new mongoose.Types.ObjectId(id);
    const question = await this.QuestionModel.findByIdAndUpdate(
      objectId,
      { status: User_Status.CLOSE },
      { new: true },
    );
    const userPointIncrement = await this.UserModel.findByIdAndUpdate(
      question.answererId,
      {
        $inc: { Points: 1 },
      },
      { new: true },
    );
  }
  async AddResponse(id: string, addReponseDTO: addReponseDTO) {
    const objectId = new mongoose.Types.ObjectId(id);

    console.log('reuuuuuus', addReponseDTO, id);
    const question = await this.QuestionModel.findByIdAndUpdate(
      objectId,
      { answer: addReponseDTO.answer },
      { new: true },
    );

    const userPointIncrement = await this.UserModel.findByIdAndUpdate(
      question.answererId,
      {
        $inc: { Points: 1 },
      },
      { new: true },
    );
  }
  async findInProgressChat(id: string) {
    const objectId = new mongoose.Types.ObjectId(id);
    // const questionDetails = await this.ch.findOne({
    //   _id: objectId,
    // });
    // console.log('ussseerr', questionDetails);
    // return questionDetails;
  }

  async findClosedQuestion(page:number,limit:number) {
    // const questionDetails = await this.ch.findOne({
    //   _id: objectId,
    // });
    // console.log('ussseerr', questionDetails);
console.log("page and limit",page,limit)
    try {
      const skip = (page - 1) * limit;

      const data = await this.QuestionModel.aggregate([
        {
          $match: {
            answer: { $exists: true },
            status: 'CLOSE',
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $skip: skip, // Skip records based on the page
        },
        {
          $limit: limit, // Limit the number of records per page
        },
      ]);
      // return data
      if (data) {
        const filteredData = await Promise.all(
          data.map(async (item: any) => {
            const id = item.userId;
            const userPresent = await this.UserModel.findOne({ _id: id });

            return {
              ProfilePic: userPresent.ProfilePic,
              FullName: userPresent.FullName,
              question: {
                ...item,
              },
            };
          }),
        );

        console.log('filtered', filteredData);
        return filteredData;
      }
      return []; // Return an empty array if no data is found
    } catch (error) {
      console.error('Error while Fetching answeered question:', error.message);
      throw error;
    }
  }

  async searchQuery(query: string) {
    // const data = await this.QuestionModel.aggregate([
    //   {
    //     $search: {
    //       index: 'searchQuestions',
    //       text: {
    //         query,
    //         path: {
    //           wildcard: '*',
    //         },
    //       },
    //     },
    //   },
    // ]);
    // return data

    const data = await this.QuestionModel.aggregate([
      {
        $search: {
          index: 'searchQuestions',
          text: {
            query,
            path: {
              wildcard: '*',
            },
          },
        },
      },
      {
        $match: {
          answer: { $exists: true },
          status: 'CLOSE',
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    try {
      if (data) {
        const filteredData = await Promise.all(
          data.map(async (item: any) => {
            const id = item.userId;
            const userPresent = await this.UserModel.findOne({ _id: id });
            console.log('userrrffffff', userPresent);

            return {
              ProfilePic: userPresent.ProfilePic,
              FullName: userPresent.FullName,
              question: {
                ...item,
              },
            };
          }),
        );

        console.log('filtered', filteredData);
        return filteredData;
      }
      return []; // Return an empty array if no data is found
    } catch (error) {
      console.error('Error while Fetching answeered question:', error.message);
      throw error;
    }
  }
  async searchQueryUnanswered(query: string, id: string) {




    const questionsWithoutCoordinatesResults =
      await this.QuestionModel.aggregate([
        {
          $match: {
            'location.coordinates': { $exists: false },
            status: User_Status.OPEN,
            userId: { $ne: id },
          },
        },
        {
          $project: {
            _id: 1,
          },
        },
      ]);

    // Extract the document IDs from the 'questionsWithoutCoordinates' results
    const documentIdsWithoutCoordinates =
      questionsWithoutCoordinatesResults.map((result) => result._id);

    const geospatialResults = await this.QuestionModel.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [12.9716, 77.5946],
          },
          distanceField: 'distance',
          maxDistance: 500, // in meters
          spherical: true, // For 2dsphere index
        },
      },
      {
        $match: {
          status: User_Status.OPEN, // Add the condition for status
        },
      },
      {
        $project: {
          _id: 1,
        },
      },
    ]);
    console.log('ddddd', documentIdsWithoutCoordinates);
    // Extract the document IDs from the geospatial results
    const documentIds = geospatialResults.map((result) => result._id);
    const searchIds = documentIds.concat(documentIdsWithoutCoordinates);
    // Step 2: Perform the text search based on the extracted document IDs
    console.log('Searcj i', searchIds);
    const textSearchResults = await this.QuestionModel.aggregate([
      {
        $search: {
          index: 'searchQuestions',
          text: {
            query,
            path: {
              wildcard: '*',
            },
            fuzzy: { maxEdits: 2, prefixLength: 3, maxExpansions: 256 },
          },
        },
      },
      {
        $match: {
          _id: { $in: searchIds },
        },
      },
      {
        $sort: {
          createdAt: -1, // Sort in descending order based on the 'createdAt' field
        },
      },
    ]);

    // Return the combined results
    // return textSearchResults;

    if (textSearchResults) {
      const filteredData = await Promise.all(
        textSearchResults.map(async (item: any) => {
          const id = item.userId;
          const userPresent = await this.UserModel.findOne({ _id: id });
          console.log('userrrffffff', userPresent);

          return {
            ProfilePic: userPresent.ProfilePic,
            FullName: userPresent.FullName,
            question: {
              ...item,
            },
          };
        }),
      );
console.warn("wwwwww",filteredData)
      return filteredData;
    }
    // const data = await this.QuestionModel.aggregate([
    //   {
    //     $search: {
    //       index: 'searchQuestions',
    //       text: {
    //         query,
    //         path: {
    //           wildcard: '*',
    //         },
    //       },
    //     },
    //   },
    //   {
    //     $geoNear: {
    //       near: {
    //         type: 'Point',
    //         coordinates: [12.9716, 77.5946],
    //       },
    //       distanceField: 'distance',
    //       maxDistance: 500, // in meters
    //       spherical: true, // For 2dsphere index
    //     },
    //   },

    //   {
    //     $match: {
    //       status: User_Status.OPEN, // Add the condition for status
    //     },
    //   },

    // ]);

    // const questionsWithoutCoordinates = await this.QuestionModel.aggregate([
    //   {
    //     $search: {
    //       index: 'searchQuestions',
    //       text: {
    //         query,
    //         path: {
    //           wildcard: '*',
    //         },
    //       },
    //     },
    //   },
    //   {
    //     $match: {
    //       'location.coordinates': { $exists: false },
    //       status: User_Status.OPEN,
    //       userId: { $ne: id },
    //     },
    //   },
    // ]);

    // const questions = nearQuestions.concat(questionsWithoutCoordinates);
    // if (questions) {
    //   const filteredData = await Promise.all(
    //     questions.map(async (item: any) => {
    //       const id = item.userId;
    //       const userPresent = await this.UserModel.findOne({ _id: id });
    //       console.log('userrrffffff', userPresent);

    //       return {
    //         ProfilePic: userPresent.ProfilePic,
    //         FullName: userPresent.FullName,
    //         question: {
    //           ...item._doc,
    //         },
    //       };
    //     }),
    //   );

    //   console.log('filtered', filteredData);
    //   return filteredData;
    // }
  }

  async findLocationDetails(place_id: string) {
    const fields = 'name,formatted_address';
    const detailsURL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=${fields}&key=${this.config.get(
      'GOOGLE_MAPS_API_KEY',
    )}`;
    try {
      const response = await axios.get(detailsURL);
      console.log(response.data.result);
      return { ...response.data.result, place_id: place_id }; 
      
    } catch (error) {
      console.log(error);
    }
  }
}

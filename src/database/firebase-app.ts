import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import firebaseConfig from './firebase-config';

@Injectable()

export class FirebaseApp {
  private firebaseApp: firebase.app.App;

  constructor() {
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert({ ...firebaseConfig }),
    });
  }

  getAuth = (): firebase.auth.Auth => {
    return this.firebaseApp.auth();
  };

  firestore = (): firebase.firestore.Firestore => {
    return this.firebaseApp.firestore();
  };

  sendPushNotification = async (
    deviceToken: string,
    title: string,
    body: string,
  ): Promise<void> => {
    try {
      const message: firebase.messaging.Message = {
        notification: {
          title,
          body,
        },
        token: deviceToken,
      };

      await this.firebaseApp.messaging().send(message);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  };
}

import { Module } from '@nestjs/common';
import { FirebaseApp } from './firebase-app'; // Import FirebaseApp class

@Module({
  providers: [FirebaseApp], // Provide FirebaseApp here
  exports: [FirebaseApp], // Export FirebaseApp if needed
})
export class FirebaseModule {}
import {Global,Module} from '@nestjs/common'
import { Question, QuestionSchema } from './question.schema'
import { Auth, AuthSchema } from './auth.schema'
import { MongooseModule } from '@nestjs/mongoose'

const Models=[
    { name: Question.name, schema:QuestionSchema},
    { name: Auth.name, schema:AuthSchema }
     
]
@Global()
@Module({
    imports:[MongooseModule.forFeature(Models)],
    exports:[MongooseModule]
})
export class MongooseModelsModule{}
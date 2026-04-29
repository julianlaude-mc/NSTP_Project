import { getMongoose } from '../db/mongo.js';

let modelsPromise = null;

export async function getNstpModels() {
  if (modelsPromise) return modelsPromise;

  modelsPromise = (async () => {
    const mongoose = await getMongoose();
    const { Schema } = mongoose;

    const accountSchema = new Schema({
      name: { type: String, required: true },
      studentId: String,
      email: { type: String, required: true, unique: true, index: true },
      password: { type: String, required: true },
      role: { type: String, enum: ['admin', 'student', 'speaker'], required: true },
      title: String,
      bio: String,
      generalEducationComplete: Boolean,
      preferredComponent: String,
      examTaken: Boolean,
      examScore: Number,
      component: String,
    }, { timestamps: true });

    const moduleSchema = new Schema({
      id: { type: String, required: true, unique: true, index: true },
      title: { type: String, required: true },
      description: String,
      hours: Number,
      difficulty: String,
      sections: [{
        id: String,
        type: String,
        title: String,
        duration: String,
      }],
      updatedAt: String,
    }, { timestamps: true });

    const assessmentSchema = new Schema({
      id: { type: String, required: true, unique: true, index: true },
      title: { type: String, required: true },
      type: String,
      description: String,
      moduleId: String,
      timeLimit: Number,
      passingScore: Number,
      ownerId: String,
      ownerName: String,
      ownerRole: String,
      status: String,
      questions: [{
        id: String,
        prompt: String,
        options: [String],
        correctIndex: Number,
      }],
      updatedAt: String,
    }, { timestamps: true });

    const studentSchema = new Schema({
      id: { type: String, required: true, unique: true, index: true },
      studentId: String,
      name: { type: String, required: true },
      email: { type: String, required: true },
      component: String,
      progress: Number,
      assessments: Number,
      status: String,
      notes: String,
      updatedAt: String,
    }, { timestamps: true });

    const gradeSchema = new Schema({
      studentId: { type: String, required: true, unique: true, index: true },
      prelim: Number,
      midterm: Number,
      final: Number,
      remarks: String,
      released: Boolean,
      updatedAt: String,
    }, { timestamps: true });

    const noticeSchema = new Schema({
      id: { type: String, required: true, unique: true, index: true },
      title: { type: String, required: true },
      message: String,
      audience: String,
      priority: String,
      createdBy: String,
      createdAt: String,
    }, { timestamps: true });

    const supportTicketSchema = new Schema({
      id: { type: String, required: true, unique: true, index: true },
      userId: String,
      name: String,
      email: String,
      role: String,
      message: String,
      status: { type: String, default: 'open' },
      createdAt: String,
    }, { timestamps: true });

    return {
      Account: mongoose.models.Account || mongoose.model('Account', accountSchema),
      NstpModule: mongoose.models.NstpModule || mongoose.model('NstpModule', moduleSchema),
      Assessment: mongoose.models.Assessment || mongoose.model('Assessment', assessmentSchema),
      Student: mongoose.models.Student || mongoose.model('Student', studentSchema),
      Grade: mongoose.models.Grade || mongoose.model('Grade', gradeSchema),
      Notice: mongoose.models.Notice || mongoose.model('Notice', noticeSchema),
      SupportTicket: mongoose.models.SupportTicket || mongoose.model('SupportTicket', supportTicketSchema),
    };
  })();

  return modelsPromise;
}

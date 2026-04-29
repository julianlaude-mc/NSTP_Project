import { isMongoReady } from '../db/mongo.js';
import { getNstpModels } from '../models/nstpModels.js';

const now = () => new Date().toISOString();

const fallback = {
  accounts: [
    { id: 'admin-1', name: 'Administrator', email: 'admin@nstp.edu', password: 'admin', role: 'admin' },
    { id: 'speaker-1', name: 'Dr. Maria Elena Santos', email: 'speaker@nstp.edu', password: 'speaker', role: 'speaker', title: 'NSTP Program Director' },
    { id: 'student-demo-1', studentId: '2024-0001', name: 'Juan Dela Cruz', email: 'juan.dela-cruz@student.edu', password: 'student', role: 'student', component: 'MTS (Army)', generalEducationComplete: true, preferredComponent: 'MTS (Army)', examTaken: true, examScore: 92 },
  ],
  modules: [
    { id: 'm1', title: 'Module 1: Introduction to NSTP', description: 'Understanding NSTP, legal basis, and civic purpose.', hours: 3, difficulty: 'Beginner', sections: [], updatedAt: now() },
    { id: 'm2', title: 'Module 2: Citizenship Training', description: 'Rights, responsibilities, and civic duties.', hours: 3, difficulty: 'Beginner', sections: [], updatedAt: now() },
    { id: 'm3', title: 'Module 3: Community Development', description: 'Community profiling, planning, and service.', hours: 4, difficulty: 'Intermediate', sections: [], updatedAt: now() },
  ],
  assessments: [
    { id: 'asmt-nstp-intro', title: 'Module 1 Quiz', type: 'quiz', description: 'NSTP fundamentals.', moduleId: 'm1', timeLimit: 15, passingScore: 70, ownerId: 'admin-1', ownerName: 'Administrator', ownerRole: 'admin', status: 'published', questions: [], updatedAt: now() },
  ],
  students: [
    { id: 'student-1', studentId: '2024-1001', name: 'Maria Santos', email: 'maria.santos@university.edu', component: 'CWTS', progress: 85, assessments: 7, status: 'active', notes: 'Consistent participation.', updatedAt: now() },
    { id: 'student-2', studentId: '2024-1002', name: 'Juan Dela Cruz', email: 'juan.delacruz@university.edu', component: 'LTS', progress: 92, assessments: 8, status: 'active', notes: 'Ready for peer mentoring.', updatedAt: now() },
  ],
  grades: [
    { studentId: '2024-0001', prelim: 88, midterm: 90, final: 0, remarks: 'In Progress', released: true, updatedAt: now() },
  ],
  notices: [],
  supportTickets: [],
};

const serialize = (doc) => {
  if (!doc) return null;
  const plain = typeof doc.toObject === 'function' ? doc.toObject() : doc;
  const { _id, __v, ...rest } = plain;
  return rest;
};

export async function listCollection(name) {
  if (!isMongoReady()) return fallback[name] || [];
  const models = await getNstpModels();
  const modelMap = {
    accounts: models.Account,
    modules: models.NstpModule,
    assessments: models.Assessment,
    students: models.Student,
    grades: models.Grade,
    notices: models.Notice,
    supportTickets: models.SupportTicket,
  };
  const Model = modelMap[name];
  if (!Model) return [];
  const records = await Model.find({}).lean();
  return records.map(({ _id, __v, ...record }) => record);
}

export async function upsertCollectionRecord(name, lookup, payload) {
  const nextPayload = { ...payload, updatedAt: payload.updatedAt || now() };
  if (!isMongoReady()) {
    const items = fallback[name] || [];
    const index = items.findIndex((item) => Object.entries(lookup).every(([key, value]) => item[key] === value));
    if (index >= 0) items[index] = { ...items[index], ...nextPayload };
    else items.unshift(nextPayload);
    return index >= 0 ? items[index] : nextPayload;
  }

  const models = await getNstpModels();
  const modelMap = {
    accounts: models.Account,
    modules: models.NstpModule,
    assessments: models.Assessment,
    students: models.Student,
    grades: models.Grade,
    notices: models.Notice,
    supportTickets: models.SupportTicket,
  };
  const Model = modelMap[name];
  const record = await Model.findOneAndUpdate(lookup, nextPayload, { upsert: true, new: true, setDefaultsOnInsert: true });
  return serialize(record);
}

export async function getAdminSummary() {
  const [students, modules, assessments, grades] = await Promise.all([
    listCollection('students'),
    listCollection('modules'),
    listCollection('assessments'),
    listCollection('grades'),
  ]);

  return {
    students: students.length,
    learningHours: modules.reduce((sum, module) => sum + (Number(module.hours) || 0), 0),
    assessments: assessments.length,
    releasedGrades: grades.filter((grade) => grade.released).length,
    totalGradeRecords: grades.length,
    reportsGenerated: 12,
    updatedAt: now(),
  };
}

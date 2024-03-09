export type checklistType = {
  _id: string;
  isDone: boolean;
  checklistItem: string;
};

export type attachmentType = {
  _id: string;
  displayText: string;
  link: string;
};

export type taskType = {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  dueDate: Date;
  checklists: checklistType[];
  status: 'backlog' | 'ready' | 'in progress' | 'done';
  attachments: attachmentType[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  __v: number;
};

export type tasksType = {
  tasks: taskType[];
};

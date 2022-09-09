export interface Email {
  id: number;
  title: string;
  content: string;
  isSelected: boolean;
  isRead: boolean;
  isArchived: boolean;
}

const emails: Email[] = [
  {
    id: 1,
    title: 'Your 7 figure plan goes',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi placeat repellendus repudiandae, delectus quaerat nemo dolorem illum sint neque quidem doloremque! Facere voluptate reprehenderit alias quam, pariatur id dolores tempora?',
    isSelected: false,
    isRead: false,
    isArchived: false,
  },
  {
    id: 2,
    title: '[WEEKEND ONLY] Get Now 🔥',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi placeat repellendus repudiandae, delectus quaerat nemo dolorem illum sint neque quidem doloremque! Facere voluptate reprehenderit alias quam, pariatur id dolores tempora?',
    isSelected: false,
    isRead: false,
    isArchived: false,
  },
  {
    id: 3,
    title: 'Something just expired 😨',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi placeat repellendus repudiandae, delectus quaerat nemo dolorem illum sint neque quidem doloremque! Facere voluptate reprehenderit alias quam, pariatur id dolores tempora?',
    isSelected: false,
    isRead: false,
    isArchived: false,
  },
];

export const getEmails = () => emails;

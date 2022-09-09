import { FindAllQueryDto } from '^types/utils/findAll.query.dto';

export type ApplicationTagDto = {
  id: number;
  name: string;
  isFeatured: boolean | 1 | 0;
  createdAt: Date;
  updatedAt: Date;
};

export type FindAllAppTagQuery = FindAllQueryDto<ApplicationTagDto>;

export const ApplicationTagMockDataList: ApplicationTagDto[] = [
  { id: 1, name: 'Analytics & reporting', isFeatured: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, name: 'Automation', isFeatured: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 3, name: 'Board utilities', isFeatured: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 4, name: 'Communication & collaboration', isFeatured: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 5, name: 'Developer tools', isFeatured: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 6, name: 'File management', isFeatured: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 7, name: 'HR & operations', isFeatured: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 8, name: 'IT & project management', isFeatured: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 9, name: 'Marketing & social media', isFeatured: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 10, name: 'Product & design', isFeatured: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 11, name: 'Sales & support', isFeatured: true, createdAt: new Date(), updatedAt: new Date() },
];

export type File = {
  id: string;
  name: string;
  path: string;
  size: number;
  type: string;
  fileUrl: string;
  thumbnailUrl: string;
  userId: string;
  parentId: string;
  isFolder: boolean;
  isStarredr: boolean;
  isTrashr: boolean;
  createdAt: string;
  updatedAt: string;

  // Self-relation for parent/children
  parent: File;
  children: File[];
};

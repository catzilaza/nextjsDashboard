export interface File {
  // Unique identifier for each file/folder
  id: string;

  // Basic file/folder information
  name: string;
  path: string; // Full path to the file/folder
  size: number; // Size in bytes (0 for folders)
  type: string; // MIME type for files, "folder" for folders

  // Storage information
  fileUrl: string; // URL to access the file
  thumbnailUrl?: string; // Optional thumbnail for images/documents

  // Ownership and hierarchy
  userId: string; // Owner of the file/folder
  parentId?: string; // Parent folder ID (null for root items)

  // File/folder flags
  isFolder: boolean; // Whether this is a folder
  isStarred: boolean; // Starred/favorite items
  isTrash: boolean; // Items in trash

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
// export type FileType ={
//   // Unique identifier for each file/folder
//   id: string;

//   // Basic file/folder information
//   name: string;
//   path: string; // Full path to the file/folder
//   size: number; // Size in bytes (0 for folders)
//   type: string; // MIME type for files, "folder" for folders

//   // Storage information
//   fileUrl: string; // URL to access the file
//   thumbnailUrl?: string; // Optional thumbnail for images/documents

//   // Ownership and hierarchy
//   userId: string; // Owner of the file/folder
//   parentId?: string; // Parent folder ID (null for root items)

//   // File/folder flags
//   isFolder: boolean; // Whether this is a folder
//   isStarred: boolean; // Starred/favorite items
//   isTrash: boolean; // Items in trash

//   // Timestamps
//   createdAt: Date;
//   updatedAt: Date;
// }
export type FileType = File;
export type NewFile = File;

export const mockfiles: FileType[] = [
  {
    id: "uuid-folder-001",
    name: "Work",
    path: "/documents/work",
    size: 0,
    type: "folder",
    fileUrl: "",
    thumbnailUrl: undefined,
    userId: "user_12345",
    parentId: undefined,
    isFolder: true,
    isStarred: false,
    isTrash: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "uuid-file-002",
    name: "report.docx",
    path: "/documents/work/report.docx",
    size: 102400,
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    // fileUrl: "https://storage.example.com/files/report.docx",
    fileUrl: "http://localhost:3000/documents/work/report.docx",
    thumbnailUrl: undefined,
    userId: "user_12345",
    parentId: "uuid-folder-001",
    isFolder: false,
    isStarred: true,
    isTrash: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "uuid-file-003",
    name: "presentation.pptx",
    path: "/documents/work/presentation.pptx",
    size: 204800,
    type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    // fileUrl: "https://storage.example.com/files/presentation.pptx",
    fileUrl: "http://localhost:3000/documents/work/presentation.pptx",
    thumbnailUrl: undefined,
    userId: "user_12345",
    parentId: "uuid-folder-001",
    isFolder: false,
    isStarred: false,
    isTrash: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "uuid-folder-004",
    name: "Photos",
    path: "/documents/photos",
    size: 0,
    type: "folder",
    fileUrl: "",
    thumbnailUrl: undefined,
    userId: "user_12345",
    parentId: undefined,
    isFolder: true,
    isStarred: false,
    isTrash: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "uuid-file-005",
    name: "vacation.jpg",
    path: "/documents/photos/vacation.jpg",
    size: 512000,
    type: "image/jpeg",
    // fileUrl: "https://storage.example.com/files/vacation.jpg",
    fileUrl: "http://localhost:3000/documents/photos/vacation.jpg",
    thumbnailUrl: "https://storage.example.com/thumbnails/vacation.jpg",
    userId: "user_12345",
    parentId: "uuid-folder-004",
    isFolder: false,
    isStarred: true,
    isTrash: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "uuid-file-006",
    name: "family.png",
    path: "/documents/photos/family.png",
    size: 256000,
    type: "image/png",
    // fileUrl: "https://storage.example.com/files/family.png",
    fileUrl: "http://localhost:3000/documents/photos/family.png",
    thumbnailUrl: "https://storage.example.com/thumbnails/family.png",
    userId: "user_12345",
    parentId: "uuid-folder-004",
    isFolder: false,
    isStarred: false,
    isTrash: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "uuid-folder-007",
    name: "Music",
    path: "/documents/music",
    size: 0,
    type: "folder",
    fileUrl: "",
    thumbnailUrl: undefined,
    userId: "user_12345",
    parentId: undefined,
    isFolder: true,
    isStarred: false,
    isTrash: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "uuid-file-008",
    name: "song.mp3",
    path: "/documents/music/song.mp3",
    size: 4096000,
    type: "audio/mpeg",
    // fileUrl: "https://storage.example.com/files/song.mp3",
    fileUrl: "http://localhost:3000/documents/music/song.mp3",
    thumbnailUrl: undefined,
    userId: "user_12345",
    parentId: "uuid-folder-007",
    isFolder: false,
    isStarred: false,
    isTrash: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "uuid-file-009",
    name: "notes.txt",
    path: "/documents/work/notes.txt",
    size: 2048,
    type: "text/plain",
    // fileUrl: "https://storage.example.com/files/notes.txt",
    fileUrl: "http://localhost:3000/documents/work/notes.txt",
    thumbnailUrl: undefined,
    userId: "user_12345",
    parentId: "uuid-folder-001",
    isFolder: false,
    isStarred: false,
    isTrash: true, // อยู่ในถังขยะ
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "uuid-file-010",
    name: "budget.xlsx",
    path: "/documents/work/budget.xlsx",
    size: 307200,
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    // fileUrl: "https://storage.example.com/files/budget.xlsx",
    fileUrl: "http://localhost:3000/documents/work/budget.xlsx",
    thumbnailUrl: undefined,
    userId: "user_12345",
    parentId: "uuid-folder-001",
    isFolder: false,
    isStarred: true,
    isTrash: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// model File {
//   // Unique identifier for each file/folder
//   id            String   @id @default(uuid())

//   // Basic file/folder information
//   name          String
//   path          String              // Full path to the file/folder
//   size          Int                 // Size in bytes (0 for folders)
//   type          String              // MIME type for files, "folder" for folders

//   // Storage information
//   fileUrl       String              // URL to access the file
//   thumbnailUrl  String?             // Optional thumbnail for images/documents

//   // Ownership and hierarchy
//   userId        String              // Owner of the file/folder
//   parentId      String?             // Parent folder ID (null for root items)

//   // File/folder flags
//   isFolder      Boolean  @default(false) // Whether this is a folder
//   isStarred     Boolean  @default(false) // Starred/favorite items
//   isTrash       Boolean  @default(false) // Items in trash

//   // Timestamps
//   createdAt     DateTime @default(now())
//   updatedAt     DateTime @updatedAt
// }

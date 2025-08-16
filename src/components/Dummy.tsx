// // This is your Prisma schema file,
// // learn more about it in the docs: https://pris.ly/d/prisma-schema

// generator client {
//   provider = "prisma-client-js"
//   // output   = "../src/generated/prisma"
// }

// datasource db {
//   provider = "sqlite"
//   url      = env("DATABASE_URL")
// }

// model User {
//   id            String    @id
//   name          String
//   email         String    @unique
//   emailVerified Boolean
//   image         String?
//   bio           String?
//   createdAt     DateTime  @default(now())
//   updatedAt     DateTime  @updatedAt
//   sessions      Session[]
//   accounts      Account[]
//   reactions     Reaction[]
//   comments      Comment[]
//   posts         Post[]
//   followers     Follow[]  @relation("Followings")
//   following     Follow[]  @relation("Followers")

//   @@map("user")
// }

// model Session {
//   id        String   @id
//   expiresAt DateTime
//   token     String
//   createdAt DateTime
//   updatedAt DateTime
//   ipAddress String?
//   userAgent String?
//   userId    String
//   user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

//   @@unique([token])
//   @@map("session")
// }

// model Account {
//   id                    String    @id
//   accountId             String
//   providerId            String
//   userId                String
//   user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
//   accessToken           String?
//   refreshToken          String?
//   idToken               String?
//   accessTokenExpiresAt  DateTime?
//   refreshTokenExpiresAt DateTime?
//   scope                 String?
//   password              String?
//   createdAt             DateTime
//   updatedAt             DateTime

//   @@map("account")
// }

// model Verification {
//   id         String    @id
//   identifier String
//   value      String
//   expiresAt  DateTime
//   createdAt  DateTime?
//   updatedAt  DateTime?

//   @@map("verification")
// }

// model Post {
//   id            String       @id @default(uuid())
//   caption       String?
//   userId        String
//   user          User         @relation(fields: [userId], references: [id], onDelete: Cascade)
//   imageFiles    ImageFile[]
//   reactions     Reaction[]
//   comments      Comment[]
//   createdAt     DateTime     @default(now())
//   updatedAt     DateTime     @updatedAt

//   @@index([userId])
//   @@index([createdAt])
// }

// model ImageFile {
//   id        String   @id @default(uuid())
//   url       String
//   postId    String
//   post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)

//   @@index([postId])
// }

// enum Emojis{
//   LIKE
//   LOVE
//   HAHA
//   FIRE
//   CRY
// }

// model Reaction {
//   id         String   @id @default(uuid())
//   emoji      Emojis
//   postId     String
//   userId     String
//   post       Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
//   user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
//   createdAt  DateTime @default(now())
//   updatedAt  DateTime @updatedAt

//   @@index([postId])
//   @@index([userId])
//   @@unique([userId, postId])
// }

// model Comment {
//   id         String   @id @default(uuid())
//   content    String
//   postId     String
//   post       Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
//   userId     String
//   user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
//   createdAt  DateTime @default(now())
//   updatedAt  DateTime @updatedAt

//   @@index([postId])
//   @@index([userId])
// }

// model Follow {
//   id          String   @id @default(uuid())
//   followerId  String
//   follower    User     @relation("Followers" , fields: [followerId],references: [id],onDelete: Cascade)
//   followingId String
//   following   User     @relation("Followings",fields: [followingId],references: [id],onDelete: Cascade)
//   createdAt  DateTime @default(now())

//   @@unique([followerId,followingId])
// }

// // model SearchHistory {
// //   id         String   @id @default(cuid())
// //   userId     String
// //   searchedId String
// //   createdAt  DateTime @default(now())
// //   user        User     @relation("Searcher", fields: [userId], references: [id])
// //   searched    User     @relation("Searched", fields: [searchedId], references: [id])
// //   @@unique([userId, searchedId])
// // }

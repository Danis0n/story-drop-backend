/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "post";

export interface FindManyCollectionByUserIdRequest {
  userId: string;
}

export interface FindManyCollectionByUserIdResponse {
  collections: Collection[];
}

export interface FindManyParingByNameRequest {
  name: string;
}

export interface FindManyParingByNameResponse {
  parings: Paring[];
}

export interface FindManyGenreByNameRequest {
  name: string;
}

export interface FindManyGenreByNameResponse {
  genres: Genre[];
}

export interface FindManyCollectionByNameRequest {
  name: string;
}

export interface FindManyCollectionByNameResponse {
  collections: Collection[];
}

export interface FindManyCharacterByNameRequest {
  name: string;
}

export interface FindManyCharacterByNameResponse {
  characters: Character[];
}

export interface FindManyParingByCharacterRequest {
  characterId: string;
}

export interface FindManyParingByCharacterResponse {
  parings: Paring[];
}

export interface UpdatePostToCollectionRequest {
  insertIds: string[];
  deleteIds: string[];
  collectionId: string;
}

export interface UpdatePostToCollectionResponse {
  success: boolean;
}

export interface IsOwnerRequest {
  postId: string;
  userId: string;
}

export interface IsOwnerResponse {
  success: boolean;
}

export interface FindOnePostByIdRequest {
  postId: string;
}

export interface FindOnePostResponse {
  success: boolean;
  post: Post | undefined;
}

export interface CreatePostRequest {
  userId: string;
  name: string;
  genreIds: string[];
  tagIds: string[];
  characterIds: string[];
  fandomIds: string[];
  paringIds: string[];
  description: string;
  dedication: string;
}

export interface CreatePostResponse {
  success: boolean;
  post: Post | undefined;
}

export interface UpdatePostRequest {
  postId: string;
  name: string;
  description: string;
  dedication: string;
  isFinished: boolean;
  isHidden: boolean;
  insertGenres: string[];
  deleteGenres: string[];
  insertTags: string[];
  deleteTags: string[];
}

export interface UpdatePostResponse {
  success: boolean;
  post: Post | undefined;
}

export interface DeletePostRequest {
  postId: string;
}

export interface DeletePostResponse {
  success: boolean;
}

export interface FindManyChapterByPostIdRequest {
  postId: string;
}

export interface FindManyChapterByPostIdResponse {
  chapters: Chapter[];
}

export interface IsOwnerChapterRequest {
  chapterId: string;
  userId: string;
}

export interface IsOwnerChapterResponse {
  success: boolean;
}

export interface FindOneChapterByIdRequest {
  chapterId: string;
}

export interface FindOneChapterByIdResponse {
  success: boolean;
  chapter: Chapter | undefined;
}

export interface CreateChapterRequest {
  postId: string;
  userId: string;
  name: string;
  notes: string;
  text: string;
  isHidden: boolean;
}

export interface CreateChapterResponse {
  success: boolean;
  chapter: Chapter | undefined;
}

export interface UpdateChapterRequest {
  chapterId: string;
  userId: string;
  notes: string;
  text: string;
  name: string;
  isHidden: boolean;
}

export interface UpdateChapterResponse {
  success: boolean;
  chapter: Chapter | undefined;
}

export interface DeleteChapterRequest {
  chapterId: string;
}

export interface DeleteChapterResponse {
  success: boolean;
}

export interface FindManyFandomByNameRequest {
  name: string;
}

export interface FindManyFandomByNameResponse {
  fandoms: Fandom[];
}

export interface FindOneFandomByCharacterRequest {
  characterId: string;
}

export interface FindOneFandomByCharacterResponse {
  fandom: Fandom | undefined;
  success: boolean;
}

export interface FindOneFandomByIdRequest {
  fandomId: string;
}

export interface FindOneFandomByIdResponse {
  fandom: Fandom | undefined;
  success: boolean;
}

export interface CreateFandomRequest {
  name: string;
}

export interface CreateFandomResponse {
  fandom: Fandom | undefined;
  success: boolean;
}

export interface UpdateFandomRequest {
  fandomId: string;
  name: string;
}

export interface UpdateFandomResponse {
  fandom: Fandom | undefined;
  success: boolean;
}

export interface DeleteFandomRequest {
  fandomId: string;
}

export interface DeleteFandomResponse {
  success: boolean;
}

export interface FindOneGenreByIdRequest {
  genreId: string;
}

export interface FindOneGenreByIdResponse {
  genre: Genre | undefined;
  success: boolean;
}

export interface CreateGenreRequest {
  name: string;
}

export interface CreateGenreResponse {
  genre: Genre | undefined;
  success: boolean;
}

export interface UpdateGenreRequest {
  genreId: string;
  name: string;
}

export interface UpdateGenreResponse {
  genre: Genre | undefined;
  success: boolean;
}

export interface DeleteGenreRequest {
  genreId: string;
}

export interface DeleteGenreResponse {
  success: boolean;
}

export interface FindOneTagByIdRequest {
  tagId: string;
}

export interface FindOneTagByIdResponse {
  tag: Tag | undefined;
  success: boolean;
}

export interface CreateTagRequest {
  name: string;
  ageId: string;
}

export interface CreateTagResponse {
  tag: Tag | undefined;
  success: boolean;
}

export interface UpdateTagRequest {
  tagId: string;
  name: string;
}

export interface UpdateTagResponse {
  tag: Tag | undefined;
  success: boolean;
}

export interface DeleteTagRequest {
  tagId: string;
}

export interface DeleteTagResponse {
  success: boolean;
}

export interface FindOneCollectionByIdRequest {
  collectionId: string;
}

export interface FindOneCollectionByIdResponse {
  collection: Collection | undefined;
  success: boolean;
}

export interface CreateCollectionRequest {
  name: string;
  userId: string;
  postIds: string[];
}

export interface CreateCollectionResponse {
  collection: Collection | undefined;
  success: boolean;
}

export interface UpdateCollectionRequest {
  collectionId: string;
  name: string;
  postIdsInsert: string[];
  postIdsDelete: string[];
  isHidden: boolean;
}

export interface UpdateCollectionResponse {
  collection: Collection | undefined;
  success: boolean;
}

export interface DeleteCollectionRequest {
  collectionId: string;
}

export interface DeleteCollectionResponse {
  success: boolean;
}

export interface FindManyCharacterByFandomRequest {
  fandomId: string;
}

export interface FindManyCharacterByFandomResponse {
  characters: Character[];
}

export interface FindManyCharacterByParingRequest {
  paringId: string;
}

export interface FindManyCharacterByParingResponse {
  characters: Character[];
}

export interface FindOneCharacterByIdRequest {
  characterId: string;
}

export interface FindOneCharacterByIdResponse {
  character: Character | undefined;
  success: boolean;
}

export interface CreateCharacterRequest {
  name: string;
  fandomId: string;
}

export interface CreateCharacterResponse {
  character: Character | undefined;
  success: boolean;
}

export interface UpdateCharacterRequest {
  characterId: string;
  name: string;
}

export interface UpdateCharacterResponse {
  character: Character | undefined;
  success: boolean;
}

export interface DeleteCharacterRequest {
  characterId: string;
}

export interface DeleteCharacterResponse {
  success: boolean;
}

export interface FindOneParingByIdRequest {
  paringId: string;
}

export interface FindOneParingByIdResponse {
  paring: Paring | undefined;
  success: boolean;
}

export interface CreateParingRequest {
  name: string;
  characterIds: string[];
}

export interface CreateParingResponse {
  paring: Paring | undefined;
  success: boolean;
}

export interface UpdateParingRequest {
  paringId: string;
  name: string;
  insertCharacterIds: string[];
  removeCharacterIds: string[];
}

export interface UpdateParingResponse {
  paring: Paring | undefined;
  success: boolean;
}

export interface DeleteParingRequest {
  paringId: string;
}

export interface DeleteParingResponse {
  success: boolean;
}

export interface Collection {
  collectionId: string;
  userId: string;
  name: string;
  isHidden: boolean;
}

export interface Chapter {
  chapterId: string;
  postId: string;
  name: string;
  notes: string;
  text: string;
  number: string;
  dateOfCreation: string;
}

export interface ChapterRecord {
  chapterId: string;
  postId: string;
  name: string;
  number: string;
  dateOfCreation: string;
}

export interface Post {
  postId: string;
  userId: string;
  name: string;
  description: string;
  dedication: string;
  isHidden: boolean;
  isHiddenAdmin: boolean;
  status: string;
  genres: Genre[];
  tags: Tag[];
  characters: Character[];
  fandoms: Fandom[];
  parings: Paring[];
  chapters: ChapterRecord[];
  dateOfCreation: string;
}

export interface Paring {
  paringId: string;
  name: string;
}

export interface Fandom {
  fandomId: string;
  name: string;
}

export interface Character {
  characterId: string;
  name: string;
}

export interface Tag {
  tagId: string;
  name: string;
  age: Age | undefined;
}

export interface Age {
  ageId: string;
  name: string;
  color: string;
}

export interface Genre {
  genreId: string;
  name: string;
}

export const POST_PACKAGE_NAME = "post";

export interface PostServiceClient {
  isOwner(request: IsOwnerRequest): Observable<IsOwnerResponse>;

  findOnePostById(request: FindOnePostByIdRequest): Observable<FindOnePostResponse>;

  createPost(request: CreatePostRequest): Observable<CreatePostResponse>;

  updatePost(request: UpdatePostRequest): Observable<UpdatePostResponse>;

  deletePost(request: DeletePostRequest): Observable<DeletePostResponse>;

  isOwnerChapter(request: IsOwnerChapterRequest): Observable<IsOwnerChapterResponse>;

  findOneChapterById(request: FindOneChapterByIdRequest): Observable<FindOneChapterByIdResponse>;

  findManyChapterByPostId(request: FindManyChapterByPostIdRequest): Observable<FindManyChapterByPostIdResponse>;

  createChapter(request: CreateChapterRequest): Observable<CreateChapterResponse>;

  updateChapter(request: UpdateChapterRequest): Observable<UpdateChapterResponse>;

  deleteChapter(request: DeleteChapterRequest): Observable<DeleteChapterResponse>;

  findOneFandomByCharacter(request: FindOneFandomByCharacterRequest): Observable<FindOneFandomByCharacterResponse>;

  findManyFandomByName(request: FindManyFandomByNameRequest): Observable<FindManyFandomByNameResponse>;

  findOneFandomById(request: FindOneFandomByIdRequest): Observable<FindOneFandomByIdResponse>;

  createFandom(request: CreateFandomRequest): Observable<CreateFandomResponse>;

  updateFandom(request: UpdateFandomRequest): Observable<UpdateFandomResponse>;

  deleteFandom(request: DeleteFandomRequest): Observable<DeleteFandomResponse>;

  findManyGenreByName(request: FindManyGenreByNameRequest): Observable<FindManyGenreByNameResponse>;

  findOneGenreById(request: FindOneGenreByIdRequest): Observable<FindOneGenreByIdResponse>;

  createGenre(request: CreateGenreRequest): Observable<CreateGenreResponse>;

  updateGenre(request: UpdateGenreRequest): Observable<UpdateGenreResponse>;

  deleteGenre(request: DeleteGenreRequest): Observable<DeleteGenreResponse>;

  findOneTagById(request: FindOneTagByIdRequest): Observable<FindOneTagByIdResponse>;

  createTag(request: CreateTagRequest): Observable<CreateTagResponse>;

  updateTag(request: UpdateTagRequest): Observable<UpdateTagResponse>;

  deleteTag(request: DeleteTagRequest): Observable<DeleteTagResponse>;

  findManyCollectionByName(request: FindManyCollectionByNameRequest): Observable<FindManyCollectionByNameResponse>;

  findManyCollectionByUserId(
    request: FindManyCollectionByUserIdRequest,
  ): Observable<FindManyCollectionByUserIdResponse>;

  findOneCollectionById(request: FindOneCollectionByIdRequest): Observable<FindOneCollectionByIdResponse>;

  createCollection(request: CreateCollectionRequest): Observable<CreateCollectionResponse>;

  updateCollection(request: UpdateCollectionRequest): Observable<UpdateCollectionResponse>;

  deleteCollection(request: DeleteCollectionRequest): Observable<DeleteCollectionResponse>;

  findManyCharacterByName(request: FindManyCharacterByNameRequest): Observable<FindManyCharacterByNameResponse>;

  findManyCharacterByParing(request: FindManyCharacterByParingRequest): Observable<FindManyCharacterByParingResponse>;

  findManyCharacterByFandom(request: FindManyCharacterByFandomRequest): Observable<FindManyCharacterByFandomResponse>;

  findOneCharacterById(request: FindOneCharacterByIdRequest): Observable<FindOneCharacterByIdResponse>;

  createCharacter(request: CreateCharacterRequest): Observable<CreateCharacterResponse>;

  updateCharacter(request: UpdateCharacterRequest): Observable<UpdateCharacterResponse>;

  deleteCharacter(request: DeleteCharacterRequest): Observable<DeleteCharacterResponse>;

  findManyParingByName(request: FindManyParingByNameRequest): Observable<FindManyParingByNameResponse>;

  findManyParingByCharacter(request: FindManyParingByCharacterRequest): Observable<FindManyParingByCharacterResponse>;

  findOneParingById(request: FindOneParingByIdRequest): Observable<FindOneParingByIdResponse>;

  createParing(request: CreateParingRequest): Observable<CreateParingResponse>;

  updateParing(request: UpdateParingRequest): Observable<UpdateParingResponse>;

  deleteParing(request: DeleteParingRequest): Observable<DeleteParingResponse>;
}

export interface PostServiceController {
  isOwner(request: IsOwnerRequest): Promise<IsOwnerResponse> | Observable<IsOwnerResponse> | IsOwnerResponse;

  findOnePostById(
    request: FindOnePostByIdRequest,
  ): Promise<FindOnePostResponse> | Observable<FindOnePostResponse> | FindOnePostResponse;

  createPost(
    request: CreatePostRequest,
  ): Promise<CreatePostResponse> | Observable<CreatePostResponse> | CreatePostResponse;

  updatePost(
    request: UpdatePostRequest,
  ): Promise<UpdatePostResponse> | Observable<UpdatePostResponse> | UpdatePostResponse;

  deletePost(
    request: DeletePostRequest,
  ): Promise<DeletePostResponse> | Observable<DeletePostResponse> | DeletePostResponse;

  isOwnerChapter(
    request: IsOwnerChapterRequest,
  ): Promise<IsOwnerChapterResponse> | Observable<IsOwnerChapterResponse> | IsOwnerChapterResponse;

  findOneChapterById(
    request: FindOneChapterByIdRequest,
  ): Promise<FindOneChapterByIdResponse> | Observable<FindOneChapterByIdResponse> | FindOneChapterByIdResponse;

  findManyChapterByPostId(
    request: FindManyChapterByPostIdRequest,
  ):
    | Promise<FindManyChapterByPostIdResponse>
    | Observable<FindManyChapterByPostIdResponse>
    | FindManyChapterByPostIdResponse;

  createChapter(
    request: CreateChapterRequest,
  ): Promise<CreateChapterResponse> | Observable<CreateChapterResponse> | CreateChapterResponse;

  updateChapter(
    request: UpdateChapterRequest,
  ): Promise<UpdateChapterResponse> | Observable<UpdateChapterResponse> | UpdateChapterResponse;

  deleteChapter(
    request: DeleteChapterRequest,
  ): Promise<DeleteChapterResponse> | Observable<DeleteChapterResponse> | DeleteChapterResponse;

  findOneFandomByCharacter(
    request: FindOneFandomByCharacterRequest,
  ):
    | Promise<FindOneFandomByCharacterResponse>
    | Observable<FindOneFandomByCharacterResponse>
    | FindOneFandomByCharacterResponse;

  findManyFandomByName(
    request: FindManyFandomByNameRequest,
  ): Promise<FindManyFandomByNameResponse> | Observable<FindManyFandomByNameResponse> | FindManyFandomByNameResponse;

  findOneFandomById(
    request: FindOneFandomByIdRequest,
  ): Promise<FindOneFandomByIdResponse> | Observable<FindOneFandomByIdResponse> | FindOneFandomByIdResponse;

  createFandom(
    request: CreateFandomRequest,
  ): Promise<CreateFandomResponse> | Observable<CreateFandomResponse> | CreateFandomResponse;

  updateFandom(
    request: UpdateFandomRequest,
  ): Promise<UpdateFandomResponse> | Observable<UpdateFandomResponse> | UpdateFandomResponse;

  deleteFandom(
    request: DeleteFandomRequest,
  ): Promise<DeleteFandomResponse> | Observable<DeleteFandomResponse> | DeleteFandomResponse;

  findManyGenreByName(
    request: FindManyGenreByNameRequest,
  ): Promise<FindManyGenreByNameResponse> | Observable<FindManyGenreByNameResponse> | FindManyGenreByNameResponse;

  findOneGenreById(
    request: FindOneGenreByIdRequest,
  ): Promise<FindOneGenreByIdResponse> | Observable<FindOneGenreByIdResponse> | FindOneGenreByIdResponse;

  createGenre(
    request: CreateGenreRequest,
  ): Promise<CreateGenreResponse> | Observable<CreateGenreResponse> | CreateGenreResponse;

  updateGenre(
    request: UpdateGenreRequest,
  ): Promise<UpdateGenreResponse> | Observable<UpdateGenreResponse> | UpdateGenreResponse;

  deleteGenre(
    request: DeleteGenreRequest,
  ): Promise<DeleteGenreResponse> | Observable<DeleteGenreResponse> | DeleteGenreResponse;

  findOneTagById(
    request: FindOneTagByIdRequest,
  ): Promise<FindOneTagByIdResponse> | Observable<FindOneTagByIdResponse> | FindOneTagByIdResponse;

  createTag(request: CreateTagRequest): Promise<CreateTagResponse> | Observable<CreateTagResponse> | CreateTagResponse;

  updateTag(request: UpdateTagRequest): Promise<UpdateTagResponse> | Observable<UpdateTagResponse> | UpdateTagResponse;

  deleteTag(request: DeleteTagRequest): Promise<DeleteTagResponse> | Observable<DeleteTagResponse> | DeleteTagResponse;

  findManyCollectionByName(
    request: FindManyCollectionByNameRequest,
  ):
    | Promise<FindManyCollectionByNameResponse>
    | Observable<FindManyCollectionByNameResponse>
    | FindManyCollectionByNameResponse;

  findManyCollectionByUserId(
    request: FindManyCollectionByUserIdRequest,
  ):
    | Promise<FindManyCollectionByUserIdResponse>
    | Observable<FindManyCollectionByUserIdResponse>
    | FindManyCollectionByUserIdResponse;

  findOneCollectionById(
    request: FindOneCollectionByIdRequest,
  ): Promise<FindOneCollectionByIdResponse> | Observable<FindOneCollectionByIdResponse> | FindOneCollectionByIdResponse;

  createCollection(
    request: CreateCollectionRequest,
  ): Promise<CreateCollectionResponse> | Observable<CreateCollectionResponse> | CreateCollectionResponse;

  updateCollection(
    request: UpdateCollectionRequest,
  ): Promise<UpdateCollectionResponse> | Observable<UpdateCollectionResponse> | UpdateCollectionResponse;

  deleteCollection(
    request: DeleteCollectionRequest,
  ): Promise<DeleteCollectionResponse> | Observable<DeleteCollectionResponse> | DeleteCollectionResponse;

  findManyCharacterByName(
    request: FindManyCharacterByNameRequest,
  ):
    | Promise<FindManyCharacterByNameResponse>
    | Observable<FindManyCharacterByNameResponse>
    | FindManyCharacterByNameResponse;

  findManyCharacterByParing(
    request: FindManyCharacterByParingRequest,
  ):
    | Promise<FindManyCharacterByParingResponse>
    | Observable<FindManyCharacterByParingResponse>
    | FindManyCharacterByParingResponse;

  findManyCharacterByFandom(
    request: FindManyCharacterByFandomRequest,
  ):
    | Promise<FindManyCharacterByFandomResponse>
    | Observable<FindManyCharacterByFandomResponse>
    | FindManyCharacterByFandomResponse;

  findOneCharacterById(
    request: FindOneCharacterByIdRequest,
  ): Promise<FindOneCharacterByIdResponse> | Observable<FindOneCharacterByIdResponse> | FindOneCharacterByIdResponse;

  createCharacter(
    request: CreateCharacterRequest,
  ): Promise<CreateCharacterResponse> | Observable<CreateCharacterResponse> | CreateCharacterResponse;

  updateCharacter(
    request: UpdateCharacterRequest,
  ): Promise<UpdateCharacterResponse> | Observable<UpdateCharacterResponse> | UpdateCharacterResponse;

  deleteCharacter(
    request: DeleteCharacterRequest,
  ): Promise<DeleteCharacterResponse> | Observable<DeleteCharacterResponse> | DeleteCharacterResponse;

  findManyParingByName(
    request: FindManyParingByNameRequest,
  ): Promise<FindManyParingByNameResponse> | Observable<FindManyParingByNameResponse> | FindManyParingByNameResponse;

  findManyParingByCharacter(
    request: FindManyParingByCharacterRequest,
  ):
    | Promise<FindManyParingByCharacterResponse>
    | Observable<FindManyParingByCharacterResponse>
    | FindManyParingByCharacterResponse;

  findOneParingById(
    request: FindOneParingByIdRequest,
  ): Promise<FindOneParingByIdResponse> | Observable<FindOneParingByIdResponse> | FindOneParingByIdResponse;

  createParing(
    request: CreateParingRequest,
  ): Promise<CreateParingResponse> | Observable<CreateParingResponse> | CreateParingResponse;

  updateParing(
    request: UpdateParingRequest,
  ): Promise<UpdateParingResponse> | Observable<UpdateParingResponse> | UpdateParingResponse;

  deleteParing(
    request: DeleteParingRequest,
  ): Promise<DeleteParingResponse> | Observable<DeleteParingResponse> | DeleteParingResponse;
}

export function PostServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "isOwner",
      "findOnePostById",
      "createPost",
      "updatePost",
      "deletePost",
      "isOwnerChapter",
      "findOneChapterById",
      "findManyChapterByPostId",
      "createChapter",
      "updateChapter",
      "deleteChapter",
      "findOneFandomByCharacter",
      "findManyFandomByName",
      "findOneFandomById",
      "createFandom",
      "updateFandom",
      "deleteFandom",
      "findManyGenreByName",
      "findOneGenreById",
      "createGenre",
      "updateGenre",
      "deleteGenre",
      "findOneTagById",
      "createTag",
      "updateTag",
      "deleteTag",
      "findManyCollectionByName",
      "findManyCollectionByUserId",
      "findOneCollectionById",
      "createCollection",
      "updateCollection",
      "deleteCollection",
      "findManyCharacterByName",
      "findManyCharacterByParing",
      "findManyCharacterByFandom",
      "findOneCharacterById",
      "createCharacter",
      "updateCharacter",
      "deleteCharacter",
      "findManyParingByName",
      "findManyParingByCharacter",
      "findOneParingById",
      "createParing",
      "updateParing",
      "deleteParing",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("PostService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("PostService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const POST_SERVICE_NAME = "PostService";

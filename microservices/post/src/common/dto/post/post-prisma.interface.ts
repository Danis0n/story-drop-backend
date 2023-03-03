export interface InsertPost {
  post_id: string;
}

export interface PostPrisma {
  post_id: string;
  user_id: string;
  post_name: string;
  description: string;
  dedication: string;
  is_hidden: boolean;
  is_hidden_admin: boolean;
  status_id: string;
}

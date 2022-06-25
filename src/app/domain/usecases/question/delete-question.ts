export interface DeleteQuestion {
  delete: (id: string) => Promise<DeleteQuestion.Response>;
}

export namespace DeleteQuestion {
  export type Response = {};
}

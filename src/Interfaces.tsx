export interface TodoInterface {
  title : string;
  done : boolean
  status : string;
  id : string;
  added : number;
}

export interface TodosListInterface {
  [index: number]: TodoInterface
}
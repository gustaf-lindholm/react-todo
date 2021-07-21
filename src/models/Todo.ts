import { TODOSTATUS } from '../enums';
import { nanoid } from 'nanoid';
class Todo {
  title: string;
  done: boolean;
  status: string;
  id: string;
  added: number;

  constructor(title: string) {
    this.title = title;
    this.done = false;
    this.status = TODOSTATUS.ACTIVE;
    this.id = nanoid();
    this.added = Date.now();
  }
}

export default Todo;
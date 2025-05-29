import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../_models/user.model';

@Pipe({
  name: 'users',
})
export class UsersPipe implements PipeTransform {
  transform(value: User[], search: string): User[] {
    return value.filter(
      (data) =>
        data.firstName
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        data.lastName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }
}

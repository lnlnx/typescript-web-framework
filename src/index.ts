import { User } from './models/User';

const user = new User({ name: 'test', age: 21 });

user.on('changed', () => {
  console.log('test changed');
});

user.on('saved', () => {
  console.log(user);
});

user.save();

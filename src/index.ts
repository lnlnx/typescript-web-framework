import { User } from './models/User';

const user = new User({});
user.set({ name: 'test' });
console.log(user.get('name'));

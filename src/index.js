import koa from 'koa';
import bodyParser from 'koa-body';
import router from './routes/index';
import usersjson from './dataset/users_info.json';

const app = new koa();
const port = 3000;



let users = [];

try {
  users = usersjson;
} catch (err) {
  console.error(`Error loading users data: ${err}`);
}

async function searchUsersByName(ctx, next) {
  const { name } = ctx.params;
  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
  ctx.status = 200;
  ctx.body = { users: filteredUsers };
  return next();
}



app.use(bodyParser({ multipart: true, urlencoded: true }));
app.use(router.routes());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
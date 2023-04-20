
import Router from 'koa-router'
import getHealth from './health/health'

const router = new Router();

async function searchUsersByName(ctx, next) {
    const usersjson = require('../dataset/users_info.json');
    const { name } = ctx.params;
    const filteredUsers = usersjson.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    ctx.status = 200;
    ctx.body = { users: filteredUsers };
    return next();
  }
  
router.get('/api/users/:name', searchUsersByName);

router.get('/health', getHealth);

router.get('/api/users/:name', searchUsersByName);

export default router;

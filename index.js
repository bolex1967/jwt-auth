const Koa = require("koa");
const jwt = require("koa-jwt");
const Router = require("@koa/router");

const knex = require("./knex");

const app = new Koa();
const router = new Router();

// Custom 401 handling if you don't want to expose koa-jwt errors to users
// app.use(function(ctx, next) {
//   return next().catch(err => {
//     if (401 == err.status) {
//       ctx.status = 401;
//       ctx.body = "Protected resource, use Authorization header to get access\n";
//     } else {
//       throw err;
//     }
//   });
// });

// // Unprotected middleware
// app.use(function(ctx, next) {
//   if (ctx.url.match(/^\/public/)) {
//     ctx.body = "unprotected\n";
//   } else {
//     return next();
//   }
// });

// // Middleware below this line is only reached if JWT token is valid
// app.use(jwt({ secret: "shared-secret" }));

// // Protected middleware
// app.use(async function(ctx) {
//   if (ctx.url.match(/^\/api/)) {
//     const result = await knex.select("*").from("users");
//     console.log("RESULT ", result);
//     ctx.body = result;
//   }
// });

router.get("/users/:id", async ctx => {
  const result = await knex
    .select("*")
    .where({ id: ctx.params.id })
    .from("users");
  ctx.body = result;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);

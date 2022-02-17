const rescue = require('express-rescue');

class TaskRoute {
  constructor(router, domain, authToken) {
    this.router = router;
    this.domain = domain;
    this.auth = authToken;
  }

  handle() {
    this.router.post('/', rescue(this.auth.verifyToken), rescue(this.domain.create.handle));
    this.router.get('/:id', rescue(this.auth.verifyToken), rescue(this.domain.getById.handle));
    this.router.get('/user/:id', rescue(this.auth.verifyToken), rescue(this.domain.getAll.handle));
    this.router.put('/:id', rescue(this.auth.verifyToken), rescue(this.domain.update.handle));
    this.router.delete('/:id', rescue(this.auth.verifyToken), rescue(this.domain.remove.handle));
  }
}

module.exports = TaskRoute;

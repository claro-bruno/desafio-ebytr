const rescue = require('express-rescue');

class UserRoute {
  constructor(router, domain, authToken) {
    this.router = router;
    this.domain = domain;
    this.auth = authToken;
  }

  handle() {
    this.router.post('/', rescue(this.domain.create.handle));
    // this.router.get('/:id', this.auth, rescue(this.domain.crud.findById));
    this.router.post('/login', rescue(this.domain.login.handle));
    // this.router.put('/:id', this.auth, rescue(this.domain.crud.update));
    // this.router.delete('/:id', this.auth,rescue(this.domain.crud.delete));
  }
}

module.exports = UserRoute;

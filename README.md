# bewLLC

user APIs
router.post('/api/signUp', validate.createAccountSchema, authController.signUp);    - user signUp with validation

router.post('/api/login', validate.loginSchema, authController.login); - login with validation

router.get('/api/:userId', validate.validateUserId, checkAuth.auth, authController.getProfile); - get details based on userid


Book APIs

router.post('/api/user/books', book.create);   - create book

router.get('/api/user/books', book.findAll); - get all books

router.get('/api/user/books/:bookId',book.findOne); - find book by id

router.put('/api/user/books/:bookId', book.update); - update book by id

router.delete('/api/user/books/:bookId', book.delete); - delete book by id

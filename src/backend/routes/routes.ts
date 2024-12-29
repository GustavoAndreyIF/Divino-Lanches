let app = require('express');
let router = app.Router();

router.get('/sobre', function(req: Request, res: Response, next) {
    res.send('...sobre rotas');
    
});

export default router;
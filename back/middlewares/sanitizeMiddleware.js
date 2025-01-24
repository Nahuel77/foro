import DOMPurify from 'dompurify';
import {JSDOM} from 'jsdom';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

const sanitizeMiddleware = ( req, res, next ) => {
    if(req.body.content){
        req.body.content = purify.sanitize(req.body.content);
    }
    if(req.body.title){
        req.body.title = purify.sanitize(req.body.title);
    }
    if(req.body.comment){
        req.body.comment = purify.sanitize(req.body.comment);
    }
    next();
};

export default sanitizeMiddleware;
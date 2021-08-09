const {Router}=require('express');
const router=Router();
const {check} = require('express-validator');
const { loginUsuario, crearUsuario, revalidarToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');

router.post('/new',[
    check('name','El nombre no puede estar vacio').not().isEmpty(),
    check('password','La contraseña no puede estar vacia/debe de ser de 6 caracteres').not().isEmpty().isLength({min:6}),
    check('email','No es un email').isEmail(),
    validarCampos
],crearUsuario);
router.post('/',[
    check('password','La contraseña no puede estar vacia/debe de ser de 6 caracteres').not().isEmpty().isLength({min:6}),
    check('email','No es un email').isEmail(),
    validarCampos
],loginUsuario);
router.get('/renew',[
    validarJWT,
],revalidarToken);

module.exports=router;
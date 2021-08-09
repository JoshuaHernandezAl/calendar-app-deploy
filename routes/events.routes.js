const {Router} = require('express');
const router= Router();
const {check} = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events.controller');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT');

router.use(validarJWT);
router.get('/',[],getEventos);
router.post('/',[
    check('title','EL evento debe de tener un titulo').not().isEmpty(),
    check('start','Fecha de inicio obligatoria').custom(isDate),
    check('end','Fecha de inicio obligatoria').custom(isDate),
    validarCampos
],crearEvento);
router.put('/:id',[
    check('title','EL evento debe de tener un titulo').not().isEmpty(),
    check('start','Fecha de inicio obligatoria').custom(isDate),
    check('end','Fecha de inicio obligatoria').custom(isDate),
    validarCampos
],actualizarEvento);
router.delete('/:id',[

],eliminarEvento);




module.exports=router;
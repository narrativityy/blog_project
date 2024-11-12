const TemplateController = require('../controllers/template-controller');
 
module.exports = app => {
    app.get('/api/templates', TemplateController.findAllTemplates);
    app.get('/api/templates/:id', TemplateController.findOneSingleTemplate);
    app.patch('/api/templates/:id', TemplateController.updateExistingTemplate);
    app.post('/api/templates', TemplateController.createNewTemplate);
    app.delete('/api/templates/:id', TemplateController.deleteAnExistingTemplate);
}
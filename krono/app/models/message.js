import DS from 'ember-data';

export default DS.Model.extend({

  order: DS.belongsTo('order'),

  user_id: DS.attr(),
  file: DS.attr(),

});

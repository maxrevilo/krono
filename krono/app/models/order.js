import DS from 'ember-data';

export default DS.Model.extend({

  status: DS.attr('number'),

  messages: DS.hasMany('message'),

});

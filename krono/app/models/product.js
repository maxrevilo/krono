import DS from 'ember-data';

var Product = DS.Model.extend({

  name: DS.attr(),
  description: DS.attr(),
  count: DS.attr('number'),
  price: DS.attr('number'),
  image: DS.attr(),

});

Product.reopenClass({
  FIXTURES: [
    {
      id: 1,
      name: 'Coca Cola',
      count: 3,
      price: '3500',
      image: 'http://campaiexpress.com/archivosdelusuario/fotografias/productos/bebidas_cocacola-600_70_1.jpg'
    },
    {
      id: 2,
      name: 'Leche',
      count: 1,
      price: '1500',
      image: 'http://clande-products.s3.amazonaws.com/222941-co_24_7_colanta-ltda_jp_02-thumb.jpg'
    },
    {
      id: 3,
      name: 'Pepsi',
      count: 1,
      price: '2800',
      image: 'http://gobazzar.com/media/catalog/product/cache/1/image/1200x1200/885089b4fd45a57099033f14537e3ee7/p/e/pepsi_600_ml.jpg'
    },
    {
      id: 4,
      name: 'Perman',
      count: 1,
      price: '3500',
      image: 'http://www.exito.com/images/products/062/0000059173061062/0000059174020526_lrg_a.jpg'
    },

    {
      id: 5,
      name: 'Pepsi',
      count: 1,
      price: '2800',
      image: 'http://gobazzar.com/media/catalog/product/cache/1/image/1200x1200/885089b4fd45a57099033f14537e3ee7/p/e/pepsi_600_ml.jpg'
    },
    {
      id: 6,
      name: 'Pepsi',
      count: 1,
      price: '2800',
      image: 'http://gobazzar.com/media/catalog/product/cache/1/image/1200x1200/885089b4fd45a57099033f14537e3ee7/p/e/pepsi_600_ml.jpg'
    },
    {
      id: 7,
      name: 'Pepsi',
      count: 1,
      price: '2800',
      image: 'http://gobazzar.com/media/catalog/product/cache/1/image/1200x1200/885089b4fd45a57099033f14537e3ee7/p/e/pepsi_600_ml.jpg'
    },
    {
      id: 8,
      name: 'Pepsi',
      count: 1,
      price: '2800',
      image: 'http://gobazzar.com/media/catalog/product/cache/1/image/1200x1200/885089b4fd45a57099033f14537e3ee7/p/e/pepsi_600_ml.jpg'
    },
    {
      id: 9,
      name: 'Pepsi',
      count: 1,
      price: '2800',
      image: 'http://gobazzar.com/media/catalog/product/cache/1/image/1200x1200/885089b4fd45a57099033f14537e3ee7/p/e/pepsi_600_ml.jpg'
    },
    {
      id: 10,
      name: 'Pepsi',
      count: 1,
      price: '2800',
      image: 'http://gobazzar.com/media/catalog/product/cache/1/image/1200x1200/885089b4fd45a57099033f14537e3ee7/p/e/pepsi_600_ml.jpg'
    },
    {
      id: 11,
      name: 'Pepsi',
      count: 1,
      price: '2800',
      image: 'http://gobazzar.com/media/catalog/product/cache/1/image/1200x1200/885089b4fd45a57099033f14537e3ee7/p/e/pepsi_600_ml.jpg'
    },
    {
      id: 12,
      name: 'Pepsi',
      count: 1,
      price: '2800',
      image: 'http://gobazzar.com/media/catalog/product/cache/1/image/1200x1200/885089b4fd45a57099033f14537e3ee7/p/e/pepsi_600_ml.jpg'
    },
    {
      id: 14,
      name: 'Pepsi',
      count: 1,
      price: '2800',
      image: 'http://gobazzar.com/media/catalog/product/cache/1/image/1200x1200/885089b4fd45a57099033f14537e3ee7/p/e/pepsi_600_ml.jpg'
    },
    {
      id: 15,
      name: 'Pepsi',
      count: 1,
      price: '2800',
      image: 'http://gobazzar.com/media/catalog/product/cache/1/image/1200x1200/885089b4fd45a57099033f14537e3ee7/p/e/pepsi_600_ml.jpg'
    },
    {
      id: 16,
      name: 'Pepsi',
      count: 1,
      price: '2800',
      image: 'http://gobazzar.com/media/catalog/product/cache/1/image/1200x1200/885089b4fd45a57099033f14537e3ee7/p/e/pepsi_600_ml.jpg'
    },
    {
      id: 17,
      name: 'Pepsi',
      count: 1,
      price: '2800',
      image: 'http://gobazzar.com/media/catalog/product/cache/1/image/1200x1200/885089b4fd45a57099033f14537e3ee7/p/e/pepsi_600_ml.jpg'
    },
    {
      id: 18,
      name: 'Pepsi',
      count: 1,
      price: '2800',
      image: 'http://gobazzar.com/media/catalog/product/cache/1/image/1200x1200/885089b4fd45a57099033f14537e3ee7/p/e/pepsi_600_ml.jpg'
    },
  ]
});

export default Product;

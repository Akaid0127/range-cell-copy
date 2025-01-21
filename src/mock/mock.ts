import Mock from 'mockjs';

Mock.Random.extend({
  phone: function () {
    var phonePrefixs = ['132', '135', '189'];
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/);
  },
});

Mock.mock('/table/list', {
  'list|50': [
    {
      'id|+1': 1,
      name: '@name',
      'age|15-80': 1,
      address: '@county(true)',
      describe: '@paragraph()',
      phone: '@phone()',
      email: '@email()',
    },
  ],
});

import Ember from 'ember';

const {Service} = Ember;

export default Service.extend({
  isShow: false,
  options: null,
  callback: null,
  show(option, callback) {
    this.set('options', option);
    this.set('isShow', true);
    this.set('callback', callback);
  },
  submit(isConfirmed) {
    if (this.get('callback')) {
      this.get('callback')(isConfirmed);
    }

    const closeOnConfirm = this.get('options.closeOnConfirm');

    if(closeOnConfirm !== false) {
      this.set('isShow', false);
    }
  },
  close() {
    this.set('isShow', false);
  }
});

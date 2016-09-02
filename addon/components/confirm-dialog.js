import Ember from 'ember';
import layout from '../templates/components/confirm-dialog';
const { Component, String:{htmlSafe}, computed, inject:{service} } = Ember;

export default Component.extend({
  layout,
  tagName: 'div',
  classNames: ['confirm-container'],
  classNameBindings: ['isDialogHidden:confirm-container-hidden'],
  confirm: service(),

  options: computed.reads('confirm.options'),
  isDialogVisible: computed.alias('confirm.isShow'),
  isDialogHidden: computed.not('confirm.isShow'),
  notOneButton: computed.not('options.oneButton'),

  stateClass: computed('isDialogVisible', function () {
    return !this.get('isDialogVisible')? 'confirm-dialog-hidden': '';
  }),

  okStyle: computed('options.okColor', function () {
    const color = this.get('options.okColor');
    if (!color) {
      return htmlSafe("");
    }
    return htmlSafe(`background-color: ${color}`);
  }),

  ok: computed('options.ok', function () {
    return this.get('options.ok') || 'OK';
  }),

  cancel: computed('options.cancel', function () {
    return this.get('options.cancel') || 'Cancel';
  }),

  actions: {
    click(isConfirmed) {
      this.get('confirm').submit(isConfirmed);
    }
  }
});

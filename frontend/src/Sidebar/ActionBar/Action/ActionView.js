var Backbone = require('backbone');
var Marionette = require('marionette');
var _ = require('underscore');
var CommandController = require('Commands/CommandController');

module.exports = Marionette.ItemView.extend({
  template: 'Sidebar/ActionBar/Action/ActionViewTemplate',
  tagName: 'li',
  className: 'actionbar-list-item',

  ui: {
    icon: 'i'
  },

  events: {
    'click': 'onClick'
  },

  initialize() {
    this.storageKey = this.model.get('menuKey') + ':' + this.model.get('key');
  },

  onRender() {
    if (this.model.get('active')) {
      this.$el.addClass('active');
      this.invokeCallback();
    }

    if (this.model.get('className')) {
      this.$el.addClass(this.model.get('className'));
    }

    if (this.model.get('tooltip')) {
      this.$el.attr('title', this.model.get('tooltip'));
      this.$el.data('container', 'body');
    }

    var command = this.model.get('command');

    if (command) {
      var properties = _.extend({ name: command }, this.model.get('properties'));

      CommandController.bindToCommand({
        command: properties,
        element: this.$el
      });
    }
  },

  onClick() {
    if (this.$el.hasClass('disabled')) {
      return;
    }

    this.invokeCallback();
    this.invokeRoute();
    this.invokeCommand();
  },

  invokeCommand() {
    var command = this.model.get('command');
    if (command) {
      CommandController.Execute(command, this.model.get('properties'));
    }
  },

  invokeRoute() {
    var route = this.model.get('route');
    if (route) {
      Backbone.history.navigate(route, { trigger: true });
    }
  },

  invokeCallback() {
    var callback = this.model.get('callback');

    if (callback) {
      if (!this.model.ownerContext) {
        throw 'ownerContext must be set.';
      }

      callback.call(this.model.ownerContext, this);
    }
  }
});
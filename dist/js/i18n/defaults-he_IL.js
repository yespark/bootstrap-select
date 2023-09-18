(function (root, factory) {
  if (root === undefined && window !== undefined) root = window;
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jquery"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(root["jQuery"]);
  }
}(this, function (jQuery) {

(function ($) {
  $.fn.selectpicker.defaults = {
    noneSelectedText: 'בחר פריט מהרשימה',
    noneResultsText: 'אין תוצאות לחיפוש {0}',
    countSelectedText: function (numSelected, numTotal) {
      return (numSelected == 1) ? '{0} פריט נבחר' : '{0} פריטים נבחרו';
    },
    maxOptionsText: function (numAll, numGroup) {
      return [
        (numAll == 1) ? 'חרגת מהמגבלה ({n} פריט לכל היותר)' : 'חרגת מהמגבלה ({n} פריטים לכל היותר)',
        (numGroup == 1) ? 'חרגת ממגבלת הקבוצה (מקסימום {n} פריט)' : 'חרגת ממגבלת הקבוצה (מקסימום {n} פריטים)'
      ];
    },
    selectAllText: 'בחר הכל',
    deselectAllText: 'בטל בחירת הכל',
    multipleSeparator: ', '
  };
})(jQuery);


}));
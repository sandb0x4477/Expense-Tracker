'use strict';

module.exports = function (Expense) {
  Expense.spending = function (cb) {
    var ds = Expense.dataSource;
    var sql = "select * from get_expenses_bymonth();";
    ds.connector.execute(sql, function (err, targets) {
      if (err) console.error(err);
      console.info(targets);
      cb(err, targets);
    });
  };

  Expense.categories = function (cb) {
    var ds = Expense.dataSource;
    var sql = "select * from get_categories();";
    ds.connector.execute(sql, function (err, targets) {
      if (err) console.error(err);
      console.info(targets);
      cb(err, targets);
    });
  };

  Expense.remoteMethod(
    'spending', {
      http: {
        verb: 'get'
      },
      description: "Get spendings by month",
      accepts: [],
      returns: {
        arg: 'data',
        type: ['object'],
        root: true
      }
    }
  );

  Expense.remoteMethod(
    'categories', {
      http: {
        verb: 'get'
      },
      description: "Get categories",
      accepts: [],
      returns: {
        arg: 'category',
        type: 'object',
        root: true
      }
    }
  );
};

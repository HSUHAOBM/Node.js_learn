const employee = {
    makeChange: function(bill, price) {
      if (bill < price){
        return '錢不足'
      }else{
        return bill - price ;
      }
    }
  };

module.exports = employee;
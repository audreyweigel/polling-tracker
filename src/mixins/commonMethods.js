export default {
  methods: {
    uniquePresidents: function (data) {
      // get presidents from presidents column
      const presidents = data.map((row) => row["President"]);
      // remove duplicates
      let uniquePresidents = new Set(presidents);
      // remove unnecessary "\n" entry
      uniquePresidents.delete("\n");
      uniquePresidents = [...uniquePresidents].sort();
      return uniquePresidents;
    },
    uniqueDates: function (data) {
      const dates = data.map((row) => row["Date"]);
      const uniqueDates = [...new Set(dates)].sort();
      return uniqueDates;
    },
    uniqueApproval: function (data) {
      const approval = data.map((row) => row["Approve"]);
      const uniqueApproval = [...new Set(approval)];
      return uniqueApproval;
    },
    uniqueDisapproval: function (data) {
      const disapproval = data.map((row) => row["Disapprove"]);
      const uniqueDisapproval = [...new Set(disapproval)];
      return uniqueDisapproval;
    },
    limitDataDateRange(data) {
      return data.filter(
        (row) => row["Date"] >= this.start && row["Date"] <= this.end
      );
    },
  },
};

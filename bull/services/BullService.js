module.exports = {
    timeAgo: function (timestamp) {
        // sails.log.info("\n\n\ninside timeAgo");
        // sails.log.info(timestamp);
        var t = new Date(timestamp);
        // sails.log.info(t);
        var diff = Math.round((new Date() - t) / 1000 / 60); // in mins
        var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if (diff < 60) { // if less than an hour ago
            return diff + 'm';
        }
        else if (diff < 60 * 24) { // if less than a day ago
            return Math.round(diff / 60) + 'h';
        }
        else if (t.getFullYear() == new Date().getFullYear()) {
            return month[t.getMonth()] + ' ' + t.getDate();
        }
        else {
            return t.getDate() + ' ' + month[t.getMonth()] + ' ' + t.getFullYear();
        }
    },
    /**
	 * convert a promise to callback
	 * @param  {[type]}   promise  [description]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
    p2c: function (promise, callback) {
        promise.then(function (result) {
            callback(null, result);
        }, function (error) {
            callback(error);
        });
    },

    deleteBullTasks: function (grace, state) {
        var state = state ? state : 'completed';
        var grace = grace ? grace : 10000; // 10 sec ago
        queue.clean(grace, state);
        console.log(`cleaning all jobs that ${state} over ${grace / 1000} seconds ago.`);
    }
}
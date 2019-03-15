/**
 * BullBootstrap.js
 * Bootstrap module that setups the queue and worker
 */
const async = require('async');

var Bull = require('bull');
// create our job queue
var queue = new Bull('queue', { redis: sails.config.bull.redis });

sails.config.queue = queue;

module.exports = function (callback) {

    /**
     * crons
     */

    // Repeat check for hung charging sessions  once every hour
    _.forEach(sails.config.bull.repeats, function (task) {
        if (task.active) {
            queue.add(task.name, task.data, { repeat: task.repeat });
            sails.log.info(`bull repeatable job registered: ${task.name}`);
        }
    });


    queue.process('clean_completed_jobs', 1, function(job,done){
		BullService.deleteBullTasks(1000, 'completed')
		done();
    });
    
    queue.process('clean_failed_jobs', 1, function(job,done){
		BullService.deleteBullTasks(1000, 'failed')
		done();
	});

    callback(null);
};

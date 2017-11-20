/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var pager = require('sails-pager');

module.exports = {
    
    index: function(req, res) {
        console.log("PostController index");
        var perPage = req.query.size;
        var currentPage = req.query.page;
        
        pager.paginate(Post, {}, currentPage, perPage, [], 'createdAt DESC', function(err, records) {
            if (err) {
                res.send(err);
            }
            res.json(records);
        });
    }
    
};

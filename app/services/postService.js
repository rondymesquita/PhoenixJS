angular.module('PhoenixCMS').service('PostService', ['$http', 'config', postService]);

function postService($http, config) {

    function Query(){
        this.posts = [];
        this.categories = [];
    }

    function generatePostUrl(post){
        return post.title.replace(/ /g,"-").toLowerCase();
    };

    this.list = function(callback){

        var posts = [];

        $http({
            method:'GET',
            url: 'app/posts/posts.json',
            cache: true
        }).success(function (data){

            $.each(data, function(index, value){
                //create friendly url
                data[index]["url"] = generatePostUrl(data[index]);

                // //get post categories
                // for(var i = 0; i < data[index].categories.length; i++){
                //     if($.inArray(data[index].categories[i], query.categories) == -1){
                //         query.categories = query.categories.concat(data[index].categories[i]);
                //     }
                // }

                posts.push(data[index]);

            });

            callback(posts);

        });

    }

    this.listByCategory = function(category, callback){

        var posts= [];

        $http({
            method:'GET',
            url: 'app/posts/posts.json',
            cache: true
            }).success(function (data){

            $.each(data, function(index, value){
                //create friendly url
                data[index]["url"] = generatePostUrl(data[index]);

                //get post by categories
                for(var i = 0; i < data[index].categories.length; i++){

                    if(category === data[index].categories[i]){
                        posts.push(data[index]);
                    }
                }

            });

            callback(posts);

        });

    }

    this.getById = function(id, callback){

        var post = {};

        $http({
            method:'GET',
            url: 'app/posts/posts.json',
            cache: true
        }).success(function (data){

            callback(data[id-1]);

        });

    }


}

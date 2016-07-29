/**
 * Created by saadawi on 4/25/2016.
 */
angular.module('app').service('todoStorage', function ($q) {
    var _this = this;
    this.data = [];
    var initData = ["صلاة الفجر","صلاة الضحى","ورد القرآن","ما تيسر من الذكر والاستغفار","الصلاة فى جماعة","صلاة التراويح","صلاة الوتر"];
    this.findAll = function(callback) {
        chrome.storage.sync.get('todo', function(keys) {
            if (keys.todo != null) {
                _this.data = keys.todo;
                for (var i=0; i<_this.data.length; i++) {
                    _this.data[i]['id'] = i + 1;
                }
                callback(_this.data);
            }else{
                for(var j=0; j< initData.length; j++){
                    _this.data.push({"id":j,"content":initData[j],"completed":false,"createdAt":new Date()});
                }
                callback(_this.data);
            }
        });
    }

    this.sync = function() {
        chrome.storage.sync.set({todo: this.data}, function() {
        });
    }

    this.add = function (newContent) {
        var id = this.data.length + 1;
        var todo = {
            id: id,
            content: newContent,
            completed: false,
            createdAt: new Date()
        };
        this.data.push(todo);
        this.sync();
    }

    this.remove = function(todo) {
        this.data.splice(this.data.indexOf(todo), 1);
        this.sync();
    }

    this.removeAll = function() {
        this.data = [];
        this.sync();
    }

});
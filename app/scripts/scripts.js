$(document).ready(function() {

    var advanceTask = function(task) {
        var modified = task.innerText.trim();
        for (var i = 0; i < list.length; i++) {
            if (list[i].task === modified) {
                if (list[i].id === 'new') {
                    list[i].id = 'inProgress';
                } else if (list[i].id === 'inProgress') {
                    list[i].id = 'archived';
                } else {
                    list.splice(i, 1);
                }
                break;
            }
        }
        task.remove();
    };

    $('#newTaskForm').hide();

    var list = [];

    var Task = function(task) {
        this.task = task;
        this.id = 'new';
    }

    var addTask = function(task) {
        if (task) {
            var task = new Task(task);
            list.push(task);
            //Clear input field
            $('newItemInput').val('');
            //Add task to html page
            $('#newList').append(
                '<a href="#finish" class="" id="item">' +
                '<li class="list-group-item">' +
                '<h3>' + task.task + '</h3>'+
                '<span class="arrow pull-right">' +
                '<i class="glyphicon glyphicon-arrow-right">' +
                '</span>' +
                '</li>' +
                '</a>'
            );
        }
        $('#newTaskForm').slideToggle('fast', 'linear');
    }

    $('#saveNewItem').on('click', function(e) {
        e.preventDefault();
        var task = $('#newItemInput').val().trim();
        addTask(task);
    });

    $('#add-todo').on('click', function () {
        $('#newTaskForm').fadeToggle('fast', 'linear');
    });
    $('#cancel').on('click', function (e) {
        e.preventDefault();
        $('#newTaskForm').fadeToggle('fast', 'linear');
    });

    $(document).on('click', '#item', function(e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
        this.id = 'inProgress';
        $('#currentList').append(this.outerHTML);
    });

    $(document).on('click', '#inProgress', function (e) {
        e.preventDefault();
        var task = this;
        task.id = "archived";
        var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
        advanceTask(task);
        $('#archivedList').append(changeIcon);
    });

    $(document).on('click', '#archived', function (e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
    });
});
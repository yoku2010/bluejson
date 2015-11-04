$(function() {
    var $auth = $('div.auth-section');
    $.fn.getHtml = function() {
        return $('<div></div>').append(this.clone()).html();
    };
    $.fn.extend({
        manageDashboard: function (options) {
            var options = $.extend({
                $admin: $('#admin'),
                $changePassword: $('#change_password'),
                $logout: $('#logout')
            }, options);
            this.each(function () {
                new $.manageAdminActions(this, options);
            });
            return this;
        }
    });
    $.manageAdminActions = function (me, opt) {
        var md = {
            data: [],
            auth: {},
            $me: $(me),
            fbData: new Firebase('https://blue-json-email.firebaseio.com'),
            fbAuth: new Firebase('https://blue-json-auth.firebaseio.com'),
            func: {
                init: function () {
                    md.func.loadAuthData();
                    md.func.contactDataTable();
                    md.func.bindActions();
                },
                checkAuth: function () {
                    if ($.cookie('mdauth')) {
                        return true;
                    }
                    else {
                        return false;
                    }
                },
                loadAuthData: function () {
                    md.fbAuth.on('value', function(snapshot) {
                        md.auth = $.extend(snapshot.val(), md.auth);
                    }, function (errorObject) {
                        console.log('The auth failed: ' + errorObject.code);
                    });
                },
                goOffline: function () {
                    //Firebase.goOffline();
                },
                contactDataTable: function () {
                    // Attach an asynchronous callback to read the data at our posts reference
                    if (md.func.checkAuth()) {
                        md.func.afterLogin();

                        // load data table
                        md.func.loadDataTable(md.data);
                    }
                    else {
                        md.func.redirectToLogin();
                    }
                },
                loadDataTable: function () {
                    var $msg = $('<div></div>'), $table = $('<table></table>').addClass('table table-hover dtable'), dtObj;
                    $('<thead></thead>').appendTo($table);
                    $('<tbody></tbody>').appendTo($table);
                    $msg.appendTo(md.$me.empty());
                    $table.appendTo(md.$me);
                    dtObj = $table.DataTable( {
                        'ordering': true,
                        'searching': true,
                        'columns': [
                            {'sTitle':'Name'},
                            {'sTitle':'Email'},
                            {'sTitle':'Phone'},
                            {'sTitle':'Date'},
                            {'sTitle':'Subject'},
                            {'sTitle':'Message'},
                            {'sTitle':'Action'}
                        ],
                        'data': [],
                        'columnDefs': [
                            {
                                'render': function ( data, type, row ) {
                                    return (new Date(data)).toGMTString() ;
                                },
                                'targets': 3
                            },
                            {
                                'render': function ( data, type, row ) {
                                    var $btn = $('<button></button>').addClass('action-btn').attr({'data-k': data, 'type': 'button', 'title': 'delete'});
                                    $('<i></i>').addClass('fa fa-remove').appendTo($btn);
                                    return $btn.getHtml();
                                },
                                'targets': 6
                            }
                        ],
                        'createdRow': function ( row, data, index ) {
                            $('button.action-btn', row).click(function () {
                                md.fbData.child($(this).data('k')).remove(function (error) {
                                    if (error) {
                                        $msg.message({
                                            type: 'danger',
                                            html: 'Synchronization failed, Please try again later.',
                                            autoHide: 4000
                                        });
                                    }
                                    else {
                                        $msg.message({
                                            type: 'success',
                                            html: 'Deleted successfully!!!',
                                            autoHide: 4000
                                        });
                                    }
                                });
                            });
                        },
                        'order': [[ 3, 'desc' ]]
                    });
                    md.fbData.on('child_added', function(childSnapshot, prevChildName) {
                        dtObj.clear().draw();
                    });
                    md.fbData.on('child_removed', function(oldChildSnapshot) {
                        dtObj.clear().draw();
                    });
                    md.fbData.on('value', function(snapshot) {
                        var d, dt = snapshot.val(), val;
                        for (d in dt) {
                            val = dt[d];
                            dtObj && dtObj.row.add([
                                val.n,
                                val.e,
                                val.tp,
                                val.t,
                                val.s,
                                val.m,
                                d
                            ]).draw();
                        }
                    }, function (errorObject) {
                        console.log('The data failed: ' + errorObject.code);
                    });
                },
                afterLogin: function () {
                    opt.$changePassword.show();
                    opt.$logout.show();
                },
                redirectToLogin: function() {
                    var $row = $('<div></div>').addClass('row'),
                    $col = $('<div></div>').addClass('col-md-6'),
                    $textBox = $('<div></div>').addClass('text-box'),
                    $textBoxBody = $('<div></div>').addClass('text-box-body'),
                    $msg = $('<div></div>');
                    opt.$changePassword.hide();
                    opt.$logout.hide();

                    // create login form
                    var $form = $('<form></form>').attr('method', 'post'),
                    $r = $('<div></div>').addClass('row'),
                    $c = $('<div></div>').addClass('col-md-12'),
                    $fg = $('<div></div>').addClass('form-group');

                    $('<p></p>').text('To access bluejson dashboard, you have to login in our system').appendTo($form);
                    $msg.appendTo($form);

                    $('<input/>').attr({'type': 'text', 'name': 'username', 'placeholder': 'Enter Username'}).addClass('form-control').appendTo($fg);
                    $fg.appendTo($c.appendTo($r.appendTo($form)));

                    $r = $('<div></div>').addClass('row');
                    $c = $('<div></div>').addClass('col-md-12');
                    $fg = $('<div></div>').addClass('form-group');
                    $('<input/>').attr({'type': 'password', 'name': 'password', 'placeholder': 'Enter Password'}).addClass('form-control').appendTo($fg);
                    $fg.appendTo($c.appendTo($r.appendTo($form)));

                    $r = $('<div></div>').addClass('row');
                    $c = $('<div></div>').addClass('col-md-12');
                    $fg = $('<div></div>').addClass('form-group text-right');
                    $('<button></button>').attr({'type': 'submit'}).text('Login').addClass('btn btn-default').appendTo($fg);
                    $fg.appendTo($c.appendTo($r.appendTo($form)));

                    $form.validate({
                        rules: {
                            username: 'required',
                            password: 'required'
                        },
                        messages: {
                            username: 'Username is required',
                            password: 'Password is required'
                        },
                        submitHandler: function (form) {
                            var dataArr = $(form).serializeArray(), dataJson = {}, valid = true;
                            for(var d in dataArr) {
                                if(md.auth[dataArr[d]['name']] != dataArr[d]['value']) {
                                    valid = false;
                                }
                            }
                            if (valid) {
                                $.cookie('mdauth', true);
                                md.func.contactDataTable();
                            }
                            else {
                                $msg.message({
                                    type: 'danger',
                                    html: 'Username and Password are invalid',
                                    autoHide: 4000
                                });
                            }
                        }
                    });
                    $form.appendTo($textBoxBody);
                    $('<h4></h4>').text('Login').appendTo($textBox);
                    $textBoxBody.appendTo($textBox);
                    $textBox.appendTo($col);

                    $('<div></div>').addClass('col-md-3').appendTo($row);
                    $col.appendTo($row);
                    $('<div></div>').addClass('col-md-3').appendTo($row);
                    $row.appendTo(md.$me.empty());
                },
                changePasswordForm: function () {
                    if (md.func.checkAuth()) {
                        var $row = $('<div></div>').addClass('row'),
                        $col = $('<div></div>').addClass('col-md-6'),
                        $textBox = $('<div></div>').addClass('text-box'),
                        $textBoxBody = $('<div></div>').addClass('text-box-body'),
                        $msg = $('<div></div>');

                        // create login form
                        var $form = $('<form></form>').attr('method', 'post'),
                        $r = $('<div></div>').addClass('row'),
                        $c = $('<div></div>').addClass('col-md-12'),
                        $fg = $('<div></div>').addClass('form-group');

                        $('<p></p>').text('You can update your password, please keep it secret.').appendTo($form);
                        $msg.appendTo($form);

                        $('<input/>').attr({'type': 'password', 'name': 'opassword', 'placeholder': 'Enter Old Password'}).addClass('form-control').appendTo($fg);
                        $fg.appendTo($c.appendTo($r.appendTo($form)));

                        $r = $('<div></div>').addClass('row');
                        $c = $('<div></div>').addClass('col-md-12');
                        $fg = $('<div></div>').addClass('form-group');
                        $('<input/>').attr({'type': 'password', 'id': 'npassword', 'name': 'npassword', 'placeholder': 'Enter New Password'}).addClass('form-control').appendTo($fg);
                        $fg.appendTo($c.appendTo($r.appendTo($form)));

                        $r = $('<div></div>').addClass('row');
                        $c = $('<div></div>').addClass('col-md-12');
                        $fg = $('<div></div>').addClass('form-group');
                        $('<input/>').attr({'type': 'password', 'name': 'cpassword', 'placeholder': 'Enter Confirm Password'}).addClass('form-control').appendTo($fg);
                        $fg.appendTo($c.appendTo($r.appendTo($form)));

                        $r = $('<div></div>').addClass('row');
                        $c = $('<div></div>').addClass('col-md-12');
                        $fg = $('<div></div>').addClass('form-group text-right');
                        $('<button></button>').attr({'type': 'submit'}).text('Submit').addClass('btn btn-warning').appendTo($fg);
                        $fg.appendTo($c.appendTo($r.appendTo($form)));

                        $form.validate({
                            rules: {
                                opassword: 'required',
                                npassword: 'required',
                                cpassword: {
                                    required: true,
                                    equalTo: '#npassword'
                                }
                            },
                            messages: {
                                opassword: 'Old Password is required',
                                npassword: 'New Password is required',
                                cpassword: {
                                    required: 'Confirm Password is required',
                                    equalTo: 'New password and Confirm Password should be same.'
                                }
                            },
                            submitHandler: function (form) {
                                var dataArr = $(form).serializeArray(), dataJson = {};
                                for(var d in dataArr) {
                                    dataJson[dataArr[d]['name']] = dataArr[d]['value'];
                                }
                                if (md.auth['password'] == dataJson['opassword']) {
                                    md.fbAuth.update({'password': dataJson['npassword']});
                                    md.auth['password'] = dataJson['npassword'];
                                    $msg.message({
                                        type: 'success',
                                        html: 'Your password has been updated.',
                                        autoHide: 4000
                                    });
                                    form.reset();
                                }
                                else {
                                    $msg.message({
                                        type: 'danger',
                                        html: 'Your password is wrong, please enter correct password.',
                                        autoHide: 4000
                                    });
                                }
                            }
                        });
                        $form.appendTo($textBoxBody);
                        $('<h4></h4>').text('Change Password').appendTo($textBox);
                        $textBoxBody.appendTo($textBox);
                        $textBox.appendTo($col);

                        $('<div></div>').addClass('col-md-3').appendTo($row);
                        $col.appendTo($row);
                        $('<div></div>').addClass('col-md-3').appendTo($row);
                        $row.appendTo(md.$me.empty());
                    }
                    else {
                        md.func.redirectToLogin();
                    }
                },
                bindActions: function () {
                    opt.$admin.find('>a').click(function (e) {
                        e.preventDefault();
                        md.func.contactDataTable();
                        opt.$changePassword.removeClass('active');
                        opt.$admin.addClass('active');
                    });
                    opt.$changePassword.find('>a').click(function (e) {
                        e.preventDefault();
                        md.func.changePasswordForm();
                        opt.$changePassword.addClass('active');
                        opt.$admin.removeClass('active');
                    });
                    opt.$logout.find('>a').click(function (e) {
                        e.preventDefault();
                        $.removeCookie('mdauth');
                        md.func.redirectToLogin();
                        opt.$changePassword.removeClass('active');
                        opt.$admin.addClass('active');
                    });
                }
            }
        };
        md.func.init();
    }
    $auth.manageDashboard();
});

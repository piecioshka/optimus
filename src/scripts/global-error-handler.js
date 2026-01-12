
require('toastr/build/toastr.css');

const toastr = require('toastr');

toastr.options = {
    positionClass: 'toast-bottom-right',
};

window.onerror = (err) => toastr.error(err);

this["JST"] = this["JST"] || {};

this["JST"]["footer"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="wrap">\n  <div class="container">\n    2013 © <strong>Datas</strong>\n  </div>\n</div>\n';

}
return __p
};

this["JST"]["header"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<nav class="navbar navbar-default navbar-static-top" role="navigation">\n  <div class="container">      \n    <div class="nav-header">\n      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n      <a class="navbar-brand" href="#/">Datas</a>\n    </div>\n    <div class="collapse navbar-collapse navbar-ex1-collapse">\n      <ul class="nav navbar-nav">\n        <li class="active"><a href="#/">Referencias</a></li>\n      </ul>\n      \n      <div id="users-panel"></div>\n    </div>\n  </div>\n</nav>\n    ';

}
return __p
};

this["JST"]["index"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\n  <div class="page-header">\n    <h1>Sticky footer with fixed navbar</h1>\n  </div>\n\n  <p class="lead">Pin a fixed-height footer to the bottom of the viewport in desktop browsers with this custom HTML and CSS. A fixed navbar has been added within <code>#wrap</code> with <code>padding-top: 60px;</code> on the <code>.container</code>.</p>\n\n  <hr>\n\n  <div id="add-data"></div>\n</div>';

}
return __p
};

this["JST"]["layout"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\n  <div class="row">\n    <div class="col-md-6">\n      <div id="content">\n        <!-- Show contents -->\n      </div>\n    </div>\n    <div class="col-md-6">\n      <div id="references">\n        <!-- Show references -->\n      </div>\n    </div>\n  </div>\n</div>\n';

}
return __p
};

this["JST"]["partials/loading"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="text-center">\n  <img src="/img/spin.gif" alt="Cargando...">\n</div>\n';

}
return __p
};

this["JST"]["partials/pagination"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if (filterExpression) { ;
__p += '\n';
 totalPages = Math.ceil(sortedAndFilteredModels.length / perPage); ;
__p += '\n';
 } ;
__p += '\n\n';
 if (totalPages > 1) { ;
__p += '\n<div class="text-center">\n  <ul class="pagination">\n    ';
 if (currentPage > firstPage) { ;
__p += '\n      <li><a href="#" class="prev">&laquo; Anterior</a></li>\n    ';
 } ;
__p += '\n\n    ';
 var start = currentPage - 2 ;
__p += '\n    ';
 var final = currentPage + 2 ;
__p += '\n    ';
 start = start < 1 ? 1 : start ;
__p += '\n    ';
 final = final >= totalPages ? totalPages : final ;
__p += '\n\n    ';
 if (firstPage != currentPage && start >= 2) { ;
__p += '\n      <li><a href="#" class="page">' +
__e( firstPage) +
'</a></li>\n      <li class="disabled"><a>...</a></li>\n    ';
 } ;
__p += '\n\n    ';
 for (var p = start; p <= final; p++) { ;
__p += '\n      ';
 if (currentPage === p) { ;
__p += '\n        <li class="active"><a class="page">' +
__e( p ) +
' <span class="sr-only">(actual)</span></a></li>\n      ';
 } else { ;
__p += '\n        <li><a href="#" class="page">' +
__e( p ) +
'</a></li>\n      ';
 } ;
__p += '\n    ';
 } ;
__p += '\n\n    ';
 if (totalPages != currentPage && totalPages - final > 0) { ;
__p += '\n      <li class="disabled"><a>...</a></li>\n      <li><a href="#" class="page">' +
__e( totalPages) +
'</a></li>\n    ';
 } ;
__p += '\n    \n    ';
 if (currentPage < totalPages) { ;
__p += '\n      <li><a href="#" class="next">Siguiente &raquo;</a></li>\n    ';
 } ;
__p += '\n  </ul>\n</div>\n';
 } ;
__p += '\n';

}
return __p
};

this["JST"]["reference/edit"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="page-header">\n  ';
 if (_id) { ;
__p += '\n    <a href="#" class="btn btn-success pull-right reference-close">Añadir nueva</a>\n    <h3>Editar referencia</h3>\n  ';
 } else { ;
__p += '\n    <h3>Añadir referencia</h3>\n  ';
 } ;
__p += '\n</div>\n<form id="reference-form" class="form-horizontal" role="form">\n  <div class="form-group">\n    <label for="reference-content" class="col-md-3 control-label">Referencia</label>\n    <div class="col-md-9">\n      <textarea class="form-control" id="reference-content" rows="5" placeholder="Escribe la referencia que quieras añadir">' +
__e( reference ) +
'</textarea>\n      <small class="help-block">Puedes usar notación <a href="http://daringfireball.net/projects/markdown/">markdown</a> para el formato</small>\n    </div>\n  </div>\n  <div class="form-group">\n    <label for="book" class="col-md-3 control-label">Fuente</label>\n    <div class="col-md-9">\n      <div id="source-select"></div>\n      <small class="help-block">\n        <a href="#" class="btn btn-sm" data-toggle="modal" data-target="#editSource .modal">\n          <span class="glyphicon glyphicon-plus"></span> Añadir nueva\n        </a>\n      </small>\n    </div>\n  </div>\n  <div class="form-group">\n    <label for="reference-pages" class="col-md-3 control-label">Página(s)</label>\n    <div class="col-md-9">\n      <input value="' +
__e( pages ) +
'" type="text" class="form-control" id="reference-pages" placeholder="Página(s)">\n    </div>\n  </div>\n  <div class="form-group">\n    <div class="col-md-offset-3 col-md-9">\n      <input type="hidden" id="reference-id" value="' +
__e( _id ) +
'">\n      <button type="submit" class="btn btn-primary">Guardar</button>\n      ';
 if (_id) { ;
__p += '\n      <button type="button" class="btn btn-default reference-close">Descartar</button>\n      ';
 } ;
__p += '\n    </div>\n  </div>\n</form>\n\n<!-- #editSource (modal) -->\n<div id="editSource"></div>\n<!-- /#editSource -->\n';

}
return __p
};

this["JST"]["reference/item"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- Controls -->\n<div class="btn-group pull-right">\n  <button class="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown">\n    <span class="caret"></span>\n  </button>\n  <ul class="dropdown-menu">\n    <li><a href="#" class="reference-edit">Editar referencia</a></li>\n    <li><a href="#" class="reference-destroy">Eliminar referencia</a></li>\n  </ul>\n</div>\n\n<!-- Details -->\n<p>' +
((__t = ( markdown(reference) )) == null ? '' : __t) +
'</p>\n<small class="text-muted">\n  ';
 if (source) { ;
__p += '\n    ' +
__e( source.author ) +
'. <em>' +
__e( source.title ) +
'</em>. p. ' +
__e( pages ) +
'\n  ';
 } ;
__p += '\n</small>\n';

}
return __p
};

this["JST"]["reference/search-form"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<form id="form" role="form">\n  <input type="text" class="form-control input-lg" id="q" placeholder="Buscar referencias">\n</form>\n';

}
return __p
};

this["JST"]["reference/search"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="search-form"></div>\n\n<br>\n\n<div class="list"></div>\n<div class="pages"></div>\n';

}
return __p
};

this["JST"]["source/edit"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<form id="source-form" role="form" class="form-horizontal">\n  <div class="modal" tabindex="-1" role="dialog" aria-labelledby="modal-label" aria-hidden="true">\n    <div class="modal-dialog">\n      <div class="modal-content">\n        <div class="modal-header">\n          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n          <h4 class="modal-title" id="modal-label">Añadir fuente</h4>\n        </div>\n        <div class="modal-body">\n\n          <!-- ID -->\n          <input type="hidden" id="source-id" value="">\n\n          <!-- Título -->\n          <div class="form-group">\n            <label for="source-title" class="col-sm-2 control-label">Título</label>\n            <div class="col-sm-10">\n              <input type="text" class="form-control" id="source-title" placeholder="Añade el título de la fuente">\n            </div>\n          </div>\n\n          <!-- Autor -->\n          <div class="form-group">\n            <label for="source-author" class="col-sm-2 control-label">Autor</label>\n            <div class="col-sm-10">\n              <input type="text" class="form-control" id="source-author" placeholder="Añade el autor">\n              <small class="help-block">Ejemplos: "Nietzsche, Friedrich", "Benjamin, Walter", "Simondon, Gilbert"</small>\n            </div>\n          </div>\n\n          <!-- Editorial -->\n          <div class="form-group">\n            <label for="source-publisher" class="col-sm-2 control-label">Editorial</label>\n            <div class="col-sm-10">\n              <input type="text" class="form-control" id="source-publisher" placeholder="Añade la editorial">\n            </div>\n          </div>\n\n          <!-- Fecha de edición -->\n          <div class="form-group">\n            <label for="source-date" class="col-sm-2 control-label">Fecha</label>\n            <div class="col-sm-10">\n              <input type="text" class="form-control" id="source-date" placeholder="Añade la fecha de edición">\n            </div>\n          </div>\n\n        </div>\n        <div class="modal-footer">\n          <button type="button" class="btn btn-default" data-dismiss="modal">Descartar</button>\n          <!-- Submit -->\n          <button type="submit" class="btn btn-primary">Guardar</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</form>\n';

}
return __p
};

this["JST"]["source/option"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
__e( author ) +
'. ' +
__e( title ) +
'\n';

}
return __p
};
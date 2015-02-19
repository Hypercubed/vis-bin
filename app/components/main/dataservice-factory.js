/* global Papa:true */

'use strict';

angular.module('myApp')
.factory('DataServiceFactory', function($http, $q, $log, mimeType) { //todo: make a service, returns a dataPackage?

	// try to follow http://dataprotocols.org/data-packages/

	/* function cheapYaml(content) {  // not good
		var split = content.split('\n\t*\n', 2);

		var meta = { content: split[1] };
		split[0].split(/[\r\n]+/).forEach(function(d) {
			var i = d.indexOf(':');
			if (i > -1) {
				var key = d.substring(0, i).trim();
				var value = d.substring(i+1).trim();
				meta[key] = value;
			}
		});
		return meta;
	} */

	function DOS2UNIX(content) {
		return content
			.replace(/\r/g,'\n');
	}

	function processByType(file) {
		if (file.type === 'text/tab-separated-values') {  // TODO: more file types
			var parse = Papa.parse(file.content, {header: true, delimiter: '\t', skipEmptyLines: true});
			angular.extend(file, parse);
			file.table = true;
		} else if (file.type === 'text/plain') {
			file.content = DOS2UNIX(file.content);
			//file.data = cheapYaml(file.content);
		} else if (file.type === 'application/json') {
			file.data = angular.fromJson(file.content);
			if (file.data.url && file.data.url.indexOf('api.github.com') > -1) {  // move
				file.data.name = file.data.owner.login +'/'+file.data.id;
				file.path = 'gists/'+file.data.id;
			}
		}
		file.isDirty = false;
		return file;
	}

	function DataService(conn, id) {
		this.conn = conn || 'data';
		this.id = id || 'index';
		//this.package = null;
	}

	DataService.prototype.normalize = function(info) {
		var base = this.conn + '/' + this.id;

		if (!angular.isObject(info)) {  // if not already an object, make one
			info = { name: info, path: info, show: true };
		}

		info.path = info.path || info.filename;

		if (!info.url && info.path && base) {
			info.url = base + '/' + info.path;
		}

		if (!info.name && info.url) {
			info.name = info.url.split('/').pop();
		}

		if (!info.type && info.path) {
			info.type = mimeType(info.path);
		}

		if (info.path.indexOf('api.github.com') > -1) {
			info.type = mimeType('json');
		}

		if (info.type.indexOf('text') !== 0 && info.type !== 'application/javascript') {
			info.show = false;
		}

		return info;

	};

	DataService.prototype.loadResource = function(resource) {  // resource is a resource object form a data package

		if (resource.url && !(resource.content || resource.data)) {

			$log.debug('Loading ',resource.url);

			var transform = function(data, headers) {
				var contentType = headers('Content-Type');

				if (contentType) {
					resource.type = contentType.split(';')[0];
				}

				resource.content = data;
				return processByType(resource);
			};

			return $http.get(resource.url, {transformResponse: transform});

		} else {
			return {data: processByType(resource)};
		}

	};

	DataService.prototype.reparse = function reparse(file) {
		if (arguments.length < 1) {
			angular.forEach(this.package.resources, processByType);
		} else {
			processByType(file);
		}
	};

	DataService.prototype.load = function(conn, id) {

		this.conn = conn = conn || this.conn || 'data';
		this.id = id = id || this.id || 'index';

		var self = this;

		//this.clear();

		var path = (conn === 'gists') ?
			['https://api.github.com',conn,id] :
			['datapackage.json'];

		var _package = this.normalize({ name: id, path: path.join('/'), show: false });

		return this.loadResource(_package).then(function(res) {

			angular.extend(_package, res.data.data);

			if (conn === 'gists') {
				_package.resources = [];
				angular.forEach(_package.files, function(file) {
					_package.resources.push(file);
				});
			}

			_package.resources = _package.resources || ['index.html'];

			var q = [];
			for (var key in _package.resources) {
				_package.resources[key] = self.normalize(_package.resources[key]);
				q.push(self.loadResource(_package.resources[key]));
			}

			return $q.all(q).then(function() {
				//self.package = _package;
				//console.log(self);
				return _package;
			});

		});

	};

	return DataService;

});

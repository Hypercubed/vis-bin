/* global Papa:true */

'use strict';

angular.module('myApp')
.service('mimeType', function() {

	var mtypes = {
		'3gp': 'video/3gpp',
		a: 'application/octet-stream',
		ai: 'application/postscript',
		aif: 'audio/x-aiff',
		aiff: 'audio/x-aiff',
		asc: 'application/pgp-signature',
		asf: 'video/x-ms-asf',
		asm: 'text/x-asm',
		asx: 'video/x-ms-asf',
		atom: 'application/atom+xml',
		au: 'audio/basic',
		avi: 'video/x-msvideo',
		bat: 'application/x-msdownload',
		bin: 'application/octet-stream',
		bmp: 'image/bmp',
		bz2: 'application/x-bzip2',
		c: 'text/x-csrc',
		cab: 'application/vnd.ms-cab-compressed',
		can: 'application/candor',
		cc: 'text/x-c++src',
		chm: 'application/vnd.ms-htmlhelp',
		'class': 'application/octet-stream',
		com: 'application/x-msdownload',
		conf: 'text/plain',
		cpp: 'text/x-c',
		crt: 'application/x-x509-ca-cert',
		css: 'text/css',
		csv: 'text/csv',
		cxx: 'text/x-c',
		deb: 'application/x-debian-package',
		der: 'application/x-x509-ca-cert',
		diff: 'text/x-diff',
		djv: 'image/vnd.djvu',
		djvu: 'image/vnd.djvu',
		dll: 'application/x-msdownload',
		dmg: 'application/octet-stream',
		doc: 'application/msword',
		dot: 'application/msword',
		dtd: 'application/xml-dtd',
		dvi: 'application/x-dvi',
		ear: 'application/java-archive',
		eml: 'message/rfc822',
		eps: 'application/postscript',
		exe: 'application/x-msdownload',
		f: 'text/x-fortran',
		f77: 'text/x-fortran',
		f90: 'text/x-fortran',
		flv: 'video/x-flv',
		'for': 'text/x-fortran',
		gem: 'application/octet-stream',
		gemspec: 'text/x-script.ruby',
		gif: 'image/gif',
		gyp: 'text/x-script.python',
		gypi: 'text/x-script.python',
		gz: 'application/x-gzip',
		h: 'text/x-chdr',
		hh: 'text/x-c++hdr',
		htm: 'text/html',
		html: 'text/html',
		ico: 'image/vnd.microsoft.icon',
		ics: 'text/calendar',
		ifb: 'text/calendar',
		iso: 'application/octet-stream',
		jar: 'application/java-archive',
		java: 'text/x-java-source',
		jnlp: 'application/x-java-jnlp-file',
		jpeg: 'image/jpeg',
		jpg: 'image/jpeg',
		js: 'application/javascript',
		json: 'application/json',
		less: 'text/css',
		log: 'text/plain',
		lua: 'text/x-script.lua',
		luac: 'application/x-bytecode.lua',
		makefile: 'text/x-makefile',
		m3u: 'audio/x-mpegurl',
		m4v: 'video/mp4',
		man: 'text/troff',
		manifest: 'text/cache-manifest',
		markdown: 'text/x-markdown',
		mathml: 'application/mathml+xml',
		mbox: 'application/mbox',
		mdoc: 'text/troff',
		md: 'text/x-markdown',
		me: 'text/troff',
		mid: 'audio/midi',
		midi: 'audio/midi',
		mime: 'message/rfc822',
		mml: 'application/mathml+xml',
		mng: 'video/x-mng',
		mov: 'video/quicktime',
		mp3: 'audio/mpeg',
		mp4: 'video/mp4',
		mp4v: 'video/mp4',
		mpeg: 'video/mpeg',
		mpg: 'video/mpeg',
		ms: 'text/troff',
		msi: 'application/x-msdownload',
		odp: 'application/vnd.oasis.opendocument.presentation',
		ods: 'application/vnd.oasis.opendocument.spreadsheet',
		odt: 'application/vnd.oasis.opendocument.text',
		ogg: 'application/ogg',
		p: 'text/x-pascal',
		pas: 'text/x-pascal',
		pbm: 'image/x-portable-bitmap',
		pdf: 'application/pdf',
		pem: 'application/x-x509-ca-cert',
		pgm: 'image/x-portable-graymap',
		pgp: 'application/pgp-encrypted',
		pkg: 'application/octet-stream',
		pl: 'text/x-script.perl',
		pm: 'text/x-script.perl-module',
		png: 'image/png',
		pnm: 'image/x-portable-anymap',
		ppm: 'image/x-portable-pixmap',
		pps: 'application/vnd.ms-powerpoint',
		ppt: 'application/vnd.ms-powerpoint',
		ps: 'application/postscript',
		psd: 'image/vnd.adobe.photoshop',
		py: 'text/x-script.python',
		qt: 'video/quicktime',
		ra: 'audio/x-pn-realaudio',
		rake: 'text/x-script.ruby',
		ram: 'audio/x-pn-realaudio',
		rar: 'application/x-rar-compressed',
		rb: 'text/x-script.ruby',
		rdf: 'application/rdf+xml',
		roff: 'text/troff',
		rpm: 'application/x-redhat-package-manager',
		rss: 'application/rss+xml',
		rtf: 'application/rtf',
		ru: 'text/x-script.ruby',
		s: 'text/x-asm',
		sgm: 'text/sgml',
		sgml: 'text/sgml',
		sh: 'application/x-sh',
		sig: 'application/pgp-signature',
		snd: 'audio/basic',
		so: 'application/octet-stream',
		svg: 'image/svg+xml',
		svgz: 'image/svg+xml',
		swf: 'application/x-shockwave-flash',
		t: 'text/troff',
		tar: 'application/x-tar',
		tbz: 'application/x-bzip-compressed-tar',
		tci: 'application/x-topcloud',
		tcl: 'application/x-tcl',
		tex: 'application/x-tex',
		texi: 'application/x-texinfo',
		texinfo: 'application/x-texinfo',
		text: 'text/plain',
		tif: 'image/tiff',
		tiff: 'image/tiff',
		torrent: 'application/x-bittorrent',
		tr: 'text/troff',
		tsv: 'text/tab-separated-values',
		ttf: 'application/x-font-ttf',
		txt: 'text/plain',
		vcf: 'text/x-vcard',
		vcs: 'text/x-vcalendar',
		vrml: 'model/vrml',
		war   : 'application/java-archive',
		wav   : 'audio/x-wav',
		webapp: 'application/x-web-app-manifest+json',
		webm: 'video/webm',
		wma: 'audio/x-ms-wma',
		wmv: 'video/x-ms-wmv',
		wmx: 'video/x-ms-wmx',
		wrl: 'model/vrml',
		wsdl: 'application/wsdl+xml',
		xbm: 'image/x-xbitmap',
		xhtml: 'application/xhtml+xml',
		xls: 'application/vnd.ms-excel',
		xml: 'application/xml',
		xpm: 'image/x-xpixmap',
		xsl: 'application/xml',
		xslt: 'application/xslt+xml',
		yaml: 'text/yaml',
		yml: 'text/yaml',
		zip: 'application/zip'
	};

	return function mimeType(ext) {
		ext = ext.toLowerCase().trim();
		if (ext.indexOf('.') > -1) {
			ext = ext.split('.').pop();
		}
		return mtypes[ext] || 'unknown';
	};

})
.factory('DataServiceFactory', function($http, $q, $log, mimeType) { //todo: make a service, returns a dataPackage?

	// try to follow http://dataprotocols.org/data-packages/

	function cheapYaml(content) {  // not good
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
	}

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

			return $q.all(q).then(function(res) {
				//self.package = _package;
				//console.log(self);
				return _package;
			});

		});

	};

	return DataService;

});

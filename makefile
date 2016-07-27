.PHONY: css
css:
	mkdir -p bundle
	postcss --watch --use autoprefixer --use postcss-import css/index.css --output bundle/index.min.css

.PHONY: js
js:
	mkdir -p bundle
	babel --watch js/index.js --out-file bundle/index.min.js

.PHONY: server
server:
	browser-sync start --server --files='index.html, bundle, css, js, img'

.PHONY: clean
clean:
	rm -r bundle

.PHONY: all
all:
	make css & make js & make server & wait
